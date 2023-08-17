import { Injectable } from '@angular/core';
import Compressor from 'compressorjs';
import MicRecorder from '@calvinckho/mic-recorder-to-mp3';
import { imgSrcToBlob } from 'blob-util';
import fixOrientation from 'fix-orientation-capacitor';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {ActionSheetController, ToastController, Platform, LoadingController, AlertController} from '@ionic/angular';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import { NetworkService } from './network-service.service';
import {Resource} from './resource.service';
import {lastValueFrom} from "rxjs";

@Injectable({ providedIn: 'root' })
export class Aws {

    public url = '';
    private reader: any = new FileReader();

    sessionAllowedCount = 1;
    sessionAssets: any = {}; // sessionAssets stores the latest, valid media URLs for the session (e.g. moment, group, etc)
    sessionAssetSettings: any = {}; // sessionAssetSettings stores the portrait/landscape info for images
    tempUploadedMedia = []; // list of UploadedUri keeps track of uploaded URLs in a session. If an uploaded URL is no longer in sessionAssets when leaving a session, that media will be removed from DO

    listening = false; // whether the audio is recording
    recorder = new MicRecorder({
        bitRate: 128
    });
    cachedAudioFileBlob: any;

    constructor(private http: HttpClient,
                private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                private storage: Storage,
                private platform: Platform,
                private loadingCtrl: LoadingController,
                private networkService: NetworkService,
                private resourceService: Resource,
                private authService: Auth,
                public userData: UserData) {
    }

    async toggleRecordAudio(event) {
        if (!this.listening) {
            event.stopPropagation(); // prevent the fab button list from closing
            try {
                this.cachedAudioFileBlob = null;
                const els = document.querySelectorAll('#player');
                els.forEach((el) => {
                    if (el.hasChildNodes() && window.getComputedStyle(el).display === 'block') {
                        el.removeChild(el.firstChild);
                    }
                });
                console.log('Listening to microphone...');
                await this.recorder.start();
                this.listening = true;
            } catch (err) {
                console.log(err);
            }
        } else {
            const loading = await this.loadingCtrl.create({
                message: 'Processing...',
                duration: 5000
            });
            try {
                this.listening = false;
                await loading.present();
                const [buffer, blob] = await this.recorder.stop().getMp3();
                const file = new File(buffer, 'preview.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });
                const player = new Audio(URL.createObjectURL(file));
                player.controls = true;
                this.cachedAudioFileBlob = blob;
                const els = document.querySelectorAll('#player');
                els.forEach((el) => {
                    if (window.getComputedStyle(el).display === 'block') {
                        el.appendChild(player);
                    }
                });
                await loading.dismiss();
            } catch (err) {
                await loading.dismiss();
                console.log(err);
            }
        }
    }

    removeCachedAudio() {
        const els = document.querySelectorAll('#player');
        els.forEach((el) => {
            if (el.hasChildNodes() && window.getComputedStyle(el).display === 'block') {
                el.removeChild(el.firstChild);
            }
        });
        this.cachedAudioFileBlob = null;
    }

    public async uploadCachedAudioBlob() {
        if (!this.cachedAudioFileBlob) {
            return;
        }
        try {
            const result: any = await this.upload(this.cachedAudioFileBlob.type, this.userData.user._id, this.cachedAudioFileBlob, 'audio.mp3', this.cachedAudioFileBlob.size, null);
            if (result.msg === 'Upload succeeded') {
                this.url = result.url;
                this.cachedAudioFileBlob = null; // clear the cached blob
            }
            return result.msg;
        } catch (err) {
            return 'Upload abandoned';
        }
    }

    public async uploadImage(type: string, id: string, image: any, sessionId: string) {
        const loading = await this.loadingCtrl.create({
            message: 'Uploading Photo...'
        });
        try {
            await loading.present();
            try {
                // image
                const fixed = await fixOrientation(image); // can't use Capacitor Camera's correctOrientation attribute because it fails on Samsung 5
                const photoBlob: Blob = this.base64ToBlob(fixed);
                const result: any = await this.upload(type, id, photoBlob, 'image.jpg', photoBlob.size, loading);
                if (result.msg === 'Upload succeeded') {
                    this.url = result.url;
                    if (sessionId) {
                        this.addToSessionAssets(sessionId, result.url, 0); // save this as session url
                        if (!this.tempUploadedMedia.includes(this.url)) {
                            this.tempUploadedMedia.push(this.url); // store this for cleaning up DO storage during the clean up cycle
                        }
                    }
                }
                return result.msg;
            } catch (err) {
                loading.dismiss();
                this.presentToast('Failed to process file for upload.');
                console.log('failed to process photo for upload.', err);
                return 'Upload failed';
            }
        } catch (err) {
            loading.dismiss();
            return 'Upload abandoned';
        }
    }

    async compressPhoto(file) {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.6,
                maxWidth: 1280,
                maxHeight: 1280,
                success(compressed) {
                    resolve(compressed);
                },
                error(err) {
                    reject(err);
                    console.log(err.message);
                },
            });
        });
    }

    public async readAsDataURL(file: any) {
        return new Promise(async (resolve, reject) => {
            if (file && file.size > 50000000) {
                const largeFileAlert = await this.alertCtrl.create({
                    header: 'File Too Large',
                    subHeader: 'Your file exceeds the maximum file size limit of 50 megabytes.',
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await largeFileAlert.present();
                return reject({ message: 'file too large' });
            } else if (!file) {
                return reject({ message: 'preview canceled' });
            }
            this.reader.onload = async (e) => {
                try {
                    // read the image width and height, then create a data URL based on the FileReader "result"
                    const image = new Image();
                    image.src = this.reader.result;
                    image.onload = () => {
                        resolve({ message: 'success', width: image.width, height: image.height, dataURL: this.reader.result, file: file });
                    };
                } catch (err) {
                    reject({ message: 'read abandoned' });
                }
            };
            console.log("loading: ", file)
            this.reader.readAsDataURL(file);
        });
    }

    public async uploadFile(type: string, id: string, file: any, sessionId: string, imageIsPortrait: number) {
        return new Promise(async (resolve, reject) => {
            if (file && file.size > 50000000) {
                const largeFileAlert = await this.alertCtrl.create({
                    header: 'File Too Large',
                    subHeader: 'Your file exceeds the maximum file size limit of 50 megabytes.',
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await largeFileAlert.present();
                return reject('file too large');
            } else if (!file) {
                return reject('upload canceled');
            }
            this.reader.onload = async (e) => {
                // Create a blob based on the FileReader "result", which we asked to be retrieved as an ArrayBuffer
                const fileBlob = new Blob([new Uint8Array(this.reader.result)]);
                const loading = await this.loadingCtrl.create({
                    message: 'Uploading File...'
                });
                try {
                    await loading.present();
                    const result: any = await this.upload(type, id, fileBlob, file.name, file.size, loading);
                    console.log('result', result);
                    if (result.msg === 'Upload succeeded') {
                        this.url = result.url;
                        if (sessionId) {
                            this.addToSessionAssets(sessionId, result.url, imageIsPortrait); // save this as session url
                            if (!this.tempUploadedMedia.includes(this.url)) {
                                this.tempUploadedMedia.push(this.url); // store this for cleaning up DO storage during the clean up cycle
                            }
                        }
                    }
                    resolve(result.msg);
                } catch (err) {
                    loading.dismiss();
                    reject('Upload abandoned');
                }
            };
            this.reader.readAsArrayBuffer(file);
        });
    }

    public async uploadImageUri(type: string, id: string, uri: string, sessionId: string) {
        const filename = uri.substring(uri.lastIndexOf('/') + 1).toLowerCase();
        const ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        const blob = await imgSrcToBlob(uri, (['jpg', 'jpeg'].indexOf(ext) > -1 ? 'image/jpeg' : 'image/png'), 'Anonymous');
        const loading = await this.loadingCtrl.create({
            message: 'Processing File...'
        });
        try {
            await loading.present();
            const result: any = await this.upload(type, id, blob, filename, blob.size, loading);
            console.log('result', result);
            if (result.msg === 'Upload succeeded') {
                this.url = result.url;
                if (sessionId) {
                    this.addToSessionAssets(sessionId, result.url, 0); // save this as session url
                    if (!this.tempUploadedMedia.includes(this.url)) {
                        this.tempUploadedMedia.push(this.url); // store this for cleaning up DO storage during the clean up cycle
                    }
                }
            }
            return result.msg;
        } catch (err) {
            loading.dismiss();
            return 'Upload abandoned';
        }
    }

    public upload(type, id, blob, filename_ext, fileSize, loading) {
        const filename = filename_ext.substring(0, filename_ext.lastIndexOf('.')).toLowerCase();
        const ext = filename_ext.substring(filename_ext.lastIndexOf('.') + 1).toLowerCase();
        return new Promise(resolve => {
            if (blob) {
                console.log('beginning to upload...');
                const formData: any = new FormData();
                const xhr = new XMLHttpRequest();
                formData.append('type', type);
                formData.append('size', fileSize);
                formData.append('_id', id);
                formData.append('ext', ext);
                const time_string = new Date().getTime() + Math.random().toString(36).substring(2, 5);
                const location = type + '/' + id + '/' + time_string + '/'  + filename + '.' + ext;
                formData.append('location', location);
                formData.append('upload', blob, filename + '.' + ext);
                xhr.open('POST', this.networkService.domain + '/api/aws/upload', true);
                xhr.setRequestHeader('Authorization', this.authService.token);
                xhr.onload = function () {
                    if (xhr.readyState === 4) {
                        if (loading) {
                            loading.dismiss();
                        }
                        if (xhr.status === 200) {
                            const url = JSON.parse(xhr.responseText);
                            console.log(url);
                            resolve({msg: 'Upload succeeded', url: url});
                        } else {
                            console.log(xhr.response);
                            resolve({msg: 'Upload failed'});
                        }
                    } else {
                        resolve({msg: 'Upload failed'});
                        if (loading) {
                            loading.dismiss();
                        }
                    }
                };
                xhr.send(formData);
            } else {
                console.log('file is absent.');
                resolve({msg: 'Upload failed'});
                if (loading) {
                    loading.dismiss();
                }
            }
            setTimeout(() => {
                if (loading) {
                    loading.dismiss();
                }
            }, 10000); // remove the loading box after 20 sec
        });
    }

    public async removeFile(url) {
        return lastValueFrom(this.http.put(this.networkService.domain + '/api/aws/remove', JSON.stringify({url: url}), this.authService.httpAuthOptions));
    }

    public base64ToBlob(dataURI) {

        // Convert base64 to raw binary data held in a string.
        const byteString = atob(dataURI.split(',')[1]);

        // Separate out the mime component.
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // Write the bytes of the string to an ArrayBuffer.
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // Write the ArrayBuffer to a blob, and you're done.
        return new Blob([ab], { type: mimeString });
    }

    private async presentToast(text) {
        const toast = await this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top',
            color: 'darkgrey'
        });
        toast.present();
    }

    async selectStockPhoto(photo, sessionId) {
        const result = await this.uploadImageUri('communities', this.userData.user.churches[0]._id, photo.largeImageURL, sessionId);
        if (result === 'Upload succeeded') {
            this.resourceService.searchKeyword = '';
            this.resourceService.showPixabay = -1;
        }
    }

    addToSessionAssets(sessionId, url, imagePortrait) {
        if (!this.sessionAssets.hasOwnProperty(sessionId)) { // the array stores the asset url
            this.sessionAssets[sessionId] = []; // initiate the object property with an empty array;
        }
        if (!this.sessionAssetSettings.hasOwnProperty(sessionId)) { // the array stores the asset image url portrait/landscape info
            this.sessionAssetSettings[sessionId] = []; // initiate the object property with an empty array;
        }
        if (url.length) {
            if (this.sessionAssets[sessionId].length < this.sessionAllowedCount) {
                this.sessionAssets[sessionId].push(url);
                this.sessionAssetSettings[sessionId].push(imagePortrait);
            } else {
                this.sessionAssets[sessionId].pop(); // erase the last item
                this.sessionAssetSettings[sessionId].pop(); // erase the last item
                this.sessionAssets[sessionId].push(url);
                this.sessionAssetSettings[sessionId].push(imagePortrait);
            }
        }
    }

    // clean up previously uploaded assets (e.g. in this.moment.assets) that are no longer linked, or clean up all unused uploaded assets
    async cleanUp(sessionId: string, origin: any) {
        if (!origin) { return; } // origin cannot be null
        const imageSource: any = JSON.parse(JSON.stringify(origin));
        switch (typeof imageSource) {
            case 'object': // imageSource is an array. Typical use case is to clean up unlinked Media URL from DO
                // remove valid media from the tempUploadedMedia array. The temp array will be used in the final clean up process
                if (this.sessionAssets.hasOwnProperty(sessionId) && this.sessionAssets[sessionId].length) {
                    for (let i = this.sessionAssets[sessionId].length - 1; i >= 0; i--) {
                        if (this.sessionAssets[sessionId][i] && this.sessionAssets[sessionId][i].length) {
                            const index = this.tempUploadedMedia.indexOf(this.sessionAssets[sessionId][i]);
                            if (index > -1) {
                                this.tempUploadedMedia.splice(index, 1);
                            }
                        } else { // if empty string, splice the element. This is needed to handle empty string
                            this.sessionAssets[sessionId].splice(i, 1);
                        }
                    }
                    // sort the list and move any graphics to the front
                    this.sessionAssets[sessionId].sort((a, b) => {
                        const c: any = (['jpg', 'jpeg', 'gif', 'png']).includes(a.substring(a.lastIndexOf('.') + 1).toLowerCase());
                        const d: any = (['jpg', 'jpeg', 'gif', 'png']).includes(b.substring(b.lastIndexOf('.') + 1).toLowerCase());
                        return (d - c);
                    });
                }
                break;
            case 'string': // imageSource is a string. e.g. user avatar, group chat - media deletion
                if (imageSource.length && this.sessionAssets[sessionId].indexOf(imageSource) < 0 && (imageSource.indexOf('https://pixabay.com') < 0)) {
                    await this.removeFile(imageSource); // remove the previous background from Digital Ocean
                }
                if (this.sessionAssets[sessionId].length && this.sessionAssets[sessionId][0].length) {
                    // clean up the DO storage of unused urls
                    const index = this.tempUploadedMedia.indexOf(this.sessionAssets[sessionId][0]);
                    if (index > -1) {
                        this.tempUploadedMedia.splice(index, 1);
                    }
                }
                break;
            case 'boolean': // erase all uploaded but abandoned files
                this.tempUploadedMedia.forEach(async (url) => {
                    await this.removeFile(url);
                });
                this.url = '';
                this.sessionAssets[sessionId] = [];
                this.sessionAssetSettings[sessionId] = [];
                this.tempUploadedMedia = [];
                this.resourceService.searchKeyword = '';
                this.resourceService.showPixabay = -1;
                break;
        }
    }
}

import { Injectable } from '@angular/core';
import Compressor from 'compressorjs';
import { imgSrcToBlob } from 'blob-util'
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {ActionSheetController, ToastController, Platform, LoadingController, AlertController} from '@ionic/angular';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import { NetworkService } from './network-service.service';
import 'rxjs/add/operator/map'; import 'rxjs/add/operator/timeout'; import 'rxjs/add/operator/toPromise';
import fixOrientation from 'fix-orientation-capacitor';
import {Resource} from "./resource.service";

// Set S3 endpoint to DigitalOcean Spaces

@Injectable({ providedIn: 'root' })
export class Aws {

    public previewImage: string = null;
    loading: any;
    public url = '';
    private reader: any = new FileReader();

    sessionAllowedCount = 1;
    sessionAssets = []; // sessionAssets stores the latest, valid media URLs for the session (e.g. moment, group, etc)
    tempUploadedMedia = []; // list of UploadedUri keeps track of uploaded URLs in a session. If an uploaded URL is no longer in sessionAssets when leaving a session, that media will be removed from DO

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

    public async uploadImage(type: string, id: string, image: any) {
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
                    this.addToSessionAssets(result.url); // save this as session url
                    if (!this.tempUploadedMedia.includes(this.url)) {
                        this.tempUploadedMedia.push(this.url); // store this for cleaning up DO storage during the clean up cycle
                    }
                }
                return result.msg;
            } catch (err) {
                loading.dismiss();
                this.presentToast('Failed to process file for upload.');
                console.log("failed to process photo for upload.", err);
                return "Upload failed";
            }
        } catch (err) {
            loading.dismiss();
            return "Upload abandoned";
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
        })
    }

    public async uploadFile(type: string, id: string, file: any) {
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
                    console.log("result", result);
                    if (result.msg === 'Upload succeeded') {
                        this.url = result.url;
                        this.addToSessionAssets(result.url); // save this as session url
                        if (!this.tempUploadedMedia.includes(this.url)) {
                            this.tempUploadedMedia.push(this.url); // store this for cleaning up DO storage during the clean up cycle
                        }
                    }
                    resolve(result.msg);
                } catch (err) {
                    loading.dismiss();
                    reject("Upload abandoned");
                }
            };
            this.reader.readAsArrayBuffer(file);
        });
    }

    public async uploadImageUri(type: string, id: string, uri: string) {
        let filename = uri.substring(uri.lastIndexOf('/') + 1).toLowerCase();
        const ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        let blob = await imgSrcToBlob(uri, (['jpg', 'jpeg'].indexOf(ext) > -1 ? 'image/jpeg' : 'image/png'), 'Anonymous');
        const loading = await this.loadingCtrl.create({
            message: 'Processing File...'
        });
        try {
            await loading.present();
            const result: any = await this.upload(type, id, blob, filename, blob.size, loading);
            console.log("result", result);
            if(result.msg === 'Upload succeeded') {
                this.url = result.url;
                this.addToSessionAssets(result.url); // save this as session url
                if (!this.tempUploadedMedia.includes(this.url)) {
                    this.tempUploadedMedia.push(this.url); // store this for cleaning up DO storage during the clean up cycle
                }
            }
            return result.msg;
        } catch (err) {
            loading.dismiss();
            return "Upload abandoned";
        }
    }

    public upload(type, id, blob, filename_ext, fileSize, loading) {
        const filename = filename_ext.substring(0, filename_ext.lastIndexOf('.')).toLowerCase();
        const ext = filename_ext.substring(filename_ext.lastIndexOf('.') + 1).toLowerCase();
        return new Promise(resolve => {
            if (blob) {
                console.log("beginning to upload...");
                const formData: any = new FormData();
                const xhr = new XMLHttpRequest();
                formData.append("type", type);
                formData.append("size", fileSize);
                formData.append("_id", id);
                formData.append("ext", ext);
                const time_string = new Date().getTime() + Math.random().toString(36).substring(2, 5);
                const location = type + '/' + id + '/' + time_string + '/'  + filename + '.' + ext;
                formData.append("location", location);
                formData.append("upload", blob, filename + "." + ext);
                xhr.open('POST', this.networkService.domain + "/api/aws/upload", true);
                xhr.setRequestHeader('Authorization', this.authService.token);
                xhr.onload = function () {
                    if (xhr.readyState === 4) {
                        loading.dismiss();
                        if (xhr.status === 200) {
                            const url = JSON.parse(xhr.responseText);
                            console.log(url);
                            resolve({msg: "Upload succeeded", url: url});
                        } else {
                            console.log(xhr.response);
                            resolve({msg: "Upload failed"});
                        }
                    } else {
                        resolve({msg: "Upload failed"});
                        loading.dismiss();
                    }
                };
                xhr.send(formData);
            } else {
                console.log("file is absent.");
                resolve({msg: "Upload failed"});
                loading.dismiss();
            }
            setTimeout(() => loading.dismiss(), 10000); // remove the loading box after 20 sec
        });
    }

    public async removeFile(url) {
        return this.http.put(this.networkService.domain + '/api/aws/remove', JSON.stringify({url: url}), this.authService.httpAuthOptions).toPromise();
    }

    public base64ToBlob(dataURI) {

        // Convert base64 to raw binary data held in a string.
        const byteString = atob(dataURI.split(',')[1]);

        // Separate out the mime component.
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // Write the bytes of the string to an ArrayBuffer.
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
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
            position: 'top'
        });
        toast.present();
    }

    async selectStockPhoto(photo) {
        const result = await this.uploadImageUri('communities', this.userData.user.churches[this.userData.currentCommunityIndex]._id, photo.largeImageURL);
        if (result === 'Upload succeeded'){
            this.resourceService.searchKeyword = '';
            this.resourceService.showPixabay = -1;
        }
    }

    addToSessionAssets(url) {
        if (url.length) {
            if (this.sessionAssets.length < this.sessionAllowedCount) {
                this.sessionAssets.push(url);
            } else {
                this.sessionAssets.pop(); // erase the last item
                this.sessionAssets.push(url);
            }
        }
    }

    // clean up previously uploaded assets (e.g. in this.moment.assets) that are no longer linked, or clean up all unused uploaded assets
    async cleanUp(origin: any) {
        const imageSource: any = JSON.parse(JSON.stringify(origin));
        switch (typeof imageSource) {
            case 'object': // imageSource is an array. Typical use case is to clean up unlinked Media URL from DO
                // first, remove the assets from Digital Ocean if removed from the current sessionAssets
                // temporarily disable deleting media from DO because of cloning
                /*for (const image of imageSource) {
                    if (image && image.length && !this.sessionAssets.includes(image) && !image.includes('https://pixabay.com')) {
                        console.log("removing media", image, this.sessionAssets, imageSource);
                        await this.removeFile(image);
                    }
                }*/
                // second, remove valid media from the tempUploadedMedia array. The temp array will be used in the final clean up process
                for (let i = this.sessionAssets.length - 1; i >= 0; i--) {
                    if (this.sessionAssets[i] && this.sessionAssets[i].length) {
                        const index = this.tempUploadedMedia.indexOf(this.sessionAssets[i]);
                        if (index > -1) {
                            this.tempUploadedMedia.splice(index, 1);
                        }
                    } else { // if empty string, splice the element. This is needed to handle empty string
                        this.sessionAssets.splice(i, 1);
                    }
                }
                // third, sort the list and move any graphics to the front
                this.sessionAssets.sort((a, b) => {
                    const c: any = (['jpg', 'jpeg', 'gif', 'png']).indexOf(a.substring(a.lastIndexOf('.') + 1).toLowerCase()) > -1;
                    const d: any = (['jpg', 'jpeg', 'gif', 'png']).indexOf(b.substring(b.lastIndexOf('.') + 1).toLowerCase()) > -1;
                    return (d - c);
                });
                break;
            case 'string': // imageSource is a string
                if (imageSource.length && this.sessionAssets.indexOf(imageSource) < 0 && (imageSource.indexOf('https://pixabay.com') < 0)) {
                    await this.removeFile(imageSource); // remove the previous background from Digital Ocean
                }
                if (this.sessionAssets.length && this.sessionAssets[0].length) {
                    // clean up the DO storage of unused urls
                    const index = this.tempUploadedMedia.indexOf(this.sessionAssets[0]);
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
                this.sessionAssets = [];
                this.tempUploadedMedia = [];
                this.resourceService.searchKeyword = '';
                this.resourceService.showPixabay = -1;
                break;
        }
    }
}
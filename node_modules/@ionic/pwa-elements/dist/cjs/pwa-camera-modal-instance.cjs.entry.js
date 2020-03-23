'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-992a1039.js');

const PWACameraModal = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.onPhoto = core.createEvent(this, "onPhoto", 7);
    }
    async handlePhoto(photo) {
        this.onPhoto.emit(photo);
    }
    handleBackdropClick(e) {
        if (e.target !== this.el) {
            this.onPhoto.emit(null);
        }
    }
    handleComponentClick(e) {
        e.stopPropagation();
    }
    handleBackdropKeyUp(e) {
        if (e.key === "Escape") {
            this.onPhoto.emit(null);
        }
    }
    render() {
        return (core.h("div", { class: "wrapper", onClick: e => this.handleBackdropClick(e) }, core.h("div", { class: "content" }, core.h("pwa-camera", { onClick: e => this.handleComponentClick(e), onPhoto: (photo) => this.handlePhoto(photo) }))));
    }
    get el() { return core.getElement(this); }
    static get style() { return ":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;contain:strict;--inset-width:600px;--inset-height:600px}.wrapper,:host{display:-ms-flexbox;display:flex}.wrapper{-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0,0,0,.15)}.content{-webkit-box-shadow:0 0 5px rgba(0,0,0,.2);box-shadow:0 0 5px rgba(0,0,0,.2);width:var(--inset-width);height:var(--inset-height)}\@media only screen and (max-width:600px){.content{width:100%;height:100%}}"; }
};

exports.pwa_camera_modal_instance = PWACameraModal;

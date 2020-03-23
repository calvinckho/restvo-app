import { FlashMode } from '../../definitions';
import './imagecapture';
export declare class CameraPWA {
    el: any;
    private isServer;
    facingMode: string;
    onPhoto: (e: any) => void;
    photo: any;
    photoSrc: any;
    showShutterOverlay: boolean;
    flashIndex: number;
    offscreenCanvas: HTMLCanvasElement;
    defaultConstraints: any;
    stream: MediaStream;
    imageCapture: any;
    videoElement: HTMLVideoElement;
    canvasElement: HTMLCanvasElement;
    hasMultipleCameras: boolean;
    hasFlash: boolean;
    flashModes: FlashMode[];
    flashMode: FlashMode;
    componentDidLoad(): Promise<void>;
    componentDidUnload(): void;
    hasImageCapture(): boolean;
    /**
     * Query the list of connected devices and figure out how many video inputs we have.
     */
    queryDevices(): Promise<void>;
    initCamera(constraints?: MediaStreamConstraints): Promise<void>;
    initStream(stream: MediaStream): Promise<void>;
    initPhotoCapabilities(imageCapture: any): Promise<void>;
    stopStream(): void;
    capture(): Promise<void>;
    promptAccept(photo: any): Promise<void>;
    rotate(): void;
    setFlashMode(mode: FlashMode): void;
    cycleFlash(): void;
    flashScreen(): Promise<unknown>;
    handleShutterClick(_e: Event): void;
    handleRotateClick(_e: Event): void;
    handleClose(_e: Event): void;
    handleFlashClick(_e: Event): void;
    handleCancelPhoto(_e: Event): void;
    handleAcceptPhoto(_e: Event): void;
    iconExit(): string;
    iconConfirm(): string;
    iconReverseCamera(): string;
    iconRetake(): string;
    iconFlashOff(): string;
    iconFlashOn(): string;
    iconFlashAuto(): string;
    render(): any;
}

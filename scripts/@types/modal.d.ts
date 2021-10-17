import { Button } from '../types/modal';
export default class Modal {
    private _container;
    private _alert;
    private _prompt;
    private _confirm;
    private _modalOpened;
    constructor();
    private setOpen;
    private createContainer;
    private showElement;
    showConfirm(): void;
    close(): void;
    confirm(title: string, content: string, buttons: Button[], width: string | number, height: string | number, closeButton?: boolean): void;
    alert(): void;
    prompt(): void;
    getStyles(): void;
}

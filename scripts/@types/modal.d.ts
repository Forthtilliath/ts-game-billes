import { ModalOptions } from '../types/modal';
export default class Modal {
    private _container;
    private _alert;
    private _prompt;
    private _confirm;
    private _modalOpened;
    constructor();
    private createContainer;
    private setOpacity;
    private showModal;
    close(): void;
    setConfirm({ title, content, buttons, size, close }: ModalOptions): this;
    setAlert({ title, content, buttons, size, close }: ModalOptions): this;
    setPrompt({ title, content, buttons, size, close }: ModalOptions): this;
    private createModal;
    getStyles(): void;
    confirm(): void;
    alert(): void;
    prompt(): void;
}

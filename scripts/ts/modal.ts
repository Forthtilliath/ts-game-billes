import { createElement, shadeColor } from './utils.js';
import { ModalElement, Button, ModalOptions, ModalUiOptions } from '../types/modal';

const MODAL_NONE = -1;
const MODAL_ALERT = 0;
const MODAL_CONFIRM = 1;
const MODAL_PROMPT = 2;

export default class Modal {
    private _container: HTMLDivElement;
    private _alert: HTMLDivElement | null;
    private _prompt: HTMLDivElement | null;
    private _confirm: HTMLDivElement | null;
    private _modalOpened: number;

    constructor() {
        this._container = this.createContainer();
        this._alert = null;
        this._prompt = null;
        this._confirm = null;

        this._modalOpened = MODAL_NONE;
    }

    /** Génère le container qui contient les différents modals */
    private createContainer() {
        const div = createElement({ id: 'modal', styles: modalStyles.container });
        document.body.appendChild(div);

        return div;
    }

    /**
     * Modifie l'opacité du container avec une animation.
     * @param to Etat final
     * @param step Incrementation de l'opacité chaque 10ms
     */
    private setOpacity(element:HTMLElement, to: number, step: number) {
        let current = +element.style.opacity;
        if (current < to && this._modalOpened !== MODAL_NONE) {
            current += step;
            element.style.opacity = current.toString();
            setTimeout(() => this.setOpacity(element,to, step), 10);
        }
    }

    private showModal(modalToOpen: number, step: number) {
        // Vérifie si une fenetre est déjà ouverte, si oui, on la ferme
        if (this._modalOpened !== MODAL_NONE) {
            this.close();
        }

        this._modalOpened = modalToOpen;

        Object.assign(this._container.style, {
            visibility: 'visible',
        });

        const modals = [this._alert, this._confirm, this._prompt];


        // console.log(modals[modalToOpen]);
        Object.assign(modals[modalToOpen]?.style, {
            display: 'flex',
        });
        // Object.assign(modals[modalToOpen]?.style, {
        //     opacity: 1
        // });


        this.setOpacity(modals[modalToOpen]!, 1, step);
    }

    public close() {
        // console.log('close modal');
        Object.assign(this._container.style, {
            visibility: 'hidden',
        });

        const modals = [this._alert, this._confirm, this._prompt];
        Object.assign(modals[this._modalOpened]?.style, {
            display: 'none',
            opacity: 0
        });
        this._modalOpened = MODAL_NONE;
    }

    // public confirm(
    //     title: string,
    //     content: string,
    //     buttons: Button[],
    //     width: string | number,
    //     height: string | number,
    //     closeButton: boolean = true,
    // ) {
    //     this._modalOpened = MODAL_CONFIRM;

    //     // Si le bouton n'existe pas déjà
    //     if (!this._confirm) {
    //         // Container
    //         const styles = {
    //             ...modalStyles.modal.container,
    //             width: typeof width === 'string' ? width : width + 'px',
    //             height: typeof height === 'string' ? height : height + 'px',
    //         };
    //         const div = createElement({ id: 'modal__confirm', styles });

    //         // Top
    //         const divTop = createElement({ styles: modalStyles.modal.top });
    //         div.appendChild(divTop);

    //         // Top - Title
    //         const divTitle = createElement({ styles: modalStyles.modal.topTitle });
    //         divTitle.textContent = title;
    //         divTop.appendChild(divTitle);

    //         // Top - Close button
    //         if (closeButton) {
    //             const divCloseBtn = createElement({ styles: modalStyles.modal.topClose, click: () => this.close() });
    //             divCloseBtn.textContent = '🗙';
    //             divTop.appendChild(divCloseBtn);
    //         }

    //         // Content
    //         const divContent = createElement({ styles: modalStyles.modal.content });
    //         divContent.textContent = content;
    //         div.appendChild(divContent);

    //         // Bottom
    //         const divBottom = createElement({ styles: modalStyles.modal.buttonsWrapper });
    //         div.appendChild(divBottom);

    //         // Buttons - Button
    //         buttons.forEach((button) => {
    //             const stylesButton = {
    //                 ...modalStyles.modal.button,
    //                 ...button.styles,
    //             };
    //             const stylesButtonHover = {
    //                 ...modalStyles.modal.buttonHover,
    //                 backgroundColor: shadeColor(stylesButton.backgroundColor, 0.5),
    //                 ...button.stylesHover,
    //             };
    //             const divButtons = createElement({
    //                 type: 'button',
    //                 id: button.id,
    //                 styles: stylesButton,
    //                 click: button.click,
    //             });
    //             divButtons.addEventListener('click', () => this.close());
    //             divButtons.addEventListener('mouseover', () => Object.assign(divButtons.style, stylesButtonHover));
    //             divButtons.addEventListener('mouseout', () => Object.assign(divButtons.style, stylesButton));
    //             divButtons.textContent = button.content;
    //             divBottom.appendChild(divButtons);
    //         });

    //         this._container.appendChild(div);

    //         this._confirm = div;
    //     }
    // }

    public setConfirm({ title = '', content, buttons, size, close = true }: ModalOptions) {
        if (!this._confirm) {
            const div = this.createModal({
                title,
                content,
                buttons,
                size,
                close,
                ui: {
                    title: title.trim() !== '',
                    input: false,
                    buttons: true,
                },
                id: 'modal__confirm',
            });

            this._container.appendChild(div);
            this._confirm = div;
        }
    }

    public setAlert({ title = '', content, buttons, size, close = true }: ModalOptions) {
        if (!this._alert) {
            const div = this.createModal({
                title,
                content,
                buttons,
                size,
                close,
                ui: {
                    title: title.trim() !== '',
                    input: false,
                    buttons: true,
                },
                id: 'modal__alert',
            });

            this._container.appendChild(div);
            this._alert = div;
        }
    }

    public setPrompt({ title = '', content, buttons, size, close = true }: ModalOptions) {
        if (!this._prompt) {
            const div = this.createModal({
                title,
                content,
                buttons,
                size,
                close,
                ui: {
                    title: title.trim() !== '',
                    input: true,
                    buttons: true,
                },
                id: 'modal__prompt',
            });

            this._container.appendChild(div);
            this._prompt = div;
        }
    }

    private createModal({ title, content, buttons, size, close = true, id, ui }: ModalUiOptions) {
        // Container
        const styles = {
            ...modalStyles.modal.container,
            width: size.width,
            height: size.height,
        };
        const div = createElement({ id, styles });

        // Top
        const divTop = createElement({ styles: modalStyles.modal.top });
        div.appendChild(divTop);

        // Top - Title
        const divTitle = createElement({ styles: modalStyles.modal.topTitle });
        divTitle.textContent = title;
        divTop.appendChild(divTitle);

        // Top - Close button
        if (close) {
            const divCloseBtn = createElement({ styles: modalStyles.modal.topClose, click: () => this.close() });
            divCloseBtn.textContent = '🗙';
            divTop.appendChild(divCloseBtn);
        }

        // Content
        const divContent = createElement({ styles: modalStyles.modal.content });
        divContent.textContent = content;
        div.appendChild(divContent);

        // Bottom
        const divBottom = createElement({ styles: modalStyles.modal.buttonsWrapper });
        div.appendChild(divBottom);

        // Buttons - Button
        buttons.forEach((button) => {
            const stylesButton = {
                ...modalStyles.modal.button,
                ...button.styles,
            };
            const stylesButtonHover = {
                ...modalStyles.modal.buttonHover,
                backgroundColor: shadeColor(stylesButton.backgroundColor, 0.5),
                ...button.stylesHover,
            };
            const divButtons = createElement({
                type: 'button',
                id: button.id,
                styles: stylesButton,
                click: button.click,
            });
            divButtons.addEventListener('click', () => this.close());
            divButtons.addEventListener('mouseover', () => Object.assign(divButtons.style, stylesButtonHover));
            divButtons.addEventListener('mouseout', () => Object.assign(divButtons.style, stylesButton));
            divButtons.textContent = button.content;
            divBottom.appendChild(divButtons);
        });

        return div;
    }

    public getStyles() {}

    public confirm() {
        this.showModal(MODAL_CONFIRM, 0.01);
    }

    public alert() {
        this.showModal(MODAL_ALERT, 0.01);
    }

    public prompt() {
        this.showModal(MODAL_PROMPT, 0.01);
    }
}

const modalStyles = {
    container: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#2a2a2a',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        visibility: 'hidden',
    },
    modal: {
        container: {
            backgroundColor: '#f2f2f2',
            borderRadius: '10px',
            color: '#0d0d0d',
            display: 'none',
            flexDirection: 'column',
            // transition: 'visibility .05s linear .25s, opacity .3s linear',
            transition: 'all .3s linear',
            opacity: 0,
        },
        top: {
            backgroundColor: '#0002',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        topTitle: {
            fontWeight: 'bold',
            padding: '10px',
            fontSize: '1.5rem',
        },
        topClose: {
            fontWeight: 'bold',
            padding: '10px',
            fontSize: '1.5rem',
            cursor: 'pointer',
        },
        content: {
            padding: '10px',
            flex: 1,
        },
        buttonsWrapper: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#0002',
            height: '50px',
            padding: '10px',
            borderRadius: '0 0 10px 10px',
        },
        button: {
            padding: '5px 10px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#cccccc',
        },
        buttonHover: {},
    },
};

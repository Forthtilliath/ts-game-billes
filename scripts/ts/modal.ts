import { createElement, shadeColor } from './utils.js';
import { ModalElement, Button } from '../types/modal';

const MODAL_NONE = -1;
const MODAL_ALERT = 0;
const MODAL_CONFIRM = 1;
const MODAL_PROMPT = 2;

export default class Modal {
    private _container: HTMLDivElement;
    private _alert: ModalElement | null;
    private _prompt: ModalElement | null;
    private _confirm: ModalElement | null;
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
    private setOpacity(to: number, step: number) {
        let current = +this._container.style.opacity;
        if (current < to && this._modalOpened !== MODAL_NONE) {
            current += step;
            this._container.style.opacity = current.toString();
            setTimeout(() => this.setOpacity(to, step), 10);
        }
    }

    public showConfirm() {
        // Vérifie si une fenetre est déjà ouverte, si oui, on la ferme
        if (this._modalOpened !== MODAL_NONE) {
            this.close();
        }

        this._modalOpened = MODAL_CONFIRM;
        Object.assign(this._container.style, {
            visibility: 'visible',
        });
        this.setOpacity(1, 1 / 30);
    }

    public close() {
        // console.log('close modal');
        this._modalOpened = MODAL_NONE;
        Object.assign(this._container.style, {
            visibility: 'hidden',
            opacity: 0,
        });
    }

    public confirm(
        title: string,
        content: string,
        buttons: Button[],
        width: string | number,
        height: string | number,
        closeButton: boolean = true,
    ) {
        this._modalOpened = MODAL_CONFIRM;

        // Si le bouton n'existe pas déjà
        if (!this._confirm) {
            // Container
            const styles = {
                ...modalStyles.modal.confirm,
                width: typeof width === 'string' ? width : width + 'px',
                height: typeof height === 'string' ? height : height + 'px',
            };
            const div = createElement({ id: 'modal__confirm', styles });

            // Top
            const divTop = createElement({ styles: modalStyles.modal.top });
            div.appendChild(divTop);

            // Top - Title
            const divTitle = createElement({ styles: modalStyles.modal.topTitle });
            divTitle.textContent = title;
            divTop.appendChild(divTitle);

            // Top - Close button
            if (closeButton) {
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

            this._container.appendChild(div);

            this._confirm = {
                element: div,
                visible: false,
            };
        }
    }

    public alert() {}

    public prompt() {}

    public getStyles() {}
}

const modalStyles = {
    container: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#000d',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'visibility .05s linear .25s, opacity .3s linear',
        visibility: 'hidden',
        opacity: 0,
    },
    modal: {
        confirm: {
            backgroundColor: '#f2f2f2',
            borderRadius: '10px',
            color: '#0d0d0d',
            display: 'flex',
            flexDirection: 'column',
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

import { createElement, shadeColor } from './utils.js';
import { ModalElement, Button } from '../types/modal';

const MODAL_NONE = -1;
const MODAL_ALERT = 0;
const MODAL_CONFIRM = 1;
const MODAL_PROMPT = 2;

// function showElement(element: HTMLElement, from: number, to: number) {
//     const currentOpacity = Number(element.style.opacity);
//     if (currentOpacity < to) {
//         currentOpacity += 0.075;
//         element.style.opacity = currentOpacity.toString();
//         setTimeout(() => showElement(element, currentOpacity, to), 100);
//     }
// }

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

    private setOpen(newModal: number) {
        this._modalOpened = newModal;
    }

    private createContainer() {
        const styles = {
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
        };
        const div = createElement({ id: 'modal', styles }) as HTMLDivElement;
        document.body.appendChild(div);

        return div;
    }

    private showElement(from: number, to:number) {
        if (from < to && this._modalOpened !== MODAL_NONE) {
            from += 0.075;
            this._container.style.opacity = from.toString();
            setTimeout(() => this.showElement(from, to), 100);
        }
    }

    public showConfirm() {
        this._modalOpened = MODAL_CONFIRM;
        Object.assign(this._container.style, {
            visibility: 'visible',
        });
        this.showElement(0, 1);
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
        // Vérifie si une fenetre est déjà ouverte, si oui, on la ferme
        if (this._modalOpened !== MODAL_NONE) {
            this.close();
        }

        this.setOpen(MODAL_CONFIRM);

        // Si le bouton n'existe pas déjà
        if (!this._confirm) {
            // Container
            const styles = {
                width: typeof width === 'string' ? width : width + 'px',
                height: typeof height === 'string' ? height : height + 'px',
                backgroundColor: '#f2f2f2',
                borderRadius: '10px',
                color: '#0d0d0d',
                display: 'flex',
                flexDirection: 'column',
            };
            const div = createElement({ id: 'modal__confirm', styles });

            // Top
            const stylesTop = {
                backgroundColor: '#0002',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            };
            const divTop = createElement({ id: 'modal__confirm--title', styles: stylesTop });
            div.appendChild(divTop);

            // Title
            const stylesTitle = {
                fontWeight: 'bold',
                padding: '10px',
                fontSize: '1.5rem',
            };
            const divTitle = createElement({ id: 'modal__confirm--title', styles: stylesTitle });
            divTitle.textContent = title;
            divTop.appendChild(divTitle);

            // Close button
            const stylesCloseBtn = {
                fontWeight: 'bold',
                padding: '10px',
                fontSize: '1.5rem',
                cursor: 'pointer',
            };
            const divCloseBtn = createElement({ id: 'modal__confirm--title', styles: stylesCloseBtn });
            divCloseBtn.textContent = '🗙';
            divTop.appendChild(divCloseBtn);

            divTop.addEventListener('click', () => this.close());

            // Content
            const stylesContent = {
                padding: '10px',
                flex: 1,
            };
            const divContent = createElement({ id: 'modal__confirm--content', styles: stylesContent });
            divContent.textContent = content;
            div.appendChild(divContent);

            // Buttons
            const stylesButtonsWrapper = {
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#0002',
                height: '50px',
                padding: '10px',
                borderRadius: '0 0 10px 10px',
            };
            const divButtonsWrapper = createElement({
                id: 'modal__confirm--buttonWrapper',
                styles: stylesButtonsWrapper,
            });
            div.appendChild(divButtonsWrapper);

            buttons.forEach((button) => {
                const stylesButton = {
                    padding: '5px 10px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: '#cccccc',
                    ...button.styles,
                };
                const stylesButtonHover = {
                    backgroundColor: shadeColor(stylesButton.backgroundColor, 0.5),
                };
                const divButtons = createElement({
                    type: 'button',
                    id: 'modal__confirm--buttonWrapper',
                    styles: stylesButton,
                    click: button.click,
                });
                divButtons.addEventListener('mouseover', () => Object.assign(divButtons.style, stylesButtonHover));
                divButtons.addEventListener('mouseout', () => Object.assign(divButtons.style, stylesButton));
                divButtons.textContent = button.content;
                divButtonsWrapper.appendChild(divButtons);
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

    },
    modal: {
        top: {
            title: {

            },
            close: {

            }
        },
        content: {

        },

    }
}
import { createElement, shadeColor } from './utils.js';
const MODAL_NONE = -1;
const MODAL_ALERT = 0;
const MODAL_CONFIRM = 1;
const MODAL_PROMPT = 2;
export default class Modal {
    constructor() {
        this._container = this.createContainer();
        this._alert = null;
        this._prompt = null;
        this._confirm = null;
        this._modalOpened = MODAL_NONE;
    }
    createContainer() {
        const div = createElement({ id: 'modal', styles: modalStyles.container });
        document.body.appendChild(div);
        return div;
    }
    setOpacity(element, to, step) {
        let current = +element.style.opacity;
        if (current < to && this._modalOpened !== MODAL_NONE) {
            current += step;
            element.style.opacity = current.toString();
            setTimeout(() => this.setOpacity(element, to, step), 10);
        }
    }
    showModal(modalToOpen, step) {
        if (this._modalOpened !== MODAL_NONE) {
            this.close();
        }
        this._modalOpened = modalToOpen;
        Object.assign(this._container.style, {
            visibility: 'visible',
        });
        const modals = [this._alert, this._confirm, this._prompt];
        Object.assign(modals[modalToOpen]?.style, {
            display: 'flex',
        });
        this.setOpacity(modals[modalToOpen], 1, step);
    }
    close() {
        Object.assign(this._container.style, {
            visibility: 'hidden',
        });
        const modals = [this._alert, this._confirm, this._prompt];
        Object.assign(modals[this._modalOpened]?.style, {
            display: 'none',
            opacity: 0,
        });
        this._modalOpened = MODAL_NONE;
    }
    setConfirm({ title = '', content, buttons, size, close = true }) {
        if (this._confirm) {
            this._confirm.remove();
        }
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
        return this;
    }
    setAlert({ title = '', content, buttons, size, close = true }) {
        if (this._alert) {
            this._alert.remove();
        }
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
        return this;
    }
    setPrompt({ title = '', content, buttons, size, close = true }) {
        if (this._prompt) {
            this._prompt.remove();
        }
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
        return this;
    }
    createModal({ title, content, buttons, size, close = true, id, ui }) {
        const styles = {
            ...modalStyles.modal.container,
            width: size ? size.width : 'auto',
            height: size ? size.height : 'auto',
        };
        const div = createElement({ id, styles });
        const divTop = createElement({ styles: modalStyles.modal.top });
        div.appendChild(divTop);
        const divTitle = createElement({ styles: modalStyles.modal.topTitle });
        divTitle.textContent = title;
        divTop.appendChild(divTitle);
        if (close) {
            const divCloseBtn = createElement({ styles: modalStyles.modal.topClose, click: () => this.close() });
            divCloseBtn.textContent = '🗙';
            divTop.appendChild(divCloseBtn);
        }
        const divContent = createElement({ styles: modalStyles.modal.content });
        divContent.textContent = content;
        div.appendChild(divContent);
        const divBottom = createElement({ styles: modalStyles.modal.bottom });
        div.appendChild(divBottom);
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
            divButtons.addEventListener('mouseover', () => Object.assign(divButtons.style, stylesButtonHover));
            divButtons.addEventListener('mouseout', () => Object.assign(divButtons.style, stylesButton));
            divButtons.textContent = button.content;
            divBottom.appendChild(divButtons);
        });
        return div;
    }
    getStyles() { }
    confirm() {
        this.showModal(MODAL_CONFIRM, 0.01);
    }
    alert() {
        this.showModal(MODAL_ALERT, 0.01);
    }
    prompt() {
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
            padding: '20px',
            flex: 1,
            whiteSpace: 'pre-wrap',
        },
        bottom: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '10px',
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
            backgroundColor: '#2d2d2d',
            color: 'white',
        },
        buttonHover: {},
    },
};

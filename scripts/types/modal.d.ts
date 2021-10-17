import { ModalOptions } from './modal.d';
export type ModalElement = {
    element: HTMLElement;
    visible: boolean;
};

export type Button = {
    id: string;
    content: string;
    styles?: {};
    stylesHover?: {};
    click: () => void;
};

export type ModalOptions = {
    title?: string;
    content: string;
    buttons: Button[];
    size: { width: string; height: string };
    close: boolean;
};

export type ModalUiOptions = ModalOptions & {
    ui: {
        title: boolean;
        input: boolean;
        buttons: boolean;
    };
    id: string;
};

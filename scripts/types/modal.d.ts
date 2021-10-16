export type ModalElement = {
    element: HTMLElement;
    visible: boolean
};

export type Button = {
    content: string,
    styles?:{},
    click: () => void
}
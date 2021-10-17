export type ModalElement = {
    element: HTMLElement;
    visible: boolean
};

export type Button = {
    id: string,
    content: string,
    styles?:{},
    stylesHover?:{},
    click: () => void
}
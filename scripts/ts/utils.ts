export const compareArrays = (array1: any[], array2: any[]) => JSON.stringify(array1) === JSON.stringify(array2);

export const arrayOfN = (numberOfElements: number, callback: () => any) =>
    Array.from({ length: numberOfElements }, callback);

export const getNumberBetween = (a: number, b: number) => Math.floor(Math.random() * b) + a;

type TCreateElementBase = {
    classes?: string[];
    styles?: object;
    type?: string;
    click?: void
};

type TCreateElement<T extends TCreateElementBase> = T & {
    [key: string]: string | number;
};

export const createElement = ({ classes = [], styles = {}, type = 'div', click, ...params }: TCreateElement<any>) => {
    const div = document.createElement(type);
    div.classList.add(...classes);
    Object.assign(div.style, styles);

    div.addEventListener('click', click);

    for (const [key, value] of Object.entries(params)) {
        div.setAttribute(key, value);
    }

    return div;
};

/**
 * @param color Hex value format: #ffffff or ffffff
 * @param decimal lighten or darken decimal value, example 0.5 to lighten by 50% or 1.5 to darken by 50%.
 */
export function shadeColor(color: string, decimal: number): string {
    const base = color.startsWith('#') ? 1 : 0;

    let r = parseInt(color.substring(base, 3), 16);
    let g = parseInt(color.substring(base + 2, 5), 16);
    let b = parseInt(color.substring(base + 4, 7), 16);

    r = Math.round(r / decimal);
    g = Math.round(g / decimal);
    b = Math.round(b / decimal);

    r = r < 255 ? r : 255;
    g = g < 255 ? g : 255;
    b = b < 255 ? b : 255;

    const rr = r.toString(16).length === 1 ? `0${r.toString(16)}` : r.toString(16);
    const gg = g.toString(16).length === 1 ? `0${g.toString(16)}` : g.toString(16);
    const bb = b.toString(16).length === 1 ? `0${b.toString(16)}` : b.toString(16);

    return `#${rr}${gg}${bb}`;
}

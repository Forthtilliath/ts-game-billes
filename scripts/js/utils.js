export const compareArrays = (array1, array2) => JSON.stringify(array1) === JSON.stringify(array2);
export const arrayOfN = (numberOfElements, callback) => Array.from({ length: numberOfElements }, callback);
export const getNumberBetween = (a, b) => Math.floor(Math.random() * b) + a;
export const createElement = ({ classes = [], styles = {}, type = 'div', click, ...params }) => {
    const div = document.createElement(type);
    div.classList.add(...classes);
    Object.assign(div.style, styles);
    div.addEventListener('click', click);
    for (const [key, value] of Object.entries(params)) {
        div.setAttribute(key, value);
    }
    return div;
};
export function shadeColor(color, decimal) {
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
    console.log(color, `#${rr}${gg}${bb}`);
    return `#${rr}${gg}${bb}`;
}

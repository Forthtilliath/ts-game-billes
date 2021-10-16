export declare const compareArrays: (array1: any[], array2: any[]) => boolean;
export declare const arrayOfN: (numberOfElements: number, callback: () => any) => any[];
export declare const getNumberBetween: (a: number, b: number) => number;
declare type TCreateElementBase = {
    classes?: string[];
    styles?: object;
    type?: string;
    click?: void;
};
declare type TCreateElement<T extends TCreateElementBase> = T & {
    [key: string]: string | number;
};
export declare const createElement: ({ classes, styles, type, click, ...params }: TCreateElement<any>) => any;
export declare function shadeColor(color: string, decimal: number): string;
export {};

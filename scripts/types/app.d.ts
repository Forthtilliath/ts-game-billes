export type Level = {
    [key: string]: number;
};

export type Character = {
    name: string;
    marbles: number;
};

export type Player = Character & {
    loss: number;
    gain: number;
};

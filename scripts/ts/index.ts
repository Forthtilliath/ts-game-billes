import { Player, Character, Level } from '../types/app';
import * as Utils from './utils.js';
import Modal from './modal.js';

const difficulty: Level = {
    facile: 5,
    difficile: 10,
    impossible: 20,
};

const character_1: Player = {
    name: 'Seong Gi-hun',
    marbles: 25,
    loss: 3,
    gain: 1,
};

const character_2: Player = {
    name: 'Kang Sae-byeok',
    marbles: 25,
    loss: 2,
    gain: 2,
};

const character_3: Player = {
    name: 'Cho Sang-woo',
    marbles: 25,
    loss: 1,
    gain: 3,
};

const characters = [character_1, character_2, character_3];
const gain = 45.6 * Math.pow(10, 9);

const playersName = [
    'Jean-Luc De La Rousse',
    'Benjamin Casse Ta Vie',
    'Jean Casseburn',
    'Laurent Delacouette',
    'Henry Thierry',
    'Jean-Baptiste Tournevis',
    'Christian Souris',
    'Jean Duparquet',
    'Laurent Noir',
    'Alexandra Lacroute',
    'Claire Chabal',
    "Bernard L'hermite",
    'Didier Delaville',
    'Zinedine Tzigane',
    'Léa Seydur',
    'Carla Blondie',
    'Vincent Caspoivre',
    'Sophie Marpelle',
    'Nikos Alachiasse',
    'Vincent Dindon',
    'Catherine Doccasion',
    'Mimie Maxi',
    'Pascal Obistrot',
    'Gérard Deuxpardeux',
].sort(() => Math.random() - 0.5);

const playersToFight: Character[] = Utils.arrayOfN(20, () => ({
    name: playersName.pop()!,
    marbles: Utils.getNumberBetween(1, 20),
}));

let playerCharacter: Player | null;
let gameLeft = difficulty.facile;
let round = 1;

// Modal
const modal = new Modal();

// Page 1
modal
    .setConfirm({
        title: 'Choisissez votre personnage ?',
        content: `En fonction du personnage, vous commencerez la partie avec un nombre de billes différentes.\n\n\
    Seong Gi-hun commence le jeu avec 25 billes, perd 3 billes supplémentaires par défaite et en gagne 1 de plus en cas de victoire.\n\n\
    Kang Sae-byeok commence le jeu avec 35 billes, perd 2 billes supplémentaires par défaite et en gagne 2 de plus en cas de victoire.\n\n\
    Cho Sang-woo commence le jeu avec 45 billes, perd 1 billes supplémentaires par défaite et en gagne 3 de plus en cas de victoire.`,
        buttons: [
            {
                id: 'modal__btn--char1',
                content: 'Seong Gi-hun',
                click: () => {
                    playerCharacter = characters[0];
                    modalGame(round);
                },
            },
            {
                id: 'modal__btn--char2',
                content: 'Kang Sae-byeok',
                click: () => {
                    playerCharacter = characters[1];
                    modalGame(round);
                },
            },
            {
                id: 'modal__btn--char2',
                content: 'Cho Sang-woo',
                click: () => {
                    playerCharacter = characters[2];
                    modalGame(round);
                },
            },
        ],
        close: false,
    })
    .confirm();

const modalGame = (round: number) => {
    const adversary = playersToFight.pop();
    let even = adversary!.marbles % 2 === 0;

    const modalGameSettings = {
        title: `Manche ${round} - ${adversary!.name}`,
        content: `Vous avez : ${playerCharacter!.marbles} billes.\n\n\
Selon vous, votre adversaire a un nombre pair ou impair de billes dans ses mains ?`,
        buttons: [
            {
                content: 'Pair',
                click: () => roundEnd(round, even, adversary!.marbles),
            },
            {
                content: 'Impair',
                click: () => roundEnd(round, !even, adversary!.marbles),
            },
        ],
        close: false,
    };
    modal.setConfirm(modalGameSettings).confirm();
};

const roundEnd = (round: number, win: boolean, advMarbles: number) => {
    win ? roundWin(advMarbles) : roundLost(advMarbles);
    gameLeft -= 1;
    if (playerCharacter!.marbles < 0) {
        gameLost();
    } else if (gameLeft === 0) {
        gameWin();
    } else {
        modalGame(round + 1);
    }
};

const roundWin = (gain: number) => {
    console.log('win', gameLeft);
    playerCharacter!.marbles += gain + playerCharacter!.gain;
};

const roundLost = (loss: number) => {
    console.log('lost', gameLeft);
    playerCharacter!.marbles -= loss - playerCharacter!.loss;
};

const gameWin = () => {
    modal
        .setAlert({
            title: 'Fin de la partie',
            content: `Gagné avec ${playerCharacter!.marbles} billes restantes... Tu as triché ?`,
            buttons: [{ content: 'Fermer', click: () => {} }],
            close: false,
        })
        ?.alert();
};

const gameLost = () => {
    modal
        .setAlert({
            title: 'Fin de la partie',
            content: 'Perdu, noob !!!',
            buttons: [{ content: 'Fermer', click: () => {} }],
            close: false,
        })
        ?.alert();
};

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

// console.log(playersToFight);

const play = () => {
    const adversary = playersToFight.pop();
    console.log(adversary);
    return false;
};

let gameLeft = difficulty.facile;
let lost = false;



console.log(gameLeft, lost);
while (gameLeft > 0 && !lost) {
    lost = play();
    gameLeft -= 1;
}

// Modal
const modal = new Modal();
modal.setConfirm({
    title:'Alors ton choix ?',
    content:'Tu le veux ou tu le veux pas ?',
    buttons:[
        {
            id: 'modal__btn--accept',
            content: 'Accepter',
            styles: { backgroundColor: '#00aa00' },
            click: () => console.log('je le veux'),
        },
        {
            id: 'modal__btn--reject',
            content: 'Refuser',
            styles: { backgroundColor: '#aa0000' },
            click: () => console.log('dégage'),
        },
    ],
    size: { width: '500px', height: '170px', },
    close: false
});

modal.setAlert({
    title:'Alors ton choix ?',
    content:'Tu le veux ou tu le veux pas ?',
    buttons:[
        {
            id: 'modal__btn--accept',
            content: 'Accepter',
            styles: { backgroundColor: '#00aa00' },
            click: () => console.log('je le veux'),
        },
        {
            id: 'modal__btn--reject',
            content: 'Refuser',
            styles: { backgroundColor: '#aa0000' },
            click: () => console.log('dégage'),
        },
    ],
    size: { width: '500px', height: '170px', },
    close: false
});

document.querySelector('#btn-open-confirm')?.addEventListener('click', () => modal.confirm());
document.querySelector('#btn-open-alert')?.addEventListener('click', () => modal.alert());
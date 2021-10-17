import { Player, Character, Level } from '../types/app';
import * as Utils from './utils.js';
import Modal from './modal.js';

/** Différents niveau de difficulté */
const difficulty: Level = {
    facile: 5,
    difficile: 10,
    impossible: 20,
};

// Liste des personnages disponibles
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

/** Tableau contenant les choix disponibles pour le joueur */
const characters = [character_1, character_2, character_3];
/** Montant gagné si le joueur gagne la partie */
const winGain = 45.6 * Math.pow(10, 9);

/** Liste des noms disponibles pour les adversaires */
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

/** Liste des adversaires */
const playersToFight: Character[] = Utils.arrayOfN(20, () => ({
    name: playersName.pop()!,
    marbles: Utils.getNumberBetween(1, 20),
}));

/** Personnage du joueur */
let playerCharacter: Player | null;
/** Nombre de manche restantes */
let gameLeft = difficulty.facile;
/** Numéro du cours en cours */
let round = 1;

// Modal
const modal = new Modal();

/**
 * Page 1
 * Cette page sert pour le choix du personnage du joueur.
 * 
 * Au clic d'un des boutons, le choix du personnage du joueur est enregistré et on lance le modal de jeu.
 */
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

/**
 * Page 2
 * Boucle du jeu. Tant que le jeu n'est pas terminée, on réappelle le même Modal.
 * 
 * Au clic du joueur sur un bouton,
 */
/**
 * Modal principal du jeu
 * @param round Manche courrante
 */
const modalGame = (round: number) => {
    /** Adversaire à affronter */
    const adversary = playersToFight.pop();
    /** Contient VRAI si le nombre de billes de l'adversaire est pair */
    let even = adversary!.marbles % 2 === 0;

    /** Configuration du modal */
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

/**
 * Gère la fin d'une manche
 * @param round Numéro du round en cours
 * @param win Si la manche est gagnée ou pas
 * @param advMarbles Le nombre de billes de l'adversaire affronté
 */
const roundEnd = (round: number, win: boolean, advMarbles: number) => {
    // Met à jour le nombre de billes en fonction de victoire ou défaite
    if (win)
        playerCharacter!.marbles += advMarbles + playerCharacter!.gain;
    else
        playerCharacter!.marbles -= advMarbles - playerCharacter!.loss;
    
    // Réduit le nombre de manche restante
    gameLeft -= 1;

    // Vérifie :
    // - Si le joueur a perdu,
    // - Si c'était la dernière manche
    // - Sinon le jeu passe à la manche suivante
    if (playerCharacter!.marbles < 0) {
        endGame('Perdu, noob !!!');
    } else if (gameLeft === 0) {
        endGame(`Gagné avec ${playerCharacter!.marbles} billes restantes... Tu as triché ?\n\n\
Tu as gagné ${new Intl.NumberFormat('KRW').format(winGain)} ₩.`);
    } else {
        modalGame(round + 1);
    }
};

/**
 * Page 3
 */
/**
 * Affiche une alerte avec le message signalant la victoire ou la défaite du joueur
 * @param content Contenu du message
 */
const endGame = (content: string) => {
    modal
        .setAlert({
            title: 'Fin de la partie',
            content,
            buttons: [{ content: 'Fermer', click: () => modal.close() }],
            close: false,
        })
        ?.alert();
};

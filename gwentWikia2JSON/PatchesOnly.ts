import { CardPatchHelper } from './src/CardPatchHelper';
import { CardDbHelper } from './src/CardDbHelper';
import { patchedCardsFormatter, dbDir, distCardsFN } from './src/GwentWikia2JSON';

const patchHelper = new CardPatchHelper();
const cardDbHelper = new CardDbHelper();

const cards = cardDbHelper.load(`${dbDir}/raw.js`);
patchHelper.applyTo(cards);
cardDbHelper.saveOnDisk(`${dbDir}/patched.js`, cards, patchedCardsFormatter);
cardDbHelper.copyMinified(`${dbDir}/patched.js`, distCardsFN);

// tslint:disable-next-line:no-console
console.log('done');

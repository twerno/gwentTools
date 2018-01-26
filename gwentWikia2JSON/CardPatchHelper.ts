import { CardPatchHelper } from './src/CardPatchHelper';
import { CardDbHelper } from './src/CardDbHelper';
import { dbDir, distCardsFN, tmpDir } from './src/GwentWikia2JSON';
import { GwentWikiaHelper } from './src/GwentWikiaHelper';
import { IImageMapEl } from './db/ImageMap';

const cardDbHelper = new CardDbHelper();

const data = cardDbHelper.load(`${dbDir}//patched.js`)
  .map(c => ({ img: c.img, url: c.url, text: c.cardText.reduce((a, b) => a + b) }))
  .filter(c => c.text.indexOf('Create') !== -1)
  // tslint:disable-next-line:no-object-literal-type-assertion
  .map(d => ({ img: d.img, wikiUrl: d.url } as IImageMapEl));

GwentWikiaHelper.saveOnDisk(`${tmpDir}//create.js`, JSON.stringify(data, null, 2));

// tslint:disable-next-line:no-console
console.log('done');

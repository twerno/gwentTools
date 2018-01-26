import { ICardv1 } from '../../src/main/commons/card/CardStruct';
import { GwentWikiaHelper } from './GwentWikiaHelper';
import { minify } from 'uglify-js';

export class CardDbHelper
{

  private licence = '// CardDB data acquired from http://gwent.wikia.com.\n'
    + '// Modified by twerno.\n'
    + '// Content is available under CC-BY-SA.\n';

  public saveOnDisk(filename: string, cards: ICardv1[], formater?: (lines: string) => string): void
  {
    const cardsStr = JSON.stringify(cards, null, 2);
    const formatted = formater ? formater(cardsStr) : cardsStr;
    GwentWikiaHelper.saveOnDisk(filename, formatted);
  }

  public load(filename: string): ICardv1[]
  {
    let str: string;
    try
    {
      str = GwentWikiaHelper.readFromDisk(filename);
    }
    catch (e)
    {
      GwentWikiaHelper.logError(e);
      return [];
    }
    str = str
      .replace('];\n', ']')
      .replace('const __cardDB = ', '');
    const cards = JSON.parse(str) as ICardv1[];
    return cards;
  }

  public copyMinified(sourceFN: string, targetFN: string): void
  {
    const source: string = minify(sourceFN).code;
    const result = this.licence + source;
    GwentWikiaHelper.saveOnDisk(targetFN, result);
  }
}

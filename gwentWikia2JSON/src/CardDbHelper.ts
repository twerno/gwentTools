import { ICardv1 } from '../../src/main/commons/card/CardStruct';
import { GwentWikiaHelper } from './GwentWikiaHelper';

export class CardDbHelper
{
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
      .replace('const __cardDB = ', '');
    const cards = JSON.parse(str) as ICardv1[];
    return cards;
  }
}

import { ICardv1 } from '../src/main/commons/card/CardStruct';
import { GwentWikiaHelper } from './GwentWikiaHelper';

export class CardDBMergeUtl
{
  public readOldDB(): ICardv1[]
  {
    let str: string;
    try
    {
      str = GwentWikiaHelper.readFromDisk('../dist/js/cards.js');
    }
    catch (e)
    {
      GwentWikiaHelper.logError(e);
      return [];
    }
    str = str
      .substring(0, str.length - 2)
      .replace('const __cardDB = ', '');
    const cards = JSON.parse(str) as ICardv1[];
    return cards;
  }

  public mergeAbilities(src: ICardv1[], dest: ICardv1[]): void
  {
    src.forEach(c =>
    {
      const destCard = dest.find(d => d.url === c.url);
      if (destCard)
      {
        destCard.abilities = c.abilities;
      }
    });
  }
}

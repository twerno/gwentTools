import { ICardv1 } from '../../src/main/commons/card/CardStruct';
import { cardDbPatch, CardPatch } from '../db/CardDb.patch';
import { lowerCaseCompare } from '../../src/main/commons/String.helper';
import { GwentWikiaHelper } from './GwentWikiaHelper';

export class CardPatchHelper
{

  public applyTo(cards: ICardv1[]): void
  {
    cardDbPatch
      .forEach(p => this.applyPatch(p, this.findCard(p, cards)));
  }

  private applyPatch(patch: CardPatch, card: ICardv1 | undefined)
  {
    if (card === undefined)
    {
      GwentWikiaHelper.log(`[PATCH] [WARN] No cards with id=${patch.id} and url=${patch.url} found!`);
    }

    const patchKeys: string[] = Object.keys(patch);

    for (const key of patchKeys)
    {
      (card as any)[key] = (patch as any)[key];
    }
  }

  private findCard(patch: CardPatch, cards: ICardv1[]): ICardv1 | undefined
  {
    return cards.find(c => lowerCaseCompare(c.id, patch.id) && lowerCaseCompare(c.url, patch.url));
  }
}

import { ICardv1 } from '@src/commons/CardStruct';
import { GwentAssetsHelper } from '@src/commons/GwentAssetsHelper';
import { getFirstImageId, imageMap } from '@src/commons/ImageMap';
import * as React from 'react';

export class CardRendererHelper
{
  public tags(card: ICardv1)
  {
    return card.tags && card.tags.length > 0
      ? card.tags.reduce((a, b) => `${a}, ${b}`)
      : '';
  }

  public cardImage(card: ICardv1)
  {
    const mapEl = imageMap.find(e => e.wikiUrl.toLocaleLowerCase() === card.url.toLocaleLowerCase());
    if (mapEl)
    {
      return GwentAssetsHelper.getMediumImgUrl(getFirstImageId(mapEl));
    }
    return '';
  }

  public cardText2Str(cardText: string[]): JSX.Element
  {
    return cardText.length === 1
      ? <>{cardText[0]} </>
      : (
        <>
        {cardText.map(s => <>{s} </>)
          .reduce((a, b) => <> {a} <br /> {b} </>)}
        </>
      );
  }
}

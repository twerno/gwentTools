import * as React from 'react';
import { ICardv1 } from '@src/commons/card/CardStruct';
import { imageMap, getFirstImageId } from '@src/utils/ImageMap';
import { getMediumImgUrl } from '@src/commons/assets/GwentAssets.helper';

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
      return getMediumImgUrl(getFirstImageId(mapEl));
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

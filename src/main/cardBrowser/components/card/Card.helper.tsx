import * as React from 'react';
import { ICardv1 } from '@src/commons/card/CardStruct';
import { getMediumImgUrl } from '@src/commons/assets/GwentAssets.helper';
import { GenMechanicRenderer } from '@src/cardBrowser/cardMechanic/renderer/GenMechanicRenderer';
import { BasicFilterService } from '@src/cardBrowser/components/filter/BasicFilter.service';

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
    return getMediumImgUrl(card.img);
  }

  public cardText2Str(card: ICardv1, basicCardService: BasicFilterService): JSX.Element
  {
    if (card.abilities)
    {
      return <GenMechanicRenderer
        mode={'basic'}
        mechanic={card.abilities[0]}
        basicCardService={basicCardService}
      />;
    }

    return card.cardText.length === 1
      ? <>{card.cardText[0]} </>
      : (
        <>
        {card.cardText.map(s => <>s</>)
          .reduce((a, b) => <>{a}<br />{b}</>)}
        </>
      );
  }
}

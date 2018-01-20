import './CardGalleryGrid.css';

import { WideCard } from '@src/cardBrowser/card/WideCard';
import { CardRenderer } from '@src/cardBrowser/CardBrowserComponent';
import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { MediumCard } from '@src/cardGallery/MediumCard';
import { ICardv1 } from '@src/commons/CardStruct';
import * as React from 'react';

export interface CardGalleryGridProps
{
  renderer: CardRenderer;
  filter: IFilter;
  service: CardService;
}

export class CardGalleryGrid extends React.Component<CardGalleryGridProps, {}>
{

  public constructor(props: CardGalleryGridProps)
  {
    super(props);
  }

  public render()
  {
    const cards = this.props.service.getFiltered(this.props.filter);
    return <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cards.slice(0, 50).map(card => this.renderCard(card))}
    </div>;
  }

  public renderCard(card: ICardv1)
  {
    return <div key={`preview-${card.url}`} style={{ flex: '1 0 calc(100% / 3)', padding: '10px' }}>
      {
        this.props.renderer === CardRenderer.CARD
          ? <MediumCard card={card} />
          : <WideCard card={card} />
      }
    </div>;
  }

}

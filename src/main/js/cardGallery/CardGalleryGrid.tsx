import './CardGalleryGrid.css';

import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { CardSmall } from '@src/cardGallery/CardSmall';
import { ICardv1 } from '@src/commons/CardStruct';
import * as React from 'react';

export interface CardGalleryGridProps
{
  filter: IFilter;
  service: CardService;
}

export class CardGalleryGrid extends React.Component<CardGalleryGridProps, {}>
{

  public render()
  {
    const cards = this.props.service.getFiltered(this.props.filter);
    return <ul>
      {cards.map(card => this.renderCard(card))}
    </ul>;
  }

  public renderCard(card: ICardv1)
  {
    return <CardSmall card={card} key={card.url} />;
  }

}

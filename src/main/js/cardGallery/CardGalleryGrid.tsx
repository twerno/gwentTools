import './CardGalleryGrid.css';

import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { MediumCard } from '@src/cardGallery/MediumCard';
import { ICardv1 } from '@src/commons/CardStruct';
import * as React from 'react';

export interface CardGalleryGridProps
{
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
    return <>{cards.map(card => this.renderCard(card))}</>;
  }

  public renderCard(card: ICardv1)
  {
    return <div key={`preview-${card.url}`} style={{ float: 'none', margin: '30px' }}>
      <MediumCard card={card} />
    </div>;
  }

}

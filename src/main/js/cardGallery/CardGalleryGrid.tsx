import './CardGalleryGrid.css';

import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { CardSmall } from '@src/cardGallery/CardSmall';
import { CardSmallPreview } from '@src/cardGallery/SmallCadPreview';
import { ICardv1 } from '@src/commons/CardStruct';
import * as React from 'react';

export interface CardGalleryGridProps
{
  filter: IFilter;
  service: CardService;
}

export interface CardGalleryGridState
{
  highlighted: ICardv1 | null;
}

export class CardGalleryGrid extends React.Component<CardGalleryGridProps, CardGalleryGridState>
{

  public constructor(props: CardGalleryGridProps)
  {
    super(props);
    this.state = { highlighted: null };
  }

  public render()
  {
    const cards = this.props.service.getFiltered(this.props.filter);
    return <ul>
      {cards.map(card => this.renderCard(card))}
    </ul>;
  }

  public renderCard(card: ICardv1)
  {
    if (this.state.highlighted === card)
    {
      return <div
        onMouseLeave={event => this.setState({ highlighted: null })}
        style={{ marginTop: '-9px', marginLeft: '-10px' }}
      >
        <CardSmallPreview card={card} />
      </div>;
    }
    return <div onMouseEnter={event => this.setState({ highlighted: card })}>
      <CardSmall card={card} key={card.url} />
    </div>;
  }

}

import './CardGalleryGrid.css';

import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { ICardv1 } from '@src/commons/CardStruct';
import { GwentBorder, GwentCads } from '@src/commons/GwentImg';
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
    return <>
      {cards.map(card => this.renderCard(card))}
      </>;
  }

  private renderCard(card: ICardv1)
  {
    return <div className="item nr_gold">
      <div className="" style={{ height: '100px', backgroundImage: `url(${GwentCads.Arachas_Venom})` }}>
        {/* <img src={GwentCads.Arachas_Venom} className="background" /> */}
      </div>
      <img src={GwentBorder.NR_GOLD} className="border" />
      <div className="cardName">
        {card.name}
      </div>
    </div >;
  }
}

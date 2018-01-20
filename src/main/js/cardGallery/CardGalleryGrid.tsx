import './CardGalleryGrid.css';

import { WideCard } from '@src/cardBrowser/card/WideCard';
import { CardRenderer } from '@src/cardBrowser/CardBrowserComponent';
import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { CardSmall } from '@src/cardGallery/CardSmall';
import { MediumCard } from '@src/cardGallery/MediumCard';
import { CardSmallPreview } from '@src/cardGallery/SmallCadPreview';
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
      {cards.map(card => this.renderCard(card))}
    </div>;
  }

  public renderCard(card: ICardv1)
  {
    return <div key={`preview-${card.url}`} style={{ flex: '1 0 calc(100% / 3)', padding: '10px' }}>
      {this.cardendererPicker(this.props.renderer, card)}
    </div>;
  }

  public cardendererPicker(renderer: CardRenderer, card: ICardv1)
  {
    switch (this.props.renderer)
    {
      case CardRenderer.CARD_MEDIUM: return <MediumCard card={card} mobileView={false} />;
      case CardRenderer.CARD_MEDIUM_MOBILE: return <MediumCard card={card} mobileView={true} />;
      case CardRenderer.CARD_WIDE: return <WideCard card={card} />;
      case CardRenderer.CARD_SMALL: return <CardSmall card={card} />;
      case CardRenderer.PREVIEW: return <CardSmallPreview card={card} />;
    }
  }

}

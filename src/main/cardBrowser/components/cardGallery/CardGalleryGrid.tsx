import './CardGalleryGrid.css';

import * as React from 'react';
import { CardRenderer } from '@src/cardBrowser/CardBrowser.comp';
import { ICardv1 } from '@src/commons/card/CardStruct';
import { MediumCard } from '@src/cardBrowser/components/card/MediumCard';
import { WideCard } from '@src/cardBrowser/components/card/WideCard';
import { CardSmall } from '@src/cardBrowser/components/card/CardSmall';
import { CardSmallPreview } from '@src/cardBrowser/components/card/CardSmallPreview';

export interface CardGalleryGridProps
{
  renderer: CardRenderer;
  cards: ICardv1[];
}

export class CardGalleryGrid extends React.Component<CardGalleryGridProps, {}>
{

  public constructor(props: CardGalleryGridProps)
  {
    super(props);
  }

  public render()
  {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {this.props.cards.map(card => this.renderCard(card))}
      </div>
    );
  }

  public renderCard(card: ICardv1)
  {
    return <div key={`preview-${card.url}`} style={{ flex: '1 0 calc(100% / 5)', padding: '10px' }}>
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

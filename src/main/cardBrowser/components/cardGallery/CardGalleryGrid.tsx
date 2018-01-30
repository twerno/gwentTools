import './CardGalleryGrid.less';

import { CardRenderer } from '@src/cardBrowser/CardBrowser.comp';
import { CardMedium } from '@src/cardBrowser/components/card/CardMedium';
import { CardSmall } from '@src/cardBrowser/components/card/CardSmall';
import { CardSmallPreview } from '@src/cardBrowser/components/card/CardSmallPreview';
import { WideCard } from '@src/cardBrowser/components/card/WideCard';
import { BasicFilterService } from '@src/cardBrowser/components/filter/BasicFilter.service';
import { ICardv1 } from '@src/commons/card/CardStruct';
import * as React from 'react';

export interface CardGalleryGridProps
{
  cards: ICardv1[];
  renderer: CardRenderer;
  basicCardService: BasicFilterService;
  cardSelected: (card: ICardv1 | null) => void;
}

export class CardGalleryGrid extends React.Component<CardGalleryGridProps, {}>
{

  private readonly cssPrefix = 'cardGallery';

  public constructor(props: CardGalleryGridProps)
  {
    super(props);
  }

  public render()
  {
    return (
      <>
      <div className={`${this.cssPrefix}_container`}>
        {this.props.cards.map(card => this.renderCard(card))}
      </div>
      </>
    );
  }

  public renderCard(card: ICardv1)
  {
    return <div key={`preview-${card.url}`} className={`${this.cssPrefix}_grid_cell`}>
      {this.cardendererPicker(this.props.renderer, card)}
    </div>;
  }

  public cardendererPicker(renderer: CardRenderer, card: ICardv1)
  {
    const scale = { transform: 'scale()' };
    switch (this.props.renderer)
    {
      case CardRenderer.CARD_MEDIUM: return (
        <div style={scale}>
          <CardMedium card={card} showText={true} cardSelected={this.props.cardSelected} />
        </div>)
        ;
      case CardRenderer.CARD_MEDIUM_MOBILE: return (
        <div style={scale}>
          <CardMedium card={card} showText={false} cardSelected={this.props.cardSelected} />
        </div>
      );
      case CardRenderer.CARD_WIDE: return <WideCard card={card} basicCardService={this.props.basicCardService} />;
      case CardRenderer.CARD_SMALL: return <CardSmall card={card} cardSelected={this.props.cardSelected} />;
      case CardRenderer.PREVIEW: return <CardSmallPreview card={card} />;
    }
    return <div>Unknown renderer for: {renderer}</div>;
  }

}

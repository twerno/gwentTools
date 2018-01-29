import './CardPreview.less';

import { CardRendererHelper } from '@src/cardBrowser/components/card/Card.helper';
import { CardMedium } from '@src/cardBrowser/components/card/CardMedium';
import { BasicFilterService } from '@src/cardBrowser/components/filter/BasicFilter.service';
import { ICardv1 } from '@src/commons/card/CardStruct';
import * as React from 'react';

export interface CardPreviewProps
{
  card: ICardv1 | null;
  basicCardService: BasicFilterService;
}

export class CardPreview extends React.Component<CardPreviewProps, {}> {

  private cssPrefix = 'cardPreview';
  private helper = new CardRendererHelper();

  public render()
  {
    const css = this.cssPrefix;
    const card = this.props.card;

    if (card === null)
    {
      return <div className={`${css}_container`} />;
    }
    return <div className={`${css}_container`}>
      <div className={`${css}_card`}>
        <CardMedium card={card} showText={false} cardSelected={() => undefined} />
      </div>
      <div className={`${css}_name_box`}>
        <div className={`${css}_name`}>
          {card.name}
        </div>
        {this.helper.tags(card)}
      </div>
      <div className={`${css}_text_box`}>
        {this.helper.cardText2Str(card, this.props.basicCardService)}
      </div>
    </div>;
  }

}

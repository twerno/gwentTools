import '../../gwentAssets/GwentAssets.less';
import './WideCard.less';

import { CardRendererHelper } from '@src/cardBrowser/card/CardRendererHelper';
import { ICardv1 } from '@src/commons/CardStruct';
import {
  cardColor2BorderWide,
  cardFaction2BanerBasic,
  cardFaction2FrameWide,
} from '@src/gwentAssets/GwentAssetsHelper';
import * as React from 'react';

export interface WideCardProps
{
  card: ICardv1;
}

export class WideCard extends React.Component<WideCardProps, {}> {

  private readonly css = 'wideCard';
  private helper: CardRendererHelper = new CardRendererHelper();

  public render()
  {
    const css = this.css;
    const card = this.props.card;
    const art: React.CSSProperties = {
      backgroundImage: `url(${this.helper.cardImage(card)})`,
      backgroundSize: 'cover'
    };

    return (
      <div className={`${css}_container`}>
        <div className={`${css}_full_back_img`} style={art} />
        <div className={`${css}_full_back_img ${css}_background`} />
        <div className={`${css}_frame_content`}>
          <div className={`${css}_header`}>
            <div className={`${css}_header_art`}>
              <img style={{ height: '67px', borderRadius: '05px' }} src={this.helper.cardImage(card)} />
            </div>
            <div className={`${css}_header_name_tags`}>
              <div className={`${css}_header_name`}>
                {this.props.card.name}
              </div>
              <div className={`${css}_header_tags`}>
                {this.helper.tags(card)}
              </div>
            </div>
          </div>
          <div className={`${css}_text ${css}_vertical_middle_wrapper`}>
            <div className={`${css}_vertical_middle`}>
              {this.helper.cardText2Str(card.cardText)}
            </div>
          </div>
        </div>
        <div className={`${css}_full_back_img ${cardColor2BorderWide(card.cardColor)}`} />
        <div className={`${css}_full_back_img ${css}_frame ${cardFaction2FrameWide(card.faction)}`} />
        <div className={`${css}_banner ${cardFaction2BanerBasic(card.faction)}`} />
      </div >
    );
  }
}

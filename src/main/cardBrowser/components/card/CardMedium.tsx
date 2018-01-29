import '@src/commons/assets/GwentAssets.less';
import './CardMedium.less';

import * as React from 'react';
import { ICardv1, isIUnitv1 } from '@src/commons/card/CardStruct';
import
{
  cardColor2Border, cardFaction2Frame,
  cardRarity2Gem, cardFaction2BanerBasic, getMediumImgUrl, gwentNumber, bgColor
} from '@src/commons/assets/GwentAssets.helper';
import { nextId } from '@src/commons/Numerator';

export interface CardMediumProps
{
  card: ICardv1;
  showText: boolean;
}

interface CardMediumState
{
}

export class CardMedium extends React.Component<CardMediumProps, CardMediumState>
{

  private readonly cssPrefix = 'cardMedium';

  public shouldComponentUpdate(nextProps: CardMediumProps, nextState: CardMediumState): boolean
  {
    return this.props.card !== nextProps.card
      || this.props.showText !== nextProps.showText;
  }

  public constructor(props: CardMediumProps)
  {
    super(props);
  }

  public render()
  {
    const card = this.props.card;
    const css = this.cssPrefix;

    return (
      <div className={`${css}_container`}>
        <div>
          <div className={`${css}_art`} style={{ backgroundImage: `url(${this.cardImage(card)})` }} />
          <div className={`${css}_border ${cardColor2Border(card.cardColor)}`} />
        </div>
        <div>
          <div className={`${css}_gem ${cardRarity2Gem(card.rarity)} `} />
          <div className={`${css}_faction_frame ${cardFaction2Frame(card.faction)} `} />
          <div className={`${css}_banner ${cardFaction2BanerBasic(card.faction)} `} />
        </div>

        {this.props.showText
          ? <>
          <div className={`${css}_textBox_bg ${css}_textBox ${bgColor(card.faction)}`}>
            <div className={`${css}_textBox_topBorder ${cardFaction2Frame(card.faction)} `} />
            <div style={{ opacity: 0 }}>
              <div className={`${css}_textBox_name`}><span>{card.name}</span></div>
              <div className={`${css}_textBox_tags`}>{this.tags(card)}</div>
            </div>
          </div>

          <div className={`${css}_textBox`}>
            <div className={`${css}_textBox_name textBorder`}><span>{card.name}</span></div>
            <div className={`${css}_textBox_tags textBorder`}>{this.tags(card)}</div>
          </div>
          </>
          : ''
        }

        {this.unitStrength(card)}
      </div >
    );
  }

  private unitStrength(card: ICardv1)
  {
    if (!isIUnitv1(card))
    {
      return <></>;
    }

    return (
      <>
      <div className={`${this.cssPrefix}_unitBox textBorder`}>
        <div style={{ margin: '0px auto', display: 'table' }}>
          {
            card.strength.toString().split('')
              .map((n, idx) =>
              {
                const style = idx === 0 ? { marginLeft: '-3px' } : {};
                return <div
                  className={`${this.cssPrefix}_unitBox_number ${gwentNumber(n)}`}
                  style={style}
                  key={nextId()}
                />;
              })
          }
        </div>
      </div>

      </>
    );
  }

  private cardImage(card: ICardv1)
  {
    return getMediumImgUrl(card.img);
  }

  private tags(card: ICardv1)
  {
    return card.tags && card.tags.length > 0
      ? card.tags.reduce((a, b) => `${a}, ${b}`)
      : '';
  }

  // private cardText2Str(cardText: string[]): JSX.Element
  // {
  //   return cardText.length === 1
  //     ? <>{cardText[0]}</>
  //     : <>{cardText.map(s => <>{s}</>).reduce((a, b) => <> {a} <br /> {b}</>)}</>;
  // }
}

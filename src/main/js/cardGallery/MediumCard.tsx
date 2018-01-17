import '../gwentAssets/GwentAssets.less';
import './MediumCard.less';

import { ICardv1, isIUnitv1 } from '@src/commons/CardStruct';
import { GwentAssetsHelper } from '@src/commons/GwentAssetsHelper';
import { getFirstImageId, imageMap } from '@src/commons/ImageMap';
import {
  cardColor2Border,
  cardFaction2BanerBasic,
  cardFaction2Frame,
  cardRarity2Gem,
} from '@src/gwentAssets/GwentAssetsHelper';
import * as React from 'react';

export interface MediumCardProps
{
  card: ICardv1;
}

interface MediumCardState
{
  isOpen: boolean;
}

export class MediumCard extends React.Component<MediumCardProps, MediumCardState>
{

  private readonly cssPrefix = 'cardMedium_';

  public shouldComponentUpdate(nextProps: MediumCardProps, nextState: MediumCardState): boolean
  {
    return this.props.card !== nextProps.card
      || this.state.isOpen !== nextState.isOpen;
  }

  public constructor(props: MediumCardProps)
  {
    super(props);
    this.state = { isOpen: false };
  }

  public render()
  {
    const card = this.props.card;
    const cardArtStyle: React.CSSProperties = { backgroundImage: `url(${this.cardImage(card)})` };
    const mediumTextBoxClass = `textBox` + (this.state.isOpen ? ` textBox_open` : '');

    return (
      <div className={`${this.cssPrefix}container`}>
        <div className="art" style={cardArtStyle} />
        <div className={`fullSize ${cardColor2Border(card.cardColor)}`} />
        <div className="textBoxWrapper">
          <div className={mediumTextBoxClass}>
            {/* <br />villentretenmerth */}
            <div className="name"><span>{card.name}</span></div>
            <div className="tags">{this.tags(card)}</div>
            <div className="separator" />
            <div className="text">{this.cardText2Str(card.cardText)}</div>
          </div>
        </div>
        <div
          className={`fullSize ${cardFaction2Frame(card.faction)}`}

        />
        <div className={`gem ${cardRarity2Gem(card.rarity)}`} />
        <div className={`banner ${cardFaction2BanerBasic(card.faction)}`} />
        {this.unitStrength(card)}
        <div
          className="fullSize"
          onMouseEnter={() => this.setState({ isOpen: true })}
          onMouseLeave={() => this.setState({ isOpen: false })}
        />
      </div>
    );
  }

  private unitStrength(card: ICardv1)
  {
    if (!isIUnitv1(card))
    {
      return <></>;
    }
    const css = this.cssPrefix;
    const armor = card.armor > 0
      ? <>
      <div className="armorBackground" />
      <div className="armor">{card.armor}</div>
      </>
      : '';

    return (
      <>
      <div className="unitBox textBorder">
        {card.strength}
        {armor}
      </div>

      </>
    );
  }

  private cardImage(card: ICardv1)
  {
    const mapEl = imageMap.find(e => e.wikiUrl.toLocaleLowerCase() === card.url.toLocaleLowerCase());
    if (mapEl)
    {
      return GwentAssetsHelper.getMediumImgUrl(getFirstImageId(mapEl));
    }
    return '';
  }

  private tags(card: ICardv1)
  {
    return card.tags && card.tags.length > 0
      ? card.tags.reduce((a, b) => `${a}, ${b}`)
      : '';
  }

  private cardText2Str(cardText: string[]): JSX.Element
  {
    return cardText.length === 1
      ? <>{cardText[0]}</>
      : <>{cardText.map(s => <>{s}</>).reduce((a, b) => <> {a} <br /> {b}</>)}</>;
  }
}

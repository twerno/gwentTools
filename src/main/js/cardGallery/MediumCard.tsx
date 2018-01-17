import './MediumCard.less';

import { ICardv1, isIUnitv1 } from '@src/commons/CardStruct';
import { GwentAssetsHelper } from '@src/commons/GwentAssetsHelper';
import { getFirstImageId, imageMap } from '@src/commons/ImageMap';
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
    const mediumTextBoxClass = 'mediumCardTextBox' + (this.state.isOpen ? ' mediumCardTextBox_open' : '');

    return (
      <div
        className="cardMediumContainer"
        onMouseEnter={() => this.setState({ isOpen: true })}
        onMouseLeave={() => this.setState({ isOpen: false })}
      >
        <div className="cardMediumArt" style={cardArtStyle} />
        <div className="cardMediumBackImage cardMediumFrame_bronze" />
        <div className={mediumTextBoxClass}>
          {/* <br />villentretenmerth */}
          <div className="name">villentretenmerth {card.name}</div>
          <div className="tags">{this.tags(card)}</div>
          <div className="text">{this.cardText2Str(card.cardText)}</div>
        </div>
        <div className="cardMediumBackImage cardMediumFactionFrame_northern" />
        <div className="cardMediumGem cardMediumGem_rare" />
        <div className="cardMediumBanner cardMediumBanner_northern_basic" />
        {this.unitStrength(card)}
      </div>
    );
  }

  private unitStrength(card: ICardv1)
  {
    if (!isIUnitv1(card))
    {
      return <></>;
    }
    return (
      <div className="cardMediumStrength">
        99{/* 99{card.strength} */}
        {card.armor > 0
          ? <div className="cardMediumArmor">{card.armor}</div>
          : <></>
        }
      </div>
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

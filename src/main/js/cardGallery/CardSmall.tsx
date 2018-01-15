import './CardSmall.less';

import { CardColor, CardLoyalty, Factionv1, ICardv1, isIUnitv1 } from '@src/commons/CardStruct';
import { GwentAssetsHelper } from '@src/commons/GwentAssetsHelper';
import { getFirstImageId, imageMap } from '@src/commons/ImageMap';
import * as React from 'react';

export interface CardSmallProps
{
  card: ICardv1;
}

export class CardSmall extends React.Component<CardSmallProps, {}>
{

  public shouldComponentUpdate(nextProps: CardSmallProps, nextState: {}): boolean
  {
    return this.props.card.url !== nextProps.card.url;
  }

  public render()
  {
    const card = this.props.card;

    return (

      <div className="cardContainer">
        <div className="card" style={{ backgroundImage: `url(${this.cardImage(card)})` }} />
        <div className={this.borderClass(card)} />
        <div className={this.factionBannerClass(card)} />
        {this.unitStrength(card)}
        {this.spyToken(card)}
        <div className="cardName">
          {card.name}
        </div>
      </div>

    );
  }

  private factionBannerClass(card: ICardv1)
  {
    let bannerClass = 'banner ';
    if (isIUnitv1(card) && card.armor > 0)
    {
      bannerClass += 'banner_with_Armor ';
    }

    switch (card.faction)
    {
      case Factionv1.NEUTRAL: return bannerClass + 'banner_neutral';
      case Factionv1.MONSTERS: return bannerClass + 'banner_monster';
      case Factionv1.NILFGAARD: return bannerClass + 'banner_nilfgaard';
      case Factionv1.NORTHERN_REALMS: return bannerClass + 'banner_northern';
      case Factionv1.SCOIATAEL: return bannerClass + 'banner_scoiatael';
      case Factionv1.SKELLIGE: return bannerClass + 'banner_skellige';
    }
    return '';
  }

  private unitStrength(card: ICardv1)
  {
    if (!isIUnitv1(card))
    {
      return <></>;
    }
    return (
      <div className="unit">
        {card.strength}
        {card.armor > 0
          ? <div className="armor_line">{card.armor}</div>
          : <></>
        }
      </div>
    );
  }

  private spyToken(card: ICardv1)
  {
    if (!isIUnitv1(card))
    {
      return <></>;
    }
    return card.loyalty === CardLoyalty.DISLOYAL
      ? <div className="spy_token" />
      : <></>;
  }

  private borderClass(card: ICardv1)
  {
    switch (card.cardColor)
    {
      case CardColor.GOLD: return 'border border_gold';
      case CardColor.SILVER: return 'border border_silver';
      case CardColor.BRONZE: return 'border border_bronze';
    }
    return '';
  }

  private cardImage(card: ICardv1)
  {
    const mapEl = imageMap.find(e => e.wikiUrl.toLocaleLowerCase() === card.url.toLocaleLowerCase());
    if (mapEl)
    {
      return GwentAssetsHelper.getSmallImgUrl(getFirstImageId(mapEl));
    }
    return '';
  }
}

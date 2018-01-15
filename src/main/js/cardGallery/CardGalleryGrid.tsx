import './CardGalleryGrid.css';

import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { CardColor, CardLoyalty, Factionv1, ICardv1, isIUnitv1 } from '@src/commons/CardStruct';
import { GwentAssetsHelper } from '@src/commons/GwentAssetsHelper';
import { getFirstImageId, imageMap } from '@src/commons/ImageMap';
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
    return <ul> {
      cards.map(card => this.renderCard(card))
    }
    </ul>;
  }
  private renderCard(card: ICardv1)
  {
    const cardImg = card.name.replace(/[:\s]/g, '_')
      .replace(/__/g, '_');
    const cardImgPath = `url(../gwentAssets/cards/${cardImg}.jpg)`;

    return (
      <li key={card.url}>
        <a href={card.url}>
          <div className="cardContainer">
            <div className="card" style={{ backgroundImage: `url(${this.cardImage(card)})` }} />
            <div className={this.borderClass(card)} />
            <div className={this.factionBannerClass(card)} />
            {this.renderDuelist(card)}
            {this.spyToken(card)}
            <div className="cardName">
              {card.name}
            </div>
          </div>
        </a>
      </li>
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

  private renderDuelist(card: ICardv1)
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

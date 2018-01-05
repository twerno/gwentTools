import {
  CardColor,
  CardRarity,
  CardSet,
  CardType,
  Factionv1,
  ICardv1,
  IUnitv1,
} from '../src/main/js/createHelper/CardStruct';
import { IInfobox } from './GwentWikiaInfoboxParser';

export class GwentWikiaInfoboxCardConverter
{
  public convertAll(infoboxList: IInfobox[]): ICardv1[]
  {
    return infoboxList
      .map((infobox) => this.convert(infobox));
  }

  public convert(infobox: IInfobox): ICardv1
  {
    const result: ICardv1 = {
      id: '',
      name: this.name(infobox),
      cardColor: this.cardColor(infobox),
      cardText: infobox.description || '',
      cardType: this.cardType(infobox),
      collectable: (infobox.craft || '') !== '',
      faction: this.faction(infobox),
      rarity: this.rarity(infobox),
      set: (infobox.craft || '') !== '' ? CardSet.CLASSIC : CardSet.UNKNOWN,
      tags: infobox.type || []
    };

    if (result.cardType === CardType.UNIT)
    {
      (result as IUnitv1).stats = { strength: 0, armor: 0 };
      (result as IUnitv1).loyality = { loyal: false, disloyal: false };
      (result as IUnitv1).stats.strength = parseInt(infobox.strength || '0', 0);
      (result as IUnitv1).stats.armor = 0;
      (result as IUnitv1).loyality.loyal = infobox.loyalty === 'Loyal' || infobox.loyalty === 'Both';
      (result as IUnitv1).loyality.disloyal = infobox.loyalty === 'Disloyal' || infobox.loyalty === 'Both';
    }

    return result;
  }

  private name(infobox: IInfobox): string
  {
    return (infobox.name || infobox.title || '')
      .replace(/\(.*?\)/g, '')
      .trim();
  }

  private cardColor(infobox: IInfobox): CardColor
  {
    switch (infobox.cardtype)
    {
      case 'Bronze': return CardColor.BRONZE;
      case 'Silver': return CardColor.SILVER;
      case 'Gold': return CardColor.GOLD;
      default: return CardColor.UNDEFINED;
    }
  }

  private cardType(infobox: IInfobox): CardType
  {
    if ((infobox.type || []).indexOf('special') === -1)
    {
      return CardType.UNIT;
    }
    else
    {
      return CardType.SPECIAL;
    }
  }

  private faction(infobox: IInfobox): Factionv1
  {
    switch (infobox.faction)
    {
      case 'Monsters': return Factionv1.MONSTERS;
      case 'Neutral': return Factionv1.NEUTRAL;
      case 'Northern Realms': return Factionv1.NORTHERN_REALMS;
      case `Scoia'tael`: return Factionv1.SCOIATAEL;
      case 'Nilfgaardian Empire': return Factionv1.NILFGAARD;
      case 'Skellige': return Factionv1.SKELLIGE;
      default: return Factionv1.UNDEFINED;
    }
  }

  private rarity(infobox: IInfobox): CardRarity
  {
    switch (infobox.rarity)
    {
      case 'Epic': return CardRarity.EPIC;
      case 'Rare': return CardRarity.RARE;
      case 'Legendary': return CardRarity.LEGENDARY;
      case `Common`: return CardRarity.COMMON;
      default: return CardRarity.UNDEFINED;
    }
  }
}

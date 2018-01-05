import {
  CardColor,
  CardLoyalty,
  CardRarity,
  CardSet,
  CardType,
  Factionv1,
  ICardv1,
  IUnitv1,
} from '../src/main/js/createHelper/CardStruct';
import { GwentWikiaHelper } from './GwentWikiaHelper';
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
    try
    {
      const result: ICardv1 = {
        id: '',
        url: infobox.url || '',
        name: this.name(infobox),
        cardColor: this.cardColor(infobox),
        cardText: infobox.description || '',
        cardType: this.cardType(infobox),
        collectable: this.collectable(infobox),
        faction: this.faction(infobox),
        rarity: this.rarity(infobox),
        set: this.set(infobox),
        tags: infobox.type || []
      };

      if (result.cardType === CardType.UNIT)
      {
        (result as IUnitv1).strength = parseInt(infobox.strength || '0', 0);
        (result as IUnitv1).armor = this.armor(infobox);
        (result as IUnitv1).loyalty = this.loyalty(infobox);
      }

      return result;
    } catch (e)
    {
      GwentWikiaHelper.log(JSON.stringify(infobox));

      throw e;
    }
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
      default: return CardColor.UNKNOWN;
    }
  }

  private cardType(infobox: IInfobox): CardType
  {
    if ((infobox.type || []).indexOf('Special') === -1)
    {
      return CardType.UNIT;
    }
    else
    {
      return CardType.SPECIAL;
    }
  }

  private collectable(infobox: IInfobox): boolean
  {
    return (infobox.craft || '') !== '';
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
      default: return Factionv1.UNKNOWN;
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
      default: return CardRarity.UNKNOWN;
    }
  }

  private set(infobox: IInfobox): CardSet
  {
    switch (infobox.set)
    {
      case 'Saovine': return CardSet.SAOVINE_2016;
      case 'Alpha': return CardSet.ALPHA;
      case 'Ale_Fest': return CardSet.ALE_FEST_2016;
      case `Midwinter_Hunt`: return CardSet.MIDWINTER_HUNT_2016;
      default: return this.collectable(infobox)
        ? CardSet.CLASSIC
        : CardSet.UNKNOWN;
    }
  }

  private loyalty(infobox: IInfobox): CardLoyalty
  {
    switch (infobox.loyalty)
    {
      case 'Loyal': return CardLoyalty.LOYAL;
      case 'Disloyal': return CardLoyalty.DISLOYAL;
      case 'Both': return CardLoyalty.BOTH;
      default: return CardLoyalty.UNKNOWN;
    }
  }

  private armor(infobox: IInfobox): number
  {
    const group = (infobox.description || '').match(/(\d+)\s+Armor/);
    if (group && group.length > 0 && group[1])
    {
      return parseInt(group[1], 0);
    }
    return 0;
  }
}

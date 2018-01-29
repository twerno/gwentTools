import
{
  ICardv1, CardType, CardRarity, CardColor,
  Factionv1, CardSet, CardLoyalty, isIUnitv1
} from '@src/commons/card/CardStruct';
import { CardFilterHelper, CardFilterType } from '@src/commons/card/CardFilter';

declare var __cardDB: ICardv1[];

export interface ICardFilterOption<T>
{
  value: T;
  count: number;
}

export interface ICardFilterOptionSets
{
  names: string[];
  cardTypes: Array<ICardFilterOption<CardType>>;
  tags: Array<ICardFilterOption<string>>;
  rarities: Array<ICardFilterOption<CardRarity>>;
  cardColors: Array<ICardFilterOption<CardColor>>;
  factions: Array<ICardFilterOption<Factionv1>>;
  sets: Array<ICardFilterOption<CardSet>>;
  loyalty: Array<ICardFilterOption<CardLoyalty>>;
}

export interface IMap<T>
{
  [key: string]: T;
}

export class CardService
{
  private localSet: ICardv1[];

  private filterHelper: CardFilterHelper = new CardFilterHelper();

  public constructor()
  {
    this.initCardSet();
  }

  private initCardSet(): void
  {
    this.localSet = __cardDB.sort((a, b) => this.sortByColor(a, b));
    this.localSet
      .filter(c => c.cardType === CardType.SPECIAL)
      .forEach(c => c.tags.unshift('Special'));
  }

  public getAllCards(): ICardv1[]
  {
    return this.localSet;
  }

  public getFiltered(filter: CardFilterType): ICardv1[]
  {
    return this.filterHelper.filter(this.getAllCards(), filter);
  }

  public getOptions(filter: CardFilterType): ICardFilterOptionSets
  {
    return new ICardFilterOptionSetsBuilder(this.getFiltered(filter))
      .build();
  }

  private sortByColor(a: ICardv1, b: ICardv1): number
  {
    const result = this.colorVal(a) - this.colorVal(b);
    if (result !== 0)
    {
      return result;
    }

    if (a.name < b.name)
    {
      return -1;
    }
    else
      if (a.name > b.name)
      {
        return 1;
      }
      else
      {
        return 0;
      }

  }

  private colorVal(card: ICardv1): number
  {
    if (card.cardType === CardType.LEADER)
    {
      return 1;
    }
    else
    {
      switch (card.cardColor)
      {
        case CardColor.GOLD: return 2;
        case CardColor.SILVER: return 3;
        case CardColor.BRONZE: return 4;
      }
    }
    return 5;
  }

}

interface CardFilterOptionSetBuilderData<T>
{
  options: Array<ICardFilterOption<T>>;
  countMap: IMap<ICardFilterOption<T>>;
}

class ICardFilterOptionSetsBuilder
{
  public constructor(private filteredCads: ICardv1[]) { }

  private names: string[] = [];

  private cardTypes: CardFilterOptionSetBuilderData<CardType> = { options: [], countMap: {} };
  private tags: CardFilterOptionSetBuilderData<string> = { options: [], countMap: {} };
  private rarities: CardFilterOptionSetBuilderData<CardRarity> = { options: [], countMap: {} };
  private cardColors: CardFilterOptionSetBuilderData<CardColor> = { options: [], countMap: {} };
  private factions: CardFilterOptionSetBuilderData<Factionv1> = { options: [], countMap: {} };
  private sets: CardFilterOptionSetBuilderData<CardSet> = { options: [], countMap: {} };
  private loyalty: CardFilterOptionSetBuilderData<CardLoyalty> = { options: [], countMap: {} };

  public build(): ICardFilterOptionSets
  {
    this.initOptionSets();

    this.filteredCads.forEach(c =>
    {
      this.names.push(c.name);
      this.updateOptionSet(c.cardType, this.cardTypes);
      c.tags.forEach(tag => this.updateOptionSet(tag, this.tags));
      this.updateOptionSet(c.rarity, this.rarities);
      this.updateOptionSet(c.cardColor, this.cardColors);
      this.updateOptionSet(c.faction, this.factions);
      this.updateOptionSet(c.set, this.sets);
      if (isIUnitv1(c))
      {
        this.updateOptionSet(c.loyalty, this.loyalty);
      }

    });

    return {
      names: this.names,
      cardTypes: this.cardTypes.options,
      tags: this.tags.options.sort((a, b) => a.value.localeCompare(b.value)),
      rarities: this.rarities.options,
      cardColors: this.cardColors.options,
      factions: this.factions.options,
      sets: this.sets.options,
      loyalty: this.loyalty.options
    };
  }

  private updateOptionSet<T>(value: T, data: CardFilterOptionSetBuilderData<T>): void
  {
    const key = value.toString();
    let option: ICardFilterOption<T> | undefined = data.countMap[key];
    if (option)
    {
      option.count++;
    }
    else
    {
      option = { value, count: 1 };
      data.countMap[key] = option;
      data.options.push(option);
    }
  }

  private initOptionSets(): void
  {
    this.initOptionSet(this.cardTypes, [CardType.LEADER, CardType.SPECIAL, CardType.UNIT]);
    this.initOptionSet(this.rarities, [CardRarity.COMMON, CardRarity.RARE, CardRarity.EPIC, CardRarity.LEGENDARY]);
    this.initOptionSet(this.cardColors, [CardColor.BRONZE, CardColor.SILVER, CardColor.GOLD]);
    this.initOptionSet(this.factions,
      [Factionv1.NEUTRAL, Factionv1.MONSTERS, Factionv1.NILFGAARD, Factionv1.NORTHERN_REALMS, Factionv1.SCOIATAEL,
      Factionv1.SKELLIGE]);
    this.initOptionSet(this.sets,
      [CardSet.CLASSIC, CardSet.ALE_FEST_2017, CardSet.SAOVINE_2017, CardSet.MIDWINTER_HUNT_2017]);
    this.initOptionSet(this.loyalty, [CardLoyalty.LOYAL, CardLoyalty.DISLOYAL, CardLoyalty.BOTH, CardLoyalty.UNKNOWN]);
  }

  private initOptionSet<T>(data: CardFilterOptionSetBuilderData<T>, options: T[]): void
  {
    options.forEach(o => this.updateOptionSet(o, data));
    data.options.forEach(o => o.count = 0);
  }

}

import {
  CardColor,
  CardLoyalty,
  CardRarity,
  CardSet,
  CardType,
  Factionv1,
  ICardv1,
  isIUnitv1,
} from '@src/commons/CardStruct';

declare var __cardsDB: ICardv1[];

export interface IFilter
{
  name?: string;
  cardTypes?: CardType[];
  tags?: string[];
  rarities?: CardRarity[];
  cardColors?: CardColor[];
  factions?: Factionv1[];
  sets?: CardSet[];
  loyalty?: CardLoyalty;
}

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

  public getAllCards(): ICardv1[]
  {
    return __cardsDB as ICardv1[];
  }

  public getFiltered(filter: IFilter): ICardv1[]
  {
    return new Filter(filter, this.getAllCards())
      .get();
  }

  public getOptions(filter: IFilter): ICardFilterOptionSets
  {
    return new ICardFilterOptionSetsBuilder(this.getFiltered(filter))
      .build();
  }

}

class Filter
{
  constructor(private filter: IFilter, private cards: ICardv1[]) { }

  public get(): ICardv1[]
  {
    return this.cards
      .filter(c =>
      {
        return this.filterByName(this.filter, c)
          && this.filterByCardType(this.filter, c)
          && this.filterByTag(this.filter, c)
          && this.filterByRarity(this.filter, c)
          && this.filterByCardColor(this.filter, c)
          && this.filterByFaction(this.filter, c)
          && this.filterBySet(this.filter, c)
          && this.filterByLoyalty(this.filter, c);
      });
  }

  private filterByName(f: IFilter, c: ICardv1): boolean
  {
    return f.name
      ? c.name.toLocaleLowerCase().indexOf(f.name.toLocaleLowerCase()) === 0
      : true;
  }

  private filterByCardType(f: IFilter, c: ICardv1): boolean
  {
    return f.cardTypes
      ? f.cardTypes.indexOf(c.cardType) !== -1
      : true;
  }

  private filterByTag(f: IFilter, c: ICardv1): boolean
  {
    if (f.tags === undefined)
    {
      return true;
    }

    for (const tag of f.tags)
    {
      if (c.tags.indexOf(tag) !== -1)
      {
        return true;
      }
    }

    return false;
  }

  private filterByRarity(f: IFilter, c: ICardv1): boolean
  {
    return f.rarities
      ? f.rarities.indexOf(c.rarity) !== -1
      : true;
  }

  private filterByCardColor(f: IFilter, c: ICardv1): boolean
  {
    return f.cardColors
      ? f.cardColors.indexOf(c.cardColor) !== -1
      : true;
  }

  private filterByFaction(f: IFilter, c: ICardv1): boolean
  {
    return f.factions
      ? f.factions.indexOf(c.faction) !== -1
      : true;
  }

  private filterBySet(f: IFilter, c: ICardv1): boolean
  {
    return f.sets
      ? f.sets.indexOf(c.set) !== -1
      : true;
  }

  private filterByLoyalty(f: IFilter, c: ICardv1): boolean
  {
    return f.loyalty && isIUnitv1(c)
      ? f.loyalty === CardLoyalty.BOTH || f.loyalty === c.loyalty
      : true;
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
      tags: this.tags.options,
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
    this.initOptionSet(this.cardColors, [CardColor.BRONZE, CardColor.SILVER, CardColor.GOLD]);
  }

  private initOptionSet<T>(data: CardFilterOptionSetBuilderData<T>, options: T[]): void
  {
    options.forEach(o => this.updateOptionSet(o, data));
    data.options.forEach(o => o.count = 0);
  }
}

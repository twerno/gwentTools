import
{
  CardColor,
  CardLoyalty,
  CardRarity,
  CardSet,
  CardType,
  Factionv1,
  ICardv1,
  isIUnitv1,
} from '@src/commons/CardStruct';
import { ICardFilterDef, CardFilterHelper, CardFilterType } from '@src/commons/cardFilter/CardFiler';
import { } from '@src/cardBrowser/card/mechanic/Mechanic';

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

  private filterHelper: CardFilterHelper = new CardFilterHelper();

  public getAllCards(): ICardv1[]
  {
    return __cardDB as ICardv1[];
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
      [CardSet.CLASSIC, CardSet.ALE_FEST_2016, CardSet.SAOVINE_2016, CardSet.MIDWINTER_HUNT_2016]);
    this.initOptionSet(this.loyalty, [CardLoyalty.LOYAL, CardLoyalty.DISLOYAL, CardLoyalty.BOTH]);
  }

  private initOptionSet<T>(data: CardFilterOptionSetBuilderData<T>, options: T[]): void
  {
    options.forEach(o => this.updateOptionSet(o, data));
    data.options.forEach(o => o.count = 0);
  }

}

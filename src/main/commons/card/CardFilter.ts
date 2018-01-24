import
{
  CardType, CardRarity, CardColor, Factionv1,
  CardSet, CardLoyalty, ICardv1, isIUnitv1
} from '@src/commons/card/CardStruct';
import { isObjectEmpty } from '@src/commons/Object.helper';

export interface ICardFilterDef
{
  name?: string;
  cardType?: CardType;
  tag?: string;
  rarity?: CardRarity;
  cardColor?: CardColor;
  faction?: Factionv1;
  set?: CardSet;
  loyalty?: CardLoyalty;
  isCollectable?: boolean;
}

export type CardFilterType = ICardFilterDef | ICardFIlter;

export interface ICardFIlter
{
  id?: string;
  operator: 'AND' | 'OR' | 'NOT';
  filters: CardFilterType[];
}

export class CardFilterHelper
{
  public filter(cards: ICardv1[], filter: CardFilterType): ICardv1[]
  {
    if (filter === null || filter === undefined)
    {
      throw new Error('Filter cant be null.');
    }
    else
      if (CardFilterHelper.isCardIFilter(filter))
      {
        return this.internalCardFilter(cards, filter);
      }
      else
        if (CardFilterHelper.isICardFilterDef(filter))
        {
          return this.internalICardFIlterDef(cards, filter);
        }
        else
        {
          throw new Error(`Unknown filter type: ${filter}.`);
        }
  }

  public static isCardIFilter(filter: any): filter is ICardFIlter
  {
    const operatorProp = 'operator';
    const filterProp = 'filters';
    return filter
      && filter[operatorProp]
      && filter[filterProp]
      && (filter[operatorProp] === 'AND' || filter[operatorProp] === 'OR' || filter[operatorProp] === 'NOT');
  }

  public static isICardFilterDef(filter: any): filter is ICardFilterDef
  {
    const operatorProp = 'operator';
    const filterProp = 'filters';
    return filter
      && !filter[operatorProp]
      && !filter[filterProp];
  }

  private internalCardFilter(cards: ICardv1[], filter: ICardFIlter): ICardv1[]
  {
    if (filter.operator === 'AND')
    {
      return this.internalFilterAnd(cards, filter);
    }
    else
      if (filter.operator === 'OR')
      {
        return this.internalFilterOr(cards, filter);
      }
      else
      {
        return this.internalFilterNot(cards, filter);
      }
  }

  private internalFilterAnd(cards: ICardv1[], filter: ICardFIlter): ICardv1[]
  {
    let result = cards;
    for (const f of filter.filters)
    {
      result = this.filter(result, f);
    }

    return result;
  }

  private internalFilterOr(cards: ICardv1[], filter: ICardFIlter): ICardv1[]
  {
    const results: ICardv1[][] = [];
    for (const f of filter.filters)
    {
      results.push(this.filter(cards, f));
    }

    return results
      .reduce((a, b) => a.concat(b))
      .filter((c, index, arr) => arr.indexOf(c) === index);
  }

  private internalFilterNot(cards: ICardv1[], filter: ICardFIlter): ICardv1[]
  {
    let result = cards;
    for (const f of filter.filters)
    {
      const filtered = this.filter(result, f);
      result = result.filter(c => filtered.findIndex(c2 => c === c2) === -1);
    }

    return result;
  }

  private internalICardFIlterDef(cards: ICardv1[], filter: ICardFilterDef): ICardv1[]
  {
    return FilterDefCardPicker.filter(cards, filter);
  }
}

class FilterDefCardPicker
{
  public static filter(cards: ICardv1[], filterDef: ICardFilterDef): ICardv1[]
  {
    if (isObjectEmpty(filterDef))
    {
      return [];
    }

    return cards.filter(c =>
    {
      return FilterDefCardPicker.filterByName(filterDef, c)
        && FilterDefCardPicker.genFilter(filterDef.cardType, c.cardType)
        && FilterDefCardPicker.filterByTag(filterDef, c)
        && FilterDefCardPicker.genFilter(filterDef.cardColor, c.cardColor)
        && FilterDefCardPicker.genFilter(filterDef.rarity, c.rarity)
        && FilterDefCardPicker.genFilter(filterDef.faction, c.faction)
        && FilterDefCardPicker.genFilter(filterDef.set, c.set)
        && FilterDefCardPicker.filterByLoyalty(filterDef, c)
        && FilterDefCardPicker.genFilter(filterDef.isCollectable, c.collectable);
    });

  }

  private static genFilter<T>(fVal: T | undefined, cVal: T): boolean
  {
    return fVal
      ? fVal === cVal
      : true;
  }

  private static filterByName(f: ICardFilterDef, c: ICardv1): boolean
  {
    return f.name
      ? c.name.toLocaleLowerCase().indexOf(f.name.toLocaleLowerCase()) !== -1
      : true;
  }

  private static filterByTag(f: ICardFilterDef, c: ICardv1): boolean
  {
    return f.tag
      ? c.tags.length > 0 && c.tags.find(t => t === f.tag) !== undefined
      : true;
  }

  private static filterByLoyalty(f: ICardFilterDef, c: ICardv1): boolean
  {
    return f.loyalty
      ? isIUnitv1(c) && (f.loyalty === CardLoyalty.BOTH || f.loyalty === c.loyalty)
      : true;
  }

}

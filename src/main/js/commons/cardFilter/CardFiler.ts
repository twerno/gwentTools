import
{
  CardType, CardRarity, CardColor, Factionv1,
  CardSet, CardLoyalty, ICardv1, isIUnitv1
} from '@src/commons/CardStruct';

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

export type CardFilterType = ICardFilterDef | ICardFIlterAndOr | ICardFilterNot;

export interface ICardFIlterAndOr
{
  operator: 'AND' | 'OR';
  filter: CardFilterType[];
}

export interface ICardFilterNot
{
  operator: 'NOT';
  filter: ICardFilterDef | ICardFIlterAndOr;
}

export class CardFilterHelper
{
  public filter(cards: ICardv1[], filter: CardFilterType): ICardv1[]
  {
    return this.internalFilter(cards, filter);
  }

  private internalFilter(cards: ICardv1[], filter: CardFilterType): ICardv1[]
  {
    if (filter === null || filter === undefined)
    {
      throw new Error('Filter cant be null');
    }
    else
      if (this.isIFilterAndOr(filter))
      {
        return this.internalFilterAndOr(cards, filter);
      }
      else
        if (this.isFilterNot(filter))
        {
          return this.internalFilterNot(cards, filter);
        }
        else
          if (this.isIFilterDef(filter))
          {
            return this.internalIFIlterDef(cards, filter);
          }
          else
          {
            throw new Error('Unknown filter type: ' + filter);
          }
  }

  private isFilterNot(filter: any): filter is ICardFilterNot
  {
    const operatorProp = 'operator';
    const filterProp = 'filter';
    return filter
      && filter[operatorProp]
      && filter[filterProp]
      && filter[operatorProp] === 'NOT';
  }

  private isIFilterAndOr(filter: any): filter is ICardFIlterAndOr
  {
    const operatorProp = 'operator';
    const filterProp = 'filter';
    return filter
      && filter[operatorProp]
      && filter[filterProp]
      && (filter[operatorProp] === 'AND' || filter[operatorProp] === 'OR');
  }

  private isIFilterDef(filter: any): filter is ICardFilterDef
  {
    const operatorProp = 'operator';
    const filterProp = 'filter';
    return filter
      && !filter[operatorProp]
      && !filter[filterProp];
  }

  private internalFilterAndOr(cards: ICardv1[], filter: ICardFIlterAndOr): ICardv1[]
  {
    if (filter.operator === 'AND')
    {
      return this.internalFilterAnd(cards, filter);
    }
    else
    {
      return this.internalFilterOr(cards, filter);
    }
  }

  private internalFilterAnd(cards: ICardv1[], filter: ICardFIlterAndOr): ICardv1[]
  {
    let result = [...cards];
    for (const f of filter.filter)
    {
      result = this.internalFilter(result, f);
    }

    return result;
  }

  private internalFilterOr(cards: ICardv1[], filter: ICardFIlterAndOr): ICardv1[]
  {
    const results: ICardv1[][] = [];
    for (const f of filter.filter)
    {
      results.push(this.internalFilter(cards, f));
    }

    return results
      .reduce((a, b) => a.concat(b))
      .filter((c, index, arr) => arr.indexOf(c) === index);
  }

  private internalFilterNot(cards: ICardv1[], filter: ICardFilterNot): ICardv1[]
  {
    const filtered = this.internalFilter(cards, filter.filter);
    return cards
      .filter(c => filtered.findIndex(c2 => c === c2) === -1);
  }

  private internalIFIlterDef(cards: ICardv1[], filter: ICardFilterDef): ICardv1[]
  {
    return FilterDefBuilder.filter(cards, filter);
  }
}

class FilterDefBuilder
{
  public static filter(cards: ICardv1[], filterDef: ICardFilterDef): ICardv1[]
  {
    return cards.filter(c =>
    {
      return FilterDefBuilder.filterByName(filterDef, c)
        && FilterDefBuilder.genFilter(filterDef.cardType, c.cardType)
        && FilterDefBuilder.filterByTag(filterDef, c)
        && FilterDefBuilder.genFilter(filterDef.cardColor, c.cardColor)
        && FilterDefBuilder.genFilter(filterDef.rarity, c.rarity)
        && FilterDefBuilder.genFilter(filterDef.faction, c.faction)
        && FilterDefBuilder.genFilter(filterDef.set, c.set)
        && FilterDefBuilder.filterByLoyalty(filterDef, c)
        && FilterDefBuilder.genFilter(filterDef.isCollectable, c.collectable);
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
    return f.tag && c.tags.length > 0
      ? c.tags.map(t => t === f.tag).reduce((a, b) => a && b)
      : true;
  }

  private static filterByLoyalty(f: ICardFilterDef, c: ICardv1): boolean
  {
    return f.loyalty
      ? isIUnitv1(c) && (f.loyalty === CardLoyalty.BOTH || f.loyalty === c.loyalty)
      : true;
  }

}

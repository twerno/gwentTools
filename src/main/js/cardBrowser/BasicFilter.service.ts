import { CardType, CardRarity, CardColor, Factionv1, CardSet, CardLoyalty, ICardv1 } from '@src/commons/CardStruct';
import { CardService } from '@src/cardBrowser/CardService';
import { CardFilterHelper, ICardFIlter, CardFilterType, ICardFilterDef } from '@src/commons/cardFilter/CardFiler';

export interface IBasicCardFilter
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

export class BasicFilterService
{
  private empty = {};
  private cardFilterHelper: CardFilterHelper = new CardFilterHelper();

  constructor(private filterService: CardService)
  {
  }

  public filter(basicFilter: IBasicCardFilter): ICardv1[]
  {
    const filter = this.basicFilter2Filter(basicFilter);
    const cards = this.filterService.getAllCards();
    const filtered = this.cardFilterHelper.filter(cards, filter);
    return filtered;
  }

  public basicFilter2Filter(basicFilter: IBasicCardFilter): CardFilterType
  {
    const filters: CardFilterType[] = [
      basicFilter.name ? { name: basicFilter.name } : this.empty,
      this.innerFilter(basicFilter.cardColors, c => ({ cardColor: c })),
      this.innerFilter(basicFilter.cardTypes, t => ({ cardType: t })),
      this.innerFilter(basicFilter.factions, f => ({ faction: f })),
      this.innerFilter(basicFilter.rarities, r => ({ rarity: r })),
      this.innerFilter(basicFilter.sets, s => ({ set: s })),
      this.innerFilter(basicFilter.tags, t => ({ tag: t })),
      basicFilter.loyalty ? { loyalty: basicFilter.loyalty } : this.empty,
    ]
      .filter(f => f !== this.empty);

    return filters.length === 0 ? {} : { operator: 'AND', filters };
  }

  private innerFilter<T>(list: T[] | undefined, mapper: (e: T) => ICardFilterDef): CardFilterType
  {
    if (list && list.length === 1)
    {
      return list.map(mapper)[0];
    }
    else
      if (list && list.length > 1)
      {
        return { operator: 'OR', filters: list.map(mapper) };
      }
    return this.empty;
  }
}

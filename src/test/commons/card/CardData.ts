import
{
  CardColor, CardType, Factionv1, CardRarity,
  CardSet, ICardv1, IUnitv1, CardLoyalty
} from '@src/commons/card/CardStruct';

export const testCardSet: Array<ICardv1 | IUnitv1> = [
  {
    cardColor: CardColor.BRONZE,
    cardText: [''],
    cardType: CardType.UNIT,
    collectable: true,
    faction: Factionv1.MONSTERS,
    name: 'test1',
    rarity: CardRarity.COMMON,
    set: CardSet.CLASSIC,
    tags: ['tag1', 'tag2'],
    url: '',
    id: '',
    armor: 0,
    strength: 5,
    loyalty: CardLoyalty.LOYAL
  },
  {
    cardColor: CardColor.BRONZE,
    cardText: [''],
    cardType: CardType.SPECIAL,
    collectable: true,
    faction: Factionv1.NEUTRAL,
    name: 'test2',
    rarity: CardRarity.RARE,
    set: CardSet.CLASSIC,
    tags: ['tag1'],
    url: '',
    id: ''
  },
  {
    cardColor: CardColor.GOLD,
    cardText: [''],
    cardType: CardType.LEADER,
    collectable: true,
    faction: Factionv1.NEUTRAL,
    name: 'test3',
    rarity: CardRarity.RARE,
    set: CardSet.CLASSIC,
    tags: ['tag1'],
    url: '',
    id: '',
    strength: 7,
    armor: 0,
    loyalty: CardLoyalty.LOYAL
  }
];

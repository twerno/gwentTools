export enum Factionv1
{
  NEUTRAL = 'NEUTRAL',
  NILFGAARD = 'NILFGAARD',
  NORTHERN_REALMS = 'NORTHERN_REALMS',
  MONSTERS = 'MONSTERS',
  SCOIATAEL = 'SCOIATAEL',
  SKELLIGE = 'SKELLIGE',
  UNKNOWN = 'UNKNOWN'
}

export enum CardSet
{
  CLASSIC = 'CLASSIC',
  SAOVINE_2016 = 'SAOVINE_2016',
  ALPHA = 'ALPHA',
  ALE_FEST_2016 = 'ALE_FEST_2016',
  MIDWINTER_HUNT_2016 = 'MIDWINTER_HUNT_2016',
  UNKNOWN = 'UNKNOWN'
}

export enum CardColor
{
  BRONZE = 'BRONZE', SILVER = 'SILVER', GOLD = 'GOLD', UNKNOWN = 'UNKNOWN'
}

export enum CardType
{
  UNIT = 'UNIT', SPECIAL = 'SPECIAL', LEADER = 'LEADER'
}

export enum CardRarity
{
  COMMON = 'COMMON', RARE = 'RARE', EPIC = 'EPIC', LEGENDARY = 'LEGENDARY', UNKNOWN = 'UNKNOWN'
}

export enum CardLoyalty
{
  LOYAL = 'LOYAL', DISLOYAL = 'DISLOYAL', BOTH = 'BOTH', UNKNOWN = 'UNKNOWN'
}

export interface ICardv1
{
  id: string;
  name: string;
  cardType: CardType;
  tags: string[];
  rarity: CardRarity;
  cardColor: CardColor;
  faction: Factionv1;
  set: CardSet;
  collectable: boolean;
  // abilities: object[];
  cardText: string[];
  url: string;
}

export interface IUnitv1 extends ICardv1
{
  loyalty: CardLoyalty;
  strength: number;
  armor: number;
}

export function isIUnitv1(card: ICardv1): card is IUnitv1
{
  return card
    && card.hasOwnProperty('loyalty')
    && card.hasOwnProperty('strength')
    && card.hasOwnProperty('armor');
}

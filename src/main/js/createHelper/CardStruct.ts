export enum Factionv1
{
  NEUTRAL, NILFGAARD, NORTHERN_REALMS, MONSTERS, SCOIATAEL, SKELLIGE, UNDEFINED
}

export enum CardSet
{
  CLASSIC, UNKNOWN
}

export enum CardColor
{
  BRONZE, SILVER, GOLD, UNDEFINED
}

export enum CardType
{
  UNIT, SPECIAL
}

export enum CardRarity
{
  COMMON, RARE, EPIC, LEGENDARY, UNDEFINED
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
  cardText: string;
}

export interface IUnitv1 extends ICardv1
{
  loyality: { loyal: boolean, disloyal: boolean };
  stats: { strength: number, armor: number };
}

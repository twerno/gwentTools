export enum Factionv1
{
  NEUTRAL, NILFGAARD, NORTHERN_REALMS, MONSTERS, SCOIATAEL, SKELLIGE
}

export enum CardSet
{
  CLASSIC
}

export interface ICardv1
{
  id: string;
  name: string;
  cardType: 'unit' | 'special';
  tags: string[];
  rarity: 'common' | 'rare' | 'epic' | 'legenday';
  cardColor: 'bronze' | 'silver' | 'gold';
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

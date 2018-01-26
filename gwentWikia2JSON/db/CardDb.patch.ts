import { ICardv1, CardColor, CardType, Factionv1, CardSet } from '../../src/main/commons/card/CardStruct';

export type CardPatch = Partial<ICardv1> & ({ id: string, url: string });

export const cardDbPatch: CardPatch[] = [
  {
    id: '360',
    url: 'http://gwent.wikia.com/wiki/Adda',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.BRONZE, CardColor.SILVER],
          cardTypes: [CardType.UNIT],
          factions: [Factionv1.NORTHERN_REALMS, Factionv1.NEUTRAL],
          tags: ['Cursed'],
          set: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  }
];

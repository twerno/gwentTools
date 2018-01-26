import { ICardv1, CardColor, CardType, Factionv1, CardSet } from '../../src/main/commons/card/CardStruct';

export type CardPatch = Partial<ICardv1> & ({ img: string, url: string });

export const cardDbPatch: CardPatch[] = [
  {
    img: '360',
    url: 'http://gwent.wikia.com/wiki/Adda',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.BRONZE, CardColor.SILVER],
          cardTypes: [CardType.UNIT],
          factions: [Factionv1.NORTHERN_REALMS, Factionv1.NEUTRAL],
          tags: ['Cursed'],
          cardSets: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '355',
    url: 'http://gwent.wikia.com/wiki/Aguara:_True_Form',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.BRONZE, CardColor.SILVER],
          cardTypes: [CardType.SPECIAL],
          tags: ['Spell'],
          cardSets: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '519',
    url: 'http://gwent.wikia.com/wiki/Black_Blood'
  },
  {
    img: '485',
    url: 'http://gwent.wikia.com/wiki/Dazhbog_Runestone',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.SILVER],
          factions: [Factionv1.NILFGAARD],
          cardSets: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '486',
    url: 'http://gwent.wikia.com/wiki/Devana_Runestone',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.SILVER],
          factions: [Factionv1.MONSTERS],
          cardSets: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '504',
    url: 'http://gwent.wikia.com/wiki/Doppler'
  },
  {
    img: '370',
    url: 'http://gwent.wikia.com/wiki/Dorregaray',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.BRONZE, CardColor.SILVER],
          cardTypes: [CardType.UNIT],
          tags: ['Beast', 'Draconid'],
          cardSets: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '462',
    url: 'http://gwent.wikia.com/wiki/Elven_Scout',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.BRONZE],
          cardTypes: [CardType.UNIT],
          factions: [Factionv1.SCOIATAEL],
          cardSets: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '364',
    url: 'http://gwent.wikia.com/wiki/Filavandrel',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.SILVER],
          cardTypes: [CardType.SPECIAL],
          cardSets: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '376',
    url: 'http://gwent.wikia.com/wiki/Hym'
  },
  {
    img: '497',
    url: 'http://gwent.wikia.com/wiki/Kiyan'
  },
  {
    img: '473',
    url: 'http://gwent.wikia.com/wiki/Mahakam_Horn'
  },
  {
    img: '487',
    url: 'http://gwent.wikia.com/wiki/Morana_Runestone',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.SILVER],
          factions: [Factionv1.SCOIATAEL],
          cardSets: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '509',
    url: 'http://gwent.wikia.com/wiki/Ornamental_Sword',
    // abilities: [
    //   {
    //     mechanicId: 'CREATE',
    //     filter: {
    //       cardColors: [CardColor.BRONZE, CardColor.SILVER],
    //       cardTypes: [CardType.UNIT],
    //       factions: [Factionv1.SKELLIGE],
    //       tags: ['Soldier'],
    //       set: [CardSet.CLASSIC],
    //       isCollectable: true
    //     }
    //   }
    // ],
  },
  {
    img: '452',
    url: 'http://gwent.wikia.com/wiki/Portcullis',
  },
  {
    img: '459',
    url: 'http://gwent.wikia.com/wiki/Slave_Driver'
  },
  {
    img: '483',
    url: 'http://gwent.wikia.com/wiki/Stribog_Runestone',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.SILVER],
          factions: [Factionv1.SKELLIGE],
          set: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '357',
    url: `http://gwent.wikia.com/wiki/Uma's_Curse`,
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.GOLD],
          cardTypes: [CardType.UNIT],
          set: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '482',
    url: 'http://gwent.wikia.com/wiki/Usurper',
    // abilities: [
    //   {
    //     mechanicId: 'CREATE',
    //     filter: {
    //       cardTypes: [CardType.LEADER],
    //       set: [CardSet.CLASSIC],
    //       isCollectable: true
    //     }
    //   }
    // ],
  },
  {
    img: '351',
    url: 'http://gwent.wikia.com/wiki/Vreemde',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.BRONZE],
          cardTypes: [CardType.UNIT],
          factions: [Factionv1.NILFGAARD],
          tags: ['Soldier'],
          set: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '488',
    url: 'http://gwent.wikia.com/wiki/Whispering_Hillock',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.BRONZE, CardColor.SILVER],
          factions: [Factionv1.MONSTERS, Factionv1.NEUTRAL],
          tags: ['Organic'],
          set: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '513',
    url: 'http://gwent.wikia.com/wiki/Winch',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.BRONZE],
          factions: [Factionv1.NORTHERN_REALMS],
          tags: ['Machine'],
          set: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  },
  {
    img: '484',
    url: 'http://gwent.wikia.com/wiki/Zoria_Runestone',
    abilities: [
      {
        mechanicId: 'CREATE',
        filter: {
          cardColors: [CardColor.SILVER],
          factions: [Factionv1.NORTHERN_REALMS],
          set: [CardSet.CLASSIC],
          isCollectable: true
        }
      }
    ],
  }
];

import { CardFilterType } from '@src/commons/card/CardFilter';
import { IBasicCardFilter } from '@src/cardBrowser/components/filter/BasicFilter.service';
import { CardColor, CardType } from '@src/commons/card/CardStruct';

export type gwentMechanic = 'SPAWN' | 'DEPLOY' | 'ARMOR' | 'CREATE';

export interface ICardAbility
{
  mechanicId: gwentMechanic;
  staticText?: string;
}

export interface SpawnAbility extends ICardAbility
{
  mechanicId: gwentMechanic & 'SPAWN';
  cards: CardFilterType;
}

export interface DeployAbility extends ICardAbility
{
  mechanicId: gwentMechanic & 'DEPLOY';
}

export interface ArmorAbility extends ICardAbility
{
  mechanicId: gwentMechanic & 'ARMOR';
  value: number;
}

export interface CreateAbility extends ICardAbility
{
  mechanicId: gwentMechanic & 'CREATE';
  filter: IBasicCardFilter;
}

const create: CreateAbility = {
  mechanicId: 'CREATE',
  filter: {
    cardColors: [CardColor.BRONZE, CardColor.SILVER],
    cardTypes: [CardType.UNIT],
    tags: ['Cursed']
  },
};

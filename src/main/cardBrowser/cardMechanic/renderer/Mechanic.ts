import { } from '@src/cardBrowser/CardService';
import { CardFilterType } from '@src/commons/card/CardFilter';

export type gwentMechanic = 'SPAWN' | 'DEPLOY' | 'ARMOR';

export interface IGameMechanic
{
  mechanicId: gwentMechanic;
}

export interface SpawnMechanic extends IGameMechanic
{
  mechanicId: gwentMechanic & 'SPAWN';
  cards: CardFilterType;
}

export interface DeployMechanic extends IGameMechanic
{
  mechanicId: gwentMechanic & 'DEPLOY';
}

export interface ArmorMechanic extends IGameMechanic
{
  mechanicId: gwentMechanic & 'ARMOR';
  value: number;
}

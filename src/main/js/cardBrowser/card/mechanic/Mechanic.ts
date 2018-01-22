import { ICardv1 } from '@src/commons/CardStruct';
import { IFilterDef } from '@src/cardBrowser/CardService';

export type gwentMechanic = 'SPAWN' | 'DEPLOY' | 'ARMOR';

export interface IGameMechanic
{
  mechanicId: gwentMechanic;
}

export interface ICardFilter extends 
{
}

export interface SpawnMechanic extends IGameMechanic
{
  mechanicId: gwentMechanic & 'SPAWN';
  cards: ICardv1[] | IFilterDef;
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

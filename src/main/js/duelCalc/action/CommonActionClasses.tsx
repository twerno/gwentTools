import { DuelCalcService } from '@src/duelCalc/DuelCalcService';

export interface ICommonActionParam
{
  calcService: DuelCalcService;
}

export interface IStateChangeAction<P, S, AP>
{
  resolve(prevState: Readonly<S>, props: P, actionParams: AP): S | {};
}

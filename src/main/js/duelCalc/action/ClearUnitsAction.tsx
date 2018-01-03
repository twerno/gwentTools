import { DuelCalcState, Unit } from '@src/duelCalc/DuelCalcComponent';
import { ChangeUnitAction } from '@src/duelCalc/action/ChangeUnitAction';
import { IStateChangeAction, ICommonActionParam } from '@src/duelCalc/action/CommonActionClasses';
import { UnitHelper } from '@src/duelCalc/helper/UnitHelper';

export class ClearUnitsAction implements IStateChangeAction<{}, DuelCalcState, ICommonActionParam>
{

  public resolve(prevState: Readonly<DuelCalcState>, props: {}, param: ICommonActionParam): DuelCalcState | {}
  {
    return { units: UnitHelper.initialState(), results: [] };
  }
}

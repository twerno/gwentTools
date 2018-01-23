import { IStateChangeAction, ICommonActionParam } from '@src/duelCalc/action/CommonActionClasses';
import { DuelCalcState, Unit } from '@src/duelCalc/DuelCalcComponent';
import { UnitHelper } from '@src/duelCalc/helper/UnitHelper';

export class AddUnitIfNecessarySubAction implements IStateChangeAction<{}, DuelCalcState, ICommonActionParam>
{

  public resolve(prevState: Readonly<DuelCalcState>, props: {}, actionParams: {}): {} | DuelCalcState
  {
    const ilePustychJest = prevState.units.filter((u) => UnitHelper.isUnitEmpty(u)).length;
    const ilePowinnoByc = Math.max(3 - prevState.units.length + ilePustychJest, 1);
    const units = [...prevState.units];

    for (let i = ilePustychJest; i < ilePowinnoByc; i++)
    {
      units.push(UnitHelper.newEmptyUnit());
    }

    return { units, results: prevState.results };
  }

}

import { DuelCalcState, Unit } from '@src/duelCalc/DuelCalcComponent';
import { DuelCalcService } from '@src/duelCalc/DuelCalcService';
import { RemoveUnitAction } from '@src/duelCalc/action/RemoveUnitAction';
import { ICommonActionParam, IStateChangeAction } from '@src/duelCalc/action/CommonActionClasses.tsx';
import { UnitHelper } from '@src/duelCalc/helper/UnitHelper';
import { AddUnitIfNecessarySubAction } from '@src/duelCalc/action/AddUnitIfNecessarySubAction';

export class ChangeUnitAction implements IStateChangeAction<{}, DuelCalcState, ICommonActionParam>
{

  public constructor(
    private readonly changedUnit: Unit
  ) { }

  public resolve(prevState: Readonly<DuelCalcState>, props: {}, param: ICommonActionParam): DuelCalcState | {}
  {
    if (UnitHelper.isUnitEmpty(this.changedUnit))
    {
      return new RemoveUnitAction(this.changedUnit)
        .resolve(prevState, props, param);
    }

    const unitIdx: number = prevState.units.findIndex((currentUnit) => currentUnit.id === this.changedUnit.id);

    const units = [...prevState.units];
    units[unitIdx] = this.changedUnit;
    const results = param.calcService.calculate(units);

    const newState: DuelCalcState = { units, results };

    return new AddUnitIfNecessarySubAction()
      .resolve(newState, props, {});
  }

}

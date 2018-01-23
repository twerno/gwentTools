import { DuelCalcState, Unit } from '@src/duelCalc/DuelCalcComponent';
import { IStateChangeAction, ICommonActionParam } from '@src/duelCalc/action/CommonActionClasses.tsx';
import { UnitHelper } from '@src/duelCalc/helper/UnitHelper';

export class RemoveUnitAction implements IStateChangeAction<{}, DuelCalcState, ICommonActionParam>
{

  public constructor(
    private readonly unit: Unit) { }

  public resolve(prevState: Readonly<DuelCalcState>, props: {}, actionParams: ICommonActionParam): {} | DuelCalcState
  {
    const unitIdx: number = prevState.units.findIndex((currentUnit) => currentUnit.id === this.unit.id);

    const unitOryg: Unit = prevState.units[unitIdx];
    if (!unitOryg || UnitHelper.isUnitEmpty(unitOryg))
    {
      return {};
    }

    const ilePustychJest = prevState.units.filter((u) => UnitHelper.isUnitEmpty(u)).length;
    const iluBrakuje = (prevState.units.length <= 3)
      ? Math.max(0, 3 - ilePustychJest)
      : Math.max(0, 1 - ilePustychJest);

    if (iluBrakuje === 0)
    {
      const units: Unit[] = [...prevState.units];
      units.splice(unitIdx, 1);

      const results = actionParams.calcService.calculate(units);
      return { units, results };
    }
    else
    {
      const units: Unit[] = [...prevState.units];
      units[unitIdx] = UnitHelper.newEmptyUnit();

      const results = actionParams.calcService.calculate(units);
      return { units, results };
    }
  }

}

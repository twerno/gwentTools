import { DuelCalcState, Unit } from '@src/duelCalc/DuelCalcComponent';
import { ChangeUnitAction } from '@src/duelCalc/action/ChangeUnitAction';
import { IStateChangeAction, ICommonActionParam } from '@src/duelCalc/action/CommonActionClasses';

export class StrengthChangeAction implements IStateChangeAction<{}, DuelCalcState, ICommonActionParam>
{

  public constructor(
    private readonly unit: Unit,
    private readonly rawValue: string) { }

  public resolve(prevState: Readonly<DuelCalcState>, props: {}, param: ICommonActionParam): DuelCalcState | {}
  {
    const strength: number | undefined = this.event2Strength();

    const unitIdx: number = prevState.units.findIndex((currentUnit) => currentUnit.id === this.unit.id);
    const unit: Unit | undefined = prevState.units[unitIdx];

    if (!unit || unit.strength === strength)
    {
      return {};
    }

    const changedUnit: Unit = { ...unit, strength };

    return new ChangeUnitAction(changedUnit)
      .resolve(prevState, props, param);
  }

  protected event2Strength(): number | undefined
  {
    const strength: number | undefined = this.text2Int(this.rawValue);
    return ((strength || 0) >= 0) ? strength : undefined;
  }

  protected text2Int(rawValue: string): number | undefined
  {
    return (rawValue || '') === ''
      ? undefined
      : parseInt(rawValue, 0);
  }
}

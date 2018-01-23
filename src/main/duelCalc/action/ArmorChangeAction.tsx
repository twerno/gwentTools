import { DuelCalcState, Unit } from '@src/duelCalc/DuelCalcComponent';
import { ChangeUnitAction } from '@src/duelCalc/action/ChangeUnitAction';
import { ICommonActionParam, IStateChangeAction } from '@src/duelCalc/action/CommonActionClasses';

export class ArmorChangeAction implements IStateChangeAction<{}, DuelCalcState, ICommonActionParam>
{

  public constructor(
    private readonly unit: Unit,
    private readonly rawValue: string) { }

  public resolve(prevState: Readonly<DuelCalcState>, props: {}, param: ICommonActionParam): DuelCalcState | {}
  {
    const armor: number | undefined = this.event2Armor();

    const unitIdx: number = prevState.units.findIndex((currentUnit) => currentUnit.id === this.unit.id);
    const unit: Unit | undefined = prevState.units[unitIdx];

    if (!unit || unit.armor === armor)
    {
      return {};
    }

    const changedUnit: Unit = { ...unit, armor };

    return new ChangeUnitAction(changedUnit)
      .resolve(prevState, props, param);
  }

  protected event2Armor(): number | undefined
  {
    const armor: number | undefined = this.text2Int(this.rawValue);
    return (armor === undefined) ? undefined : Math.max(armor, 0);
  }

  protected text2Int(rawValue: string): number | undefined
  {
    return parseInt(rawValue || '0', 0);
  }
}

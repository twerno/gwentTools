import { Unit } from '@src/duelCalc/DuelCalcComponent';
import { nextId } from '@src/Numerator';

export abstract class UnitHelper
{
  public static isUnitEmpty(unit: Unit): boolean
  {
    return ((unit.strength || 0) === 0)
      && ((unit.armor || 0) === 0);
  }

  public static newEmptyUnit(): Unit
  {
    return { id: nextId(), strength: undefined, armor: undefined };
  }

  public static initialState(): Unit[]
  {
    return [this.newEmptyUnit(), this.newEmptyUnit(), this.newEmptyUnit()];
  }

}

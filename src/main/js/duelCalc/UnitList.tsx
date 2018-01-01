import { Unit } from '@src/duelCalc/DuelCalcComponent';
import { UnitRenderer } from '@src/duelCalc/UnitRenderer';
import * as React from 'react';

export interface UnitListProps
{
  units: Unit[];
  unitChanged: (unit: Unit) => void;
}

export class UnitList extends React.Component<UnitListProps, {}> {

  public render()
  {
    const unitList = this.props.units.map((unit, index) => (
      <UnitRenderer
        unit={unit}
        key={unit.id}
        strengthChangeHandler={(event) => this.strengthChangeHandler(unit, event)}
        armorChangeHandler={(event) => this.armorChangeHandler(unit, event)}
        removeUnitHandler={() => this.removeUnitHandler(unit)}
      />
    ));
    return (<>{unitList}</>);
  }

  private strengthChangeHandler(unit: Unit, event: React.ChangeEvent<HTMLInputElement>): void
  {
    const strength: number | undefined = this.text2Int(event.target.value);
    if ((strength || 0) >= 0)
    {
      this.props.unitChanged({ ...unit, strength });
    }
  }

  private armorChangeHandler(unit: Unit, event: React.ChangeEvent<HTMLInputElement>): void
  {
    const armor: number | undefined = this.text2Int(event.target.value);
    if ((armor || 0) >= 0)
    {
      this.props.unitChanged({ ...unit, armor });
    }
  }

  private text2Int(rawValue: string): number | undefined
  {
    return (rawValue || '') === ''
      ? undefined
      : parseInt(rawValue, 0);
  }

  private removeUnitHandler(unit: Unit): void
  {
    this.props.unitChanged({ ...unit, strength: undefined, armor: undefined });
  }

}

import './DuelCalc.style.less';

import { Unit } from '@src/duelCalc/DuelCalcComponent';
import { UnitRenderer } from '@src/duelCalc/UnitRenderer';
import { ImgSrc } from '@src/ImgSrc';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export interface UnitListProps
{
  units: Unit[];
  unitChanged: (unit: Unit) => void;
  clear: () => void;
}

export class UnitList extends React.Component<UnitListProps, {}> {

  public render()
  {
    const unitList = this.props.units.map((unit, index) => (
      <CSSTransition
        key={unit.id}
        timeout={300}
        classNames="unitEditorRow"
      >
        <UnitRenderer
          unit={unit}
          key={unit.id}
          strengthChangeHandler={(event) => this.strengthChangeHandler(unit, event)}
          armorChangeHandler={(event) => this.armorChangeHandler(unit, event)}
          removeUnitHandler={() => this.removeUnitHandler(unit)}
        />
      </CSSTransition>
    ));
    return (
      <>
      <TransitionGroup>
        {unitList}
      </TransitionGroup>
      <div className="row editInputs" style={{ marginTop: '6px', marginBottom: '6px' }}>
        <Button className="clearAllBtn col-xs-6" onClick={() => this.props.clear()}>
          <img src={ImgSrc.CLEAR} width="16" /> Clear all
            </Button>
      </div>
      </>
    );
  }

  private strengthChangeHandler(unit: Unit, event: React.ChangeEvent<HTMLInputElement>): void
  {
    let strength: number | undefined = this.text2Int(event.target.value);
    if ((strength || 0) >= 0)
    {
      strength = strength === 0 ? undefined : strength;
      this.props.unitChanged({ ...unit, strength });
    }
  }

  private armorChangeHandler(unit: Unit, event: React.ChangeEvent<HTMLInputElement>): void
  {
    let armor: number | undefined = this.text2Int(event.target.value);
    if ((armor || 0) >= 0)
    {
      armor = armor === 0 ? undefined : armor;
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

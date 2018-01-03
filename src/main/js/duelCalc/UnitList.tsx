import './DuelCalc.style.less';

import { Unit, DuelCalcState } from '@src/duelCalc/DuelCalcComponent';
import { UnitRenderer } from '@src/duelCalc/UnitRenderer';
import { ImgSrc } from '@src/ImgSrc';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StrengthChangeAction } from '@src/duelCalc/action/StrengthChangeAction';
import { ArmorChangeAction } from '@src/duelCalc/action/ArmorChangeAction';
import { IStateChangeAction, ICommonActionParam } from '@src/duelCalc/action/CommonActionClasses';
import { RemoveUnitAction } from '@src/duelCalc/action/RemoveUnitAction';
import { ClearUnitsAction } from '@src/duelCalc/action/ClearUnitsAction';

export interface UnitListProps
{
  units: Unit[];
  actionHandler: (action: IStateChangeAction<{}, DuelCalcState, ICommonActionParam>) => void;
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
        <Button className="clearAllBtn col-xs-6" onClick={() => this.clearUnitsHandler()}>
          <img src={ImgSrc.CLEAR} width="16" /> Clear all
            </Button>
      </div>
      </>
    );
  }

  private strengthChangeHandler(unit: Unit, event: React.ChangeEvent<HTMLInputElement>): void
  {
    this.props.actionHandler(new StrengthChangeAction(unit, event.target.value));
  }

  private armorChangeHandler(unit: Unit, event: React.ChangeEvent<HTMLInputElement>): void
  {
    this.props.actionHandler(new ArmorChangeAction(unit, event.target.value));
  }

  private removeUnitHandler(unit: Unit): void
  {
    this.props.actionHandler(new RemoveUnitAction(unit));
  }

  private clearUnitsHandler(): void
  {
    this.props.actionHandler(new ClearUnitsAction());
  }

}

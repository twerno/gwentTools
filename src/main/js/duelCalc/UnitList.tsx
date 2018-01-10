import './DuelCalc.style.less';

import { ArmorChangeAction } from '@src/duelCalc/action/ArmorChangeAction';
import { ClearUnitsAction } from '@src/duelCalc/action/ClearUnitsAction';
import { ICommonActionParam, IStateChangeAction } from '@src/duelCalc/action/CommonActionClasses';
import { RemoveUnitAction } from '@src/duelCalc/action/RemoveUnitAction';
import { StrengthChangeAction } from '@src/duelCalc/action/StrengthChangeAction';
import { DuelCalcState, Unit } from '@src/duelCalc/DuelCalcComponent';
import { UnitRenderer } from '@src/duelCalc/UnitRenderer';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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

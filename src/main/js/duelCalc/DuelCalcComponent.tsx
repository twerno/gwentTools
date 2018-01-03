import './DuelCalc.style.less';

import { DuelCalcService, IDuelResult } from '@src/duelCalc/DuelCalcService';
import { DuelResultList } from '@src/duelCalc/duelResult/DuelResult.comp';
import { UnitList } from '@src/duelCalc/UnitList';
import { nextId } from '@src/Numerator';
import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { IStateChangeAction, ICommonActionParam } from '@src/duelCalc/action/CommonActionClasses';
import { UnitHelper } from '@src/duelCalc/helper/UnitHelper';

export interface Unit
{
  id: string;
  strength: number | undefined;
  armor: number | undefined;
}

export interface DuelCalcState
{
  units: Unit[];
  results: IDuelResult[];
}

export class DuelCalcComponent extends React.Component<{}, DuelCalcState> {

  private calcService: DuelCalcService = new DuelCalcService();

  public constructor(props: {}, context?: any)
  {
    super(props, context);
    this.state = this.emptyState();
  }

  private emptyState(): DuelCalcState
  {
    const units = UnitHelper.initialState();

    // for (let i = 0; i < 6; i++)
    // {
    //   units.push({ id: nextId(), strength: i + 1, armor: 0 });
    // }

    return { units, results: [] };
  }

  public render()
  {
    return (
      <Panel header="Duel calculator" bsStyle="info">
        <div className="editPanel">
          <UnitList
            units={this.state.units}
            actionHandler={(action) => this.actionHandler(action)}
          />
        </div>

        <div className="resultPanel">
          {this.state.results.length > 0
            ? <DuelResultList sortedDuelResults={this.state.results} />
            : ''}
        </div>
      </Panel >
    );
  }

  private actionHandler(action: IStateChangeAction<{}, DuelCalcState, ICommonActionParam>): void
  {
    this.setState((prevState, props) =>
      action.resolve(prevState, props, { calcService: this.calcService }));
  }

  private clearClickHandler(): void
  {
    this.setState((prevState, props) => this.emptyState());
  }

  private calculateResultAndRefresh(): void
  {
    this.setState((prevState, props) =>
    {
      const results = this.calcService.calculate(this.state.units);
      return { results };
    });
  }

}

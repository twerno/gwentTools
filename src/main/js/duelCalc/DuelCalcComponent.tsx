import './DuelCalc.style.less';

import { DuelCalcService, IDuelResult } from '@src/duelCalc/DuelCalcService';
import { DuelResultList } from '@src/duelCalc/duelResult/DuelResult.comp';
import { UnitList } from '@src/duelCalc/UnitList';
import { nextId } from '@src/Numerator';
import * as React from 'react';
import { Panel } from 'react-bootstrap';

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
  private calcDelay: any;

  public constructor(props: {}, context?: any)
  {
    super(props, context);
    this.state = this.emptyState();
  }

  private emptyState(): DuelCalcState
  {
    const units = [this.newUnit(), this.newUnit(), this.newUnit()];

    // this.state = { units: [], results: [] };

    // for (let i = 0; i < 40; i++)
    // {
    //   this.state.units.push({ id: nextId(), strength: i + 1, armor: 0 });
    // }

    return { units, results: [] };
  }

  public componentWillMount(): void
  {
    this.delayResultCalculation();
  }

  public componentWillUnmount(): void
  {
    clearTimeout(this.calcDelay);
  }

  public render()
  {
    return (
      <Panel header="Duel calculator" bsStyle="info">
        <div className="editPanel">
          <UnitList
            units={this.state.units}
            unitChanged={(unit) => this.unitChangedHandler(unit)}
            clear={() => this.clearClickHandler()}
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

  private newUnit(): Unit
  {
    return { id: nextId(), strength: undefined, armor: undefined };
  }

  private unitChangedHandler(unit: Unit): void
  {
    this.setState((prevState, props) =>
    {
      let units: Unit[];
      let results = prevState.results;

      clearTimeout(this.calcDelay);
      if (this.isUnitEmpty(unit))
      {
        units = this.removeUnit(unit, prevState);
      }
      else
      {
        units = [...prevState.units];
        const index: number = units.findIndex((currentUnit) => currentUnit.id === unit.id);
        if (index >= 0)
        {
          units[index] = unit;
        }
      }

      results = this.calcService.calculate(units);
      const ilePustychJest = units.filter((u) => this.isUnitEmpty(u)).length;
      const ilePowinnoByc = Math.max(3 - units.length + ilePustychJest, 1);
      for (let i = ilePustychJest; i < ilePowinnoByc; i++)
      {
        units.push(this.newUnit());
      }

      return { units, results };
    });
  }

  private clearClickHandler(): void
  {
    this.setState((prevState, props) => this.emptyState());
  }

  private calculateResultAndRefresh(): void
  {
    clearTimeout(this.calcDelay);
    this.setState((prevState, props) =>
    {
      const results = this.calcService.calculate(this.state.units);
      return { results };
    });
  }

  private removeUnit(unit: Unit, prevState: DuelCalcState): Unit[]
  {
    const index: number = prevState.units.findIndex((currentUnit) => currentUnit.id === unit.id);
    if (index >= 0 && prevState.units.length > 1)
    {
      const units: Unit[] = [
        ...prevState.units.slice(0, index),
        ...prevState.units.slice(index + 1, prevState.units.length)];
      return units;
    }
    return prevState.units;
  }

  private delayResultCalculation(): void
  {
    clearTimeout(this.calcDelay);
    this.calcDelay = setTimeout(() => this.calculateResultAndRefresh(), 200);
  }

  private isUnitEmpty(unit: Unit): boolean
  {
    return ((unit.strength || 0) === 0)
      && ((unit.armor || 0) === 0);
  }

}

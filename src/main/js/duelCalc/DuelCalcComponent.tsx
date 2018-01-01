import './DuelCalc.style.less';

import { DuelCalcService, IDuelResult } from '@src/duelCalc/DuelCalcService';
import { DuelResultList } from '@src/duelCalc/duelResult/DuelResult.comp';
import { UnitList } from '@src/duelCalc/UnitList';
import { ImgSrc } from '@src/ImgSrc';
import { nextId } from '@src/Numerator';
import * as React from 'react';
import { Button, Panel } from 'react-bootstrap';

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
    this.initState();
  }

  private initState(): void
  {
    this.state = { units: [this.newUnit(), this.newUnit(), this.newUnit()], results: [] };

    this.state = { units: [], results: [] };

    for (let i = 0; i < 12; i++)
    {
      this.state.units.push({ id: nextId(), strength: i + 1, armor: 0 });
    }
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
            unitRemoved={(unit) => this.unitRemovedHandler(unit)}
          />
          <br />
          <Button onClick={() => this.dodajUnitClickHandler()} bsStyle="primary">
            <img src={ImgSrc.ADD} width="20" /> Add Unit
          </Button>
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

  private dodajUnitClickHandler(): void
  {
    this.setState((prevState, props) =>
    {
      const units = [...prevState.units, this.newUnit()];
      return { units };
    });
  }

  private unitChangedHandler(unit: Unit): void
  {
    this.setState((prevState, props) =>
    {
      const units = [...prevState.units];
      const index: number = units.findIndex((currentUnit) => currentUnit.id === unit.id);
      if (index >= 0)
      {
        units[index] = unit;
      }
      return { units };
    });
    this.delayResultCalculation();
  }

  private calculateResultAndRefresh(): void
  {
    this.setState((prevState, props) =>
    {
      const results = this.calcService.calculate(this.state.units);
      return { results };
    });
  }

  private unitRemovedHandler(unit: Unit): void
  {
    this.setState((prevState, props) =>
    {
      const index: number = prevState.units.findIndex((currentUnit) => currentUnit.id === unit.id);
      if (index >= 0)
      {
        clearTimeout(this.calcDelay);
        const units: Unit[] = [
          ...prevState.units.slice(0, index),
          ...prevState.units.slice(index + 1, prevState.units.length)];
        const results = this.calcService.calculate(units);
        return { units, results };
      }

      return prevState;
    });
  }

  private delayResultCalculation(): void
  {
    clearTimeout(this.calcDelay);
    this.calcDelay = setTimeout(() => this.calculateResultAndRefresh(), 200);
  }

}

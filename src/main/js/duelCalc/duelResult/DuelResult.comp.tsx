import './DuelResult.style.less';

import { IDuelResult } from '@src/duelCalc/DuelCalcService';
import { DuelResultListRow } from '@src/duelCalc/duelResult/DuelResultRow.comp';
import * as React from 'react';

/* ********************************************* */
/* DuelResultList                                */
/* ********************************************* */

export interface IDuelResultListProps
{
  sortedDuelResults: IDuelResult[];
}

interface IDuelResultListState
{
  showAll: boolean;
}

export class DuelResultList extends React.Component<IDuelResultListProps, IDuelResultListState>
{

  public static readonly ROW_LIMIT = 20;

  public constructor(props: IDuelResultListProps, context?: any)
  {
    super(props, context);
    this.state = { showAll: false };
  }

  public shouldComponentUpdate(nextProps: IDuelResultListProps, nextState: IDuelResultListState): boolean
  {
    if (this.props.sortedDuelResults.length !== nextProps.sortedDuelResults.length
      || this.state.showAll !== nextState.showAll)
    {
      return true;
    }

    for (let i = 0; i < this.props.sortedDuelResults.length; i++)
    {
      const thisDuel = this.props.sortedDuelResults[i];
      const nextDuel = nextProps.sortedDuelResults[i];

      if (thisDuel.id !== nextDuel.id || thisDuel.points !== nextDuel.points)
      {
        return true;
      }
    }

    return false;
  }

  public componentWillReceiveProps(nextProps: IDuelResultListProps): void
  {
    this.setState((prevState, props) => ({ showAll: false }));
  }

  public render()
  {
    const maxScore: number = this.props.sortedDuelResults
      .map((score) => score.points)
      .reduce((a, b) => Math.max(a, b));

    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="textCentered">Points</th>
              <th />
              <th className="textCentered">Duel</th>
              <th />
              <th className="textCentered">Duelist 1</th>
              <th className="textCentered">Duelist 2</th>
              {/* <th className="hideUnlessLarge" /> */}
            </tr>
          </thead>
          <tbody>
            {
              this.props.sortedDuelResults
                .map((duelResult, index) =>
                  (index < DuelResultList.ROW_LIMIT || this.state.showAll)
                    ? <DuelResultListRow
                      duelResult={duelResult}
                      maxScore={maxScore}
                      key={duelResult.id}
                    />
                    : null
                )
            }
          </tbody>
        </table>
        {!this.state.showAll && this.props.sortedDuelResults.length >= DuelResultList.ROW_LIMIT
          ? <button type="button" className="btn btn-link" onClick={() => this.showAllClickHandler()}>
            {`Show ${this.props.sortedDuelResults.length - DuelResultList.ROW_LIMIT} more`}
          </button>
          : null}
      </div>
    );
  }

  private showAllClickHandler(): void
  {
    this.setState((prevState, props) => ({ showAll: true }));
  }
}

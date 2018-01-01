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

export class DuelResultList extends React.Component<IDuelResultListProps, {}>
{

  public shouldComponentUpdate(nextProps: IDuelResultListProps, nextState: {}): boolean
  {
    if (this.props.sortedDuelResults.length !== nextProps.sortedDuelResults.length)
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
                  <DuelResultListRow
                    duelResult={duelResult}
                    maxScore={maxScore}
                    key={duelResult.id}
                  />
                )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

import './DuelResult.style.less';

import { IDuelResult } from '@src/duelCalc/DuelCalcService';
import { Duelist } from '@src/duelCalc/duelResult/Duelist.comp';
import { ImgSrc } from '@src/ImgSrc';
import * as React from 'react';

/* ********************************************* */
/* DuelResultListRow                             */
/* ********************************************* */

interface IDuelResultListRowPops
{
  duelResult: IDuelResult;
  maxScore: number;
}

export class DuelResultListRow extends React.Component<IDuelResultListRowPops, {}> {

  public shouldComponentUpdate(nextProps: IDuelResultListRowPops, nextState: {}): boolean
  {
    return this.props.duelResult.id !== nextProps.duelResult.id
      || this.props.maxScore !== nextProps.maxScore;
  }

  public render(): JSX.Element
  {
    const duelResult = this.props.duelResult;

    return (
      <tr key={duelResult.id} style={{ textAlign: 'center' }}>
        <DuelResultScoreColumn points={duelResult.points} maxScore={this.props.maxScore} />
        <DuelResultDataColumns duelResult={duelResult} />
      </tr>
    );
  }
}

/* ********************************************* */
/* DuelListScoreColumn                           */
/* ********************************************* */

interface DuelListScoreColumnProps
{
  points: number;
  maxScore: number;
}

class DuelResultScoreColumn extends React.PureComponent<DuelListScoreColumnProps, {}> {

  public render(): JSX.Element
  {
    return (
      <td className="veticalMiddle" style={{ paddingLeft: '10px', paddingRight: '20px', fontSize: '16px' }}>
        {this.props.points}
        {
          this.props.points === this.props.maxScore
            ? <img src={ImgSrc.CROWN} className="crownIcon" />
            : <span className="text-muted">{` (-${this.props.maxScore - this.props.points})`}</span>
        }
      </td>
    );
  }
}

/* ********************************************* */
/* DuelListDataColumns                           */
/* ********************************************* */

interface DuelListDataColumnsPops
{
  duelResult: IDuelResult;
}

class DuelResultDataColumns extends React.Component<DuelListDataColumnsPops, {}> {

  public shouldComponentUpdate(nextProps: DuelListDataColumnsPops, nextState: {}): boolean
  {
    return this.props.duelResult.id !== nextProps.duelResult.id;
  }

  public render(): JSX.Element
  {
    const duelResult = this.props.duelResult;

    return (
      <>
      <td className="veticalMiddle" style={{ textAlign: 'right' }}>
        <Duelist
          strength={duelResult.duelist1.initial.strength || 0}
          armor={duelResult.duelist1.initial.armor || 0}
        />
      </td>
      <td className="veticalMiddle">
        <img className="duelIcon" src={ImgSrc.DUEL_BLACK} />
      </td>
      <td className="veticalMiddle" style={{ textAlign: 'left' }}>
        <Duelist
          strength={duelResult.duelist2.initial.strength || 0}
          armor={duelResult.duelist2.initial.armor || 0}
        />
      </td>
      <td className="veticalMiddle">
        <Duelist
          strength={duelResult.duelist1.remaining.strength}
          armor={duelResult.duelist1.remaining.armor}
        />
      </td>
      <td className="veticalMiddle">
        <Duelist
          strength={duelResult.duelist2.remaining.strength}
          armor={duelResult.duelist2.remaining.armor}
        />
      </td>
      </>
    );
  }
}

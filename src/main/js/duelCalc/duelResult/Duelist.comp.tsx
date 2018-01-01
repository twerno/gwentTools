import './DuelResult.style.less';

import { ImgSrc } from '@src/ImgSrc';
import * as React from 'react';

export interface DuelistProps
{
  strength: number;
  armor: number;
}

export class Duelist extends React.PureComponent<DuelistProps, {}> {

  public render()
  {
    if (this.props.strength === 0)
    {
      return <img src={ImgSrc.SKULL} className="bigIcon" />;
    }

    return (
      <div>
        <div>
          <span>
            <img src={ImgSrc.SWORD} className="duelistLittleIcon" />
          </span>
          <span>
            {this.props.strength}
          </span>
        </div>
        <div>
          <span>
            <img src={ImgSrc.SHIELD} className="duelistLittleIcon" />
          </span>
          <span>
            {this.props.armor}
          </span>
        </div>
      </div>
    );
  }
}

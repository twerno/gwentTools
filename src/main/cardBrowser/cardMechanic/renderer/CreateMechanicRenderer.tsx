import * as React from 'react';

import { CardService } from '@src/cardBrowser/Card.service';
import { BasicFilterService } from '@src/cardBrowser/components/filter/BasicFilter.service';
import { CardSmall } from '@src/cardBrowser/components/card/CardSmall';
import { nextId } from '@src/commons/Numerator';
import { CreateAbility } from '@src/commons/card/Ability';

export interface CreateMechanicRendererProps
{
  mechanic: CreateAbility;
  basicCardService: BasicFilterService;
}

export class CreateMechanicRenderer extends React.PureComponent<CreateMechanicRendererProps, {}> {

  public render()
  {
    const cards = this.props.basicCardService.filter(this.props.mechanic.filter);

    return (
      <ul>
        {cards.map(c => <li key={c.url}><CardSmall card={c} /></li>)}
      </ul>
    );
  }
}

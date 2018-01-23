import * as React from 'react';
import { ArmorAbility } from '@src/commons/card/Ability';

export interface ArmorMechanicRendererProps
{
  mechanic: ArmorAbility;
}

export class ArmorMechanicRendererBasic extends React.PureComponent<ArmorMechanicRendererProps, {}> {

  public render()
  {
    return <>{this.props.mechanic.value} <b>Amor</b></>;
  }

}

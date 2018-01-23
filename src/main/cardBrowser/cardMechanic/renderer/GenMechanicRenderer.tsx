import * as React from 'react';
import { IGameMechanic, ArmorMechanic } from '@src/cardBrowser/cardMechanic/renderer/Mechanic';
import { ArmorMechanicRendererBasic } from '@src/cardBrowser/cardMechanic/renderer/ArmorMechanicRenderer';

export interface GenMechanicRendererPops
{
  mechanic: IGameMechanic;
  mode: 'basic' | 'extended';
}

export class GenMechanicRenderer extends React.PureComponent<GenMechanicRendererPops, {}>
{
  public render()
  {
    return this.props.mode === 'basic'
      ? this.renderBasic()
      : this.renderExtended();
  }

  private renderBasic()
  {
    switch (this.props.mechanic.mechanicId)
    {
      case 'ARMOR': return <ArmorMechanicRendererBasic mechanic={this.props.mechanic as ArmorMechanic} />;
      default: return <>NO BASIC RENDERER FOR {this.props.mechanic.mechanicId}</>;
    }
  }

  private renderExtended()
  {
    switch (this.props.mechanic.mechanicId)
    {
      case 'ARMOR': return <ArmorMechanicRendererBasic mechanic={this.props.mechanic as ArmorMechanic} />;
      default: return <>NO EXTENDED RENDERER FOR {this.props.mechanic.mechanicId}</>;
    }
  }
}

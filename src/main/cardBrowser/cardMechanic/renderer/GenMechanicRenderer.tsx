import * as React from 'react';
import { ArmorMechanicRendererBasic } from '@src/cardBrowser/cardMechanic/renderer/ArmorMechanicRenderer';
import { ICardAbility, ArmorAbility, CreateAbility } from '@src/commons/card/Ability';
import { CreateMechanicRenderer } from '@src/cardBrowser/cardMechanic/renderer/CreateMechanicRenderer';
import { BasicFilterService } from '@src/cardBrowser/components/filter/BasicFilter.service';

export interface GenMechanicRendererPops
{
  mechanic: ICardAbility;
  mode: 'basic' | 'extended';
  basicCardService: BasicFilterService;
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
      case 'ARMOR': return <ArmorMechanicRendererBasic mechanic={this.props.mechanic as ArmorAbility} />;
      case 'CREATE': return <CreateMechanicRenderer
        mechanic={this.props.mechanic as CreateAbility}
        basicCardService={this.props.basicCardService}
      />;
      default: return <>NO BASIC RENDERER FOR {this.props.mechanic.mechanicId}</>;
    }
  }

  private renderExtended()
  {
    switch (this.props.mechanic.mechanicId)
    {
      case 'ARMOR': return <ArmorMechanicRendererBasic mechanic={this.props.mechanic as ArmorAbility} />;
      default: return <>NO EXTENDED RENDERER FOR {this.props.mechanic.mechanicId}</>;
    }
  }
}

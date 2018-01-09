import './style.less';

import { CardGalleryTable } from '@src/cardBrowser/CardGalleryTable';
import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { CardFilterComponent } from '@src/cardBrowser/FilterComponent';
import * as React from 'react';

export interface FilterState
{
  filter: IFilter;
}

export class CardBrowserComponent extends React.Component<{}, FilterState> {

  private service: CardService = new CardService();

  public constructor(props: {}, context?: any)
  {
    super(props, context);
    this.state = { filter: {} };
  }

  private onFilterChange(filter: IFilter): void
  {
    this.setState({ filter });
  }

  public render()
  {
    return (
      <>
      <CardFilterComponent
        service={this.service}
        filter={this.state.filter}
        onFilterChange={filter => this.onFilterChange(filter)}
      />
      <CardGalleryTable
        service={this.service}
        filter={this.state.filter}
      />
      </>
    );
  }
}

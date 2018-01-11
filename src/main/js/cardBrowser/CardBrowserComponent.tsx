import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { CardFilterComponent } from '@src/cardBrowser/FilterComponent';
import { CardGalleryGrid } from '@src/cardGallery/CardGalleryGrid';
import { CardGalleryTable } from '@src/cardGallery/CardGalleryTable';
import * as React from 'react';
import { Checkbox } from 'react-bootstrap';

export interface CardBrowserComponentState
{
  filter: IFilter;
  gridLayout: boolean;
}

export class CardBrowserComponent extends React.Component<{}, CardBrowserComponentState> {

  private service: CardService = new CardService();

  public constructor(props: {}, context?: any)
  {
    super(props, context);
    this.state = { filter: {}, gridLayout: true };
  }

  private onFilterChange(filter: IFilter): void
  {
    this.setState({ filter });
  }

  public render()
  {
    const layout = (this.state.gridLayout
      ? <CardGalleryGrid service={this.service} filter={this.state.filter} />
      : <CardGalleryTable service={this.service} filter={this.state.filter} />
    );
    return (
      <>
      <CardFilterComponent
        service={this.service}
        filter={this.state.filter}
        onFilterChange={filter => this.onFilterChange(filter)}
      />
      <Checkbox onChange={event => this.layoutChangeHandler(event)}>
        Table layout
      </Checkbox>
      {layout}
      </>
    );
  }

  private layoutChangeHandler(event: React.FormEvent<Checkbox>): void
  {
    this.setState({ gridLayout: !this.state.gridLayout });
  }
}

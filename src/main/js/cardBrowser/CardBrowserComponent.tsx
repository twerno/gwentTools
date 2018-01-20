import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { CardFilterComponent } from '@src/cardBrowser/FilterComponent';
import { CardGalleryGrid } from '@src/cardGallery/CardGalleryGrid';
import { CardGalleryTable } from '@src/cardGallery/CardGalleryTable';
import * as React from 'react';

export enum CardRenderer
{
  CARD, WIDE, TABLE
}

export interface CardBrowserComponentState
{
  filter: IFilter;
  renderer: CardRenderer;
}

export class CardBrowserComponent extends React.Component<{}, CardBrowserComponentState> {

  private service: CardService = new CardService();

  public constructor(props: {}, context?: any)
  {
    super(props, context);
    this.state = { filter: {}, renderer: CardRenderer.CARD };
  }

  private onFilterChange(filter: IFilter): void
  {
    this.setState({ filter });
  }

  public render()
  {
    const layout = this.state.renderer === CardRenderer.TABLE
      ? <CardGalleryTable service={this.service} filter={this.state.filter} />
      : <CardGalleryGrid service={this.service} filter={this.state.filter} renderer={this.state.renderer} />;

    return (
      <>
      <CardFilterComponent
        service={this.service}
        filter={this.state.filter}
        onFilterChange={filter => this.onFilterChange(filter)}
      />
      <a onClick={() => this.setRenderer(CardRenderer.CARD)}>CARD</a>&nbsp;
      <a onClick={() => this.setRenderer(CardRenderer.WIDE)}>WIDE</a>&nbsp;
      <a onClick={() => this.setRenderer(CardRenderer.TABLE)}>TABLE</a>&nbsp;
    <div style={{ marginTop: '20px' }}>
        {layout}
      </div>
      </>
    );
  }

  private setRenderer(renderer: CardRenderer): void
  {
    if (this.state.renderer !== renderer)
    {
      this.setState({ renderer });
    }
  }
}

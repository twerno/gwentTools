import { CardService } from '@src/cardBrowser/Card.service';
import { CardGalleryGrid } from '@src/cardBrowser/components/cardGallery/CardGalleryGrid';
import { CardGalleryTable } from '@src/cardBrowser/components/cardGallery/CardGalleryTable';
import { BasicFilterComp } from '@src/cardBrowser/components/filter/BasicFilter.comp';
import {
  BasicFilterService,
  IBasicCardFilter,
} from '@src/cardBrowser/components/filter/BasicFilter.service';
import { ICardv1 } from '@src/commons/card/CardStruct';
import * as React from 'react';
import { Button } from 'react-bootstrap';

export enum CardRenderer
{
  CARD_MEDIUM, CARD_MEDIUM_MOBILE, CARD_SMALL, CARD_WIDE, TABLE, PREVIEW
}

export interface CardBrowserComponentState
{
  basicFilter: IBasicCardFilter;
  renderer: CardRenderer;
  card: ICardv1 | null;
}

export class CardBrowserComponent extends React.Component<{}, CardBrowserComponentState> {

  private service: CardService = new CardService();
  private basicFilterService = new BasicFilterService(this.service);
  private basicCardService = new BasicFilterService(this.service);

  public constructor(props: {}, context?: any)
  {
    super(props, context);
    this.state = { basicFilter: {}, renderer: CardRenderer.CARD_MEDIUM, card: null };
  }

  private onFilterChange(basicFilter: IBasicCardFilter): void
  {
    this.setState({ basicFilter });
  }

  public render()
  {
    const cards = this.basicFilterService.filter(this.state.basicFilter);

    const layout = this.state.renderer === CardRenderer.TABLE
      ? <CardGalleryTable cards={cards} />
      : <CardGalleryGrid
        cards={cards}
        renderer={this.state.renderer}
        basicCardService={this.basicCardService}
        cardSelected={card => this.setState({ card })}
      />;

    return (
      <>
      <BasicFilterComp
        service={this.service}
        basicCardFilter={this.state.basicFilter}
        onFilterChange={filter => this.onFilterChange(filter)}
        basicFilterService={this.basicFilterService}
      />
      <div style={{ paddingBottom: '40px' }}>
        <Button onClick={() => this.setRenderer(CardRenderer.CARD_MEDIUM_MOBILE)}>CARD MOBILE</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.CARD_MEDIUM)}>CARD</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.CARD_WIDE)}>WIDE</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.CARD_SMALL)}>SMALL</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.TABLE)}>TABLE</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.PREVIEW)}>PREVIEW</Button>&nbsp;
      </div>

      <div>
        {layout}
        {/* <CardPreview card={this.state.card} basicCardService={this.basicCardService} /> */}
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

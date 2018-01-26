import './react-select.less';

import * as React from 'react';
import * as Select from 'react-select';
import { CardService, ICardFilterOption } from '@src/cardBrowser/Card.service';
import { IBasicCardFilter, BasicFilterService } from '@src/cardBrowser/components/filter/BasicFilter.service';
import { CardType, CardRarity, CardColor, Factionv1, CardLoyalty, CardSet } from '@src/commons/card/CardStruct';
import { InputGroup } from 'react-bootstrap';

export interface BasicFilterCompProps
{
  service: CardService;
  basicCardFilter: IBasicCardFilter;
  onFilterChange: (newBasicFilter: IBasicCardFilter) => void;
  basicFilterService: BasicFilterService;
}

export interface BasicFilterCompState
{
  filterNameVal: string;
}

export class BasicFilterComp extends React.Component<BasicFilterCompProps, BasicFilterCompState> {

  public constructor(props: BasicFilterCompProps)
  {
    super(props);
    this.state = { filterNameVal: this.props.basicCardFilter.name || '' };
  }

  public render()
  {
    const options = this.props.service.getOptions(this.props.basicCardFilter);
    return (
      <>
      <div className="row">

        <div className="section col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Strength"
            value={this.state.filterNameVal}
            onChange={(event) => this.setState({ filterNameVal: event.target.value })}
            onBlur={e => this.callOnChange({ name: this.state.filterNameVal })}
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="rarities"
            value={this.props.basicCardFilter.rarities}
            onChange={selection => this.cardRarityChangeHandler(selection)}
            options={this.mapSet2Options(options.rarities)}
            placeholder="Any rarity"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="cardTypes"
            value={this.props.basicCardFilter.cardTypes}
            onChange={selection => this.cardTypeChangeHandler(selection)}
            options={this.mapSet2Options(options.cardTypes)}
            placeholder="Any type"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="factions"
            value={this.props.basicCardFilter.factions}
            onChange={selection => this.cardFactionChangeHandler(selection)}
            options={this.mapSet2Options(options.factions)}
            placeholder="Any faction"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="tags"
            value={this.props.basicCardFilter.tags}
            onChange={selection => this.cardTagsChangeHandler(selection)}
            options={this.mapSet2Options(options.tags)}
            placeholder="Any tag"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="loyalty"
            value={this.props.basicCardFilter.loyalty}
            onChange={selection => this.cardLoyaltyChangeHandler(selection)}
            options={this.mapSet2Options(options.loyalty)}
            placeholder="Any loyalty"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="set"
            value={this.props.basicCardFilter.cardSets}
            onChange={selection => this.cardSetsChangeHandler(selection)}
            options={this.mapSet2Options(options.sets)}
            placeholder="Any Set"
          />
        </div>
      </div>
      <div style={{ color: 'white' }}>
        BasicFilter: {JSON.stringify(this.props.basicCardFilter)}
        <br />
        Filter: {JSON.stringify(this.props.basicFilterService.basicFilter2Filter(this.props.basicCardFilter))}
      </div>
      </>
    );
  }

  private cardTypeChangeHandler(selection: Select.Option | Select.Options | null): void
  {
    const options = this.optionsFromSelection(selection);
    const cardTypes: CardType[] = options.map(o => o.value as CardType);
    this.callOnChange({ cardTypes });
  }

  private cardTagsChangeHandler(selection: Select.Option | Select.Options | null): void
  {
    const options = this.optionsFromSelection(selection);
    const tags: string[] = options.map(o => o.value as string);
    this.callOnChange({ tags });
  }

  private cardRarityChangeHandler<T>(selection: Select.Option | Select.Options | null): void
  {
    const options = this.optionsFromSelection(selection);
    const rarities: CardRarity[] = options.map(o => o.value as CardRarity);
    this.callOnChange({ rarities });
  }

  private cardColorChangeHandler(selection: Select.Option | Select.Options | null): void
  {
    const options = this.optionsFromSelection(selection);
    const cardColors: CardColor[] = options.map(o => o.value as CardColor);
    this.callOnChange({ cardColors });
  }

  private cardFactionChangeHandler(selection: Select.Option | Select.Options | null): void
  {
    const options = this.optionsFromSelection(selection);
    const factions: Factionv1[] = options.map(o => o.value as Factionv1);
    this.callOnChange({ factions });
  }

  private cardLoyaltyChangeHandler(selection: Select.Option | Select.Options | null): void
  {
    const options = this.optionsFromSelection(selection);
    const loyalty: CardLoyalty | undefined = options.length > 0
      ? options[0].value as CardLoyalty
      : undefined;
    this.callOnChange({ loyalty });
  }

  private cardSetsChangeHandler(selection: Select.Option | Select.Options | null): void
  {
    const options = this.optionsFromSelection(selection);
    const cardSets: CardSet[] = options.map(o => o.value as CardSet);
    this.callOnChange({ cardSets });
  }

  private callOnChange(changes: IBasicCardFilter): void
  {
    this.props.onFilterChange({ ...this.props.basicCardFilter, ...changes });
  }

  private mapSet2Options(set: Array<ICardFilterOption<any>>): Select.Options
  {
    return set.map(e => ({ label: `${e.value} (${e.count})`, value: e.value }));
  }

  private optionsFromSelection(selection: Select.Option | Select.Options | null): Select.Option[]
  {
    const options: Select.Option[] =
      selection === null
        ? []
        : selection instanceof Array
          ? selection
          : [selection];
    return options;
  }
}

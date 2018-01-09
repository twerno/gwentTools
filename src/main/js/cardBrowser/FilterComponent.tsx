import './react-select.less';

import { CardService, ICardFilterOption, IFilter } from '@src/cardBrowser/CardService';
import { CardColor, CardLoyalty, CardRarity, CardType, Factionv1 } from '@src/commons/CardStruct';
import * as React from 'react';
import * as Select from 'react-select';

export interface CardFilterComponentProp
{
  filter: IFilter;
  service: CardService;
  onFilterChange: (newFilter: IFilter) => void;
}

export class CardFilterComponent extends React.Component<CardFilterComponentProp, {}> {

  public render()
  {
    const options = this.props.service.getOptions(this.props.filter);

    return (
      <>
      <div className="row">
        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="cardColors"
            value={this.props.filter.cardColors}
            onChange={selection => this.cardColorChangeHandler(selection)}
            options={this.mapSet2Options(options.cardColors)}
            placeholder="Any color"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="rarities"
            value={this.props.filter.rarities}
            onChange={selection => this.cardRarityChangeHandler(selection)}
            options={this.mapSet2Options(options.rarities)}
            placeholder="Any rarity"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="cardTypes"
            value={this.props.filter.cardTypes}
            onChange={selection => this.cardTypeChangeHandler(selection)}
            options={this.mapSet2Options(options.cardTypes)}
            placeholder="Any type"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="factions"
            value={this.props.filter.factions}
            onChange={selection => this.cardFactionChangeHandler(selection)}
            options={this.mapSet2Options(options.factions)}
            placeholder="Any faction"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="tags"
            value={this.props.filter.tags}
            onChange={selection => this.cardTagsChangeHandler(selection)}
            options={this.mapSet2Options(options.tags)}
            placeholder="Any tag"
          />
        </div>

        <div className="section col-md-2">
          <Select.default
            multi={true}
            name="loyalty"
            value={this.props.filter.loyalty}
            onChange={selection => this.cardLoyaltyChangeHandler(selection)}
            options={this.mapSet2Options(options.loyalty)}
            placeholder="Any loyalty"
          />
        </div>
      </div>
      </>
    );
  }

  private cardTypeChangeHandler(selection: Select.Option | Select.Options | null): void
  {
    const options = this.optionsFromSelection(selection);
    const cardType: CardType[] = options.map(o => o.value as CardType);
    this.callOnChange({ cardType });
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
    const cardRarity: CardRarity[] = options.map(o => o.value as CardRarity);
    this.callOnChange({ cardRarity });
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
    const loyalty: CardLoyalty[] = options.map(o => o.value as CardLoyalty);
    this.callOnChange({ loyalty });
  }

  private callOnChange(changes: {}): void
  {
    this.props.onFilterChange({ ...this.props.filter, ...changes });
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

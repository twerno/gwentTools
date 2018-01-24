import { CreateAbility } from '@src/commons/card/Ability';
import * as React from 'react';
import { CardColor } from '@src/commons/card/CardStruct';
import { toCapitalizedLowerCase } from '@src/commons/String.helper';

export class CreateMechanicHelper
{
  public ability2Text(ability: CreateAbility): JSX.Element
  {
    let result = 'Create a ';
    result += this.filterToStr(ability.filter.cardColors);
    result += this.filterToStr(ability.filter.tags);
    result += this.filterToStr(ability.filter.cardTypes);
    result = result.trim() + '.';
    return <>{result}</>;
  }

  public filterToStr<T>(filter: T[] | undefined): string
  {
    if (filter && filter.length === 1)
    {
      return toCapitalizedLowerCase(filter[0].toString()) + ' ';
    }
    if (filter && filter.length > 1)
    {
      return filter.map(c => toCapitalizedLowerCase(c.toString()))
        .reduce((a, b, index) =>
          index === filter.length - 1
            ? `${a} or ${b}`
            : `${a}, ${b}`
        ) + ' ';
    }
    return '';
  }
}

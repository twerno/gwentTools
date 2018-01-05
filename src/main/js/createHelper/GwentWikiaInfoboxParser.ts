export interface IInfobox
{
  title: string;
  image: string;
  cardtype: string;
  type: string;
  faction: string;
  unittype: string;
  loyalty: string;
  strength: string;
  abilitytype: string;
  rarity: string;
  craft: string;
  mill: string;
  transmute: string;
  mill_powder: string;
  illustrator: string;
  description: string;
}

export class GwentWikiaInfoboxParser
{

  private nameParser = /\|name=(.+?)$/;

  // public parse(rawInfobox: string): IInfobox
  // {

  // }
}

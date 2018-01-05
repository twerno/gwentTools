import * as fs from 'fs';

export interface IInfobox
{
  name: string | undefined;
  title: string | undefined;
  image: string | undefined;
  cardtype: string | undefined;
  type: string[] | undefined;
  faction: string | undefined;
  unittype: string | undefined;
  loyalty: string | undefined;
  strength: string | undefined;
  rarity: string | undefined;
  craft: string | undefined;
  mill: string | undefined;
  transmute: string | undefined;
  mill_powder: string | undefined;
  illustrator: string | undefined;
  description: string | undefined;
}

class Parser
{
  public constructor(private infobox: string) { }

  public get(field: string): string | undefined
  {
    const group = this.infobox.match(`\s*${field}\s*=(.+)`);
    if (group && group.length > 1)
    {
      return group[1].trim();
    }
    return undefined;
  }

  public get2<T>(field: string, converter: (value: string) => T): T | undefined
  {
    const val = this.get(field);
    if (val)
    {
      return converter(val);
    }
    return undefined;
  }
}

export class GwentWikiaInfoboxParser
{

  public parseAllFiles(dir: string): IInfobox[]
  {
    const result: IInfobox[] = [];

    const files: string[] = fs.readdirSync(`${dir}/`);
    for (const file of files)
    {
      const infoBox = fs.readFileSync(`${dir}/${file}`, 'utf8');
      result.push(this.parse(infoBox));
    }
    return result;
  }

  public parse(infobox: string): IInfobox
  {
    const paser = new Parser(infobox);

    return {
      name: paser.get('name'),
      title: paser.get('title'),
      image: paser.get('image'),
      cardtype: paser.get('cardtype'),
      type: paser.get2('type', (list) => list.split(',').map((val) => this.removeHtmlTagsAndTrim(val))),
      faction: paser.get('faction'),
      unittype: paser.get('unittype'),
      loyalty: paser.get('loyalty'),
      strength: paser.get('strength'),
      rarity: paser.get('rarity'),
      craft: paser.get('craft'),
      mill: paser.get('mill'),
      transmute: paser.get('transmute'),
      mill_powder: paser.get('mill\s+powder'),
      illustrator: paser.get('illustrator'),
      description: paser.get('description')
    };
  }

  private removeHtmlTagsAndTrim(val: string): string
  {
    return val.replace(/<.+?>/g, '').trim();
  }
}

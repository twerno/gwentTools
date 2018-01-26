import * as fs from 'fs';

import { GwentWikiaHelper } from './GwentWikiaHelper';

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
  url: string | undefined;
  set: string | undefined;
  removed: boolean | undefined;
}

class Parser
{
  public constructor(private infobox: string) { }

  public get(field: string): string | undefined
  {
    const group = this.infobox.match(`\\|\\s*${field}\\s*=(.+)`);
    if (group && group.length > 1 && group[1])
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
      try
      {
        const infoBox = fs.readFileSync(`${dir}/${file}`, 'utf8');
        result.push(this.parse(infoBox));
      } catch (e)
      {
        GwentWikiaHelper.logError(`[${file}] ${e.message}`);
      }
    }
    return result;
  }

  public parse(infobox: string): IInfobox
  {
    const parser = new Parser(infobox);

    return {
      name: parser.get('name'),
      title: parser.get('title'),
      image: parser.get('image'),
      cardtype: parser.get('cardtype'),
      type: this.type(parser),
      faction: parser.get('faction'),
      unittype: parser.get('unittype'),
      loyalty: parser.get('loyalty'),
      strength: parser.get('strength'),
      rarity: parser.get('rarity'),
      craft: parser.get('craft'),
      mill: parser.get('mill'),
      transmute: parser.get('transmute'),
      mill_powder: parser.get('mill\s+powder'),
      illustrator: parser.get('illustrator'),
      description: parser.get('description'),
      url: parser.get('__url'),
      set: parser.get('__set'),
      removed: parser.get('__removed') ? true : false,
    };
  }

  private removeHtmlTagsAndTrim(val: string): string
  {
    return val.replace(/<.+?>/g, '').trim();
  }

  private type(parser: Parser): string[] | undefined
  {
    return parser
      .get2('type', (list) => list.split(',')
        .map((val) => this.removeHtmlTagsAndTrim(val)));
  }
}

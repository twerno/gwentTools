import * as fs from 'fs';

import { GwentWikiaHelper } from './GwentWikiaHelper';

export class GwentWikiaInfoboxStats
{
  private keys: string[] = [];
  private stats: { [key: string]: string[] } = {};
  private linePaser = /(.+?)=(.+)/;

  public add2Stats(infoBox: string): void
  {
    const lines: string[] = infoBox.split('|');
    for (const line of lines)
    {
      this.processLine(line);
    }
  }

  private processLine(line: string): void
  {
    const group = line.match(this.linePaser);
    if (group && group.length > 1)
    {
      this.addToMap(group[1], group[2]);
    }
  }

  private addToMap(key: string, val: string): void
  {
    let list = this.stats[key];
    if (!list)
    {
      list = [];
      this.stats[key] = list;
      this.keys.push(key);
    }

    list.push(val);
  }

  public save(filename: string): void
  {
    fs.writeFile(
      filename,
      this.map2String(),
      { encoding: 'utf8' },
      // tslint:disable-next-line:no-console
      (err) => console.log(err));
  }

  public map2String(): string
  {
    let result: string = '';

    for (const key of this.keys)
    {
      if (key === 'name'
        || key === 'description'
        || key === 'illustrator'
        || key === 'name'
        || key === 'image')
      {
        continue;
      }

      const list = GwentWikiaHelper.removeDuplicates(this.stats[key] || []);
      result += `\n\n${key}=${list.join(';;')}`;
    }

    return result;
  }
}

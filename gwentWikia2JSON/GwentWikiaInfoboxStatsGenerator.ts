import * as fs from 'fs';

import { GwentWikiaHelper } from './GwentWikiaHelper';

export class GwentWikiaInfoboxStatsGenerator
{
  private keys: string[] = [];
  private stats: { [key: string]: string[] } = {};
  private linePaser = /(.+?)=(.+)/;

  public generateStats(dir: string): void
  {
    const files: string[] = fs.readdirSync(`${dir}/`);
    for (const file of files)
    {
      try
      {
        const infoBox = fs.readFileSync(`${dir}/${file}`, 'utf8');
        this.add2Stats(infoBox);
      } catch (e)
      {
        GwentWikiaHelper.logError(`[${file}] ${e.message}`);
      }
    }
  }

  private add2Stats(infoBox: string): void
  {
    const lines: string[] = infoBox.split('|');
    for (const line of lines)
    {
      this.processLine(line);
    }
    this.url_set_stat(infoBox);
  }

  private url_set_stat(infoBox: string): void
  {
    const group = infoBox.match(/\|\s*url\s*=.+?_\((.+)\)/);
    if (group && group.length > 1 && group[1])
    {
      this.addToMap('set', group[1]);
    }
  }

  private processLine(line: string): void
  {
    const group = line.match(this.linePaser);
    if (group && group.length > 1 && group[1])
    {
      this.addToMap(group[1].trim(), group[2].trim());
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

  public saveOnDisk(filename: string): void
  {
    GwentWikiaHelper.saveOnDisk(filename, this.map2String());
  }

  private map2String(): string
  {
    let result: string = '';

    for (const key of this.keys)
    {
      const list = GwentWikiaHelper.removeDuplicates(this.stats[key] || []);
      result += `\n\n${key} = ${list.join(';;')}`;
    }

    return result;
  }
}
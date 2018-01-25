import { GwentWikiaHelper } from './GwentWikiaHelper';
import { HttpDownloadService } from './HttpDownloadService';

export interface ILink
{
  id: string;
  url: string;
  urlToShow: string;
}

export class GwentWikiaLinkCollector
{
  private categorySourceUrl: string = 'http://gwent.wikia.com/wiki/Category:';
  private cardSourceUrl: string = 'http://gwent.wikia.com';
  private linkParser = /<li><a\s+href="(.+?)"/i;
  private rawPageParser = /<li><a\s+href="(.+?)"/gi;

  public constructor(private downloader: HttpDownloadService) { }

  public async collect(): Promise<ILink[]>
  {
    const categories: string[] = ['Bronze', 'Common', 'Silver', 'Epic', 'Gold', 'Legendary', 'Leader'];
    let result: string[] = [];

    for (const category of categories)
    {
      for (let i = 1; i <= 3; i++)
      {
        const url: string = this.categorySourceUrl + category + '?page=' + i;
        const rawPage: string | null = await this.downloader.loadOne(url);
        GwentWikiaHelper.saveOnDisk(category + '_' + i, rawPage);
        if (rawPage)
        {
          const links: string[] = this.parseLinks(rawPage);
          result = result.concat(links);
        }
      }

    }

    return GwentWikiaHelper.removeDuplicates(result)
      .filter((val: string) => val.indexOf('//') !== 0)
      .filter((val: string) => val.indexOf('/') === 0)
      .map((val) =>
        ({
          id: val,
          url: `${this.cardSourceUrl + val}?action=raw`,
          urlToShow: this.cardSourceUrl + val
        }))
      .sort((a, b) => a.id.localeCompare(b.id));
  }

  private parseLinks(rawPage: string): string[]
  {
    const rawLines: string[] | null = rawPage.match(this.rawPageParser);
    if (rawLines)
    {
      return rawLines
        .map((rawLine) => this.parseLink(rawLine))
        .filter((value: string | null) => value !== null) as string[];
    }
    return [];
  }

  private parseLink(rawLine: string): string | null
  {
    const urlGroup = rawLine.match(this.linkParser);

    if (urlGroup && urlGroup.length > 0 && urlGroup[1])
    {
      return urlGroup[1]
        .replace(/%27/, '\'');
    }
    return null;
  }

}

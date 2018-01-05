import { CardSet } from '../src/main/js/createHelper/CardStruct';
import { GwentWikiaHelper } from './GwentWikiaHelper';
import { GwentWikiaInfoboxCardConverter } from './GwentWikiaInfoboxCardConverter';
import { GwentWikiaInfoboxDownloader } from './GwentWikiaInfoboxDownloader';
import { GwentWikiaInfoboxParser, IInfobox } from './GwentWikiaInfoboxParser';
import { GwentWikiaInfoboxStatsGenerator } from './GwentWikiaInfoboxStatsGenerator';
import { GwentWikiaLinkCollector } from './GwentWikiaLinkCollector';
import { HttpDownloadService } from './HttpDownloadService';

class SaveCardDefs
{
  private downloader: HttpDownloadService = new HttpDownloadService();
  private linkCollector: GwentWikiaLinkCollector = new GwentWikiaLinkCollector(this.downloader);
  private infoboxDownloader: GwentWikiaInfoboxDownloader = new GwentWikiaInfoboxDownloader(this.downloader);
  private statsGen: GwentWikiaInfoboxStatsGenerator = new GwentWikiaInfoboxStatsGenerator();
  private infoboxParser: GwentWikiaInfoboxParser = new GwentWikiaInfoboxParser();
  private infoboxConverter: GwentWikiaInfoboxCardConverter = new GwentWikiaInfoboxCardConverter();

  private cacheDir = 'cache';

  public async exec(): Promise<void>
  {
    GwentWikiaHelper.mkdir(this.cacheDir);
    const links = await this.linkCollector.collect();
    await this.infoboxDownloader.downloadAndSave(links, this.cacheDir, false);

    this.statsGen.generateStats(this.cacheDir);
    this.statsGen.saveOnDisk('stats.txt');

    const infoboxList: IInfobox[] = this.infoboxParser.parseAllFiles(this.cacheDir);
    GwentWikiaHelper.saveOnDiskLn('infobox.json', infoboxList);

    const cards = this.infoboxConverter.convertAll(infoboxList)
      .filter((card) => card.set === CardSet.CLASSIC);
    GwentWikiaHelper.saveOnDiskLn('cards.json', cards);
  }

}

const cd = new SaveCardDefs();

cd.exec().then((result) =>
{
  // tslint:disable-next-line:no-console
  console.log('done');
});

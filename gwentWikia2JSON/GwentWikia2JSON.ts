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

  public async downloadAndSave(): Promise<void>
  {
    const links = await this.linkCollector.collect();
    await this.infoboxDownloader.downloadAndSave(links, 'cache', false);

    this.statsGen.generateStats('cache');
    this.statsGen.saveOnDisk('stats.txt');

    const infoboxList: IInfobox[] = this.infoboxParser.parseAllFiles('cache');
    const cards = this.infoboxConverter.convertAll(infoboxList);

    GwentWikiaHelper.saveOnDisk('cards.json', JSON.stringify(cards));
  }

}

const cd = new SaveCardDefs();

cd.downloadAndSave().then((result) =>
{
  // tslint:disable-next-line:no-console
  console.log('done');
});

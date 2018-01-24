import { GwentWikiaHelper } from './GwentWikiaHelper';
import { GwentWikiaInfoboxCardConverter } from './GwentWikiaInfoboxCardConverter';
import { GwentWikiaInfoboxDownloader } from './GwentWikiaInfoboxDownloader';
import { GwentWikiaInfoboxParser, IInfobox } from './GwentWikiaInfoboxParser';
import { GwentWikiaInfoboxStatsGenerator } from './GwentWikiaInfoboxStatsGenerator';
import { GwentWikiaLinkCollector } from './GwentWikiaLinkCollector';
import { HttpDownloadService } from './HttpDownloadService';
import { CardDBMergeUtl } from './CardDBMergeUtl';

class SaveCardDefs
{
  private downloader: HttpDownloadService = new HttpDownloadService();
  private linkCollector: GwentWikiaLinkCollector = new GwentWikiaLinkCollector(this.downloader);
  private infoboxDownloader: GwentWikiaInfoboxDownloader = new GwentWikiaInfoboxDownloader(this.downloader);
  private statsGen: GwentWikiaInfoboxStatsGenerator = new GwentWikiaInfoboxStatsGenerator();
  private infoboxParser: GwentWikiaInfoboxParser = new GwentWikiaInfoboxParser();
  private infoboxConverter: GwentWikiaInfoboxCardConverter = new GwentWikiaInfoboxCardConverter();
  private mergeUtl: CardDBMergeUtl = new CardDBMergeUtl();

  private cacheDir = 'cache';

  public async exec(): Promise<void>
  {
    GwentWikiaHelper.deleteFileIfExists('cards.js');
    GwentWikiaHelper.mkdir(this.cacheDir);
    const links = await this.linkCollector.collect();
    await this.infoboxDownloader.downloadAndSave(links, this.cacheDir, false);

    this.statsGen.generateStats(this.cacheDir);
    this.statsGen.saveOnDisk('stats.txt');

    const infoboxList: IInfobox[] = this.infoboxParser.parseAllFiles(this.cacheDir);
    GwentWikiaHelper.saveOnDiskLn('infobox.json', infoboxList);

    const cards = this.infoboxConverter.convertAll(infoboxList);
    // .filter((card) => card.set === CardSet.CLASSIC);
    const origCards = this.mergeUtl.readOldDB();
    this.mergeUtl.mergeAbilities(origCards, cards);

    const cardsStr = cards
      .map((card) => JSON.stringify(card, null, 4))
      .reduce((a, b) => `${a},\n  ${b}`);
    GwentWikiaHelper.saveOnDisk('cards.js', `const __cardDB = [\n  ${cardsStr}\n];\n`);
  }

}

const cd = new SaveCardDefs();

cd.exec().then((result) =>
{
  // tslint:disable-next-line:no-console
  console.log('done');
});

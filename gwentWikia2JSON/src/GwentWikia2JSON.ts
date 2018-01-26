import { GwentWikiaHelper } from './GwentWikiaHelper';
import { GwentWikiaInfoboxCardConverter } from './GwentWikiaInfoboxCardConverter';
import { GwentWikiaInfoboxDownloader } from './GwentWikiaInfoboxDownloader';
import { GwentWikiaInfoboxParser, IInfobox } from './GwentWikiaInfoboxParser';
import { GwentWikiaInfoboxStatsGenerator } from './GwentWikiaInfoboxStatsGenerator';
import { GwentWikiaLinkCollector } from './GwentWikiaLinkCollector';
import { HttpDownloadService } from './HttpDownloadService';
import { GwentWikiaInfoboxEnchanter } from './GwentWikiaInfoboxEnchanter';
import { CardPatchHelper } from './CardPatchHelper';
import { CardDbHelper } from './CardDbHelper';

export const dbDir = 'db';
export const tmpDir = 'tmp';
export const cacheDir = `${tmpDir}/cache`;
export const patchedCardsFormatter = (s: string) => `const __cardDB = ${s};\n`;

export class DownloadCardsAndApplyPatches
{
  private downloader: HttpDownloadService = new HttpDownloadService();
  private linkCollector: GwentWikiaLinkCollector = new GwentWikiaLinkCollector(this.downloader);
  private enchanter: GwentWikiaInfoboxEnchanter = new GwentWikiaInfoboxEnchanter();
  private infoboxDownloader = new GwentWikiaInfoboxDownloader(this.downloader, this.enchanter);
  private statsGen: GwentWikiaInfoboxStatsGenerator = new GwentWikiaInfoboxStatsGenerator();
  private infoboxParser: GwentWikiaInfoboxParser = new GwentWikiaInfoboxParser();
  private infoboxConverter: GwentWikiaInfoboxCardConverter = new GwentWikiaInfoboxCardConverter();
  private patchHelper = new CardPatchHelper();
  private cardDbHelper = new CardDbHelper();

  public async exec(): Promise<void>
  {
    GwentWikiaHelper.mkdir([cacheDir, dbDir, tmpDir]);

    GwentWikiaHelper.log(`Link collector begin.`);
    const links = await this.linkCollector.collect();
    GwentWikiaHelper.log(`Link collector end.`);

    GwentWikiaHelper.log(`InfoBox downloader start.`);
    await this.infoboxDownloader.downloadAndSave(links, cacheDir, false);
    GwentWikiaHelper.log(`InfoBox downloader end.`);

    GwentWikiaHelper.log(`Stats generating start.`);
    this.statsGen.generateStats(cacheDir);
    this.statsGen.saveOnDisk(`${tmpDir}/stats.txt`);
    GwentWikiaHelper.log(`Stats generating end.`);

    const infoboxList: IInfobox[] = this.infoboxParser.parseAllFiles(cacheDir);
    GwentWikiaHelper.saveOnDiskLn(`${tmpDir}/infobox.json`, infoboxList);

    const cards = this.infoboxConverter.convertAll(infoboxList);
    // .filter((card) => card.set === CardSet.CLASSIC);

    this.cardDbHelper.saveOnDisk(`${dbDir}/raw.js`, cards);
    this.patchHelper.applyTo(cards);
    this.cardDbHelper.saveOnDisk(`${dbDir}/patched.js`, cards, patchedCardsFormatter);
  }

}

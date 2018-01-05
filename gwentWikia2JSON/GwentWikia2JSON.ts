import { GwentWikiaInfoboxDownloader } from './GwentWikiaInfoboxDownloader';
import { GwentWikiaLinkCollector } from './GwentWikiaLinkCollector';
import { HttpDownloadService } from './HttpDownloadService';

class SaveCardDefs
{
  private downloader: HttpDownloadService = new HttpDownloadService();
  private linkCollector: GwentWikiaLinkCollector = new GwentWikiaLinkCollector(this.downloader);
  private infoboxDownloader: GwentWikiaInfoboxDownloader = new GwentWikiaInfoboxDownloader(this.downloader);

  public async downloadAndSave(): Promise<void>
  {
    const links = await this.linkCollector.collect();
    await this.infoboxDownloader.downloadAndSave(links, false);
  }

}

const cd = new SaveCardDefs();

cd.downloadAndSave().then((result) =>
{
  // tslint:disable-next-line:no-console
  console.log('done');
});

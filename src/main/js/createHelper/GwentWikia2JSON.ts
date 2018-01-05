// import * as fs from 'fs';
import { Downloader } from './Downloader';
import { GwentWikiaInfoboxCollector } from './GwentWikiaInfoboxCollector';
import { GwentWikiaLinkCollector } from './GwentWikiaLinkCollector';

class SaveCardDefs
{
  private downloader: Downloader = new Downloader();
  private linkCollector: GwentWikiaLinkCollector = new GwentWikiaLinkCollector(this.downloader);
  private infoboxCollector: GwentWikiaInfoboxCollector = new GwentWikiaInfoboxCollector(this.downloader);

  public async getSoucesUrl(): Promise<void>
  {
    const links = await this.linkCollector.collect();
    // console.log(links);
    this.infoboxCollector.downloadNew(links);
  }

}

const cd = new SaveCardDefs();

cd.getSoucesUrl().then((result) =>
{
  // tslint:disable-next-line:no-console
  console.log('done');
  // file.write(result);
});

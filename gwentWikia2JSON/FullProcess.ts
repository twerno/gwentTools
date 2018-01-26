import { DownloadCardsAndApplyPatches } from './src/GwentWikia2JSON';

const cd = new DownloadCardsAndApplyPatches();

cd.exec().then((result) =>
{
  // tslint:disable-next-line:no-console
  console.log('done');
});

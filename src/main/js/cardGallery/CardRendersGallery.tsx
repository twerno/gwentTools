import { WideCard } from '@src/cardBrowser/card/WideCard';
import { CardService } from '@src/cardBrowser/CardService';
import { MediumCard } from '@src/cardGallery/MediumCard';
import * as React from 'react';

export class CardRendersGallery extends React.Component<{}, {}>
{

  private cardService = new CardService();

  public render()
  {
    const card = this.cardService.getAllCards().filter(c => c.name === `Aspirant`)[0];
    const style: React.CSSProperties = { marginLeft: '0px' };
    const inneStyle: React.CSSProperties = { float: 'left', marginLeft: '10px' };

    return (
      <div>
        {/* <div style={style}>
          <div style={inneStyle}>
            <CardSmall card={card} />
          </div><div style={inneStyle}>
            <CardSmall card={card} />
          </div><div style={inneStyle}>
            <CardSmall card={card} />
          </div><div style={inneStyle}>
            <CardSmall card={card} />
          </div>
        </div> */}
        <div style={{ clear: 'both' }} />
        <div style={style}>
          <div style={inneStyle}>
            <MediumCard card={card} />
          </div>
          <div style={inneStyle}>
            <MediumCard card={card} />
          </div>
          <div style={inneStyle}>
            <MediumCard card={card} />
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <div style={style}>
          <div style={inneStyle}>
            <WideCard card={card} />
          </div>
          <div style={inneStyle}>
            <WideCard card={card} />
          </div>
          <div style={inneStyle}>
            <WideCard card={card} />
          </div>
        </div>
        {/* <div style={style}>
          <CardSmallPreview card={card} />
          <CardSmallPreview card={card} />
        </div> */}
      </div>
    );
  }
}

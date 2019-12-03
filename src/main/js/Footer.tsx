import * as React from 'react';
import { Footer } from 'react-bootstrap/lib/Modal';

export function StickyFooter(props: any)
{
  return (
    <Footer
      className="footer"
      style={{
        position: 'absolute',
        bottom: '0px',
        width: '100%',
        height: '2.5rem',
        backgroundColor: '#f5f5f5'
      }}
    >
      <div className="container">
        <p className="text-muted" style={{ display: 'inline' }}>
          Project site <a href="https://github.com/twerno/gwentTools">https://github.com</a>
        </p>
        <p className="text-muted" style={{ display: 'inline', marginLeft: '20px' }}>
          Icons by <a href="https://icons8.com">icons8</a>
        </p>
      </div>
    </Footer>
  );
}

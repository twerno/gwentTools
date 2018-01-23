import * as React from 'react';
import { Footer } from 'react-bootstrap/lib/Modal';

export function StickyFooter(props: any)
{
  return (
    <Footer
      className="footer"
      style={{
        position: 'relative',
        bottom: '0px',
        width: '100%',
        height: '50px',
        backgroundColor: '#f5f5f5'
      }}
    >
      <div className="container">
        <p className="text-muted">Icons by <a href="https://icons8.com">icons8</a></p>
      </div>
    </Footer>
  );
}

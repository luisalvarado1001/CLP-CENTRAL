'use client';

import { useState } from 'react';

export function BrandLogo() {
  const [failed, setFailed] = useState(false);

  if (failed) return <div className="brand-mark">CLP</div>;

  return (
    <div style={{ width: 70, height: 46, display: 'grid', placeItems: 'center', background: 'white', borderRadius: 10, overflow: 'hidden', padding: 4 }}>
      <img
        src="/brand/logo-clp.png"
        alt="CLP Automotriz"
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

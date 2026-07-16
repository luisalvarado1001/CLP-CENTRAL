'use client';

import { useState } from 'react';

const logoPath = '/brand/ChatGPT%20Image%205%20mar%202026%2C%2012_52_22%20a.m..png';

export function BrandLogo() {
  const [failed, setFailed] = useState(false);

  if (failed) return <div className="brand-mark">CLP</div>;

  return (
    <div className="brand-logo-frame">
      <img
        src={logoPath}
        alt="CLP Automotriz"
        className="brand-logo-image"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

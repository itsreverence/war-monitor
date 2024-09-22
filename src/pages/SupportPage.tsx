// src/pages/SupportPage.tsx
import React from 'react';

export default function SupportPage() {
  return (
    <div className="w-full h-full">
      <webview
        src="https://github.com/itsreverence/war-monitor/issues"
        style={{width: '100%', height: '100%'}}
      ></webview>
    </div>
  );
}
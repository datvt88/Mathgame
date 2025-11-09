'use client';

import { useEffect, useState } from 'react';
import { checkGeminiAPIStatus } from '@/lib/gemini';

export default function GeminiStatus() {
  const [status, setStatus] = useState<{ connected: boolean; message: string } | null>(null);

  useEffect(() => {
    // Check API status on component mount
    const apiStatus = checkGeminiAPIStatus();
    setStatus(apiStatus);
  }, []);

  if (!status) {
    return null;
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.9em',
      fontWeight: '500',
      background: status.connected
        ? 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
        : 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      color: status.connected ? '#155724' : '#721c24',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <span style={{ fontSize: '1.2em' }}>
        {status.connected ? '✅' : '⚠️'}
      </span>
      <span>
        {status.connected ? 'Gemini AI: Đang hoạt động' : `Gemini AI: ${status.message}`}
      </span>
    </div>
  );
}

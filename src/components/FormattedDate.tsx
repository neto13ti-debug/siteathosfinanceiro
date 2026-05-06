'use client';

import { useState, useEffect } from 'react';

export default function FormattedDate({ date }: { date: string }) {
  const [formatted, setFormatted] = useState<string>('');

  useEffect(() => {
    if (date) {
      setFormatted(new Date(date).toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      }));
    }
  }, [date]);

  if (!formatted) return <span style={{ opacity: 0 }}>...</span>;

  return <span>{formatted}</span>;
}

import React, { useState, useEffect } from 'react';

export function Logger() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      setLogs(prev => [...prev, JSON.stringify(args)]);
      originalConsoleLog.apply(console, args);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      maxHeight: '30vh',
      overflow: 'auto',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      zIndex: 9999,
      padding: '10px',
      fontSize: '12px'
    }}>
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
} 
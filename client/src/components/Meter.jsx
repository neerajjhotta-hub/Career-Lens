import React from 'react';

export default function Meter({ value, max = 100, label, suffix = '', level = 'low' }) {
  // Map level classification to visual indicators
  const getLevelColor = (lvl) => {
    switch (lvl?.toUpperCase()) {
      case 'CRITICAL':
      case 'HIGH':
        return 'var(--color-critical)';
      case 'MEDIUM':
        return 'var(--color-medium)';
      case 'LOW':
      default:
        return 'var(--color-low)';
    }
  };

  const color = getLevelColor(level);
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="meter-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="metadata-label">{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: color }}>
          {value}{suffix}
        </span>
      </div>
      
      <div className="meter-track">
        <div 
          className="meter-fill" 
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`
          }}
        ></div>
      </div>
    </div>
  );
}

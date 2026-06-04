import React, { useState } from 'react';
import Meter from './Meter';

export default function CareerResult({ data, inputData }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const {
    salaryCeiling,
    aiRisk,
    futureDemand,
    promotionOpportunities,
    recommendedPivot,
    skillsToAcquire = [],
    growthRoadmap = [],
    marketContext
  } = data;

  const getBadgeClass = (lvl) => {
    switch (lvl?.toUpperCase()) {
      case 'CRITICAL': return 'critical';
      case 'HIGH': return 'high';
      case 'MEDIUM': return 'medium';
      case 'LOW':
      default: return 'low';
    }
  };

  const getRiskLevelColor = (lvl) => {
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

  // Construct sharing text representation
  const shareText = `CareerLens™ Diagnostic
Role: ${inputData.title} (${inputData.experience})
Region: ${inputData.country}

• Salary Ceiling: ${salaryCeiling?.range || 'N/A'}
• AI Risk Exposure: ${aiRisk?.level || 'N/A'} (${aiRisk?.score || 0}/100)
• Demand Trend: ${futureDemand?.level || 'N/A'} (${futureDemand?.growthRate || 'Stable'})
• Recommended Pivot: → ${recommendedPivot?.title || 'N/A'}

Assess your career trajectory at careerlens.app`;

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="dashboard-grid">
      {/* Side Panel: Volatility and Core Stats */}
      <div className="side-panel">
        
        {/* Salary Ceiling Card */}
        <div className="glass-panel">
          <div className="card-title">
            <span>Salary Ceiling</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{salaryCeiling?.currency || 'LOCAL'}</span>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="metric-value-huge">
              {salaryCeiling?.range || 'N/A'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {salaryCeiling?.explanation || 'Estimated maximum compensation for this profile.'}
            </p>
          </div>
        </div>

        {/* AI Risk Profile */}
        <div className="glass-panel">
          <div className="card-title">
            <span>AI Risk Profile</span>
          </div>
          <div className="badge-container" style={{ paddingBottom: '1rem' }}>
            <div className={`stat-badge ${getBadgeClass(aiRisk?.level)}`}>
              {aiRisk?.level || 'LOW'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Automation & Displacement Risk
            </p>
          </div>
          <div className="card-body" style={{ paddingTop: 0 }}>
            <Meter 
              value={aiRisk?.score || 0} 
              label="Probability of Automation" 
              suffix="%" 
              level={aiRisk?.level || 'low'} 
            />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.4' }}>
              {aiRisk?.explanation}
            </p>
          </div>
        </div>

      </div>

      {/* Main Panel: Growth Prospects, Skill Matrix, Pivot Strategy, Sharing */}
      <div className="main-panel">
        
        {/* Overview & Market Verdict */}
        <div className="glass-panel">
          <div className="card-title">
            <span>Market Verdict</span>
          </div>
          <div className="card-body">
            <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
              {marketContext || 'Analyzing local market patterns...'}
            </p>
            
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="metadata-label">Future Demand</span>
                <span className="metadata-value" style={{ color: getRiskLevelColor(futureDemand?.level === 'LOW' ? 'low' : 'high') }}>
                  {futureDemand?.level || 'MEDIUM'} ({futureDemand?.growthRate || 'Stable'})
                </span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Promotion Prospects</span>
                <span className="metadata-value">
                  {promotionOpportunities?.level || 'MEDIUM'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Pivot Card */}
        <div className="glass-panel">
          <div className="card-title">
            <span>Strategic Career Pivot</span>
          </div>
          <div className="card-body">
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="metadata-label" style={{ display: 'block', marginBottom: '0.25rem' }}>Recommended Target Role</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {recommendedPivot?.title || 'N/A'}
              </h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              {recommendedPivot?.rationale}
            </p>
            
            <div>
              <span className="metadata-label" style={{ display: 'block', marginBottom: '0.75rem' }}>Skill gaps to bridge</span>
              <ul className="check-list">
                {recommendedPivot?.requiredSkills?.map((skill, index) => (
                  <li key={index} className="check-item">
                    <svg className="check-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ width: '1.1rem', height: '1.1rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Skill Matrix to Hit Salary Ceiling */}
        <div className="glass-panel">
          <div className="card-title">
            <span>Critical Skill Matrix</span>
          </div>
          <div className="card-body" style={{ padding: 0, overflowX: 'auto' }}>
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Core Skill</th>
                  <th>Impact Weight</th>
                  <th>Acquisition Rationale</th>
                </tr>
              </thead>
              <tbody>
                {skillsToAcquire.length > 0 ? (
                  skillsToAcquire.map((item, index) => (
                    <tr key={index}>
                      <td className="skill-name">{item.skill}</td>
                      <td>
                        <span className="metadata-value" style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <span className={`skill-importance-dot ${item.importance}`}></span>
                          {item.importance}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No specific skills cataloged.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Roadmap Roadmap */}
        <div className="glass-panel">
          <div className="card-title">
            <span>Actionable Growth Roadmap</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {growthRoadmap.map((step, index) => (
                <div key={index} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.5rem',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    minWidth: '95px',
                    textAlign: 'center'
                  }}>
                    {step.timeframe}
                  </div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', paddingTop: '0.15rem' }}>
                    {step.milestone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Share Result Box */}
        <div className="glass-panel">
          <div className="card-title">
            <span>Social Share Snippet</span>
          </div>
          <div className="card-body">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Copy this markdown diagnostic to share your career parameters and projections with your professional network.
            </p>
            <div className="share-box-preview">
              {shareText}
            </div>
            <button 
              type="button" 
              onClick={handleCopyShare} 
              className={`btn-secondary ${copied ? 'success' : ''}`}
            >
              {copied ? (
                <>
                  <svg className="check-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '1.2rem', height: '1.2rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '1.2rem', height: '1.2rem', color: 'var(--text-secondary)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Share Card
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

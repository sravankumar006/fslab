/**
 * Sidebar Navigation Component
 */
export function Sidebar({ activeTab, onSelectTab, studentCount, isConnected }) {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="brand-text">
          <h2>EduPortal</h2>
          <span>Student Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">Main Navigation</div>

        <button
          type="button"
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onSelectTab('dashboard')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => onSelectTab('students')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>Students Directory</span>
          {studentCount !== undefined && (
            <span className="nav-badge">{studentCount}</span>
          )}
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => onSelectTab('analytics')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span>Department Analytics</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="connection-status-card">
          <div className="status-indicator">
            <span className={`status-dot ${isConnected ? 'online' : 'offline'}`}></span>
            <span className="status-text">
              {isConnected ? 'MongoDB Atlas Live' : 'Connecting to Atlas...'}
            </span>
          </div>
          <p className="system-meta">Cluster: Cluster0 (AWS Mumbai)</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;


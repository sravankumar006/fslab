/**
 * Top Navbar with title, active breadcrumb, and quick Add Student button
 */
export function Navbar({ activeTab, onOpenAddModal, onRefresh, isRefreshing }) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Executive Academic Dashboard';
      case 'students':
        return 'Student Directory & Records';
      case 'analytics':
        return 'Department Analytics & CGPA Reports';
      default:
        return 'Student Management System';
    }
  };

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <h1 className="navbar-page-title">{getTabTitle()}</h1>
        <div className="breadcrumb">
          <span>EduPortal</span>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-active">{activeTab}</span>
        </div>
      </div>

      <div className="navbar-actions">
        <button
          type="button"
          className="btn btn-secondary btn-icon-only"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Refresh Data from MongoDB Atlas"
          aria-label="Refresh Data from MongoDB Atlas"
        >
          <svg
            className={isRefreshing ? 'spin' : ''}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M23 4v6h-6" />
            <path d="M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenAddModal}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add New Student</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;


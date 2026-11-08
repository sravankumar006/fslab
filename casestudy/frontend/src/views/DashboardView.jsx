import StatCard from '../components/StatCard';
import DepartmentAnalytics from '../components/DepartmentAnalytics';
import StudentTable from '../components/StudentTable';

/**
 * Dashboard View: Executive overview of students and analytics
 */
export function DashboardView({
  students,
  analytics,
  isLoading,
  onOpenAddModal,
  onEditStudent,
  onDeleteStudent,
  onNavigateToStudents,
}) {
  const totalStudents = students.length;

  // Calculate overall average CGPA
  const averageCgpa =
    totalStudents > 0
      ? (
          students.reduce((acc, curr) => acc + (Number(curr.cgpa) || 0), 0) / totalStudents
        ).toFixed(2)
      : '0.00';

  // Calculate highest CGPA
  const highestCgpa =
    totalStudents > 0
      ? Math.max(...students.map((s) => Number(s.cgpa) || 0)).toFixed(2)
      : '0.00';

  const departmentCount = analytics.length;

  // Recent 5 students
  const recentStudents = [...students].slice(-5).reverse();

  return (
    <div className="view-container">
      {/* KPI Cards Row */}
      <div className="stats-grid">
        <StatCard
          label="Total Enrolled Students"
          value={isLoading ? '...' : totalStudents}
          subtext="Active in MongoDB Atlas"
          color="blue"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        <StatCard
          label="Overall Average CGPA"
          value={isLoading ? '...' : averageCgpa}
          subtext="Scale of 10.00"
          color="emerald"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
        />

        <StatCard
          label="Highest CGPA Recorded"
          value={isLoading ? '...' : highestCgpa}
          subtext="Top Academic Achievement"
          color="purple"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-2.34" />
              <path d="M14 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
            </svg>
          }
        />

        <StatCard
          label="Academic Departments"
          value={isLoading ? '...' : departmentCount}
          subtext="Active in Aggregation Pipeline"
          color="amber"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          }
        />
      </div>

      {/* Main Grid: Department Distribution + Recent Students */}
      <div className="dashboard-content-grid">
        <div className="dashboard-main-column">
          <div className="section-card">
            <div className="section-card-header">
              <div>
                <h2>Recently Enrolled Students</h2>
                <p className="card-subtitle">Latest student records saved to database</p>
              </div>
              <button
                type="button"
                className="btn btn-outline-sm"
                onClick={onNavigateToStudents}
              >
                View All Students ({totalStudents})
              </button>
            </div>

            <StudentTable
              students={recentStudents}
              onEdit={onEditStudent}
              onDelete={onDeleteStudent}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="dashboard-side-column">
          <DepartmentAnalytics
            analytics={analytics}
            totalStudents={totalStudents}
            isLoading={isLoading}
          />

          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <p>Manage database entries and export department rosters.</p>
            <div className="quick-actions-buttons">
              <button
                type="button"
                className="btn btn-primary full-width"
                onClick={onOpenAddModal}
              >
                + Add Student Record
              </button>
              <button
                type="button"
                className="btn btn-secondary full-width"
                onClick={onNavigateToStudents}
              >
                Browse Full Directory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;


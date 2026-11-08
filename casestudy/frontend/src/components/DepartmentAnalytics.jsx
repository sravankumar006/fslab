/**
 * DepartmentAnalytics Component
 * Renders department-wise distribution and academic performance metrics
 * using the GET /api/students/analytics/department aggregation endpoint.
 */
export function DepartmentAnalytics({ analytics, totalStudents, isLoading }) {
  if (isLoading) {
    return (
      <div className="analytics-card loading-state">
        <div className="spinner"></div>
        <p>Calculating department metrics...</p>
      </div>
    );
  }

  if (!analytics || analytics.length === 0) {
    return (
      <div className="analytics-card empty">
        <p>No department data available yet. Add student records to see insights.</p>
      </div>
    );
  }

  const maxCount = Math.max(...analytics.map((a) => a.totalStudents || 1));

  return (
    <div className="analytics-container">
      <div className="analytics-card">
        <div className="card-header">
          <div>
            <h3>Department Distribution & Performance</h3>
            <p className="card-subtitle">Aggregated metrics from MongoDB Atlas pipeline</p>
          </div>
          <span className="badge-count">{analytics.length} Departments</span>
        </div>

        <div className="department-bars-list">
          {analytics.map((dept) => {
            const count = dept.totalStudents || 0;
            const avgCgpa = typeof dept.averageCGPA === 'number'
              ? dept.averageCGPA.toFixed(2)
              : Number(dept.averageCGPA || 0).toFixed(2);
            const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
            const barWidthPercent = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;

            return (
              <div key={dept._id} className="dept-stat-row">
                <div className="dept-info">
                  <div className="dept-name-block">
                    <span className="dept-tag">{dept._id || 'Unassigned'}</span>
                    <span className="dept-count">
                      <strong>{count}</strong> {count === 1 ? 'student' : 'students'} ({percentage}%)
                    </span>
                  </div>
                  <div className="dept-cgpa">
                    Avg CGPA: <strong>{avgCgpa}</strong>
                  </div>
                </div>

                <div className="dept-progress-track">
                  <div
                    className="dept-progress-fill"
                    style={{ width: `${Math.max(barWidthPercent, 8)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DepartmentAnalytics;


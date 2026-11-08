import { useMemo } from 'react';
import StatCard from '../components/StatCard';
import DepartmentAnalytics from '../components/DepartmentAnalytics';

/**
 * Analytics View: Department performance metrics & CGPA distributions
 */
export function AnalyticsView({ students, analytics, isLoading }) {
  const totalStudents = students.length;

  // Grade performance distribution
  const gradeDistribution = useMemo(() => {
    let distinction = 0; // >= 8.5
    let firstClass = 0; // 7.0 - 8.49
    let secondClass = 0; // 5.0 - 6.99
    let probation = 0; // < 5.0

    students.forEach((student) => {
      const val = Number(student.cgpa) || 0;
      if (val >= 8.5) distinction++;
      else if (val >= 7.0) firstClass++;
      else if (val >= 5.0) secondClass++;
      else probation++;
    });

    return {
      distinction,
      firstClass,
      secondClass,
      probation,
    };
  }, [students]);

  // Find top department by average CGPA
  const topDept = useMemo(() => {
    if (!analytics || analytics.length === 0) return null;
    return [...analytics].sort((a, b) => (b.averageCGPA || 0) - (a.averageCGPA || 0))[0];
  }, [analytics]);

  // Overall Average CGPA
  const overallAvgCgpa =
    totalStudents > 0
      ? (
          students.reduce((acc, curr) => acc + (Number(curr.cgpa) || 0), 0) / totalStudents
        ).toFixed(2)
      : '0.00';

  return (
    <div className="view-container">
      {/* High-level Analytics KPIs */}
      <div className="stats-grid">
        <StatCard
          label="Total Database Records"
          value={isLoading ? '...' : totalStudents}
          subtext="Students in active registry"
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
          label="System-wide Avg CGPA"
          value={isLoading ? '...' : overallAvgCgpa}
          subtext="Calculated across all branches"
          color="emerald"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
        />

        <StatCard
          label="Top Performing Branch"
          value={isLoading ? '...' : topDept ? topDept._id : 'N/A'}
          subtext={
            topDept
              ? `Avg CGPA: ${(Number(topDept.averageCGPA) || 0).toFixed(2)}`
              : 'No department data'
          }
          color="purple"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          }
        />

        <StatCard
          label="Distinction Scholars"
          value={isLoading ? '...' : gradeDistribution.distinction}
          subtext="CGPA ≥ 8.50"
          color="amber"
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
      </div>

      <div className="analytics-layout-grid">
        {/* Department Aggregation Pipeline Breakdown */}
        <div className="analytics-left-col">
          <DepartmentAnalytics
            analytics={analytics}
            totalStudents={totalStudents}
            isLoading={isLoading}
          />
        </div>

        {/* Academic Grade Distribution Card */}
        <div className="analytics-right-col">
          <div className="section-card">
            <div className="section-card-header">
              <div>
                <h2>Academic Standing Distribution</h2>
                <p className="card-subtitle">CGPA tier classification</p>
              </div>
            </div>

            <div className="grade-tier-list">
              <div className="grade-tier-item tier-distinction">
                <div className="tier-header">
                  <span className="tier-badge">Distinction (≥ 8.50)</span>
                  <strong>{gradeDistribution.distinction} Students</strong>
                </div>
                <div className="tier-track">
                  <div
                    className="tier-fill fill-distinction"
                    style={{
                      width: `${
                        totalStudents > 0
                          ? Math.round((gradeDistribution.distinction / totalStudents) * 100)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="grade-tier-item tier-first">
                <div className="tier-header">
                  <span className="tier-badge">First Class (7.00 - 8.49)</span>
                  <strong>{gradeDistribution.firstClass} Students</strong>
                </div>
                <div className="tier-track">
                  <div
                    className="tier-fill fill-first"
                    style={{
                      width: `${
                        totalStudents > 0
                          ? Math.round((gradeDistribution.firstClass / totalStudents) * 100)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="grade-tier-item tier-second">
                <div className="tier-header">
                  <span className="tier-badge">Second Class (5.00 - 6.99)</span>
                  <strong>{gradeDistribution.secondClass} Students</strong>
                </div>
                <div className="tier-track">
                  <div
                    className="tier-fill fill-second"
                    style={{
                      width: `${
                        totalStudents > 0
                          ? Math.round((gradeDistribution.secondClass / totalStudents) * 100)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="grade-tier-item tier-warning">
                <div className="tier-header">
                  <span className="tier-badge">Academic Probation (&lt; 5.00)</span>
                  <strong>{gradeDistribution.probation} Students</strong>
                </div>
                <div className="tier-track">
                  <div
                    className="tier-fill fill-warning"
                    style={{
                      width: `${
                        totalStudents > 0
                          ? Math.round((gradeDistribution.probation / totalStudents) * 100)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Department Aggregation Table */}
      <div className="section-card">
        <div className="section-card-header">
          <div>
            <h2>Department-Wise Aggregation Data</h2>
            <p className="card-subtitle">
              Live response from <code>GET /api/students/analytics/department</code>
            </p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Total Enrolled</th>
                <th>Share of Students</th>
                <th>Average CGPA</th>
                <th>Performance Status</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((dept) => {
                const count = dept.totalStudents || 0;
                const share = totalStudents > 0 ? ((count / totalStudents) * 100).toFixed(1) : '0';
                const avg = Number(dept.averageCGPA || 0);

                let statusBadge = 'status-good';
                let statusLabel = 'Consistent';
                if (avg >= 8.5) {
                  statusBadge = 'status-excellent';
                  statusLabel = 'Outstanding';
                } else if (avg < 6.5) {
                  statusBadge = 'status-attention';
                  statusLabel = 'Requires Focus';
                }

                return (
                  <tr key={dept._id}>
                    <td>
                      <span className="dept-tag">{dept._id}</span>
                    </td>
                    <td>
                      <strong>{count}</strong> {count === 1 ? 'student' : 'students'}
                    </td>
                    <td>{share}%</td>
                    <td>
                      <strong className="text-highlight">{avg.toFixed(2)}</strong> / 10.00
                    </td>
                    <td>
                      <span className={`status-pill ${statusBadge}`}>{statusLabel}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsView;


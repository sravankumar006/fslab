/**
 * Formats CGPA and returns a badge color based on academic standing
 */
function getCgpaBadgeClass(cgpa) {
  if (cgpa >= 8.5) return 'cgpa-distinction';
  if (cgpa >= 7.0) return 'cgpa-first-class';
  if (cgpa >= 5.0) return 'cgpa-second-class';
  return 'cgpa-warning';
}

export function StudentTable({
  students,
  onEdit,
  onDelete,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="table-loading-container">
        <div className="spinner"></div>
        <p>Loading student records from MongoDB Atlas...</p>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path d="M12 14v7" />
          </svg>
        </div>
        <h4>No Student Records Found</h4>
        <p>There are no students matching your current search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name & Contact</th>
            <th>Department</th>
            <th>Class / Section</th>
            <th>CGPA</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const cgpaFormatted = typeof student.cgpa === 'number'
              ? student.cgpa.toFixed(2)
              : Number(student.cgpa || 0).toFixed(2);

            return (
              <tr key={student._id}>
                {/* Roll Number */}
                <td className="roll-number-cell">
                  <span className="roll-badge">{student.rollNumber}</span>
                </td>

                {/* Name & Email */}
                <td>
                  <div className="student-name-block">
                    <span className="student-name">{student.name}</span>
                    <span className="student-email">{student.email}</span>
                  </div>
                </td>

                {/* Department */}
                <td>
                  <span className={`dept-pill dept-${student.department?.toLowerCase() || 'default'}`}>
                    {student.department}
                  </span>
                </td>

                {/* Class / Year & Section */}
                <td>
                  <div className="class-pill">
                    <span>Year {student.year}</span>
                    <span className="divider">•</span>
                    <span>Sec {student.section}</span>
                  </div>
                </td>

                {/* CGPA */}
                <td>
                  <span className={`cgpa-badge ${getCgpaBadgeClass(Number(student.cgpa))}`}>
                    {cgpaFormatted}
                  </span>
                </td>

                {/* Actions */}
                <td className="text-right">
                  <div className="action-buttons">
                    <button
                      type="button"
                      className="btn-icon btn-icon-edit"
                      onClick={() => onEdit(student)}
                      title={`Edit ${student.name}`}
                      aria-label={`Edit ${student.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="btn-icon btn-icon-delete"
                      onClick={() => onDelete(student)}
                      title={`Delete ${student.name}`}
                      aria-label={`Delete ${student.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;


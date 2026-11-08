import { useState, useMemo } from 'react';
import StudentTable from '../components/StudentTable';

/**
 * Students Directory View with Search, Filtering, and Sorting
 */
export function StudentsView({
  students,
  isLoading,
  onOpenAddModal,
  onEditStudent,
  onDeleteStudent,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [sortBy, setSortBy] = useState('rollNumber');

  // Extract unique departments from existing student list or fallback list
  const availableDepartments = useMemo(() => {
    const defaultDepts = ['CSE', 'ECE', 'EEE', 'IT', 'MECH', 'CIVIL', 'AI&DS'];
    const studentDepts = students.map((s) => s.department).filter(Boolean);
    const combined = Array.from(new Set([...defaultDepts, ...studentDepts]));
    return combined.sort();
  }, [students]);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => {
        // Search query matching Name or Roll Number
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          student.name?.toLowerCase().includes(query) ||
          student.rollNumber?.toLowerCase().includes(query) ||
          student.email?.toLowerCase().includes(query);

        // Department filter
        const matchesDept =
          selectedDept === 'ALL' || student.department === selectedDept;

        // Year filter
        const matchesYear =
          selectedYear === 'ALL' || String(student.year) === String(selectedYear);

        return matchesQuery && matchesDept && matchesYear;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return (a.name || '').localeCompare(b.name || '');
        }
        if (sortBy === 'cgpaDesc') {
          return (Number(b.cgpa) || 0) - (Number(a.cgpa) || 0);
        }
        if (sortBy === 'cgpaAsc') {
          return (Number(a.cgpa) || 0) - (Number(b.cgpa) || 0);
        }
        if (sortBy === 'year') {
          return (Number(a.year) || 0) - (Number(b.year) || 0);
        }
        // Default: rollNumber
        return (a.rollNumber || '').localeCompare(b.rollNumber || '');
      });
  }, [students, searchQuery, selectedDept, selectedYear, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedDept !== 'ALL' || selectedYear !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDept('ALL');
    setSelectedYear('ALL');
    setSortBy('rollNumber');
  };

  return (
    <div className="view-container">
      {/* Search and Filter Control Bar */}
      <div className="controls-card">
        <div className="search-filter-grid">
          {/* Search Input */}
          <div className="search-box">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by student name, roll number, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div className="filter-group">
            <label htmlFor="dept-filter">Department:</label>
            <select
              id="dept-filter"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Departments</option>
              {availableDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year Filter */}
          <div className="filter-group">
            <label htmlFor="year-filter">Year:</label>
            <select
              id="year-filter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Years</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-group">
            <label htmlFor="sort-by">Sort By:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="rollNumber">Roll Number (Asc)</option>
              <option value="name">Name (A - Z)</option>
              <option value="cgpaDesc">CGPA (Highest First)</option>
              <option value="cgpaAsc">CGPA (Lowest First)</option>
              <option value="year">Academic Year</option>
            </select>
          </div>
        </div>

        {/* Results summary and Reset bar */}
        <div className="filter-summary-bar">
          <div className="results-count">
            Showing <strong>{filteredStudents.length}</strong> of{' '}
            <strong>{students.length}</strong> registered students
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-text-sm"
              onClick={resetFilters}
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Student Table Card */}
      <div className="section-card">
        <div className="section-card-header">
          <div>
            <h2>Student Records Table</h2>
            <p className="card-subtitle">
              Live records fetched from MongoDB Atlas collection
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenAddModal}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Student</span>
          </button>
        </div>

        <StudentTable
          students={filteredStudents}
          onEdit={onEditStudent}
          onDelete={onDeleteStudent}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default StudentsView;


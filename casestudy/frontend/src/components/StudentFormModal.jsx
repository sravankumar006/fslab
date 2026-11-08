import { useState } from 'react';
import Modal from './Modal';

const DEPARTMENTS = ['CSE', 'ECE', 'EEE', 'IT', 'MECH', 'CIVIL', 'AI&DS', 'AIDS'];
const YEARS = [1, 2, 3, 4];
const SECTIONS = ['A', 'B', 'C', 'D'];

function StudentFormInner({ studentToEdit, onSubmit, onClose, isSubmitting }) {
  const [formData, setFormData] = useState(() => {
    if (studentToEdit) {
      return {
        rollNumber: studentToEdit.rollNumber || '',
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        department: studentToEdit.department || 'CSE',
        year: studentToEdit.year || 1,
        section: studentToEdit.section || 'A',
        cgpa: studentToEdit.cgpa !== undefined ? String(studentToEdit.cgpa) : '',
      };
    }
    return {
      rollNumber: '',
      name: '',
      email: '',
      department: 'CSE',
      year: 1,
      section: 'A',
      cgpa: '',
    };
  });

  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(studentToEdit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    const yearNum = Number(formData.year);
    if (!yearNum || yearNum < 1 || yearNum > 4) {
      newErrors.year = 'Year must be between 1 and 4';
    }

    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    }

    if (formData.cgpa === '' || formData.cgpa === null || formData.cgpa === undefined) {
      newErrors.cgpa = 'CGPA is required';
    } else {
      const cgpaNum = Number(formData.cgpa);
      if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
        newErrors.cgpa = 'CGPA must be a number between 0.00 and 10.00';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      rollNumber: formData.rollNumber.trim(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      department: formData.department,
      year: Number(formData.year),
      section: formData.section.trim().toUpperCase(),
      cgpa: parseFloat(Number(formData.cgpa).toFixed(2)),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="student-form" noValidate>
      <div className="form-grid">
        {/* Roll Number */}
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number *</label>
          <input
            id="rollNumber"
            name="rollNumber"
            type="text"
            placeholder="e.g. 23A91A0501"
            value={formData.rollNumber}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.rollNumber ? 'input-error' : ''}
          />
          {errors.rollNumber && <span className="error-text">{errors.rollNumber}</span>}
        </div>

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Priya Sharma"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group full-width">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. priya.sharma@college.edu"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* Department */}
        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.department ? 'input-error' : ''}
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <span className="error-text">{errors.department}</span>}
        </div>

        {/* Academic Year */}
        <div className="form-group">
          <label htmlFor="year">Academic Year *</label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.year ? 'input-error' : ''}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
          {errors.year && <span className="error-text">{errors.year}</span>}
        </div>

        {/* Section */}
        <div className="form-group">
          <label htmlFor="section">Section *</label>
          <select
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.section ? 'input-error' : ''}
          >
            {SECTIONS.map((sec) => (
              <option key={sec} value={sec}>
                Section {sec}
              </option>
            ))}
          </select>
          {errors.section && <span className="error-text">{errors.section}</span>}
        </div>

        {/* CGPA */}
        <div className="form-group">
          <label htmlFor="cgpa">CGPA (0.00 - 10.00) *</label>
          <input
            id="cgpa"
            name="cgpa"
            type="number"
            step="0.01"
            min="0"
            max="10"
            placeholder="e.g. 8.75"
            value={formData.cgpa}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.cgpa ? 'input-error' : ''}
          />
          {errors.cgpa && <span className="error-text">{errors.cgpa}</span>}
        </div>
      </div>

      <div className="modal-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="btn-spinner">Saving...</span>
          ) : isEditMode ? (
            'Save Changes'
          ) : (
            'Add Student'
          )}
        </button>
      </div>
    </form>
  );
}

/**
 * Add / Edit Student Form Modal with input validation
 */
export function StudentFormModal({
  isOpen,
  onClose,
  onSubmit,
  studentToEdit,
  isSubmitting,
}) {
  if (!isOpen) return null;

  const isEditMode = Boolean(studentToEdit);

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? () => {} : onClose}
      title={isEditMode ? 'Edit Student Details' : 'Enroll New Student'}
      subtitle={
        isEditMode
          ? `Updating records for: ${studentToEdit?.rollNumber || ''}`
          : 'Fill in academic details to register a student in MongoDB Atlas.'
      }
      maxWidth="620px"
    >
      <StudentFormInner
        key={studentToEdit?._id || 'new-student'}
        studentToEdit={studentToEdit}
        onSubmit={onSubmit}
        onClose={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}

export default StudentFormModal;

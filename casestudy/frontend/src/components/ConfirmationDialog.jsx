import Modal from './Modal';

/**
 * Confirmation dialog before deleting a student
 */
export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  student,
  isDeleting,
}) {
  if (!student) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={isDeleting ? () => {} : onClose}
      title="Delete Student Record"
      maxWidth="460px"
    >
      <div className="confirm-dialog-body">
        <div className="confirm-icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="10" y1="11" x2="10" y2="17" strokeLinecap="round" />
            <line x1="14" y1="11" x2="14" y2="17" strokeLinecap="round" />
          </svg>
        </div>

        <p className="confirm-text">
          Are you sure you want to permanently delete this student record?
        </p>

        <div className="confirm-student-card">
          <div className="confirm-detail">
            <span className="confirm-label">Student Name:</span>
            <strong>{student.name}</strong>
          </div>
          <div className="confirm-detail">
            <span className="confirm-label">Roll Number:</span>
            <code>{student.rollNumber}</code>
          </div>
          <div className="confirm-detail">
            <span className="confirm-label">Department:</span>
            <span>{student.department} (Year {student.year})</span>
          </div>
        </div>

        <p className="confirm-warning">
          This action cannot be undone. All academic records for this student will be removed.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(student._id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete Record'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationDialog;


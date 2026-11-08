import { useState, useEffect, useCallback } from 'react';
import studentApi from './services/api';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import StudentFormModal from './components/StudentFormModal';
import ConfirmationDialog from './components/ConfirmationDialog';
import DashboardView from './views/DashboardView';
import StudentsView from './views/StudentsView';
import AnalyticsView from './views/AnalyticsView';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [toast, setToast] = useState(null);

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation modal state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Initial load
  useEffect(() => {
    let isCancelled = false;

    async function initialize() {
      try {
        const [studentsData, analyticsData] = await Promise.all([
          studentApi.getAllStudents(),
          studentApi.getDepartmentAnalytics(),
        ]);

        if (!isCancelled) {
          setStudents(Array.isArray(studentsData) ? studentsData : []);
          setAnalytics(Array.isArray(analyticsData) ? analyticsData : []);
          setIsConnected(true);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to fetch data from backend:', err);
          setIsConnected(false);
          setToast({
            type: 'error',
            message: err.message || 'Failed to connect to MongoDB Atlas backend.',
          });
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    initialize();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Re-fetch data silently or with refresh indicator
  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const [studentsData, analyticsData] = await Promise.all([
        studentApi.getAllStudents(),
        studentApi.getDepartmentAnalytics(),
      ]);
      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setAnalytics(Array.isArray(analyticsData) ? analyticsData : []);
      setIsConnected(true);
    } catch (err) {
      console.error('Failed to refresh data from backend:', err);
      showToast('error', err.message || 'Failed to refresh data.');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Open modal for Adding new student
  const handleOpenAddModal = () => {
    setStudentToEdit(null);
    setIsFormOpen(true);
  };

  // Open modal for Editing student
  const handleOpenEditModal = (student) => {
    setStudentToEdit(student);
    setIsFormOpen(true);
  };

  const handleCloseFormModal = () => {
    if (isSubmitting) return;
    setIsFormOpen(false);
    setStudentToEdit(null);
  };

  // Open delete confirmation
  const handleOpenDeleteModal = (student) => {
    setStudentToDelete(student);
    setIsConfirmOpen(true);
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) return;
    setIsConfirmOpen(false);
    setStudentToDelete(null);
  };

  // Handle Add or Edit submission
  const handleFormSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      if (studentToEdit) {
        // UPDATE existing student
        const result = await studentApi.updateStudent(studentToEdit._id, payload);
        showToast('success', result.message || `Student ${payload.name} updated successfully!`);
      } else {
        // CREATE new student
        const result = await studentApi.createStudent(payload);
        showToast('success', result.message || `Student ${payload.name} enrolled successfully!`);
      }

      setIsFormOpen(false);
      setStudentToEdit(null);
      // Reload fresh data from backend
      await refreshData();
    } catch (err) {
      console.error('Error saving student:', err);
      showToast('error', err.message || 'Failed to save student record.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete confirmation
  const handleConfirmDelete = async (id) => {
    setIsDeleting(true);
    try {
      const result = await studentApi.deleteStudent(id);
      showToast('success', result.message || 'Student record deleted successfully.');
      setIsConfirmOpen(false);
      setStudentToDelete(null);
      // Reload fresh data from backend
      await refreshData();
    } catch (err) {
      console.error('Error deleting student:', err);
      showToast('error', err.message || 'Failed to delete student record.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Toast Notification Alert */}
      <Toast toast={toast} onClose={closeToast} />

      {/* Modern Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        studentCount={students.length}
        isConnected={isConnected}
      />

      {/* Main App Content Area */}
      <div className="app-main">
        <Navbar
          activeTab={activeTab}
          onOpenAddModal={handleOpenAddModal}
          onRefresh={refreshData}
          isRefreshing={isRefreshing}
        />

        <main className="app-content">
          {activeTab === 'dashboard' && (
            <DashboardView
              students={students}
              analytics={analytics}
              isLoading={isLoading}
              onOpenAddModal={handleOpenAddModal}
              onEditStudent={handleOpenEditModal}
              onDeleteStudent={handleOpenDeleteModal}
              onNavigateToStudents={() => setActiveTab('students')}
            />
          )}

          {activeTab === 'students' && (
            <StudentsView
              students={students}
              isLoading={isLoading}
              onOpenAddModal={handleOpenAddModal}
              onEditStudent={handleOpenEditModal}
              onDeleteStudent={handleOpenDeleteModal}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              students={students}
              analytics={analytics}
              isLoading={isLoading}
            />
          )}
        </main>
      </div>

      {/* Add / Edit Student Form Modal */}
      <StudentFormModal
        isOpen={isFormOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
        studentToEdit={studentToEdit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        student={studentToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default App;

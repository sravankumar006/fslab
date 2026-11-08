/**
 * Centralized API Service for Student Management System
 * Connects directly to the backend Express endpoints.
 */

const RAW_URL = import.meta.env.VITE_API_URL || 'https://fslab-casestudy.vercel.app';
const BASE_URL = RAW_URL ? RAW_URL.replace(/\/$/, '') : '';

/**
 * Helper to handle fetch responses and error extraction
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `HTTP ${response.status}: Request failed`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    // Network or server communication error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please ensure the backend is running on port 5000.', { cause: error });
    }
    throw error;
  }
}

export const studentApi = {
  // GET /api/students - Fetch all students
  getAllStudents: () => request('/api/students'),

  // GET /api/students/:id - Fetch single student by ID
  getStudentById: (id) => request(`/api/students/${id}`),

  // POST /api/students - Create a new student
  createStudent: (studentData) =>
    request('/api/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    }),

  // PUT /api/students/:id - Update student details
  updateStudent: (id, studentData) =>
    request(`/api/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    }),

  // DELETE /api/students/:id - Delete student
  deleteStudent: (id) =>
    request(`/api/students/${id}`, {
      method: 'DELETE',
    }),

  // GET /api/students/analytics/department - Department-wise statistics
  getDepartmentAnalytics: () => request('/api/students/analytics/department'),

  // GET /api/health - Backend health check
  checkHealth: () => request('/api/health'),
};

export default studentApi;

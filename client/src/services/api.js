console.log('Loading api.js');

const API_URL = 'http://localhost:5000/api/courses';

const api = {
  async getCourses() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async createCourse(data) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async updateCourse(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async deleteCourse(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async getModules(courseId) {
    const response = await fetch(`${API_URL}/${courseId}/modules`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async createModule(courseId, data) {
    const response = await fetch(`${API_URL}/${courseId}/modules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async getAnnouncements(courseId) {
    const response = await fetch(`${API_URL}/${courseId}/announcements`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async createAnnouncement(courseId, data) {
    const response = await fetch(`${API_URL}/${courseId}/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
};

if (typeof window.api === 'undefined') {
  console.log('Assigning window.api');
  window.api = api;
} else {
  console.warn('window.api already defined, overwriting.');
  window.api = api;
}
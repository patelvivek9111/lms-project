const { useState, useEffect } = React;

const api = {
  async getCourses() {
    const response = await fetch('http://localhost:5000/api/courses');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async createCourse(data) {
    const response = await fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async updateCourse(id, data) {
    const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async deleteCourse(id) {
    const response = await fetch(`http://localhost:5000/api/courses/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async getModules(courseId) {
    const response = await fetch(`http://localhost:5000/api/courses/${courseId}/modules`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async createModule(courseId, data) {
    const response = await fetch(`http://localhost:5000/api/courses/${courseId}/modules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async getAnnouncements(courseId) {
    const response = await fetch(`http://localhost:5000/api/courses/${courseId}/announcements`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  async createAnnouncement(courseId, data) {
    const response = await fetch(`http://localhost:5000/api/courses/${courseId}/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
};

const CourseForm = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [modules, setModules] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await api.getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating course with name:', courseName);
      await api.createCourse({ name: courseName });
      setCourseName('');
      fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleUpdateCourse = async (id, name) => {
    try {
      await api.updateCourse(id, { name });
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await api.deleteCourse(id);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleSelectCourse = async (id) => {
    setSelectedCourseId(id);
    try {
      const mods = await api.getModules(id);
      const anns = await api.getAnnouncements(id);
      setModules(mods);
      setAnnouncements(anns);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    try {
      await api.createModule(selectedCourseId, { title: moduleTitle });
      setModuleTitle('');
      handleSelectCourse(selectedCourseId);
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await api.createAnnouncement(selectedCourseId, { text: announcementText });
      setAnnouncementText('');
      handleSelectCourse(selectedCourseId);
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  return React.createElement('div', null,
    React.createElement('h2', null, 'Courses'),
    React.createElement('form', { onSubmit: handleCreateCourse },
      React.createElement('input', {
        type: 'text',
        value: courseName,
        onChange: (e) => setCourseName(e.target.value),
        placeholder: 'Course name',
        required: true
      }),
      React.createElement('button', { type: 'submit' }, 'Create Course')
    ),
    React.createElement('ul', null,
      courses.map(course => 
        React.createElement('li', { key: course.id },
          React.createElement('span', {
            onClick: () => handleSelectCourse(course.id),
            style: { cursor: 'pointer' }
          }, course.name),
          React.createElement('input', {
            type: 'text',
            defaultValue: course.name,
            onBlur: (e) => handleUpdateCourse(course.id, e.target.value)
          }),
          React.createElement('button', {
            onClick: () => handleDeleteCourse(course.id)
          }, 'Delete')
        )
      )
    ),
    selectedCourseId && [
      React.createElement('h2', { key: 'mod-title' }, 'Modules'),
      React.createElement('form', { key: 'mod-form', onSubmit: handleCreateModule },
        React.createElement('input', {
          type: 'text',
          value: moduleTitle,
          onChange: (e) => setModuleTitle(e.target.value),
          placeholder: 'Module title',
          required: true
        }),
        React.createElement('button', { type: 'submit' }, 'Add Module')
      ),
      React.createElement('ul', { key: 'mod-list' },
        modules.map(mod => 
          React.createElement('li', { key: mod.id }, mod.title)
        )
      ),
      React.createElement('h2', { key: 'ann-title' }, 'Announcements'),
      React.createElement('form', { key: 'ann-form', onSubmit: handleCreateAnnouncement },
        React.createElement('textarea', {
          value: announcementText,
          onChange: (e) => setAnnouncementText(e.target.value),
          placeholder: 'Announcement text',
          required: true
        }),
        React.createElement('button', { type: 'submit' }, 'Post Announcement')
      ),
      React.createElement('ul', { key: 'ann-list' },
        announcements.map(ann => 
          React.createElement('li', { key: ann.id }, ann.text)
        )
      )
    ]
  );
};

window.CourseForm = CourseForm;
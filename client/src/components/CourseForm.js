const { useState, useEffect } = React;

const CourseForm = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [modules, setModules] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    console.log('CourseForm useEffect: Checking for window.api...');
    const checkApi = setInterval(() => {
      if (typeof window.api !== 'undefined' && typeof window.api.getCourses === 'function') {
        console.log('CourseForm: window.api is defined and getCourses is a function');
        setApiReady(true);
        clearInterval(checkApi);
      } else {
        console.warn('CourseForm: window.api or window.api.getCourses is not defined yet');
      }
    }, 100);
    return () => clearInterval(checkApi);
  }, []);

  useEffect(() => {
    if (apiReady) {
      console.log('CourseForm: apiReady is true, calling fetchCourses');
      fetchCourses();
    }
  }, [apiReady]);

  const fetchCourses = async () => {
    try {
      console.log('CourseForm: Fetching courses...');
      const data = await window.api.getCourses();
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!apiReady) {
      console.error('CourseForm: API not ready for handleCreateCourse');
      return;
    }
    try {
      console.log('Creating course with name:', courseName);
      const result = await window.api.createCourse({ name: courseName });
      console.log('Create course result:', result);
      setCourseName('');
      fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
      if (error.message.includes('Network response was not ok')) {
        console.error('Check backend logs for 400 Bad Request details');
      }
    }
  };

  const handleUpdateCourse = async (id, name) => {
    if (!apiReady) {
      console.error('CourseForm: API not ready for handleUpdateCourse');
      return;
    }
    try {
      await window.api.updateCourse(id, { name });
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!apiReady) {
      console.error('CourseForm: API not ready for handleDeleteCourse');
      return;
    }
    try {
      await window.api.deleteCourse(id);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleSelectCourse = async (id) => {
    setSelectedCourseId(id);
    if (!apiReady) {
      console.error('CourseForm: API not ready for handleSelectCourse');
      return;
    }
    try {
      const mods = await window.api.getModules(id);
      const anns = await window.api.getAnnouncements(id);
      setModules(mods || []);
      setAnnouncements(anns || []);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    if (!apiReady) {
      console.error('CourseForm: API not ready for handleCreateModule');
      return;
    }
    try {
      await window.api.createModule(selectedCourseId, { title: moduleTitle });
      setModuleTitle('');
      handleSelectCourse(selectedCourseId);
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!apiReady) {
      console.error('CourseForm: API not ready for handleCreateAnnouncement');
      return;
    }
    try {
      await window.api.createAnnouncement(selectedCourseId, { text: announcementText });
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
          onChange: (e) => setCourseName(e.target.value),
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
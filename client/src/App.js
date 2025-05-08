if (typeof window.CourseForm === 'undefined') {
  console.error('CourseForm component is not defined. Check CourseForm.js loading.');
} else {
  const CourseForm = window.CourseForm;

  const App = () => {
    return React.createElement('div', { className: 'container' },
      React.createElement('h1', null, 'LMS Course Management'),
      React.createElement(CourseForm)
    );
  };

  if (typeof window.App === 'undefined') {
    window.App = App;
  } else {
    console.warn('App is already defined, overwriting.');
    window.App = App;
  }
}
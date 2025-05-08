const Course = require('../models/Course');

exports.getCourses = (req, res) => {
  Course.getAll((err, courses) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(courses);
  });
};

exports.createCourse = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  Course.create({ name }, (err, course) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(course);
  });
};

exports.updateCourse = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  Course.update(id, { name }, (err, course) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(course);
  });
};

exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  Course.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Course deleted' });
  });
};

exports.getModules = (req, res) => {
  const { courseId } = req.params;
  Course.getModules(courseId, (err, modules) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(modules);
  });
};

exports.createModule = (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  Course.createModule(courseId, { title }, (err, module) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(module);
  });
};

exports.getAnnouncements = (req, res) => {
  const { courseId } = req.params;
  Course.getAnnouncements(courseId, (err, announcements) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(announcements);
  });
};

exports.createAnnouncement = (req, res) => {
  const { courseId } = req.params;
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  Course.createAnnouncement(courseId, { text }, (err, announcement) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(announcement);
  });
};
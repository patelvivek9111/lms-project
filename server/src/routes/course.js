const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

router.get('/', courseController.getCourses);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.get('/:courseId/modules', courseController.getModules);
router.post('/:courseId/modules', courseController.createModule);
router.get('/:courseId/announcements', courseController.getAnnouncements);
router.post('/:courseId/announcements', courseController.createAnnouncement);

module.exports = router;
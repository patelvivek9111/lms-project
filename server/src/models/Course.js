const { db } = require('../utils/db');

const Course = {
  getAll: (callback) => {
    db.all('SELECT * FROM courses', [], callback);
  },
  create: (data, callback) => {
    db.run('INSERT INTO courses (name) VALUES (?)', [data.name], function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, name: data.name });
    });
  },
  update: (id, data, callback) => {
    db.run('UPDATE courses SET name = ? WHERE id = ?', [data.name, id], function(err) {
      if (err) return callback(err);
      callback(null, { id, name: data.name });
    });
  },
  delete: (id, callback) => {
    db.run('DELETE FROM courses WHERE id = ?', [id], callback);
  },
  getModules: (courseId, callback) => {
    db.all('SELECT * FROM modules WHERE courseId = ?', [courseId], callback);
  },
  createModule: (courseId, data, callback) => {
    db.run('INSERT INTO modules (courseId, title) VALUES (?, ?)', [courseId, data.title], function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, courseId, title: data.title });
    });
  },
  getAnnouncements: (courseId, callback) => {
    db.all('SELECT * FROM announcements WHERE courseId = ?', [courseId], callback);
  },
  createAnnouncement: (courseId, data, callback) => {
    db.run('INSERT INTO announcements (courseId, text) VALUES (?, ?)', [courseId, data.text], function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, courseId, text: data.text });
    });
  }
};

module.exports = Course;
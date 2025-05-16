const { db } = require('../utils/db');

class Course {
  static async create(data) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO courses (name) VALUES (?)', [data.name], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID, name: data.name });
      });
    });
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM courses', [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  static async update(data, options) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE courses SET name = ? WHERE id = ?',
        [data.name, options.where.id],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: options.where.id, name: data.name });
        }
      );
    });
  }

  static async destroy(options) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM courses WHERE id = ?', [options.where.id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: options.where.id });
      });
    });
  }
}

module.exports = Course;
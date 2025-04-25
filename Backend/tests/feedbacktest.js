const request = require('supertest');
const app = require('../server'); // export app from server.js

test('Sample test - always true', () => {
  expect(true).toBe(true);
});

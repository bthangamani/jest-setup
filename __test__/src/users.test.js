import axios from 'axios';
import Users from '../../src/users.js';
import { jest } from '@jest/globals';

// jest.mock('axios');
jest.mock('axios', () => {
  return jest.fn(() => {
    return {
      get: jest.fn()
    }
  })
});

test('should fetch users', () => {
  const users = [{ name: 'Bob' }];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
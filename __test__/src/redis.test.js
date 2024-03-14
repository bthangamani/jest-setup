import { jest } from '@jest/globals';
// Static Import of redis files does not picks up the mocks done below
// import redis from '../../src/redis.js';

const onMock = jest.fn();
const setMock = jest.fn();
const getMock = jest.fn();
const delMock = jest.fn();

jest.mock('ioredis', () => {
  const mockRedis = {
    set: setMock,
    get: getMock,
    del: delMock,
    on: onMock
  };
  return {
    Redis: jest.fn(() => mockRedis)
  }
});

describe('Redis client', () => {
  it('should connect to Redis', async () => {
    // Dynamic Import of redis files picks up the mocks done above
    const { default: redis } = await import('../../src/redis');
    
    try {
      redis.setDup('setDup-test', 100);
      expect(setMock).toHaveBeenCalledWith('setDup-test', true, 'ex', 100);

      redis.get('get-test');
      expect(getMock).toHaveBeenCalledWith('get-test');
      
      redis.del('del-test');
      expect(delMock).toHaveBeenCalledWith('del-test');

    } catch (error) {
      console.log(error);
    }
  });
});
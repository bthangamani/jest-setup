// this is a test file just for local testing will be removed on final pr before merge
import { jest } from '@jest/globals';
import ioredis from 'ioredis';
import redis from '../../src/redis.js';

jest.mock('ioredis');

const onMock = jest.fn();
const setMock = jest.fn();
const getMock = jest.fn();
const delMock = jest.fn();

ioredis.mockImplementation(() => {
  return {
      get: getMock,
      set: setMock,
      on: onMock,
      del: delMock
  };
});

describe('Redis Test', () => {
  it('Should successfully log redis errors', () => {
    expect(redis).toEqual(redisAnotherInstance);
    const redisError = new Error('test');
    redis.logErrorEvent(redisError);
    expect(logger.error).toHaveBeenCalledWith('Redis Error', redisError);
  });

  it('Should throw error given it has "ENOTFOUND" as the error code', () => {
    expect(redis).toEqual(redisAnotherInstance);
    const err = new Error('blah');
    err.code = 'ENOTFOUND';
    expect(() => redis.logErrorEvent(err)).toThrow(err);
  });

  describe('get', () => {
    it('should call redis.get', () => {
      redis.get('get-test');
      expect(getMock).toHaveBeenCalledWith('get-test');
    });
  });

  describe('setDup', () => {
    it('should call redis.set', () => {
      redis.setDup('setDup-test', 100);
      expect(setMock).toHaveBeenCalledWith('setDup-test', true, 'ex', 100);
    });
  });
  describe('del', () => {
    it('should call redis.del', () => {
      redis.del('del-test');
      expect(delMock).toHaveBeenCalledWith('del-test');
    });
  });
});



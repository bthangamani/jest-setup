// Mock from __mocks__ is not working so ignored the file by renaming it to diffrent name
import { jest } from '@jest/globals';

const mockRedis = {
    set: setMock,
    get: getMock,
    del: delMock,
    on: onMock
};

export const onMock = jest.fn();
export const setMock = jest.fn();
export const getMock = jest.fn();
export const delMock = jest.fn();

export const Redis = () => {
    return {
        Redis: jest.fn(() => mockRedis)
    }
};
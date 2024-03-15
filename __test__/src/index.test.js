import { main } from '../../src/index.js';
import axios from 'axios';
import { jest } from '@jest/globals';

jest.mock('axios');


describe('59873406', () => {
    it('should pass', async () => {
        const mResponse = { data: 'mock data' };
        axios.mockResolvedValueOnce(mResponse);
        const response = await main();
        expect(response).toEqual(mResponse);
        expect(axios).toBeCalledWith({ method: 'GET', url: 'https://stackoverflow.com/api', data: {} });
    });
});
import app from '../../../portal/app';
import ApiClient from '../../../portal/apiClient';
import request from 'supertest';
// import axios from 'axios';

jest.mock('../../../portal/apiClient');

describe('MovieController', () => {
  test('should success when query movie list', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          data: {
            count: 20,
            list: []
          },
          msg: 'success',
        };
      },
    }));
    const response = await request(app.callback())
      .get('/api/movie');
    const result = JSON.parse(response.text);

    expect(result.data.count).toEqual(20);
  });

  test('should success when query movie detail', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          msg: 'success',
        };
      },
    }));
    const response = await request(app.callback())
      .post('/api/movie/1/detail')
      .send({
        data: {
          id: '2',
          name: 'test'
        },
      });
    const result = JSON.parse(response.text);

    expect(result.msg).toEqual('success');
  });

  test('should success when query city', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          data: [{
            isHot: 1,
            name: 'test',
          }],
          msg: 'success',
        };
      },
    }));
    const response = await request(app.callback())
      .get('/api/movie/city');
    const result = JSON.parse(response.text);

    expect(result.data[0].isHot).toEqual(1);
  });
});

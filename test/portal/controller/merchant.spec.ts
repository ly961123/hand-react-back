import app from '../../../portal/app';
import ApiClient from '../../../portal/apiClient';
import request from 'supertest';

jest.mock('../../../portal/apiClient');

describe('MerchantController', () => {
  test('should success when query merchant list', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          data: {
            count: 685,
            merchants: []
          },
          msg: 'success',
        };
      },
    }));
    const response = await request(app.callback())
      .get('/api/merchant/list');
    const result = JSON.parse(response.text);

    expect(result.msg).toEqual('success');
  });

  test('should success when query merchant data', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          data: {
            channel: 0,
          },
          msg: 'success',
        };
      },
    }));
    const response = await request(app.callback())
      .get('/api/merchant/3');
    const result = JSON.parse(response.text);

    expect(result.msg).toEqual('success');
  });

  test('should success create merchant', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          code: 0,
          msg: 'success',
        };
      },
    }));
    const res = await request(app.callback())
      .post('/api/merchant/create');

    expect(res.body.code).toEqual(0);
  });

  test('should success update merchant', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          code: 0,
          msg: 'success',
        };
      },
    }));
    const res = await request(app.callback())
      .post('/api/merchant/3/update');

    expect(res.body.code).toEqual(0);
  });
});

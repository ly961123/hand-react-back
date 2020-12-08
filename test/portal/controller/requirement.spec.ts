import app from '../../../portal/app';
import ApiClient from '../../../portal/apiClient';
import request from 'supertest';

jest.mock('../../../portal/apiClient');

describe('MerchantController', () => {
  test('should success when query requirement list', async () => {
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
      .get('/api/requirement/requirementList');
    const result = JSON.parse(response.text);

    expect(result.msg).toEqual('success');
  });

  test('should success when query requirements', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          data: {
            amount: 0,
          },
          msg: 'success',
        };
      },
    }));
    const response = await request(app.callback())
      .get('/api/requirement/3/requirements');
    const result = JSON.parse(response.text);

    expect(result.msg).toEqual('success');
  });

  test('should success create requirement', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          code: 0,
          msg: 'success',
        };
      },
    }));
    const res = await request(app.callback())
      .post('/api/requirement/create');

    expect(res.body.msg).toEqual('success');
  });

  test('should success update requirement', async () => {
    (ApiClient as any).mockImplementation(() => ({
      request() {
        return {
          code: 0,
          msg: 'success',
        };
      },
    }));
    const res = await request(app.callback())
      .post('/api/requirement/3/update');

    expect(res.body.msg).toEqual('success');
  });
});

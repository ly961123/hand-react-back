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
});

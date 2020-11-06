import Mock from 'mockjs';

export const merchantList = (num: number) => {
  const name = `merchants|${num}`
  const merchantList = Mock.mock({
    [name]: [
      {
        'mchId|1': ['1', '2', '3', '4', '5'],
        'mchName|1': ['测试', '45646541654', '7788', '哈哈哈'],
        'createTime|1': [1599782400000, 1599900950000, 1600246550000],
        'creator|1': ['永', '嘻嘻嘻哈哈哈', 'is me'],
        'mchType|1': [0, 1, 2, 3, 4, 5],
      }
    ]
  });

  const data = {
    count: merchantList.merchants.length,
    merchants: merchantList.merchants,
  };
  
  return data;
};

import Mock from 'mockjs';

const aDayMS = 60 * 60 * 24 * 1000;

export const requirementList = (num: number) => {
  const name = `requirement|${num}`
  const requirementList = Mock.mock({
    [name]: [
      {
        'rmeId|+1': 2,
        'rmeName|1': ['来', '了', '老', '弟'],
        'mchName|1': ['测试', '45646541654', '7788', '哈哈哈'],
        'status|1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22],
        'amount|1': [100, 250, 410, 666],
        'creator|1': ['永', '嘻嘻嘻哈哈哈', 'is me'],
        'pm|1': ['v_yonlai;musama;', 'v_yonlai;', 'musama;', 'musama;jackieblin;', 'jackieblin;v_yonlai;', 'jackieblin;'],
        'currentHandler|1': ['永', '嘻嘻嘻哈哈哈', 'is me'],
        'linkman|1': ['永', '嘻嘻嘻哈哈哈', 'is me'],
        'phoneNum|1': ['10010', '10086', '1008611'],
        'description|1': [
          '的减肥了肯定是没法零点开始麻烦了开始咩多方面的发了没四大发明说多了',
          '的方式都发了啥的看法没道理可什么饭【普见见面，的',
          'dsjkfhsdkjfnndkyyyyyyyyyyyyyyyyyyy'
        ],
        'unit|1': ['个', '条', '只'],
        'createTime|1': [new Date().getTime() + aDayMS, new Date().getTime() + (aDayMS * 2), new Date().getTime() + (aDayMS * 4)],
        'expectedDeliveryDate|1': [new Date().getTime() + aDayMS, new Date().getTime() + (aDayMS * 2), new Date().getTime() + (aDayMS * 4)],
        'deliveredAmount|1': [999, 2541, 2438, 30, 44, 5],
        'checkPending|1': [9909, 251, 238, 300, 444, 52],
      }
    ]
  });

  if (num === 1) {
    return requirementList.requirement;
  }

  const data = {
    count: requirementList.requirement.length,
    requirement: requirementList.requirement,
  };
  
  return data;
};

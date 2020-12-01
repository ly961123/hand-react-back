import Mock from 'mockjs';

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
        'pm|1': ['永', '嘻嘻嘻哈哈哈', 'is me'],
        'currentHandler|1': ['永', '嘻嘻嘻哈哈哈', 'is me'],
        'createTime|1': [1599782400000, 1599900950000, 1600246550000],
        'expectedDeliveryDate|1': [1599782400000, 1599900950000, 1600246550000],
        'deliveredAmount|1': [999, 2541, 2438, 30, 44, 5],
        'checkPending|1': [9909, 251, 238, 300, 444, 52],
        // 'channel|1': [1, 2, 3, 4, 5, 6],
        // 'manager|1': ['鬼鬼', '团团', '马老师', 'pdd', '卢本wei'],
        // 'phoneNum|1': [1008611, 10010, 7788, 28723, 7758258],
        // 'mchDesc|1': [
        //   '看电视剧房东说今飞凯达疯狂老爹没法动发动机凤山街道低价疯狂零售价啊是多么拉风',
        //   '桐健码司法所懂得我们水电费独守空房的索拉卡独守空房',
        //   '大范甘迪规范格式好为国奋斗规范化就梵蒂冈地方',
        //   '对方水电费',
        //   '伞兵一号卢本wei'
        // ],
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
import Mock from 'mockjs';

export const movieList = (num: number) => {
  const name = `list|${num}`
  const movieList = Mock.mock({
    [name]: [
      {
        'id|1': ['1', '2', '3', '4', '5'],
        'name|1': ['八佰', '大师兄', '叶问', '花木兰'],
        'nation|1': ['中国大陆', '台湾'],
        'poster|1': [
          'https://pic.maizuo.com/usr/movie/c685628d1c1d5b05594618fd82b423a3.jpg',
          'https://pic.maizuo.com/usr/movie/09348aa4f961d2cb7e8f7c1e5f6e4e90.jpg',
          'https://pic.maizuo.com/usr/movie/a18739fd30d4b1b9e9a16a92bda44998.jpg',
          'https://pic.maizuo.com/usr/movie/376063f0e99a33e47f97ed6f080ddaa4.jpg',
          'https://pic.maizuo.com/usr/movie/98d4f877ba00db820c03cea1070654c4.jpg',
          'https://pic.maizuo.com/usr/movie/9ff5d9790a8b5ae573552f83af3e506c.jpg',
        ],
        'grade|1': ['7.1', '6.4', '8.3', '6.6'],
        'runtime|1': [165, 140, 180, 166],
        filmType: {
          'name|1': ['2D', '3D'],
          value: 1,
        },
        'premiereAt|1': [1599782400000, 1599900950000, 1600246550000],
        'synopsis|1': [
          '在古代中国，一位年轻的女子为了救她的父亲假扮成男装代父从军。在穿越中国广袤土地的壮丽征程中，她从紧张的训练和战争中存活下来，发现自己内心的战士，并且最终从外族侵略者手中救回了皇帝和她的祖国。。 刘亦菲饰演花木兰，Yoson An饰演花木兰恋人，李连杰饰演皇帝，巩俐饰演反派女巫，越南华裔女Xana Tang饰演花木兰的姐妹，甄子丹饰演花木兰的导师tung。',
          '1937年淞沪会战末期，国民革命军第88师524团留守上海四行仓库，与租界一河之隔，孤军奋战4昼夜，造就了罕见的被围观的战争；为壮声势，四百人对外号称八百人。 电影《八佰》由管虎导演，是亚洲首部全片使用IMAX摄影机拍摄的商业影片，将于2019年7月5日全国上映。',
          '世界存亡危在旦夕，“信条”一词是惟一的线索与武器。主人公穿梭于全球各地，开展特工活动，力求揭示“信条”之谜，并完成一项超越了真实时间的神秘任务。这项任务并非时间之旅，而是【时空逆转】。',
          '生活毫无激情的导游方元(包贝尔饰)在未收到任何祝福的生日当天，邂逅了陌生的潇洒女孩(辛芷蕾饰)，两人机缘巧合度过了开心的庆生夜……一年后的生日当天，方元再次遇到了和当初“潇洒女孩”长相一模一样的机器人初一(辛芷蕾饰)，两人亦开始了朝夕相处且啼笑皆非的生活，初一也逐渐融入了和巴哥（魏翔饰）等一群朋友的生活。方元对初一逐渐暗生情愫，而初一似乎还没有理解方元的心意……',
          '昆仑弟子姜子牙（郑希 配音）率领众神伐纣，赢得封神大战胜利。即将受封成为众神之长的他，却因一时过失引得昆仑大乱，从此被贬北海，为世人所唾弃。十年后，因一个契机，姜子牙踏上重回昆仑的旅途。在战后的废墟之上，他重新找到自我，也洞悉了十年前的一切真相。',
        ],
        'photos|1': [
          'https://pic.maizuo.com/usr/2020/43eaed2d023d8ac50ffc89b1ce67a60f.jpg',
          'https://pic.maizuo.com/usr/2020/3878ab5cb719655335c69a4b8ad8fc5a.jpg',
          'https://pic.maizuo.com/usr/100004717/2887553c3a863e716a55bd1db86a6a16.jpg',
          'https://pic.maizuo.com/usr/2020/83dd63f96b05e97954b613282811ebee.jpg',
          'https://pic.maizuo.com/usr/2020/7fac044acfdf27d206e09cf2e01a923b.jpg',
        ],
        stagePhoto: [
          'https://pic.maizuo.com/usr/2020/43eaed2d023d8ac50ffc89b1ce67a60f.jpg',
          'https://pic.maizuo.com/usr/2020/3878ab5cb719655335c69a4b8ad8fc5a.jpg',
          'https://pic.maizuo.com/usr/100004717/2887553c3a863e716a55bd1db86a6a16.jpg',
          'https://pic.maizuo.com/usr/2020/83dd63f96b05e97954b613282811ebee.jpg',
          'https://pic.maizuo.com/usr/2020/7fac044acfdf27d206e09cf2e01a923b.jpg',
        ],
        actors: [
          {
            'name|1': ['管虎', '张泽', '姜武','王千源', '黄志忠'],
            'role|1': ['导演', '编剧', '老铁','羊拐', '老葫芦'],
            'avatarAddress|1': [
              'https://pic.maizuo.com/usr/movie/c685628d1c1d5b05594618fd82b423a3.jpg',
              'https://pic.maizuo.com/usr/movie/09348aa4f961d2cb7e8f7c1e5f6e4e90.jpg',
              'https://pic.maizuo.com/usr/movie/a18739fd30d4b1b9e9a16a92bda44998.jpg',
              'https://pic.maizuo.com/usr/movie/376063f0e99a33e47f97ed6f080ddaa4.jpg',
              'https://pic.maizuo.com/usr/movie/98d4f877ba00db820c03cea1070654c4.jpg',
              'https://pic.maizuo.com/usr/movie/9ff5d9790a8b5ae573552f83af3e506c.jpg',
            ],
          },
          {
            'name|1': ['管虎', '张泽', '姜武','王千源', '黄志忠'],
            'role|1': ['导演', '编剧', '老铁','羊拐', '老葫芦'],
            'avatarAddress|1': [
              'https://pic.maizuo.com/usr/movie/c685628d1c1d5b05594618fd82b423a3.jpg',
              'https://pic.maizuo.com/usr/movie/09348aa4f961d2cb7e8f7c1e5f6e4e90.jpg',
              'https://pic.maizuo.com/usr/movie/a18739fd30d4b1b9e9a16a92bda44998.jpg',
              'https://pic.maizuo.com/usr/movie/376063f0e99a33e47f97ed6f080ddaa4.jpg',
              'https://pic.maizuo.com/usr/movie/98d4f877ba00db820c03cea1070654c4.jpg',
              'https://pic.maizuo.com/usr/movie/9ff5d9790a8b5ae573552f83af3e506c.jpg',
            ],
          },
          {
            'name|1': ['管虎', '张泽', '姜武','王千源', '黄志忠'],
            'role|1': ['导演', '编剧', '老铁','羊拐', '老葫芦'],
            'avatarAddress|1': [
              'https://pic.maizuo.com/usr/movie/c685628d1c1d5b05594618fd82b423a3.jpg',
              'https://pic.maizuo.com/usr/movie/09348aa4f961d2cb7e8f7c1e5f6e4e90.jpg',
              'https://pic.maizuo.com/usr/movie/a18739fd30d4b1b9e9a16a92bda44998.jpg',
              'https://pic.maizuo.com/usr/movie/376063f0e99a33e47f97ed6f080ddaa4.jpg',
              'https://pic.maizuo.com/usr/movie/98d4f877ba00db820c03cea1070654c4.jpg',
              'https://pic.maizuo.com/usr/movie/9ff5d9790a8b5ae573552f83af3e506c.jpg',
            ],
          },
          {
            'name|1': ['管虎', '张泽', '姜武','王千源', '黄志忠'],
            'role|1': ['导演', '编剧', '老铁','羊拐', '老葫芦'],
            'avatarAddress|1': [
              'https://pic.maizuo.com/usr/movie/c685628d1c1d5b05594618fd82b423a3.jpg',
              'https://pic.maizuo.com/usr/movie/09348aa4f961d2cb7e8f7c1e5f6e4e90.jpg',
              'https://pic.maizuo.com/usr/movie/a18739fd30d4b1b9e9a16a92bda44998.jpg',
              'https://pic.maizuo.com/usr/movie/376063f0e99a33e47f97ed6f080ddaa4.jpg',
              'https://pic.maizuo.com/usr/movie/98d4f877ba00db820c03cea1070654c4.jpg',
              'https://pic.maizuo.com/usr/movie/9ff5d9790a8b5ae573552f83af3e506c.jpg',
            ],
          },
          {
            'name|1': ['管虎', '张泽', '姜武','王千源', '黄志忠'],
            'role|1': ['导演', '编剧', '老铁','羊拐', '老葫芦'],
            'avatarAddress|1': [
              'https://pic.maizuo.com/usr/movie/c685628d1c1d5b05594618fd82b423a3.jpg',
              'https://pic.maizuo.com/usr/movie/09348aa4f961d2cb7e8f7c1e5f6e4e90.jpg',
              'https://pic.maizuo.com/usr/movie/a18739fd30d4b1b9e9a16a92bda44998.jpg',
              'https://pic.maizuo.com/usr/movie/376063f0e99a33e47f97ed6f080ddaa4.jpg',
              'https://pic.maizuo.com/usr/movie/98d4f877ba00db820c03cea1070654c4.jpg',
              'https://pic.maizuo.com/usr/movie/9ff5d9790a8b5ae573552f83af3e506c.jpg',
            ],
          },
        ],
      }
    ]
  })
  if (num === 1) {
    return movieList.list;
  }
  const data = {
    count: movieList.list.length,
    list: movieList.list,
  };
  
  return data;
};

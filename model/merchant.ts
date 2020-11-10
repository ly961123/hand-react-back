interface ITypeItem {
  text: string;
  value: number;
}

export interface List {
  mchId?: string;
  mchName: string;
  createTime?: number;
  creator?: string;
  mchType: number;
  channel: number;
  manager: string;
  phoneNum: number;
  mchDesc: string;
}

export interface MerchantData {
  merchants: List[],
  count: number,
}

export interface IMerchantList {
  msg: string,
  data: MerchantData,
}

export interface IMerchantData {
  msg: string,
  data: List,
}

export const TypeList: ITypeItem[] = [
  {
    text: '全部类型',
    value: 0,
  },
  {
    text: '中台',
    value: 1,
  },
  {
    text: '非中台',
    value: 2,
  },
  {
    text: '业务',
    value: 3,
  },
  {
    text: '外公司业务',
    value: 4,
  },
  {
    text: '项目组',
    value: 5,
  },
];

export const ChannelList: ITypeItem[] = [
  {
    text: '云',
    value: 1,
  },
  {
    text: '渠道',
    value: 2,
  },
  {
    text: '平台',
    value: 3,
  },
  {
    text: '派单',
    value: 4,
  },
  {
    text: '推广',
    value: 5,
  },
  {
    text: '其他',
    value: 6,
  },
];

interface ITypeItem {
  text: string;
  value: number;
}

interface List {
  mchId: string;
  mchName: string;
  createTime: number;
  creator: string;
  mchType: string;
}

export interface MerchantData {
  merchants: List[],
  count: number,
}

export interface IMerchantList {
  msg: string,
  data: MerchantData,
}

export const TypeList: ITypeItem[] = [
  {
    text: '全部类型',
    value: 0,
  },
  {
    text: 'PCG中台',
    value: 1,
  },
  {
    text: 'PCG非中台',
    value: 2,
  },
  {
    text: '外BG业务',
    value: 3,
  },
  {
    text: '外公司业务',
    value: 4,
  },
  {
    text: '联合项目组',
    value: 5,
  },
];

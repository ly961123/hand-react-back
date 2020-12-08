export interface MerchantOptions {
  value: number;
  text: string;
}

export interface List {
  rmeId: number;
  rmeName: string;
  mchName: string;
  status: number;
  amount: string;
  creator: string;
  pm: string;
  currentHandler: string;
  createTime?: number;
  expectedDeliveryDate: number;
  deliveredAmount: number;
  checkPending: number;
  description: string;
  linkman: string;
  phoneNum: string;
  unit: string;
}

export interface IRequirement {
  msg: string,
  data: RequirementData,
}

export interface IList {
  msg: string,
  data: List,
}

export interface RequirementData {
  requirement: List[],
  count: number,
}

export enum RequirementStatus {
  PurposeCommunicate = 1,
  TrialProduction,
  ProjectAppraisal,
  BusinessPlan,
  InBidding,
  FinanceAppraisal,
  SignContract,
  Production,
  DataDelivery,
  DataReceive,
  AfterConfirmation,
  DataArchiving,
  Finished,
  RequirementOver,
  PlanReject,
  FinanceReject,
  RequirementClose,
  RequirementStatement = 20,
  FinanceCancelAfterVerify,
  RequirementDistribute,
}

export enum UnexpectedRequirementStatus {
  UnrelatedToBizTask = 100,
}

export const statusNames: Record<string, string> = {
  0: '全部状态',
  [RequirementStatus.PurposeCommunicate]: '新需求',
  [RequirementStatus.TrialProduction]: '试生产',
  [RequirementStatus.ProjectAppraisal]: '项目评估',
  [RequirementStatus.BusinessPlan]: '需求方案',
  [RequirementStatus.InBidding]: '竞标中',
  [RequirementStatus.FinanceAppraisal]: '财务评估',
  [RequirementStatus.SignContract]: '签订合约',
  [RequirementStatus.Production]: '正式生产',
  [RequirementStatus.DataDelivery]: '数据交付',
  [RequirementStatus.DataReceive]: '数据验收',
  [RequirementStatus.AfterConfirmation]: '售后确认',
  [RequirementStatus.DataArchiving]: '数据归档',
  [RequirementStatus.Finished]: '合约完成',
  [RequirementStatus.RequirementOver]: '需求拒绝',
  [RequirementStatus.PlanReject]: '方案拒绝',
  [RequirementStatus.FinanceReject]: '财务拒绝',
  [RequirementStatus.RequirementClose]: '需求关闭',
  [RequirementStatus.RequirementStatement]: '需求结算',
  [RequirementStatus.FinanceCancelAfterVerify]: '财务核销',
  [RequirementStatus.RequirementDistribute]: '需求分发',
};


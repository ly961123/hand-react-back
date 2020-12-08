import React, {
  memo,
  useEffect,
  useCallback,
  useState,
  ReactNode,
} from 'react';
import { Button, Form, Col, Row, Input, DatePicker, Select, message, Table } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { IMerchantList } from '@rootDir/model/merchant';
import { MerchantOptions, RequirementData, IRequirement, statusNames, List } from '@rootDir/model/requirement';
import apiClient from '@rootDir/client/apiClient';
import Spins from '@rootDir/client/component/Spins';
import CardLayout from '../../../component/layout/CardLayout';
import CardHeader from '../../../component/layout/CardHeader';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import './index.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const allMerchantOption = [{ value: 0, text: '所有商户' }];
const spanGutter = {
  sm: 12,
  xl: 8,
  xxl: 5,
};
const defultData = {
  count: 0,
  requirement: [],
};

const Shop = memo(({ match, history }: RouteComponentProps) => {
  const [form] = Form.useForm();
  const [merchantList, setMerchantList] = useState<MerchantOptions[]>();
  const [requirementList, setRequirementList] = useState<RequirementData>(defultData);
  const [loading, setLoading] = useState(false);

  const fetchMerchants = () => apiClient.get<IMerchantList>('merchant/list')
    .then(res => {
      const options = res.data.merchants.map(m => ({ value: m.mchId, text: m.mchName }));
      setMerchantList(allMerchantOption.concat(options));
    })
    .catch(() => {
      message.error('获取列表错误');
    });

  useEffect(() => {
    console.log(window, '__GLOBAL__');
    fetchMerchants();
  }, []);

  const fetchList = useCallback(async () => {
    const result: IRequirement = await apiClient.get(`requirement/requirementList`);
    return result;
  }, []);

  const getList = useCallback(() => {
    setLoading(true);
    fetchList().then((res: IRequirement) => {
      console.log(res, 'res');
      setRequirementList(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      message.error('获取列表错误');
    })
  }, [fetchList]);

  useEffect(() => {
    getList();
  }, [getList]);

  const goDetail = (id: number) => {
    history.push(`${match.path}/${id}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    console.log(goDetail);
  };

  const submit = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        const { deliveryTimeRange, createTimeRange } = values;
        const deliveryTimeRangeStart = moment(deliveryTimeRange[0]).format('YYYY/MM/DD');
        const deliveryTimeRangeEnd = moment(deliveryTimeRange[1]).format('YYYY/MM/DD');
        const createTimeRangeStart = moment(createTimeRange[0]).format('YYYY/MM/DD');
        const createTimeRangeEnd = moment(createTimeRange[1]).format('YYYY/MM/DD');
        console.log(deliveryTimeRangeStart, 'deliveryTimeRangeStart');
        console.log(deliveryTimeRangeEnd, 'deliveryTimeRangeEnd');
        console.log(createTimeRangeStart, 'createTimeRangeStart');
        console.log(createTimeRangeEnd, 'createTimeRangeEnd');
        console.log(values, 'values1111');
      });
  }, [form]);

  const hhh: ColumnFilterItem[] = Object.keys(statusNames).map(state => {
    return {
      text: <span>{statusNames[state]}</span>,
      value: state,
    }
  });

  const columns = [
    {
      title: '需求ID',
      dataIndex: 'rmeId',
      key: 'rmeId',
    },
    {
      title: '需求名称',
      dataIndex: 'rmeName',
      key: 'rmeName',
    },
    {
      title: '商户名称',
      dataIndex: 'mchName',
      key: 'mchName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: hhh,
      onFilter: (value: string | number | boolean, record: List) => String(record.status) === value,
      render: (status: number) => {
        return <span className={`tag tag-${status}`}>{statusNames[status]}</span>
      }
    },
    {
      title: '数据量',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a: List, b: List) => Number(a.amount) - Number(b.amount),
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '需求PM',
      dataIndex: 'pm',
      key: 'pm',
    },
    {
      title: '当前处理人',
      dataIndex: 'currentHandler',
      key: 'currentHandler',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: number) {
        return moment(createTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '逾期交付时间',
      dataIndex: 'expectedDeliveryDate',
      key: 'expectedDeliveryDate',
      render(expectedDeliveryDate: number) {
        return moment(expectedDeliveryDate).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '已交付',
      dataIndex: 'deliveredAmount',
      key: 'deliveredAmount',
    },
    {
      title: '待验收',
      dataIndex: 'checkPending',
      key: 'checkPending',
    },
    {
      title: '操作',
      dataIndex: 'rmeId',
      key: 'rmeId',
      render(rmeId: number): ReactNode {
        return <div>
          <a data-rmeId={rmeId} onClick={() => {
            // eslint-disable-next-line react/prop-types
            history.push(`requirements/${rmeId}/edit`)
          }}>编辑</a>
        </div>;
      },
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  // const onChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // }
  
  // const onBlur = () => {
  //   console.log('blur');
  // }
  
  // const onFocus = () => {
  //   console.log('focus');
  // }
  
  // const onSearch = (val: string) => {
  //   console.log('search:', val);
  // }

  return (
    <CardLayout
      header={
        <CardHeader
          history={history}
          // showBackButton
          title='需求列表'
          operation={
            true
            && <Button
              type='primary'
              onClick={() => {
                history.push('requirements/create');
              }}
            >
              新建需求
            </Button>
          }
        />
      }
    >
      <div className='require-list'>
        <Spins spinning={loading}>
          <Form form={form}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col {...spanGutter}>
                <Form.Item
                  label='商户名'
                  name='name'
                >
                  <Select
                    showSearch
                    placeholder='商户名'
                    filterOption={(input, option) =>
                      option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      merchantList?.map((option, index) =>
                        <Option
                          key={option.value + index}
                          value={option.value}
                        >{option.text}</Option>)
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col {...spanGutter}>
                <Form.Item
                  label='预期交付时间'
                  name='deliveryTimeRange'
                >
                  <RangePicker style={{width: '100%'}} />
                </Form.Item>
              </Col>
              <Col {...spanGutter}>
                <Form.Item
                  label='创建时间'
                  name='createTimeRange'
                >
                  <RangePicker style={{width: '100%'}} />
                </Form.Item>
              </Col>
              <Col {...spanGutter}>
                <Form.Item
                  label='标签'
                  name='tag'
                >
                  <Select
                    mode='multiple'
                    allowClear
                    placeholder='请选择标签'
                  >
                    <Option value='111'>1111</Option>
                    <Option value='222'>222</Option>
                    <Option value='333'>333</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col {...spanGutter}>
                <Form.Item
                  label='需求pm'
                  name='pm'
                >
                  <Input allowClear autoComplete='off' />
                </Form.Item>
              </Col>
              <Col {...spanGutter}>
                <Form.Item
                  label='关键字'
                  name='searchWord'
                >
                  <Input allowClear autoComplete='off' />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Button
                  type='primary'
                  icon={<SearchOutlined />}
                  onClick={() => submit()}
                >搜索</Button>
              </Col>
            </Row>
          </Form>
          <Table
            columns={columns}
            dataSource={requirementList.requirement}
            bordered
            size='small'
            onChange={onChange}
          />
        </Spins>
      </div>
    </CardLayout>
  )
})

export default Shop;
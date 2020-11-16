import React, {
  memo,
  useContext,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { GlobalState } from '../application';
import { Button, Row, Col, Form, Input, Select, DatePicker, Table, Spin, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import CardLayout from '../../component/layout/CardLayout';
import CardHeader from '../../component/layout/CardHeader';
import { TypeList, IMerchantList, MerchantData } from '@rootDir/model/merchant';
import apiClient from '@rootDir/client/apiClient';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const defultData = {
  count: 0,
  merchants: [],
};

const FillScheme = memo(({ history }: RouteComponentProps) => {
  const [form] = Form.useForm();
  const { hideMenu, setHideMenu } = useContext(GlobalState);
  const [merchantList, setMerchantList] = useState<MerchantData>(defultData);
  const [loading, setLoading] = useState(false);
  console.log(hideMenu, setHideMenu);

  const fetchList = useCallback(async () => {
    const result: IMerchantList = await apiClient.get(`merchant/list`);
    return result;
  }, []);

  const getList = useCallback(() => {
    setLoading(true);
    fetchList().then((res: IMerchantList) => {
      setMerchantList(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      message.error('获取列表错误')
    })
  }, [fetchList]);

  useEffect(() => {
    getList();
  }, [getList]);

  const handleEditClick = React.useCallback(e => {
    const mchId = e.target.getAttribute('data-mchid');
    history.push(`/merchants/${mchId}/edit`);
  }, [history]);

  const columns = [
    {
      title: '商户名称',
      dataIndex: 'mchName',
      key: 'mchName',
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
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '商户类型',
      dataIndex: 'mchType',
      key: 'mchType',
      render(mchType: number) {
        return TypeList.find(v => v.value === mchType)?.text;
      },
    },
    {
      title: '操作',
      dataIndex: 'mchId',
      key: 'mchId',
      render(mchId: number): ReactNode {
        return <div>
          <a onClick={handleEditClick} data-mchid={mchId}>编辑</a>
        </div>;
      },
    },
  ];

  const submit = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        const { registTime } = values;
        const startTime = moment(registTime[0]).format('YYYY/MM/DD');
        const endTime = moment(registTime[1]).format('YYYY/MM/DD');
        console.log(moment(registTime[0]).valueOf(), 'startTime');
        console.log(moment(registTime[1]).valueOf(), 'endTime');
        console.log(startTime, 'startTime');
        console.log(endTime, 'endTime');
        console.log(values, 'values1111');
      });
  }, [form]);

  return (
    <CardLayout
      header={
        <CardHeader
          history={history}
          // showBackButton
          title='商户列表'
          operation={
            <Button
              type='primary'
              onClick={() => {
                history.push('/merchants/create');
              }}
            >
              新建商户
            </Button>
          }
        />
      }
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={6}>
              <Form.Item
                label='商户类型'
                name='type'
              >
                <Select>
                  {
                    TypeList.map((v, i) => <Option key={`Option-${i}`} value={v.value}>{v.text}</Option>)
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='注册时间'
                name='registTime'
              >
                <RangePicker style={{width: '100%'}} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='商户名'
                name='name'
              >
                <Input allowClear autoComplete='off' />
              </Form.Item>
            </Col>
            <Col span={6}>
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
          dataSource={merchantList.merchants}
          bordered
          size='small'
        />
      </Spin>
    </CardLayout>
  )
})

export default FillScheme;
import React, {
  memo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  Button,
  Form,
  Input,
  Col,
  Divider,
  Card,
  message,
  DatePicker,
} from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import CardLayout from '../../../component/layout/CardLayout';
import CardHeader from '../../../component/layout/CardHeader';
import { IMerchantList } from '@rootDir/model/merchant';
import { List } from '@rootDir/model/requirement';
import apiClient from '@rootDir/client/apiClient';
import Spins from '@rootDir/client/component/Spins';
import moment from 'moment';
import './index.scss';

type IProps = {
  requirement?: List,
} & Pick<RouteComponentProps, 'history'>;

const { TextArea } = Input;

const aDayMS = 60 * 60 * 24 * 1000;

const formItemLayout = {
  labelCol: {
    sm: { span: 2 },
  },
  wrapperCol: {
    sm: { span: 22 },
  },
};

const defaultForm = {
  rmeName: '',
  amount: '',
  unit: '',
  expectedDeliveryDate: new Date().getTime(),
  description: '',
  linkman: '',
  phoneNum: '',
};

const RequirementFrom = memo(({
  history,
  requirement,
}: IProps) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (requirement && Object.keys(requirement).length > 0) {
      const {
        rmeName,
        amount,
        unit,
        expectedDeliveryDate,
        description,
        linkman,
        phoneNum,
      } = requirement;
      const data = {
        rmeName,
        amount,
        unit,
        expectedDeliveryDate,
        description,
        linkman,
        phoneNum: String(phoneNum),
      }
      setFormData(data);
      form.setFieldsValue(data);
    }
  }, [form, requirement]);

  const fetchData = async (url: string, values: List) => {
    const result: IMerchantList = await apiClient.post(url, values);
    return result;
  };

  const submitToCreate = (values: List) => {
    submitForm('requirement/create', '创建', values);
  };

  const submitToUpdate = (values: List) => {
    submitForm(`requirement/${requirement?.rmeId}/update`, '更新', { ...values, merchantId: requirement?.rmeId});
  };

  const submitForm = useCallback((url: string, tip: string, values: any) => {
    setLoading(true);
    fetchData(url, values).then(() => {
      setLoading(false);
      history.replace('/merchants');
      message.success(`${tip}成功`);
    }).catch(() => {
      setLoading(false);
      message.error(`${tip}失败`);
    })
  }, [history]);

  const submit = useCallback(fetch => {
    form
      .validateFields()
      .then(values => {
        // fetch(values);
        console.log(fetch);
        console.log(values);
      });
  }, [form]);

  const setFormField = (key: string, value: any) => {
    const data = {
      ...formData,
      [key]: key === 'expectedDeliveryDate' ? value.valueOf() : value,
    }
    setFormData(data);
    form.setFieldsValue(data);
  };

  const handleDisabledDate = useCallback(current =>
    current.isBefore(new Date().getTime() - aDayMS)
  , []);

  return (
    <CardLayout
      header={
        <CardHeader
          history={history}
          showBackButton
          title='需求列表'
        />
      }
    >
      <Spins spinning={loading}>
        <Form form={form} {...formItemLayout}>
          <Form.Item
            label='需求名称'
            name='rmeName'
            rules={[{ required: true, message: '请输入需求名!' }]}
          >
            <Col span={8}>
              <Input
                allowClear
                autoComplete='off'
                placeholder='请输入需求名'
                value={formData.rmeName}
                onChange={e => setFormField('rmeName', e.target.value)}
              />
            </Col>
          </Form.Item>
          <Form.Item
            label='需求数据量'
            name='amount'
            rules={[
              { required: true, message: '请输入需求数据量!' },
              {
                validator(_, value) {
                  if (!value || value.match(/^\+?[1-9]\d*$/)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('请输入正确格式的需求数据量!');
                },
              },
            ]}
          >
            <Col span={4}>
              <Input
                allowClear
                autoComplete='off'
                placeholder='请输入需求数据量'
                value={formData.amount}
                onChange={e => setFormField('amount', e.target.value)}
              />
              <Form.Item
                className='unit'
                name='unit'
                rules={[
                  { required: true, message: '请输入单位!' },
                ]}
              >
                <Col span={13}>
                  <Input
                    allowClear
                    autoComplete='off'
                    placeholder='数据单位'
                    value={formData.unit}
                    onChange={e => setFormField('unit', e.target.value)}
                  />
                </Col>
              </Form.Item>
            </Col>
          </Form.Item>
          <Form.Item
            label='预期交付'
            name='expectedDeliveryDate'
            rules={[{ required: true, message: '请选择预期交付时间!' }]}
          >
            <Col span={6}>
              <DatePicker
                allowClear={false}
                value={moment(formData.expectedDeliveryDate)}
                disabledDate={handleDisabledDate}
                onChange={e => setFormField('expectedDeliveryDate', e)}
              />
            </Col>
          </Form.Item>
          <Form.Item
            label='联系人'
            name='linkman'
            rules={[{ required: true, message: '请输入联系人!' }]}
          >
            <Col span={4}>
              <Input
                allowClear
                autoComplete='off'
                placeholder='联系人'
                value={formData.linkman}
                onChange={e => setFormField('linkman', e.target.value)}
              />
              <Form.Item
                className='phoneNum'
                name='phoneNum'
                rules={[
                  { required: true, message: '请输入联系方式!' },
                  {
                    validator(_, value) {
                      if (!value || value.match(/^\d{1,}$/)) {
                        return Promise.resolve();
                      }
                      return Promise.reject('请输入正确格式的联系方式!');
                    },
                  },
                ]}
              >
                <Col span={24}>
                  <Input
                    allowClear
                    autoComplete='off'
                    placeholder='联系方式'
                    value={formData.phoneNum}
                    onChange={e => setFormField('phoneNum', e.target.value)}
                  />
                </Col>
              </Form.Item>
            </Col>
          </Form.Item>
          <Form.Item
            label='商户说明'
            name='description'
            rules={[{ required: true, message: '请输入商户说明!' }]}
          >
            <Col span={12}>
              <TextArea
                rows={4}
                allowClear
                placeholder='请输入商户说明'
                value={formData.description}
                onChange={e => setFormField('description', e.target.value)}
              />
            </Col>
          </Form.Item>
        </Form>
        <Divider />
        <Card bordered={false}>
          <Button
            type='primary'
            style={{marginRight: '10px'}}
            onClick={() => {
              if (requirement && Object.keys(requirement).length > 0) {
                submit(submitToUpdate)
              } else {
                submit(submitToCreate)
              }
            }}
          >
            提交
          </Button>
          <Button
            onClick={() => {
              history.push('/requirements');
            }}
          >
            取消
          </Button>
        </Card>
      </Spins>
    </CardLayout>
  )
})

export default RequirementFrom;

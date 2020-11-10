import React, {
  memo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  Button,
  Spin,
  Form,
  Input,
  Col,
  Radio,
  Divider,
  Card,
  message,
} from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import CardLayout from '../../../component/layout/CardLayout';
import CardHeader from '../../../component/layout/CardHeader';
import { IMerchantList, TypeList, ChannelList, List } from '@rootDir/model/merchant';
import apiClient from '@rootDir/client/apiClient';

type IProps = {
  merchant?: List,
} & Pick<RouteComponentProps, 'history'>;

const { TextArea } = Input;
const { Group } = Radio;

const formItemLayout = {
  labelCol: {
    sm: { span: 2 },
  },
  wrapperCol: {
    sm: { span: 22 },
  },
};

const defaultForm = {
  channel: -1,
  manager: '',
  mchDesc: '',
  mchName: '',
  mchType: -1,
  phoneNum: '',
};

const MerchantFrom = memo(({
  history,
  merchant,
}: IProps) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (merchant && Object.keys(merchant).length > 0) {
      const { channel, manager, mchDesc, mchName, mchType, phoneNum } = merchant;
      const data = {
        channel,
        manager,
        mchDesc,
        mchName,
        mchType,
        phoneNum: String(phoneNum),
      }
      setFormData(data);
      form.setFieldsValue(data);
    }
  }, [merchant]);

  const fetchData = async (url: string, values: List) => {
    const result: IMerchantList = await apiClient.post(url, values);
    return result;
  };

  const submitToCreate = (values: List) => {
    submitForm('merchant/create', '创建', values);
  };

  const submitToUpdate = (values: List) => {
    submitForm(`merchant/${merchant?.mchId}/update`, '更新', { ...values, merchantId: merchant?.mchId});
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
  }, [fetchData, apiClient]);

  const submit = useCallback(fetch => {
    form
      .validateFields()
      .then(values => {
        fetch(values);
      });
  }, []);

  const setFormField = (key: string, value: any) => {
    const data = {
      ...formData,
      [key]: value,
    }
    setFormData(data);
    form.setFieldsValue(data);
  };

  return (
    <CardLayout
      header={
        <CardHeader
          history={history}
          showBackButton
          title='商户列表'
        />
      }
    >
      <Spin spinning={loading}>
        <Form form={form} {...formItemLayout}>
          <Form.Item
            label='商户名'
            name='mchName'
            rules={[{ required: true, message: '请输入商户名!' }]}
          >
            <Col span={8}>
              <Input
                allowClear
                autoComplete='off'
                placeholder='请输入商户名'
                value={formData.mchName}
                onChange={e => setFormField('mchName', e.target.value)}
              />
            </Col>
          </Form.Item>
          <Form.Item
            label='商户类型'
            name='mchType'
            rules={[{ required: true, message: '请选择商户类型!' }]}
          >
            <Group onChange={e => setFormField('mchType', e.target.value)}>
              {
                TypeList.map((v, i) => <Radio key={`${v.text + i}`} value={v.value}>{v.text}</Radio>)
              }
            </Group>
          </Form.Item>
          <Form.Item
            label='渠道来源'
            name='channel'
            rules={[{ required: true, message: '请选择渠道来源!' }]}
          >
            <Group onChange={e => setFormField('channel', e.target.value)}>
              {
                ChannelList.map((v, i) => <Radio key={`${v.text + i}`} value={v.value}>{v.text}</Radio>)
              }
            </Group>
          </Form.Item>
          <Form.Item
            label='接口人'
            name='manager'
            rules={[{ required: true, message: '请输入接口人!' }]}
          >
            <Col span={6}>
              <Input
                allowClear
                autoComplete='off'
                placeholder='请输入接口人'
                value={formData.manager}
                onChange={e => setFormField('manager', e.target.value)}
              />
            </Col>
          </Form.Item>
          <Form.Item
            label='联系方式'
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
            <Col span={6}>
              <Input
                allowClear
                autoComplete='off'
                placeholder='请输入联系方式'
                value={formData.phoneNum}
                onChange={e => setFormField('phoneNum', e.target.value)}
              />
            </Col>
          </Form.Item>
          <Form.Item
            label='商户说明'
            name='mchDesc'
            rules={[{ required: true, message: '请输入商户说明!' }]}
          >
            <Col span={12}>
              <TextArea
                rows={4}
                allowClear
                placeholder='请输入商户说明'
                value={formData.mchDesc}
                onChange={e => setFormField('mchDesc', e.target.value)}
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
              if (merchant && Object.keys(merchant).length > 0) {
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
              history.push('/merchants');
            }}
          >
            取消
          </Button>
        </Card>
      </Spin>
    </CardLayout>
  )
})

export default MerchantFrom;

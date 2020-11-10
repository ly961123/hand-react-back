import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import './index.scss';
import menuDate from '../menu.json';

interface Props {
  children: React.ComponentClass;
}

interface MenuDate {
  content: string;
  icon: string;
  url: string;
  children?: MenuDate[];
}

const icons: any = {
  merchants : <ShoppingOutlined />,
  merchantList : <UnorderedListOutlined />,
  requirements : <CalendarOutlined />,
  requirementList : <BarsOutlined />,
};


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const SiderDemo = ({ history, children, location }: RouteComponentProps & Props) => {
  console.log(history, 'historyhistoryhistoryhistory');
  console.log(location, 'locationlocationlocationlocation');
  const setOpenkey = useRef<boolean>(true);
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>();
  const [selectedKeys, setSelectedKeys] = useState<string[]>();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const setMenu = (menuDate: MenuDate[]) => {
    const menuItem: any = [];
    menuDate.forEach((item: MenuDate) => {
      if (item.children) {
        menuItem.push(
          <SubMenu key={item.url} title={(
            <span>
              {icons[item.icon]}
              <span>{item.content}</span>
            </span>
          )}>
            {setMenu(item.children)}
          </SubMenu>
        )
      } else {
        menuItem.push(
          <Menu.Item key={item.url}>
            <Link to={item.url}>
              {icons[item.icon]}
              <span>{item.content}</span>
            </Link>
          </Menu.Item>
        )
      }
    });
    return menuItem;
  };

  useEffect(() => {
    setSelectedKeys(location.pathname === '/' ? ['/merchants'] : [location.pathname]);
    if (setOpenkey.current) {
      setOpenKeys(location.pathname === '/' ? ['/merchants'] : [`/${location.pathname.split('/')[1]}`]);
      setOpenkey.current = !setOpenkey.current;
    }
  }, [location]);

  return (
    <Layout style={{height:'100%'}}>
      <Header className='site-layout-header' style={{ padding: 0, height: '50px' }}>
        <div className='logo'>logo</div>
        <div className='avatar'>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </div>
      </Header>
      <Layout className='site-layout'>
        <Sider collapsed={collapsed} width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            onOpenChange={(e: any) => setOpenKeys(e)}
            openKeys={openKeys}
            onClick={(e: any) => setSelectedKeys([e.key])}
            selectedKeys={selectedKeys}
          >
            {setMenu(menuDate)}
          </Menu>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Sider>
        <Layout>
          <Content
            className='site-layout-content'
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default SiderDemo;
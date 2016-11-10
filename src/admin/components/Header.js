import React from 'react';
import {
  Link,
} from 'react-router';
import {
  Topbar,
  CollapsibleNav,
  Nav,
  NavItem,
  Icon,
  Badge,
  Dropdown,
} from 'amazeui-react';

const Header = React.createClass({
  render() {
    return (
      <Topbar
        brand="ETL数据抽取-转换-加载工具Admin控制台"
        toggleNavKey="nav"
        inverse
        fluid
      >
        <CollapsibleNav eventKey="nav">
          <Nav
            className="am-topbar-right"
            topbar
          >
            <Dropdown
              title={[<Icon icon="group" key="hey" />, ' Hi,管理员']}
              navItem
            >
              <Dropdown.Item
                closeOnClick
                linkComponent={Link}
                linkProps={{to: '/profile', query: {breadcrumb: '个人资料'}}}
              >
                <Icon icon="user" /> {' 个人资料'}
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon icon="cog" /> {' 系统设置'}
              </Dropdown.Item>
            </Dropdown>
            <NavItem
              linkComponent={Link}
              linkProps={{
                to: '/messages',
                query: {breadcrumb: '通知'}
              }}
            >
              <Icon icon="envelope-o" />
              {' 通知 '}
              <Badge
                amStyle="warning"
                round
              >
                7
              </Badge>
            </NavItem>
            <NavItem
              className="am-dropdown"
              href="#"
            >
              <Icon icon="sign-out" /> {' 退出系统'}
            </NavItem>
          </Nav>
        </CollapsibleNav>
      </Topbar>
    );
  }
});

export default Header;

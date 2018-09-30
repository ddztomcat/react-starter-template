import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router';
import React from 'react';
import { Route } from 'react-router-dom';
import './layout.global.scss';
import routes from '@/routes';
const { Header, Sider, Content } = Layout;

class MySider extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick = (key) => {
    this.props.history.push(key);
  }
  render() {
    const { match, location, history } = this.props;
    console.log(location);
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={() => this.handleClick('/map')}>
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => this.handleClick('/learnRedux')}>
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={() => this.handleClick('/home')}>
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const RouteWithSubRoutes = route => (
  <Route
      path={route.path}
      render={props => (
          <route.component {...props} routes={route.routes} />
      )}
  />
);
const ShowTheLocationWithRouter = withRouter(MySider);
export default ShowTheLocationWithRouter;
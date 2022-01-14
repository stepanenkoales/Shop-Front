import { Image, Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import logo from '../styles/images/logo.png'
import '../styles/homeForm.scss'

export const HomePage = () => {
  const { Header, Content, Footer } = Layout

  return (
    <Layout>
      <Header>
        <div className="menu">
          <div className="logo">
            <Image width={45} src={logo} />
          </div>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to={routes.homepage}>Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={routes.login}>Login</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
      <div className="content">
        <Content className="site-layout">
          <div>THIS IS HOMEPAGE</div>
        </Content>
      </div>
      <Footer>
        <div>
          Please visit my
          <a href="https://github.com/stepanenkoales"> github</a>
        </div>
      </Footer>
    </Layout>
  )
}

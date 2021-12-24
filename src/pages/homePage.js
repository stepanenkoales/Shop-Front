import { Image, Layout, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import logo from '../styles/images/logo.png'
import '../styles/homeForm.scss'

export const HomePage = () => {
  const { Header, Content, Footer } = Layout
  return (
    <Layout>
      <Header className="header">
        <Image width={65} src={logo} />
      </Header>
      <Content className="site-layout">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>
            <Link to={routes.homepage}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={routes.login}>Login</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background">THIS IS HOMEPAGE</div>
      </Content>
      <Footer className="footer">
        <p>
          Please visit my <a href="https://github.com/stepanenkoales">github</a>
        </p>
      </Footer>
    </Layout>
  )
}

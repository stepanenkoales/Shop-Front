import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { HeaderHome } from '../components/headerHome'
import '../styles/homePage.scss'

const { Header, Content, Footer } = Layout

export const HomePage = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    httpsService
      .get('/categories/', {
        params: {
          name: 'all',
        },
      })
      .then((res) => {
        setCategories(res)
      })
      .catch((err) => console.log(err))

    return () => {
      setCategories([])
    }
  }, [])

  return (
    <Layout>
      <Header>
        <HeaderHome categories={categories} />
      </Header>

      <Content>
        <div className="content">
          <Outlet />
        </div>
      </Content>

      <Footer>
        Please visit my
        <Link to={routes.github}> github</Link>
      </Footer>
    </Layout>
  )
}

import { useState, useEffect } from 'react'
import { Image, Layout, Menu, Input, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import logo from '../styles/images/logo.png'
import '../styles/homeForm.scss'

export const HomePage = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [totalPages, setTotalPages] = useState(0)

  const { Header, Content, Footer, Sider } = Layout
  const { Search } = Input

  const parentCategories = categories.filter((item) => item.parentId === null)

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
  }, [])

  const handleSubCategoriesChange = (e) => {
    const chosenSubCategories = categories.filter(
      (category) => category.parentId === e.key
    )
    setSubCategories(chosenSubCategories)
  }

  const handleItemsChange = async (e) => {
    const response = await httpsService.get('/items/', {
      params: {
        categoryId: e.key,
      },
    })
    const { rows, count } = response

    setCategoryId(e.key)
    setItems(rows)
    setTotalPages(count)
  }

  const onPaginationChange = async (pagination) => {
    const response = await httpsService.get('/items/', {
      params: {
        categoryId,
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      },
    })
    const { rows } = response
    setItems(rows)
  }

  const onSearch = async (value) => {
    const response = await httpsService.get(
      '/items/',
      value
        ? {
            params: {
              name: value,
              categoryId,
            },
          }
        : undefined
    )
    const { rows, count } = response

    setItems(rows)
    setTotalPages(count)
  }

  const columns = [
    {
      title: 'image',
      dataIndex: 'image',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
  ]

  return (
    <Layout>
      <Header>
        <div className="menu">
          <div className="logo">
            <Image src={logo} />
          </div>

          <Space direction="vertical">
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
            />
          </Space>

          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to={routes.login}>Login</Link>
            </Menu.Item>
          </Menu>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to={routes.admin}>Admin</Link>
            </Menu.Item>
          </Menu>
          <Menu
            onClick={handleSubCategoriesChange}
            theme="dark"
            mode="horizontal"
          >
            {parentCategories.map((item) => (
              <Menu.Item key={item.id} value={item.category}>
                {item.category}
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Header>
      <Layout>
        <Sider style={{ marginTop: 60 }}>
          <Menu onClick={handleItemsChange} theme="dark" mode="inline">
            {subCategories.map((item) => (
              <Menu.Item key={item.id}>{item.category}</Menu.Item>
            ))}
          </Menu>
        </Sider>

        <div className="content">
          <Content className="site-layout">
            <Table
              rowKey={(items) => items.id}
              columns={columns}
              dataSource={items}
              pagination={{
                pageSize: 5,
                total: totalPages,
              }}
              onChange={onPaginationChange}
            />
          </Content>
        </div>
      </Layout>

      <Footer>
        <div>
          Please visit my
          <a href="https://github.com/stepanenkoales"> github</a>
        </div>
      </Footer>
    </Layout>
  )
}

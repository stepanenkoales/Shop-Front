import { useMemo } from 'react'
import { Layout, Menu, Input, Space, Badge } from 'antd'
import { Link } from 'react-router-dom'
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  CarOutlined,
} from '@ant-design/icons'
import { routes } from '../config/routes'
import '../styles/homePage.scss'

const { Search } = Input
const { Header } = Layout
const { SubMenu } = Menu

export const HeaderHome = (props) => {
  const parentCategories = useMemo(
    () => props.categories.filter((item) => item.parentId === null),
    [props]
  )

  return (
    <>
      <div className="menu">
        <ShoppingCartOutlined
          style={{
            color: '#ffffff',
            fontSize: '2.2em',
            paddingLeft: '15px',
          }}
        />

        <Space className="desktop-visible" direction="vertical">
          <Search
            className="desktop-visible"
            placeholder="input search text"
            allowClear
            onSearch={props.onSearch}
          />
        </Space>

        <Menu theme="dark" mode="horizontal" disabledOverflow={true}>
          {props.user ? (
            <SubMenu
              key="sub"
              icon={
                <UserOutlined
                  style={{
                    fontSize: '1.5em',
                  }}
                />
              }
            >
              <Menu.Item key="sub1">
                <Link to={routes.orders}>
                  <CarOutlined />
                  <span>Orders</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="sub2">
                <LogoutOutlined />
                <span onClick={props.logout}>Logout</span>
              </Menu.Item>
            </SubMenu>
          ) : (
            <Menu.Item key="1">
              <Link to={routes.login}>Login</Link>
            </Menu.Item>
          )}
          <Menu.Item key="2">
            <Link to={routes.shoppingCart}>
              <Badge
                count={props.shoppingCart.length}
                color="#a52a2a"
                size="small"
              >
                <ShoppingOutlined
                  style={{
                    color: '#ffffff',
                    fontSize: '1.7em',
                  }}
                />
              </Badge>
            </Link>
          </Menu.Item>
          {props.user?.role === 'admin' && (
            <Menu.Item key="3">
              <Link to={routes.admin}>Admin</Link>
            </Menu.Item>
          )}
        </Menu>
      </div>

      <Header>
        <Menu
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={props.handleItemsChange}
          theme="dark"
          mode="horizontal"
        >
          {parentCategories.map((parentCategory) => (
            <SubMenu
              key={parentCategory.id}
              title={parentCategory.category}
              onTitleClick={props.handleSubCategoriesChange}
            >
              {props.categories
                .filter((category) => category.parentId === parentCategory.id)
                .map((category) => (
                  <Menu.Item key={category.id}>{category.category}</Menu.Item>
                ))}
            </SubMenu>
          ))}
        </Menu>
      </Header>

      <Header className="mobile-visible">
        <Space className="mobile-visible-space" direction="vertical">
          <Search
            placeholder="input search text"
            allowClear
            onSearch={props.onSearch}
          />
        </Space>
      </Header>
    </>
  )
}

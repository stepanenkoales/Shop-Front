import { useMemo, useContext } from 'react'
import { Layout, Menu, Input, Space, Badge } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  CarOutlined,
} from '@ant-design/icons'
import { routes } from '../config/routes'
import { AuthContext } from '../context/authContextProvider'
import { CartContext } from '../context/cartContextProvider'
import '../styles/homePage.scss'

const { Search } = Input
const { Header } = Layout
const { SubMenu } = Menu

export const HeaderHome = (props) => {
  const { user, logout } = useContext(AuthContext)
  const { shoppingCart } = useContext(CartContext)

  const history = useNavigate()

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
          {user ? (
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
                <span onClick={logout}>Logout</span>
              </Menu.Item>
            </SubMenu>
          ) : (
            <Menu.Item key="1">
              <Link to={routes.login}>Login</Link>
            </Menu.Item>
          )}
          <Menu.Item key="2">
            <Link to={routes.shoppingCart}>
              <Badge count={shoppingCart.length} color="#a52a2a" size="small">
                <ShoppingOutlined
                  style={{
                    color: '#ffffff',
                    fontSize: '1.7em',
                  }}
                />
              </Badge>
            </Link>
          </Menu.Item>
          {user?.role === 'admin' && (
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
          //onClick={props.handleItemsChange}
          theme="dark"
          mode="horizontal"
        >
          {parentCategories.map((parentCategory) => (
            <SubMenu
              key={parentCategory.id}
              title={parentCategory.category}
              onTitleClick={(e) => history('/' + e.key)} //props.handleSubCategoriesChange
            >
              {props.categories
                .filter((category) => category.parentId === parentCategory.id)
                .map((category) => (
                  <Menu.Item key={category.id}>
                    <Link
                      to={`/${parentCategory.id}/${category.id}`}
                      key={category.id}
                    >
                      {category.category}
                    </Link>
                  </Menu.Item>
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

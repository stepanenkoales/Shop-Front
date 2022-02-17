import { useState, useEffect, useCallback, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Layout } from 'antd'
import { AuthContext } from '../context/authContextProvider'
import { CartContext } from '../context/cartContextProvider'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { HeaderHome } from '../components/headerHome'
import { ContentHomePage } from '../components/contentHomePage'
import '../styles/homePage.scss'

const { Header, Content, Footer } = Layout

export const HomePage = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [searchValue, setSearchValue] = useState(null) // change to useSearchParams
  const [totalItems, setTotalItems] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [showProductCard, setShowProductCard] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const { shoppingCart, setShoppingCart } = useContext(CartContext)

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

  const getCategoryIds = useCallback(
    (id) => {
      let categoryIds = []
      const filteredCategories = categories.filter(
        (category) => category.parentId === id
      )
      filteredCategories.forEach((category) => categoryIds.push(category.id))
      return categoryIds
    },
    [categories]
  )

  useEffect(() => {
    if (searchParams.get('subId')) {
      return httpsService
        .get('/items', {
          params: {
            categoryId: searchParams.get('subId'),
          },
        })
        .then((res) => {
          setItems(res.rows)
          setTotalItems(res.count)
        })
        .catch((err) => console.log(err))
    }

    if (searchParams.get('id')) {
      const categoryIds = getCategoryIds(searchParams.get('id'))

      if (categoryIds.length === 0) return

      httpsService
        .post('/items/id', {
          categoryId: categoryIds,
        })
        .then((res) => {
          setItems(res.rows)
          setTotalItems(res.count)
        })
        .catch((err) => console.log(err))
    }
  }, [getCategoryIds, searchParams])

  const addToShoppingCart = useCallback(
    (newShoppingCart) => {
      const foundIndex = shoppingCart.findIndex(
        (item) => item.itemId === newShoppingCart.itemId
      )

      if (foundIndex >= 0) {
        shoppingCart[foundIndex].quantity = ++shoppingCart[foundIndex].quantity
        setShoppingCart([...shoppingCart])
        return
      }

      setShoppingCart([...shoppingCart, newShoppingCart])
    },
    [shoppingCart, setShoppingCart]
  )

  const handleSubCategoriesChange = useCallback(
    async (e) => {
      setShowProductCard(false)
      setCurrentPage(1)
      setSearchParams({ id: e.key })
      setSearchValue(null)
      const categoryIds = getCategoryIds(e.key)

      if (categoryIds.length === 0) {
        setItems([])
        setTotalItems(0)
        return
      }

      const response = await httpsService.post('/items/id', {
        categoryId: categoryIds,
      })

      const { rows, count } = response

      setItems(rows)
      setTotalItems(count)
    },
    [setSearchParams, getCategoryIds]
  )

  const handleItemsChange = async (e) => {
    setShowProductCard(false)
    setCurrentPage(1)
    setSearchParams({ id: e.keyPath[1], subId: e.keyPath[0] })
    setSearchValue(null)

    const response = await httpsService.get('/items/', {
      params: {
        categoryId: e.key,
      },
    })
    const { rows, count } = response

    setItems(rows)
    setTotalItems(count)
  }

  const onPaginationChange = async (page, pageSize, mobileVisible) => {
    setCurrentPage(page)
    const categoryIds = getCategoryIds(searchParams.get('id'))

    const response = await httpsService.get('/items/', {
      params: {
        categoryId: searchParams.get('subId') || categoryIds,
        currentPage: page,
        pageSize: pageSize,
        name: searchValue,
      },
    })
    const { rows } = response

    if (mobileVisible) return setItems([...items, ...rows])

    setItems(rows)
  }

  const onMobilePaginationChange = async () => {
    const categoryIds = getCategoryIds(searchParams.get('id'))
    const response = await httpsService.get('/items/', {
      params: {
        categoryId: searchParams.get('subId') || categoryIds,
        currentPage: currentPage + 1,
        pageSize: 5,
        name: searchValue,
      },
    })
    const { rows, count } = response

    setTotalItems(count)
    setCurrentPage((prevCount) => prevCount + 1)
    setItems([...items, ...rows])
  }

  const onSearch = async (value) => {
    const trimmedValue = value.trim()

    if (!trimmedValue) {
      return null
    }

    setSearchValue(trimmedValue)
    const categoryIds = searchParams.get('id')
      ? getCategoryIds(searchParams.get('id'))
      : null

    const response = await httpsService.post('/items/id', {
      categoryId: searchParams.get('subId') || categoryIds,
      name: trimmedValue,
    })
    const { rows, count } = response

    setItems(rows)
    setTotalItems(count)
  }

  const handleQuantityChange = useCallback(
    (quantity, itemId) => {
      const foundIndex = items.findIndex((item) => item.id === itemId)

      if (foundIndex >= 0) {
        items[foundIndex].quantity = quantity
        setItems([...items])
      }
    },
    [items]
  )

  return (
    <Layout>
      <Header>
        <HeaderHome
          onSearch={onSearch}
          shoppingCart={shoppingCart}
          categories={categories}
          handleItemsChange={handleItemsChange}
          handleSubCategoriesChange={handleSubCategoriesChange}
          user={user}
          logout={logout}
        />
      </Header>
      <Content>
        <div className="content">
          <ContentHomePage
            showProductCard={showProductCard}
            setShowProductCard={setShowProductCard}
            items={items}
            totalItems={totalItems}
            onPaginationChange={onPaginationChange}
            currentPage={currentPage}
            handleQuantityChange={handleQuantityChange}
            addToShoppingCart={addToShoppingCart}
            onMobilePaginationChange={onMobilePaginationChange}
          />
        </div>
      </Content>
      <Footer>
        Please visit my
        <Link to={routes.github}> github</Link>
      </Footer>
    </Layout>
  )
}

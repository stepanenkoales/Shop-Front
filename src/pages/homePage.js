import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams, Outlet, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { HeaderHome } from '../components/headerHome'
import { ProductCardDesktop } from '../components/productCardDesktop'
import { ContentHomePage } from '../components/contentHomePage'
import '../styles/homePage.scss'

const { Header, Content, Footer } = Layout

export const HomePage = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [showProductCard, setShowProductCard] = useState(false)
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false)

  useEffect(() => {
    console.log(123)
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
      console.log(categories)
      console.log(filteredCategories)
      filteredCategories.forEach((category) => categoryIds.push(category.id))
      console.log(categoryIds)
      return categoryIds
    },
    [categories]
  )

  useEffect(() => {
    console.log(searchParams.get('subId'))

    if (searchParams.get('subId') && !isInitiallyFetched) {
      console.log(20)
      return httpsService
        .get('/items/', {
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

    if (searchParams.get('id') && !isInitiallyFetched) {
      console.log(1)
      const categoryIds = getCategoryIds(searchParams.get('id'))
      console.log(2)
      console.log(categoryIds)

      if (categoryIds.length === 0) return

      httpsService
        .post('/items/id', {
          categoryId: categoryIds,
        })
        .then((res) => {
          console.log(res)
          setItems(res.rows)
          setTotalItems(res.count)
        })
        .catch((err) => console.log(err))
    }

    setIsInitiallyFetched(true)
  }, [getCategoryIds, searchParams, isInitiallyFetched])

  const handleSubCategoriesChange = useCallback(
    async (e) => {
      setShowProductCard(false)
      setCurrentPage(1)
      setSearchParams({ id: e.key })
      const categoryIds = getCategoryIds(e.key)

      if (categoryIds.length === 0) {
        setItems([])
        setTotalItems(0)
        return
      }

      const response = await httpsService.post('/items/id', {
        categoryId: categoryIds,
      })
      console.log(123)
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

    const response = await httpsService.post('/items/id', {
      categoryId: searchParams.get('subId') || categoryIds,
      currentPage: page,
      pageSize: pageSize,
      name: searchParams.get('search'),
    })
    const { rows } = response

    if (mobileVisible) return setItems([...items, ...rows])

    setItems(rows)
  }

  const onMobilePaginationChange = async () => {
    const categoryIds = getCategoryIds(searchParams.get('id'))
    const response = await httpsService.post('/items/id', {
      categoryId: searchParams.get('subId') || categoryIds,
      currentPage: currentPage + 1,
      pageSize: 5,
      name: searchParams.get('search'),
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

    searchParams.set('search', trimmedValue)
    setSearchParams(searchParams)

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
          categories={categories}
          handleItemsChange={handleItemsChange}
          handleSubCategoriesChange={handleSubCategoriesChange}
        />
      </Header>

      <Outlet />

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

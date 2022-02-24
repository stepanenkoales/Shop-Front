import { useEffect, useState, useCallback, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ProductCardMobile } from './productCardMobile'
import { ProductTableDesktop } from './productTableDesktop'
import { httpsService } from '../utils/https.service'
import { SearchContext } from '../context/searchContextProvider'
import Media from 'react-media'

export const ContentHomePage = () => {
  const { id, subId } = useParams()
  const [items, setItems] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const { searchValue } = useContext(SearchContext)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchValue) {
      return httpsService
        .post(
          '/items/id',
          id
            ? {
                parentId: id,
                name: searchValue,
                currentPage: searchParams.get('page'),
              }
            : {
                categoryId: subId,
                name: searchValue,
                currentPage: searchParams.get('page'),
              }
        )
        .then((res) => {
          setItems(res.rows)
          setTotalItems(res.count)
        })
        .catch((err) => console.log(err))
    }

    if (subId) {
      return httpsService
        .get('/items/', {
          params: { categoryId: subId, currentPage: searchParams.get('page') },
        })
        .then((res) => {
          setItems(res.rows)
          setTotalItems(res.count)
        })
        .catch((err) => console.log(err))
    }

    return httpsService
      .get('/items/', {
        params: { parentId: id, currentPage: searchParams.get('page') },
      })
      .then((res) => {
        setItems(res.rows)
        setTotalItems(res.count)
      })
      .catch((err) => console.log(err.response))
  }, [subId, id, searchValue, searchParams])

  const onPaginationChange = async (page, pageSize) => {
    setSearchParams({ page })

    const response = await httpsService.post(
      '/items/id',
      subId
        ? {
            categoryId: subId,
            currentPage: page,
            pageSize: pageSize,
            name: searchValue,
          }
        : {
            parentId: id,
            currentPage: page,
            pageSize: pageSize,
            name: searchValue,
          }
    )
    const { rows } = response
    setCurrentPage(page)
    setItems(rows)
  }

  const onMobilePaginationChange = async () => {
    const response = await httpsService.post(
      '/items/id',
      subId
        ? {
            categoryId: subId,
            currentPage: currentPage + 1,
            pageSize: 5,
            name: searchValue,
          }
        : {
            parentId: id,
            currentPage: currentPage + 1,
            pageSize: 5,
            name: searchValue,
          }
    )
    const { rows, count } = response

    setTotalItems(count)
    setCurrentPage((prevCount) => prevCount + 1)
    setItems([...items, ...rows])
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

  const getCurrentPage = () => {
    const currentPage = searchParams.get('page')
    if (currentPage) {
      return Number(currentPage)
    }
    return 1
  }

  return (
    <>
      <Media query={{ maxWidth: 720 }}>
        {(matches) =>
          matches ? (
            <ProductCardMobile
              items={items}
              totalItems={totalItems}
              onMobilePaginationChange={onMobilePaginationChange}
            />
          ) : (
            <ProductTableDesktop
              items={items}
              totalItems={totalItems}
              currentPage={getCurrentPage()}
              onPaginationChange={onPaginationChange}
              handleQuantityChange={handleQuantityChange}
            />
          )
        }
      </Media>
    </>
  )
}

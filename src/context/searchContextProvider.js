import { createContext, useState } from 'react'

export const SearchContext = createContext(null)

export const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState(null)

  const onSearch = async (value) => {
    const trimmedValue = value.trim()

    if (!trimmedValue) {
      setSearchValue(null)
      return
    }

    setSearchValue(trimmedValue)
  }

  return (
    <SearchContext.Provider value={{ searchValue, onSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

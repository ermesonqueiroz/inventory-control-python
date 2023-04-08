import { createContext, useContext, useEffect, useState } from "react"
import { useFetch } from "../hooks/useFetch"

const ProductContext = createContext({})

// TODO: Store products in local storage
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [maxLoadedPage, setMaxLoadedPage] = useState(1)
  const [storedProducts, setStoredProducts] = useState([])
  const [pagesNumber, setPagesNumber] = useState()
  const [allProductsAreSelected, setAllProductsAreSelected] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [openedProductId, setOpenedProductId] = useState("")
  
  const [filters, setFilters] = useState({
    status: {
      active: true,
      disabled: true
    }
  })
  const limitPerPage = 10

  const [getProducts, { isLoading: fetchingProducts }] = useFetch({
    path: `/api/product?page=${activePage}&limit=${limitPerPage}`,
  })
  const [addProductRequest, { isLoading: addingProduct }] = useFetch({
    path: "/api/product",
    method: "POST"
  })
  const [updateProductRequest] = useFetch({
    path: `/api/product/${openedProductId}`,
    method: "PATCH"
  })
  const [activeProductRequest] = useFetch({
    path: `/api/product/${openedProductId}/active`,
    method: "PATCH"
  })
  const [disableProductRequest] = useFetch({
    path: `/api/product/${openedProductId}/disable`,
    method: "PATCH"
  })

  async function handleGetProducts() {
    const { response } = await getProducts()
    setStoredProducts([...storedProducts, ...response.products])
    setMaxLoadedPage(maxLoadedPage + 1)
    setPagesNumber(Math.ceil(response.total_items / limitPerPage))
  }

  function getStoredProducts() {
    setProducts(
      storedProducts
        .filter((product) => {
          const steps = []

          if (filters.status.active && product.active) steps.push(true)
          else steps.push(false)

          if (filters.status.disabled && !product.active) steps.push(true)
          else steps.push(false)
          
          return steps.some((step) => step)
        })
        .filter((product, index) => {
          if (
            index >= limitPerPage * (activePage - 1) &&
            index < limitPerPage * activePage
          ) {
            return true
          }

          return false
        })
    )
  }

  function toggleProductSelection(id) {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      )
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  function toggleAllProductsAreSelected() {
    if (!allProductsAreSelected) {
      setAllProductsAreSelected(true)
      setSelectedProducts([...products.map(({ id }) => id)])
    } else {
      setAllProductsAreSelected(false)
      setSelectedProducts([])
    }
  }

  async function addProduct({ name, price }) {
    const { response } = await addProductRequest({
      name,
      price
    })

    setProducts([...products, response])
  }

  async function updateProduct(newProduct) {
    const { id, ...product } = products.find(
      ({ id }) => id === openedProductId
    )

    const { active: productIsActive, ...data } = Object.fromEntries(
      Object.entries(product).map(([key, value]) => {
          if (value !== newProduct[key]) {
            return [key, newProduct[key]]
          }

          return null
        })
        .filter(array => array)
    )

    await updateProductRequest(data)
    if (productIsActive) {
      await activeProductRequest() 
    } else {
      await disableProductRequest()
    }

    setStoredProducts(
      storedProducts.map((product) => {
        if (product.id === openedProductId) {
          return {
            ...product,
            ...newProduct
          }
        }

        return product
      })
    )
  }

  async function openProductModal(id) {
    setOpenedProductId(id)
  }

  useEffect(() => {
    handleGetProducts()
  }, [])

  useEffect(() => {
    getStoredProducts()
  }, [storedProducts, filters])

  useEffect(() => {
    if (activePage >= maxLoadedPage) {
      handleGetProducts()
    }
    getStoredProducts()
  }, [activePage])

  useEffect(() => {
    if (selectedProducts.length === products.length && selectedProducts.length > 0) {
      setAllProductsAreSelected(true)
    } else {
      setAllProductsAreSelected(false)
    }
  }, [selectedProducts])

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        addingProduct,
        activePage,
        setActivePage,
        fetchingProducts,
        pagesNumber,
        filters,
        setFilters,
        allProductsAreSelected,
        selectedProducts,
        toggleAllProductsAreSelected,
        toggleProductSelection,
        openedProductId,
        openProductModal,
        setOpenedProductId,
        updateProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)

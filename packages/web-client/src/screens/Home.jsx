import { Page, CreateProductDrawer, FilterProducts, DeleteProductDialog } from "../components"
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spacer,
  Button,
  Flex,
  HStack,
  Text,
  TableCaption,
  ButtonGroup,
  Skeleton,
  Checkbox,
  useDisclosure,
  Fade,
} from "@chakra-ui/react"
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"
import { useProduct } from "../contexts/product"
import { FilterIcon } from "lucide-react"
import { XIcon } from "lucide-react"
import { useEffect } from "react"

export function Home() {
  const {
    products,
    activePage,
    setActivePage,
    fetchingProducts,
    pagesNumber,
    allProductsAreSelected,
    toggleAllProductsAreSelected,
    toggleProductSelection,
    selectedProducts,
    openProductModal
  } = useProduct()

  const {
    isOpen,
    onOpen: showDeleteButton,
    onClose: hideDeleteButton
  } = useDisclosure()
  
  useEffect(() => {
    if (selectedProducts.length > 0) {
      showDeleteButton()
    } else if (isOpen) {
      hideDeleteButton()
    }
  }, [selectedProducts])

  return (
    <>
      <Page>
        <Flex mt={8}>
          <Heading
            as="h1"
            size="xl"
          >
            Produtos
          </Heading>
          <Spacer />
          <HStack spacing={4}>
            <FilterProducts>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<FilterIcon size={16} />}
              >
                Filtrar
              </Button>
            </FilterProducts>

            <CreateProductDrawer>
              {({ onOpen }) => (
                <Button
                  leftIcon={<PlusIcon size={16} />}
                  size="sm"
                  colorScheme="blue"
                  onClick={onOpen}
                >
                  Novo Produto
                </Button>
              )}
            </CreateProductDrawer>
          </HStack>
        </Flex>

        <TableContainer mt={6}>
          <Table variant="simple">
            <TableCaption>
              <ButtonGroup variant="ghost" colorScheme="gray">
                <Button
                  leftIcon={<ChevronLeftIcon size={16} />}
                  isDisabled={activePage == 1}
                  onClick={() => setActivePage(activePage - 1)}
                >
                  Anterior
                </Button>
                <Button
                  rightIcon={<ChevronRightIcon size={16} />}
                  isDisabled={activePage == pagesNumber}
                  onClick={() => setActivePage(activePage + 1)}
                >
                  Próximo
                </Button>
              </ButtonGroup>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={allProductsAreSelected}
                    onChange={toggleAllProductsAreSelected}
                  />
                </Th>
                <Th>Código</Th>
                <Th>Nome</Th>
                <Th>Preço</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!fetchingProducts && products?.map((product) => (
                <Tr
                  key={product.id}
                  _hover={{
                    bg: "AppWorkspace",
                    cursor: "pointer",
                  }}
                >
                  <Td>
                    <Checkbox
                      isChecked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                    />
                  </Td>
                  <Td
                    onClick={() => openProductModal(product.id)}
                  >
                    {product.id}
                  </Td>
                  <Td
                    onClick={() => openProductModal(product.id)}
                  >
                    {product.name}
                  </Td>
                  <Td
                    onClick={() => openProductModal(product.id)}
                  >
                    R$ {product.price}
                  </Td>
                  <Td
                    onClick={() => openProductModal(product.id)
                    }
                  >
                    {product.active && (
                      <HStack color="blue.600">
                        <CheckIcon size={16} />
                        <Text>Ativo</Text>
                      </HStack>
                    )}
                    {!product.active && (
                      <HStack color="red.600">
                        <XIcon size={16} />
                        <Text>Inativo</Text>
                      </HStack>
                    )}
                  </Td>
                </Tr>
              ))}
              {
                (fetchingProducts || products.length < 1) &&
                  new Array(10)
                    .fill('')
                    .map((_, index) => (
                      <Tr
                        _hover={{
                          bg: "AppWorkspace",
                          cursor: "pointer",
                        }}
                        key={index}
                      >
                        <Td><Checkbox /></Td>
                        <Td>
                          <Skeleton>6223194420614219b780cfdebd19ca4d</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton>Título Caneta</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton>R$ 100.00</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton>
                            <HStack color="blue.600">
                              <CheckIcon size={16} />
                              <Text>Ativo</Text>
                            </HStack>
                          </Skeleton>
                        </Td>
                      </Tr>
                    ))
                }
            </Tbody>
          </Table>
        </TableContainer>
      </Page>
      <DeleteProductDialog>
        {({ onOpen }) => (
          <Fade in={isOpen}>
            <Button
              onClick={onOpen}
              position="fixed"
              bottom={4}
              right={4}
              colorScheme="red"
              leftIcon={<Trash2Icon size={20} />}
            >
              Excluir Produtos
            </Button>
          </Fade>
        )}
      </DeleteProductDialog>
    </>
  )
}

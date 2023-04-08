import {
  Badge,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useDisclosure,
  useNumberInput
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { useFormik } from "formik"
import { useProduct } from "../contexts/product"

export function ProductModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { products, openedProductId, setOpenedProductId, updateProduct } = useProduct()
  const [product, setProduct] = useState({})
  const modalRef = useRef()

  useEffect(() => {
    const product = products.find(
      ({ id }) => id === openedProductId
    )

    if (product?.id) {
      console.log(product)
      formik.resetForm({
        name: product.name,
        price: product.price,
        status: product.active ? 'active' : 'disabled'
      })
      onOpen()
      setProduct(product)
    }
  }, [openedProductId])

  const formik = useFormik({
    initialValues: {
      name: product?.name,
      price: product?.price,
      status: product?.active ? 'active' : 'disabled'
    },
    enableReinitialize: true,
    onSubmit: async ({ name, price, status }, { setSubmitting }) => {
      await updateProduct({
        name,
        price,
        active: status === 'active'
      })
      setSubmitting(false)
      onClose()
    }
  })

  const { getInputProps } = useNumberInput({
    step: 0.01,
    precision: 2,
    name: "price",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values.price
  })

  const numberInput = getInputProps()

  function handleClose() {
    setOpenedProductId("")
    onClose()
  }

  return (
    <Modal
      initialFocusRef={modalRef}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      ref={modalRef}
      closeOnEsc
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader pb={0}>
            <Editable
              fontSize="lg"
              w="fit-content"
              fontWeight="bold"
              value={formik.values.name}
            >
              <EditablePreview />
              <EditableInput
                value={formik.values.name}
                name="name"
                id="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Editable>
            <Badge
              fontSize="0.8rem"
              colorScheme={product?.active ? "green" : "red"}
            >
              {product?.active ? "ativo" : "inativo"}
            </Badge>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <VStack spacing={4} alignItems="start">
              <FormControl>
                <FormLabel>Preço</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                  >
                    R$
                  </InputLeftElement>
                  <Input
                    {...numberInput}
                    id="status"
                    name="price"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  defaultValue={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="status"
                  name="status"
                >
                  <option value="active">Ativo</option>
                  <option value="disabled">Inativo</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing={4}>
              <Button
                variant="ghost"
                onClick={handleClose}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={formik.isSubmitting}
                isDisabled={
                  formik.isSubmitting ||
                  !formik.touched ||
                  Object
                    .entries(formik.initialValues)
                    .filter(([key, value]) => {
                      if (value !== formik.values[key]) {
                        return true
                      }
                    })
                    .length === 0
                }
              >
                Salvar Alterações
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
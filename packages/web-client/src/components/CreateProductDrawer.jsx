import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  useNumberInput,
  InputRightElement,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInputStyles,
  NumberInput,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { Form, Formik } from "formik"
import { useProduct } from '../contexts/product'
import { MinusIcon, PlusIcon } from 'lucide-react'

export function CreateProductDrawer({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { addProduct, addingProduct } = useProduct()

  async function onSubmit({ name, price }) {
    await addProduct({
      name,
      price
    })
    onClose()
  }

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps
  } = useNumberInput({
    step: 0.01,
    defaultValue: 0,
    min: 1,
    precision: 2,
  })
  
  const numberInputIncrement = getIncrementButtonProps()
  const numberInputDecrement = getDecrementButtonProps()
  const numberInput = getInputProps()

  return (
    <>
      {children({ onOpen })}

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Novo Produto</DrawerHeader>

          <DrawerBody>
            <Formik
              initialValues={{
                name: "",
                price: 0,
              }}
              onSubmit={async (...params) => await onSubmit(...params)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              }) => (
                <Form id="new-product-form">
                  <FormControl isRequired>
                    <FormLabel>Nome</FormLabel>
                    <Input
                      placeholder="Caneta"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                  </FormControl>

                  <FormControl isRequired mt={4}>
                    <FormLabel>Preço</FormLabel>
                    <HStack>
                      <IconButton
                        aria-label="Increase price"
                        colorScheme="blue"
                        icon={<PlusIcon size={16} />}
                        {...numberInputIncrement}
                      />
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          color='gray.300'
                        >
                          R$
                        </InputLeftElement>
                        <Input
                          placeholder={9.99}
                          type="number"
                          name="price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price}
                          {...numberInput}
                        />
                        {errors.price && touched.price && errors.price}
                      </InputGroup>
                      <IconButton
                        aria-label="Decrease price"
                        colorScheme="red"
                        icon={<MinusIcon size={16} />}
                        {...numberInputDecrement}
                      />
                    </HStack>
                  </FormControl>
                </Form>
              )}
            </Formik>
          </DrawerBody>

          <DrawerFooter>
            <ButtonGroup>
              <Button
                variant="ghost"
                onClick={onClose}
              >
                Cancelar
              </Button>

              <Button
                colorScheme="blue"
                type="submit"
                form="new-product-form"
                isLoading={addingProduct}
                isActive={!addingProduct}
              >
                Pronto
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
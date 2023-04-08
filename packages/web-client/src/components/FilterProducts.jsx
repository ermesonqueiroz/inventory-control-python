import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  VStack,
  useNumberInput
} from "@chakra-ui/react"
import { MinusIcon, SearchIcon, PlusIcon } from "lucide-react"
import { useProduct } from "../contexts/product"

export function FilterProducts({ children }) {
  const { filters, setFilters } = useProduct()
  const minNumberProps = useNumberInput({
    step: 0.01,
    defaultValue: 0,
    min: 0,
    precision: 2,
  })

  const maxNumberProps = useNumberInput({
    step: 0.01,
    defaultValue: 0,
    min: 0,
    precision: 2,
  })
  
  const minNumberInputIncrement = minNumberProps.getIncrementButtonProps()
  const minNumberInputDecrement = minNumberProps.getDecrementButtonProps()
  const minNumberInput = minNumberProps.getInputProps()

  const maxNumberInputIncrement = maxNumberProps.getIncrementButtonProps()
  const maxNumberInputDecrement = maxNumberProps.getDecrementButtonProps()
  const maxNumberInput = maxNumberProps.getInputProps()

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody p={4}>
          <Flex alignItems="center">
            <Heading fontSize="lg">Filtros</Heading>
            <Spacer />
            <Button
              variant="ghost"
              size="sm"
              colorScheme="blue"
            >
              Limpar filtros
            </Button>
          </Flex>

          <InputGroup mt={4}>
            <Input
              variant="outline"
              placeholder="Pesquisar"
            />

            <InputRightElement>
              <Icon as={SearchIcon} />
            </InputRightElement>
          </InputGroup>

          <Accordion mt={2}>
            <AccordionItem borderTop="none">
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Preço
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Mínimo</FormLabel>
                  <HStack>
                    <IconButton
                      size="sm"
                      aria-label="Increase price"
                      colorScheme="blue"
                      icon={<PlusIcon size={16} />}
                      {...minNumberInputIncrement}
                    />
                    <Input
                      size="sm"
                      {...minNumberInput}
                    />
                    <IconButton
                      size="sm"
                      aria-label="Decrease price"
                      colorScheme="red"
                      icon={<MinusIcon size={16} />}
                      {...minNumberInputDecrement}
                    />
                  </HStack>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel fontSize="sm">Máximo</FormLabel>
                  <HStack>
                    <IconButton
                      size="sm"
                      aria-label="Increase price"
                      colorScheme="blue"
                      icon={<PlusIcon size={16} />}
                      {...maxNumberInputIncrement}
                    />
                    <Input
                      size="sm"
                      {...maxNumberInput}
                    />
                    <IconButton
                      size="sm"
                      aria-label="Decrease price"
                      colorScheme="red"
                      icon={<MinusIcon size={16} />}
                      {...maxNumberInputDecrement}
                    />
                  </HStack>
                </FormControl>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderBottom="none">
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Status
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack alignItems="start">
                  <Checkbox
                    isChecked={filters.status.active}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        status: {
                          ...filters.status,
                          active: e.target.checked
                        }
                      })
                    }}
                    defaultChecked
                  >
                    Ativo
                  </Checkbox>
                  <Checkbox
                    isChecked={filters.status.disabled}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        status: {
                          ...filters.status,
                          disabled: e.target.checked
                        }
                      })
                    }}
                  >
                    Inativo
                  </Checkbox>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

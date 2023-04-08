import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Heading,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { useRef } from "react"

export function DeleteProductDialog({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  return (
    <>
      {children({ onOpen })}

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody mt={5}>
              <Heading fontSize="lg">
                Excluir Produto
              </Heading>

              <Text mt={2}>
                Tem Certeza disso? Essa ação é irreversível.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <ButtonGroup
                spacing={2}
              >
                <Button
                  onClick={onClose}
                  variant="ghost"
                >
                  Cancelar
                </Button>
                <Button
                  colorScheme="red"
                  onClick={onClose}
                >
                  Excluir
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
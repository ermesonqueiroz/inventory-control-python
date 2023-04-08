import { Flex, IconButton, Image, Spacer, useColorMode } from '@chakra-ui/react'
import FullLogo from "../assets/full-logo.svg"
import { MoonIcon, SunIcon } from 'lucide-react'

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      as="nav"
    >
      <Image
        src={FullLogo}
        h={10}
        alt="Inventory Control"
      />
      <Spacer />
      <IconButton
        icon={
          colorMode === "light"
            ? <MoonIcon />
            : <SunIcon />
        }
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Flex>
  )
}

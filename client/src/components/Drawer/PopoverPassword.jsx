import React from "react";
import {Popover, PopoverTrigger, Button, PopoverBody, PopoverContent, PopoverHeader, PopoverFooter, PopoverCloseButton, PopoverArrow, Box, ButtonGroup} from "@chakra-ui/react";


export function PopoverPassword() {
    const initialFocusRef = React.useRef()
    return (
      <Popover
        initialFocusRef={initialFocusRef}
        placement='bottom'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button>Quieres renovar tu contraseña? </Button>
        </PopoverTrigger>
        <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
          <PopoverHeader pt={4} fontWeight='bold' border='0'>
           Atencion!! este proceso es irreversible
          </PopoverHeader>
          <PopoverArrow bg='blue.800' />
          <PopoverCloseButton />
          <PopoverBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </PopoverBody>
          <PopoverFooter
            border='0'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            pb={4}
          >
            <Box fontSize='sm'>Step 2 of 4</Box>
            <ButtonGroup size='sm'>
              <Button colorScheme='green'>Volver atras</Button>
              <Button colorScheme='blue' ref={initialFocusRef}>
                Enviar
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    )
  }
export default PopoverPassword;
import React from "react";
import {Popover, PopoverTrigger, Button, PopoverBody, PopoverContent, PopoverHeader, PopoverFooter, PopoverCloseButton, PopoverArrow} from "@chakra-ui/react";
import { ResetPassword } from "../auth/ResetPassword" 
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
          <PopoverHeader pt={4} fontWeight='bold' border='0' bg='red.500'>
           Atencion!! este proceso es irreversible
          </PopoverHeader>
          <PopoverArrow bg='blue.800' />
          <PopoverCloseButton />
          <PopoverBody>
            <ResetPassword/>
          </PopoverBody>
          <PopoverFooter
            border='0'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            pb={4}
          > 
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    )
  }
export default PopoverPassword;
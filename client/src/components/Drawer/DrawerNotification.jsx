import React from "react";
import Button from "react-bootstrap/Button";
import { IconBellFilled } from "@tabler/icons-react";
//import { useSelector } from "react-redux";
import {
  useDisclosure,
  Drawer,
  Stack,
  Box,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export function DrawerNotification() {
  //const { user, isError, message } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
    <>
      <button>
        <IconBellFilled className="icon-notify" onClick={onOpen} size={24} />
      </button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Notificaciones</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                
             
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerNotification;

import React from "react";
import Button from "react-bootstrap/Button";
import { IconBellFilled } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAdministrations } from "../../context/AdministrationsContext";
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { MdCheckCircle, MdError, MdSettings } from "react-icons/md";

export function DrawerNotification() {
  const { isError, message } = useSelector((state) => state.auth);
  const { msg, msgError } = useAdministrations();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  function renderNotifiction() {
    <List spacing={2}>
      {msg.lengt || message.lengt ? (
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {msg}
        </ListItem>
      ) : (
        <ListItem>
          <ListIcon as={MdSettings} color="gray.500" />
          {message}
        </ListItem>
      )}
      {msgError.lengt || isError.lengt ? (
        <ListItem>
          <ListIcon as={MdError} color="red.500" />
          {msg}
        </ListItem>
      ) : (
        <ListItem>
          <ListIcon as={MdError} color="red.500" />
          {message}
        </ListItem>
      )}
      
    </List>;
  }

  useEffect(() => {}, [msg]);

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

          <DrawerBody>{renderNotifiction()}</DrawerBody>

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

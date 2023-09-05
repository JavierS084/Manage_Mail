import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../auth/authSlice";
import Button from "react-bootstrap/Button";

import { IconHomeCog } from "@tabler/icons-react";
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export function DrawerNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <IconHomeCog color="white" size={24} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Bienvenido: {user ? <>{user.name}</> : <></>}
          </DrawerHeader>

          <DrawerBody></DrawerBody>
            <hr />
          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="ml-2"  onClick={logout} colorScheme="blue">
              Salir {">>>"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerNav;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../auth/authSlice";
import Button from "react-bootstrap/Button";
import { PopoverPassword } from "./PopoverPassword";
import { IconHomeCog } from "@tabler/icons-react";
import { Orbit } from "@uiball/loaders";
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Wrap,
  WrapItem,
  Avatar,
  Badge,
  Card,
  CardHeader,
  Box,
  Heading,
  Text,
  CardBody,
  Divider,
} from "@chakra-ui/react";

export function DrawerNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isLogout, setIsLogout] = useState(false);

  const logout = () => {
    setIsLogout(true);
    dispatch(LogOut());
    dispatch(reset());
    const timer = setTimeout(() => {
      navigate("/");
    }, 900);
    return () => clearTimeout(timer);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="white" onClick={onOpen}>
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
          <DrawerHeader>Perfil de Usuario </DrawerHeader>

          <DrawerBody>
            <Card>
              <CardHeader>
                <Wrap>
                  <WrapItem>
                    <Avatar
                      size="xl"
                      name="Christian Nwamba"
                      src="https://bit.ly/code-beast"
                    />{" "}
                  </WrapItem>
                </Wrap>
                <h1>{user ? <>{user.name}</> : <></>}</h1>
              </CardHeader>
              <CardBody>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Correo Electronico
                  </Heading>
                  <Text pt="1" fontSize="sm">
                    {user ? <>{user.email}</> : ""}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Rol de usuario
                  </Heading>
                  <Badge variant="solid" colorScheme="green">
                    {user ? <>{user.role}</> : ""}
                  </Badge>
                  <Text pt="1" fontSize="sm"></Text>
                </Box>
              </CardBody>

              <Badge variant="outline" colorScheme="green"></Badge>
            </Card>
          </DrawerBody>
          <PopoverPassword />
          <Divider />
          <DrawerFooter>
            <Button
              colorScheme="gray"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Volver
            </Button>
            <Button onClick={logout} colorScheme="blue">
              {isLogout ? (
                <div className="row justify-content-center mx-auto">
                  <Orbit size={25} speed={1.5} color="white" />
                </div>
              ) : (
                "Salir"
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerNav;

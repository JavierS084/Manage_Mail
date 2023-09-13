import { useState, createContext, useContext } from "react";

const contextUserPassword = createContext();
// esto es un hook
export const useOTPPassword = () => {
  const context = useContext(contextUserPassword);
  if (context === undefined) {
    throw new Error("Must be used within a Provider");
  }
  return context;
};

export const UserOtpProvider = ({ children }) => {
  // es el componente

  const [OTP, setOTP] = useState([]);

  return (
    <contextUserPassword.Provider
      value={{
        OTP,
      }}
    >
      {children}
    </contextUserPassword.Provider>
  );
};
export default UserOtpProvider;

import { createContext, useMemo, useState } from "react";
import { generateUniqueId } from "../devUtils";
import { api } from "../services";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = async ({ username, password }) => {
    const fetchLogin = async () => {
      try {
        const response = await api.get({ url: "users" });
        const { data } = response;
        const matchUser = data.find((user) => user.username === username);
        if (matchUser.password === password) {
          setUser(matchUser);
          return { success: true };
        }
        throw Error();
      } catch (error) {
        return { success: false };
      }
    };
    const status = await fetchLogin();
    return status;
  };

  const signUp = async ({ fullName, username, email, password, role }) => {
    const fetchSignUp = async () => {
      try {
        const newUser = {
          id: generateUniqueId(),
          fullName,
          username,
          email,
          password,
          role,
          classrooms: [],
        };
        await api.post({ url: "users", data: newUser });
        return { success: true };
      } catch (error) {
        return { success: false };
      }
    };
    const status = await fetchSignUp();
    return status;
  };

  const memoized = useMemo(
    () => ({
      user,
      login,
      signUp,
    }),
    [login, signUp, user]
  );

  return (
    <AuthContext.Provider value={memoized}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

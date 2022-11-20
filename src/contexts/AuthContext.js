import { createContext, useEffect, useMemo, useState } from "react";
import { api } from "../services";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = async ({ email, password }) => {
    const fetchLogin = async () => {
      try {
        const users = await api.getAll({ collection: "users" });
        const matchUser = users.find((user) => user.email === email);
        if (matchUser.password === password) {
          setUser(matchUser);
          localStorage.setItem("user", JSON.stringify(matchUser));
          return { success: true };
        }
        throw Error();
      } catch (error) {
        return { success: false, error };
      }
    };
    const status = await fetchLogin();
    return status;
  };

  const logout = () => {
    setUser(undefined);
    localStorage.clear();
  };

  const signUp = async ({ fullName, email, password, role }) => {
    try {
      const newUser = {
        fullName,
        email,
        password,
        role,
      };
      const users = await api.getAll({ collection: "users" });
      const emailAlreadyRegistered = users.find((user) => user.email === email);

      if (emailAlreadyRegistered) {
        throw new Error("Email already registered");
      }

      await api.post({ collection: "users", data: newUser });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  useEffect(() => {
    const authenticated = localStorage.getItem("user");
    if (authenticated) {
      const parsed = JSON.parse(authenticated);
      setUser(parsed);
    }
  }, []);

  const memoized = useMemo(
    () => ({
      user,
      login,
      logout,
      signUp,
    }),
    [login, signUp, user]
  );

  return (
    <AuthContext.Provider value={memoized}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

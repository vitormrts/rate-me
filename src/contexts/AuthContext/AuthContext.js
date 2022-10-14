import { createContext, useMemo, useState } from "react";
import fake from "../../data/fake";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = ({ username, password }) => {
    try {
      const matchUser = fake.users.find((user) => user.username === username);
      if (matchUser.password === password) {
        setUser(matchUser);
        return { success: true };
      }
      throw Error();
    } catch (error) {
      return { success: false };
    }
  };

  const signUp = ({ fullName, username, email, password, role }) => {
    try {
      const newUser = {
        fullName,
        username,
        email,
        password,
        role,
      };
      fake.users.push(newUser);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
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

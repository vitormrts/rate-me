import { createContext, useMemo, useState } from "react";
import fake from "../../data/fake";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = ({ username, password }) => {
    const matchUser = fake.users.find((user) => user.username === username);
    if (matchUser?.password === password) {
      setUser(matchUser);
      return;
    }
  };

  const signUp = ({ fullName, username, email, password, role }) => {
    const newUser = {
      fullName,
      username,
      email,
      password,
      role,
    };
    fake.users.push(newUser);
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

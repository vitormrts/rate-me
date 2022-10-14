import { createContext, useMemo, useState } from "react";
import { fake, generateUniqueId } from "../devUtils";
import { usePersistedState } from "../hooks";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = usePersistedState("users", fake.users); // NOTE: mocked
  const [user, setUser] = useState();

  const login = ({ username, password }) => {
    try {
      const matchUser = users.find((user) => user.username === username);
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
        id: generateUniqueId(),
        fullName,
        username,
        email,
        password,
        role,
        classrooms: [],
      };
      setUsers([...users, newUser]);
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

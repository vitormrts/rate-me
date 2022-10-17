import { createContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
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
        toast.success("User logged in successfully");
        return { success: true };
      }
      throw Error();
    } catch (error) {
      toast.error("Incorrect username or password");
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
      toast.success("User registered successfully");
      return { success: true };
    } catch (error) {
      toast.success("An error occurred when create user");
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

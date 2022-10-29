import { addDoc } from "firebase/firestore";
import { createContext, useMemo, useState } from "react";
import { api } from "../services";
import { collectionsRef } from "../services/firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = async ({ username, password }) => {
    const fetchLogin = async () => {
      try {
        const response = await api.getById({ collection: "users" });
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
    try {
      const newUser = {
        fullName,
        username,
        email,
        password,
        role,
        classrooms: [],
      };
      await addDoc(collectionsRef.users, newUser);
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

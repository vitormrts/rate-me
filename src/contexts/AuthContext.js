import { createContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";
import api from "../services/api";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const onAuth = async (user) => {
    const userData = await api.getById({
      collection: "users",
      id: user.uid,
    });
    setUser({ ...user, role: userData.role });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      await onAuth(currentUser);
      setLoading(false);
    });
  }, []);

  const login = async ({ email, password }) => {
    const fetchLogin = async () => {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        await onAuth(user);
        setLoading(false);
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    };
    const status = await fetchLogin();
    return status;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const signUp = async ({ email, password, role }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await api.post({
        collection: "users",
        data: { email, role },
        id: auth.currentUser.uid,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const memoized = useMemo(
    () => ({
      user,
      login,
      logout,
      signUp,
      loading,
    }),
    [login, signUp, user, loading]
  );

  return (
    <AuthContext.Provider value={memoized}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

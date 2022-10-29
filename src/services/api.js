import * as firestore from "firebase/firestore";
import { db } from "./firebase";

const getById = async ({ collection, id }) => {
  const collectionDoc = firestore.doc(db, collection, id);
  const collectionSnap = await firestore.getDoc(collectionDoc);
  return collectionSnap.data();
};

const getAll = async ({ collection }) => {
  const collectionDocs = await firestore.getDocs(
    firestore.collection(db, collection)
  );
  const data = collectionDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

const put = async ({ collection, id, data }) => {
  const doc = firestore.doc(db, collection, id);
  await firestore.updateDoc(doc, data);
};

const remove = async ({ collection, id }) => {
  const doc = firestore.doc(db, collection, id);
  await firestore.deleteDoc(doc);
};

const api = {
  getById,
  getAll,
  put,
  remove,
};

export default api;

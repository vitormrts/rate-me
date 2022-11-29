import * as firestore from "firebase/firestore";
import { db, collectionsRef } from "./firebase";

const convertSnapshotToData = (snapShot) => {
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

const getClassroomsFromUser = async (id) => {
  const q = firestore.query(
    collectionsRef.classrooms,
    firestore.where("participantsIds", "array-contains", id)
  );
  const querySnapshot = await firestore.getDocs(q);
  const data = convertSnapshotToData(querySnapshot);
  return data;
};

const getExamsFromClassroom = async (id) => {
  const q = firestore.query(
    collectionsRef.classrooms,
    firestore.where("examsIds", "array-contains", id)
  );
  const querySnapshot = await firestore.getDocs(q);
  const data = convertSnapshotToData(querySnapshot);
  return data;
};

const getById = async ({ collection, id }) => {
  const collectionDoc = firestore.doc(db, collection, id);
  const collectionSnap = await firestore.getDoc(collectionDoc);
  return { id: collectionSnap.id, ...collectionSnap.data() };
};

const getAll = async ({ collection }) => {
  const collectionDocs = await firestore.getDocs(
    firestore.collection(db, collection)
  );
  const data = convertSnapshotToData(collectionDocs);
  return data;
};

const post = async ({ collection, data, id }) => {
  if (id) {
    await firestore.setDoc(firestore.doc(db, collection, id), data);
    return;
  }

  const doc = await firestore.addDoc(
    firestore.collection(db, collection),
    data
  );
  return doc;
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
  getClassroomsFromUser,
  getExamsFromClassroom,
  getById,
  getAll,
  put,
  remove,
  post,
};

export default api;

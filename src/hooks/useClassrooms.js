import { useEffect, useState } from "react";
import { api } from "../services";
import useAuth from "./useAuth";

const useClassrooms = (classroomId) => {
  const { user } = useAuth();
  const [classroom, setClassroom] = useState();
  const [classrooms, setClassrooms] = useState();

  const createClassroom = async (data) => {
    try {
      const { name, description } = data;
      const newClassroom = {
        description,
        exams: [],
        name,
        participants: [
          {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            isTeacher: true,
          },
        ],
        participantsIds: [user.id],
        teacherId: user.id,
      };
      console.log(newClassroom);
      await api.post({ collection: "classrooms", data: newClassroom });
      return {
        success: true,
        message: "Classroom created successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "There was an error create the classroom",
      };
    }
  };

  const updateClassroom = async (data, id) => {
    try {
      await api.put({
        collection: "classrooms",
        data,
        id,
      });

      return {
        success: true,
        message: "Classroom edited successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "There was an error editing the classroom",
      };
    }
  };

  const deleteClassroom = async (id) => {
    try {
      await api.remove({ collection: "classrooms", id });

      return {
        success: true,
        message: "Classroom successfully deleted",
      };
    } catch (error) {
      return {
        success: false,
        message: "There was an error deleting the classroom",
      };
    }
  };

  const getClassrooms = async () => {
    const classrooms = await api.getClassroomsFromUser(user.id);
    return classrooms;
  };

  const getClassroom = async (id) => {
    const classroom = await api.getById({
      collection: "classrooms",
      id,
    });
    console.log(classroom);
    return classroom;
  };

  useEffect(() => {
    if (!classrooms) {
      (async () => {
        const classrooms = await getClassrooms();
        setClassrooms(classrooms);
      })();
    }
    if (classroomId) {
      (async () => {
        const classroom = await getClassroom(classroomId);
        setClassroom(classroom);
      })();
    }
  }, [classroomId]);

  return {
    classrooms,
    classroom,
    createClassroom,
    deleteClassroom,
    updateClassroom,
  };
};

export default useClassrooms;

import { useEffect, useState } from "react";
import { api } from "../services";
import useAuth from "./useAuth";

const useClassrooms = (classroomId) => {
  const { user } = useAuth();
  const [classroom, setClassroom] = useState();
  const [classrooms, setClassrooms] = useState();

  const createClassroom = async (data) => {
    try {
      const { name, description, password } = data;
      const newClassroom = {
        description,
        password,
        exams: [],
        name,
        participants: [
          {
            id: user.uid,
            email: user.email,
            isTeacher: true,
          },
        ],
        participantsIds: [user.uid],
        teacherId: user.uid,
      };
      await api.post({ collection: "classrooms", data: newClassroom });
      return {
        success: true,
        message: "Classroom created successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "There was an error create the classroom",
      };
    }
  };

  const enterClassroom = async (data, id) => {
    try {
      const { password } = data;
      const classroom = await getClassroom(id);
      if (classroom.password === password) {
        const alreadyParticipant = classroom.participantsIds.find(
          (participant) => participant === user.uid
        );

        if (alreadyParticipant) {
          throw new Error("You are already in this room");
        }

        const classroomWithNewParticipant = {
          ...classroom,
          participants: [
            ...classroom.participants,
            {
              email: user.email,
              fullName: user.fullName,
              id: user.uid,
              isTeacher: false,
            },
          ],
          participantsIds: [...classroom.participantsIds, user.uid],
        };

        await updateClassroom(classroomWithNewParticipant, id);

        return {
          success: true,
        };
      }
      throw new Error("Incorrect password");
    } catch (error) {
      return {
        success: false,
        error,
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
    try {
      const classrooms = await api.getClassroomsFromUser(user.uid);
      return classrooms;
    } catch (error) {
      return [];
    }
  };

  const getClassroom = async (id) => {
    try {
      const classroom = await api.getById({
        collection: "classrooms",
        id,
      });
      return classroom;
    } catch (error) {
      return {};
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!classrooms) {
      (async () => {
        const classrooms = await getClassrooms();
        setClassrooms(classrooms);
      })();
    }
    if (classroomId && !classroom) {
      (async () => {
        const classroom = await getClassroom(classroomId);
        setClassroom(classroom);
      })();
    }
  }, [classroomId, user]);

  return {
    classrooms,
    classroom,
    createClassroom,
    enterClassroom,
    deleteClassroom,
    updateClassroom,
  };
};

export default useClassrooms;

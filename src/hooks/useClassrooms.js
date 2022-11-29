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
        message: "Sala de aula criada com sucesso",
      };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao criar a sala de aula",
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
          throw new Error("Você já está nesta sala de aula");
        }

        const classroomWithNewParticipant = {
          ...classroom,
          participants: [
            ...classroom.participants,
            {
              email: user.email,
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
      throw new Error("Senha incorreta");
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
        message: "Sala de aula editada com sucesso",
      };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao editar a sala de aula",
      };
    }
  };

  const deleteClassroom = async (id) => {
    try {
      await api.remove({ collection: "classrooms", id });

      return {
        success: true,
        message: "Sala de aula deletada com sucesso",
      };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao deletar a sala de aula",
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

const getFormattedClassroom = (classroom) => {
  return {
    ...classroom,
    students: classroom.participants.filter(
      (participant) => !participant.isTeacher
    ).length,
    exams: classroom.exams.length,
  };
};

export default getFormattedClassroom;

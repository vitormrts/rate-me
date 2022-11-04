const getFormattedClassroom = ({ classroom }) => {
  return {
    ...classroom,
    students: classroom.students.length,
    exams: classroom.exams.length,
  };
};

export default getFormattedClassroom;

const classroom = {
  id: 1,
  name: "Sala 1",
  description: "Esta é a sala 1. Uma sala apenas de exemplo",
};

const student = {
  id: 1,
  fullName: "Sou Aluno",
  username: "soualuno",
  email: "soualuno@gmail.com",
  password: "12345",
  role: "student",
  classrooms: [classroom],
};

const teacher = {
  id: 2,
  fullName: "Sou Professor",
  username: "souprofessor",
  email: "souprofessor@gmail.com",
  password: "12345",
  role: "teacher",
  classrooms: [classroom],
};

const users = [student, teacher];

const classrooms = [classroom];

const fake = {
  classroom,
  classrooms,
  student,
  teacher,
  users,
};

export default fake;

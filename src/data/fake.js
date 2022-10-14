const student = {
  fullName: "Sou Aluno",
  username: "soualuno",
  email: "soualuno@gmail.com",
  password: "12345",
  role: "student",
};

const teacher = {
  fullName: "Sou Professor",
  username: "souprofessor",
  email: "souprofessor@gmail.com",
  password: "12345",
  role: "teacher",
};

const classroom = {
  id: 1234521,
  name: "Sala 1",
  description: "Esta é a sala 1. Uma sala apenas de exemplo",
};

const users = [student, teacher];

const classrooms = Array(5).fill(classroom);

const fake = {
  student,
  teacher,
  users,
  classroom,
  classrooms,
};

export default fake;

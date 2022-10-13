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

const users = [student, teacher];

const fake = {
  student,
  teacher,
  users,
};

export default fake;

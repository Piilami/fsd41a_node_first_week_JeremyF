import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);
// ajout des utilisateurs

export const addUser = (students, name, birth) => {
  if (dayjs(birth, "YYYY-DD-MM", true).isValid()) {
    birth = dayjs(birth, "YYYY-DD-MM").format("DD/MM/YYYY");
  }
  const newStudent = { name: name, birth: birth };

  students.push(newStudent);
};

export const formatDate = (students) => {
  const copyStudents = students.map((student) => {
    if (dayjs(student.birth, "YYYY-DD-MM", true).isValid()) {
      student.birth = dayjs(student.birth, "YYYY-DD-MM").format("DD/MM/YYYY");
    }
    return student;
  });
  return copyStudents;
};

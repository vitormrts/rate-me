import * as S from "./Grid.style";
import { ClassroomCard } from "../../cards";
import { useNavigate } from "react-router-dom";

const Grid = ({ classrooms }) => {
  const navigate = useNavigate();

  const goToClassroom = (id) => navigate(`/classrooms/${id}`);

  const classroomsMap = classrooms.map((classroom) => (
    <ClassroomCard
      key={classroom.id}
      name={classroom.name}
      onClick={() => goToClassroom(classroom.id)}
      description={classroom.description}
    />
  ));
  return <S.Grid>{classroomsMap}</S.Grid>;
};

export default Grid;

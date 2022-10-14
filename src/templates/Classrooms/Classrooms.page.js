import { Grid } from "../../components/classrooms";
import { Container } from "../../components/containers";
import { Button } from "../../components/buttons";
import { isTeacher } from "../../devUtils";
import { useAuth, useClassrooms, useModal } from "../../hooks";

const ClassroomsPage = () => {
  const { open } = useModal();
  const { user } = useAuth();
  const { myClassrooms } = useClassrooms();

  const CreateClassroomButton = () => {
    const showButton = isTeacher(user.role);
    if (!showButton) {
      return;
    }
    return (
      <Button onClick={() => open("ADD_CLASSROOM")} text="+ Add classroom" />
    );
  };

  return (
    <>
      <Container title="My classrooms" Button={CreateClassroomButton}>
        <Grid classrooms={myClassrooms} />
      </Container>
    </>
  );
};

export default ClassroomsPage;

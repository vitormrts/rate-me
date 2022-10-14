import { Grid } from "../../components/classrooms";
import { Container } from "../../components/containers";
import fake from "../../data/fake";

const ClassroomsPage = () => {
  return (
    <>
      <Container title="My classrooms">
        <Grid classrooms={fake.classrooms} />
      </Container>
    </>
  );
};

export default ClassroomsPage;

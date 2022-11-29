import { HomeRounded, PersonRounded, SchoolRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Empty } from "../../components/empty";
import { Group } from "../../components/groups";
import { Table } from "../../components/tables";
import { useClassrooms } from "../../hooks";
import { copyToClipboard } from "../../utils";

const ListStudentsPage = () => {
  const { classroomId } = useParams();
  const { classroom } = useClassrooms(classroomId);
  const students =
    classroom?.participants.filter((participant) => !participant.isTeacher) ||
    [];

  const onInviteStudentButtonClick = () => {
    // Note: implement insert base url
    const { success } = copyToClipboard(`/classrooms/${classroomId}/invite`);
    success
      ? toast.info("Sala de aula copiada. Envie o link para o seu aluno.")
      : toast.error("Ocorreu um erro ao copiar a sala de aula.");
  };

  const InviteStudentButton = (props) => (
    <Button
      onClick={onInviteStudentButtonClick}
      variant="contained"
      fullWidth
      {...props}
    >
      + Convidar
    </Button>
  );

  const InviteStudentOutlinedButton = () => (
    <InviteStudentButton variant="outlined" />
  );

  const breadcrumbs = [
    {
      text: "Salas de aula",
      Icon: HomeRounded,
      href: "/dashboard/classrooms",
    },
    {
      text: classroom?.name || "",
      Icon: SchoolRounded,
    },
    {
      text: "Estudantes",
      Icon: PersonRounded,
    },
  ];

  const columns = [
    {
      name: "Email",
      key: "email",
    },
  ];

  return (
    <Group
      title="Estudantes"
      Button={InviteStudentButton}
      breadcrumbs={breadcrumbs}
    >
      {classroom && students.length > 0 && (
        <Table columns={columns} data={students} />
      )}
      {classroom && students.length === 0 && (
        <Empty
          image="/assets/classroom/empty.jpg"
          title="Oops! You have no students in this room."
          subTitle="But calm down! How about you invite one of your students?."
          Button={InviteStudentOutlinedButton}
        />
      )}
    </Group>
  );
};

export default ListStudentsPage;

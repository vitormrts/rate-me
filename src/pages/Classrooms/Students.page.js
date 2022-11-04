import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/buttons";
import { Group } from "../../components/groups";
import { Table } from "../../components/tables";
import { copyToClipboard } from "../../utils";

const ListStudentsPage = () => {
  const params = useParams();

  const onInviteStudentButtonClick = () => {
    const { success } = copyToClipboard(params.id);
    success
      ? toast.info("Room URL copied! Send it to your student")
      : toast.error("There was an error copying the room URL");
  };

  const InviteStudentButton = () => (
    <Button text="+ Invite student" onClick={onInviteStudentButtonClick} />
  );

  const data = Array(20).fill({
    name: "Vitor Martins Cruz",
    email: "vitormartinscruz@usp.br",
  });

  const columns = [
    {
      name: "Name",
      key: "name",
    },
    {
      name: "Email",
      key: "email",
    },
  ];

  return (
    <Group title="Students" Button={InviteStudentButton}>
      <Table columns={columns} data={data} />
    </Group>
  );
};

export default ListStudentsPage;

import { Group } from "../../components/groups";
import { Table } from "../../components/tables";
import { DefaultContainer, DefaultWrapper } from "../../styles/Common";

const StudentsPage = () => {
  const data = Array(20).fill({
    id: "1",
    name: "Vitor Martins Cruz",
    email: "vitormartinscruz@usp.br",
    classrooms: "ACH2001, ACH2002, ACH2003",
  });

  const columns = [
    {
      name: "#",
      key: "id",
    },
    {
      name: "Name",
      key: "name",
    },
    {
      name: "Email",
      key: "email",
    },
    {
      name: "Classrooms",
      key: "classrooms",
    },
  ];

  return (
    <DefaultWrapper>
      <DefaultContainer>
        <Group title="Students">
          <Table columns={columns} data={data} />
        </Group>
      </DefaultContainer>
    </DefaultWrapper>
  );
};

export default StudentsPage;

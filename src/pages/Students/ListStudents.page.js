import { Table } from "../../components/tables";

const ListStudentsPage = () => {
  const data = Array(20).fill({
    name: "Vitor Martins Cruz",
    email: "vitormartinscruz@usp.br",
    classrooms: "ACH2001, ACH2002, ACH2003",
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
    {
      name: "Classrooms",
      key: "classrooms",
    },
  ];

  return <Table columns={columns} data={data} />;
};

export default ListStudentsPage;

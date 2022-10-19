import { Button, IconButton } from "../../components/buttons";
import { Group } from "../../components/groups";
import { isTeacherRole } from "../../utils";
import { useAuth } from "../../hooks";
import { Table } from "../../components/tables";
import { StatusTag } from "../../components/tags";
import { ShuffleRounded, DeleteRounded } from "@mui/icons-material";
import { DefaultContainer, DefaultWrapper } from "../../styles/Common";
import { useNavigate } from "react-router-dom";

const ExamsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role);

  const onDeleteClick = (id) => console.log("delete click ", id);

  const onShuffleQuestionsClick = (id) => console.log("shuffle questions ", id);

  const onCreateExamClick = () => navigate("/exams/new");

  const CreateExamButton = () => {
    if (!isTeacher) return;
    return <Button onClick={onCreateExamClick} text="+ Add Exam" />;
  };

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
      name: "Classroom",
      key: "classroom",
    },
    {
      name: "Time Limit",
      key: "timeLimit",
    },
    {
      name: "Initial Date",
      key: "initialDate",
    },
    {
      name: "Final Date",
      key: "finalDate",
    },
    {
      name: "Finished",
      key: "finished",
    },
    {
      name: "Not finished",
      key: "notFinished",
    },
    {
      name: "Status",
      key: "status",
    },
    {
      name: "Actions",
      actions: [
        {
          onClick: (id) => onShuffleQuestionsClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="shuffle"
              title="Shuffle exam questions"
              Icon={ShuffleRounded}
              onClick={onClick}
            />
          ),
          show: isTeacher,
        },
        {
          onClick: (id) => onDeleteClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="delete"
              title="Delete"
              Icon={DeleteRounded}
              onClick={onClick}
            />
          ),
          show: isTeacher,
        },
      ],
    },
  ];

  const data = [
    {
      id: "1",
      name: "first exam",
      classroom: "Example classroom",
      timeLimit: 20,
      closed: true,
      initialDate: "10/10/2022 2pm",
      finalDate: "10/12/2022 2pm",
      finished: 5,
      notFinished: 10,
      status: <StatusTag text="Finished" color="red" />,
    },
    {
      id: "2",
      name: "second exam",
      classroom: "Example classroom",
      timeLimit: 20,
      closed: false,
      initialDate: "10/10/2022 2pm",
      finalDate: "10/12/2022 2pm",
      finished: 10,
      notFinished: 5,
      status: <StatusTag text="In Progress" color="green" />,
    },
    {
      id: "2",
      name: "second exam",
      classroom: "Example classroom",
      timeLimit: 20,
      closed: false,
      initialDate: "10/10/2022 2pm",
      finalDate: "10/12/2022 2pm",
      finished: 10,
      notFinished: 5,
      status: <StatusTag text="Will Start" color="blue" />,
    },
  ];

  return (
    <DefaultWrapper>
      <DefaultContainer>
        <Group id="exams" title="Exams" Button={CreateExamButton}>
          <Table columns={columns} data={data} />
        </Group>
      </DefaultContainer>
    </DefaultWrapper>
  );
};

export default ExamsPage;

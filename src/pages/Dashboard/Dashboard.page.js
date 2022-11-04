import { QuizRounded, SchoolRounded } from "@mui/icons-material";
import { Container } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppBar, SideBar } from "../../components/bars";
import { DefaultWrapper } from "../../styles/Common";

const DashboardPage = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBar = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSideBarOpen(open);
  };

  const items = [
    {
      id: "classrooms",
      name: "Classrooms",
      href: "/dashboard/classrooms",
      Icon: SchoolRounded,
    },
    {
      id: "exams",
      name: "Exams",
      href: "/dashboard/exams",
      Icon: QuizRounded,
    },
  ];

  return (
    <DefaultWrapper>
      <SideBar items={items} onToggle={toggleSideBar} isOpen={sideBarOpen} />
      <AppBar onToggle={toggleSideBar} />
      <Container>
        <Outlet />
      </Container>
    </DefaultWrapper>
  );
};

export default DashboardPage;

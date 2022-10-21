import * as S from "./Group.style";
import { AppBar, SideBar } from "../../bars";
import {
  DashboardRounded,
  SchoolRounded,
  PeopleAltRounded,
  QuizRounded,
} from "@mui/icons-material";
import { useState } from "react";

const Group = ({ id, children, title = "Title", Button }) => {
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
      id: "dashboard",
      name: "Dashboard",
      href: "/dashboard",
      Icon: DashboardRounded,
    },
    {
      id: "classrooms",
      name: "Classrooms",
      href: "/classrooms",
      Icon: SchoolRounded,
    },
    {
      id: "students",
      name: "Students",
      href: "/students",
      Icon: PeopleAltRounded,
    },
    {
      id: "exams",
      name: "Exams",
      href: "/exams",
      Icon: QuizRounded,
    },
  ];
  return (
    <>
      <SideBar items={items} onToggle={toggleSideBar} isOpen={sideBarOpen} />
      <AppBar onToggle={toggleSideBar} />
      <S.Container id={id}>
        <S.TitleGroup>
          <S.Title>{title}</S.Title>
          {Button && (
            <S.ButtonAdapter>
              <Button />
            </S.ButtonAdapter>
          )}
        </S.TitleGroup>
        <S.Children>{children}</S.Children>
      </S.Container>
    </>
  );
};

export default Group;

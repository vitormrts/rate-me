import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppBar } from "../../components/bars";
import { DefaultWrapper } from "../../styles/Common";

const DashboardPage = () => {
  return (
    <DefaultWrapper>
      <AppBar />
      <Container>
        <Outlet />
      </Container>
    </DefaultWrapper>
  );
};

export default DashboardPage;

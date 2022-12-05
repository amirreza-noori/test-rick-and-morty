import { Container } from "@mui/material";
import Header from "./layouts/Header";
import routesProvider from "./utils/routes";




export default function App() {


  return (
    <Container>
      <Header />
      {routesProvider}
    </Container>
  );
}

import { Headlinebar } from "@components/Headlinebar";
import { NavBar } from "@components/NavBar";
import { NotEnoughScreenPlaceholder } from "@components/NotEnoughScreenPlaceholder";
import { AppSetup } from "@utils/setup/AppSetup";
import { GlobalComponents } from "@utils/setup/GlobalComponents";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { useScreenSize } from "./hooks/utility/useScreenSize";

const MINIMAL_SCREEN_WIDTH = 730;
const MINIMAL_SCREEN_HEIGHT = 680;

function App() {
  const { width, height } = useScreenSize();
  const isMobile = width < MINIMAL_SCREEN_WIDTH || height < MINIMAL_SCREEN_HEIGHT;
  return (
    <>
      <AppContainer $hidden={isMobile}>
        <MainContent>
          <GlobalComponents />
          <AppSetup />
          <Headlinebar />
          <NavBar />
          <Outlet />
        </MainContent>
      </AppContainer>
      {isMobile  &&
        <NotEnoughScreenPlaceholder />
      }
    </>
  );
}

const AppContainer = styled.div<{$hidden: boolean}>`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  position: relative;
  overflow: ${(props) => props.$hidden ? "hidden" : "initial"};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;

  /* Take away height from the bottom to account for the navbar */
  padding-bottom: 30px;
  box-sizing: border-box;
`;


export default App;

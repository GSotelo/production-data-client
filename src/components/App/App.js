// Components
import React, { Component } from "react";
import TopBar from "../TopBar/TopBar";
import SystemDate from "../SystemDate/SystemDate";
import SideBar from "../SideBar/SideBar";
import Logo from "../Logo/Logo";
import Layout from "../Layout/Layout";
import Screen from "../Screen/Screen";
import CloseButton from "../CloseButton/CloseButton";

// Utilities
import sideBarData from "../SideBar/utilities/data";

// CSS modules
import styles from "./App.module.css";

class App extends Component {

  render() {
    const propsTopBar = {
      brandLogo: <Logo />,
      currentDate: <SystemDate />,
      closeButton: <CloseButton />
    };

    const propsSideBar = {
      data: sideBarData
    }

    return (
      <div className={styles.app}>
        <Layout
          topBar={<TopBar {...propsTopBar} />}
          sideBar={<SideBar {...propsSideBar} />}
          screen={<Screen />}
        />
      </div>
    );
  }
}

export default App;
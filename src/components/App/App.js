import React, { Component } from "react";
import { Layout } from "antd";
import TopBar from "../TopBar/TopBar";
import SystemDate from '../SystemDate/SystemDate';
import "antd/dist/antd.css";
import styles from "./App.module.css";

class App extends Component {

  render() {

    // Layout elements
    const { Header, Footer, Sider, Content } = Layout;

    // Top bar elements (I pass them as props)
    const topBarProps = {
      logo: 'logo value',
      date: <SystemDate className={styles.h50} />,
      closeButton: 'close button'
    };

    return (
      <Layout className={styles.app}>
        <Header className={styles.header}>
          <TopBar {...topBarProps} />
        </Header>
        <Layout>
          <Sider theme="light" className={styles.sideBar}>SideBar</Sider>
          <Content className={styles.screen}>Screen</Content>
        </Layout>
        <Footer className={styles.footer} />
      </Layout>
    );
  }
}

export default App;
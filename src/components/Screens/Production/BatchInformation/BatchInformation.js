import React, { Component } from "react";
import Table from "./utilities/Table";
import TitleBar from "../../../Bar/TitleBar/StandardTitleBar";

import styles from "./BatchInformation.module.css";
import { getDataForTable } from "./utilities/handlersServer";
import { propsTitleBarBI, propsTableBI } from "./utilities/props";

class BatchInformation extends Component {
  state = {
    api: {
      dataTableBI: []
    }
  }

  async componentDidMount() {
    // Fallback data for table
    const response = await getDataForTable();
    this.setState({ api: { dataTableBI: response.data } });
  }

  render() {
    // Extract some class methods / fields
    const { dataTableBI } = this.state.api;
    const {
      batchOverview,
      tableBox,
      titleBarBox,
    } = styles;

    return (
      <div className={batchOverview}>
        <div className={titleBarBox}>
          <TitleBar {...propsTitleBarBI} />
        </div>

        <div className={tableBox}>
          <Table data={dataTableBI} {...propsTableBI} />
        </div>
      </div>
    )
  }
}

export default BatchInformation;

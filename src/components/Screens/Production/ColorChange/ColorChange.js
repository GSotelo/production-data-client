import React, { Component } from 'react';
import CustomCard from "./utilities/CustomCard";
import GraphContainer from "../../../Container/GraphContainer";
import GraphContext from "../../../Context/GraphContext";
import LineBarCardChart from "./utilities/LineBarCardChart";
import Table from "../../../UI/Table/MaterialUI/Table";
import { Row, Col } from "antd";

import styles from "./ColorChange.module.css";
import processDataFromServer from "./utilities/handlersServer";

import { propsCCQL, propsCCD, propsCCAC, propsCCAT } from "./utilities/props";


class ColorChange extends Component {

  state={
    dataCCD:[],
    dataCCQL:[]
  }


  getDataFromServer = async (id, timeRange) => {
    
    const data = await processDataFromServer(id, timeRange);
    console.log("CC getDataFromServer",id, data);
  }

  updateState = (id, timeRange, dataFromServer) => {
    // // Keep track of timeframe
    // this.setState(prevState => {
    //   const nextUpdate = { ...prevState };
    //   const currentTimeRange = `currentTimeRange${id}`;
    //   nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
    //   return { nextUpdate };
    // });

    // // These id's must trigger data updates for their respective deck element (SHDD, BBD)
    // if (id === "SHDT" || id === "BBT") {
    //   const baseSelector = id.slice(0, id.length - 1); // SHD, BB 
    //   const dataTrendSelector = `data${id}`; // SHDT, BBT
    //   const dataDeckSelector = `data${baseSelector}D`; // SHDD, BBD
      
    //   // Update state if SHDT, SHDT, BBD, BBT element and exit function
    //   return this.setState(prevState => {
    //     const nextUpdate = { ...prevState };
    //     nextUpdate.api[dataTrendSelector] = dataFromServer.dataTrend;
    //     nextUpdate.api[dataDeckSelector] = dataFromServer.dataDeck;
    //     return { nextUpdate };
    //   })
    }

  createContextValues = (ids) => {
    const { getDataFromServer } = this;
    const baseContextValue = { getDataFromServer };

    return ids.map(id => (
      {
        ...baseContextValue,
        id,
      }
    ));
  }

  render() {
    const tableRows = [
      { id: 1, date: "2021/03/17", pressure: 5.7 },
      { id: 2, date: "2021/03/18", pressure: 5.3 },
      { id: 3, date: "2021/03/19", pressure: 5.6 },
      { id: 4, date: "2021/03/20", pressure: 4.3 },
      { id: 5, date: "2021/03/21", pressure: 4.7 },
      { id: 6, date: "2021/03/22", pressure: 5.1 },
      { id: 7, date: "2021/03/23", pressure: 5.4 },
      { id: 8, date: "2021/03/24", pressure: 5.9 },
      { id: 9, date: "2021/03/25", pressure: 4.8 },
      { id: 10, date: "2021/03/26", pressure: 4.9 },
      { id: 11, date: "2021/03/27", pressure: 4.1 },
      { id: 12, date: "2021/03/28", pressure: 5.9 },
      { id: 13, date: "2021/03/29", pressure: 6.2 },
      { id: 14, date: "2021/03/30", pressure: 6.7 }
    ];

    // Line, bar chart UI components
    const BarChartCCQL = <LineBarCardChart id="CCQL" data="data" timeRange="week" />;
    const LineChartCCD = <LineBarCardChart id="CCD" data="data" timeRange="week" />;

    // Create context values
    const { createContextValues } = this;
    const ids = ["CCQL", "CCD", "CCAC"];
    const contextValue = createContextValues(ids);

    return (
      <Row className={styles.colorChange}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[0]}>
              <GraphContainer {...propsCCQL} graph={BarChartCCQL} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[1]}>
              <GraphContainer {...propsCCD} graph={LineChartCCD} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[2]}>
              <GraphContainer  {...propsCCAC} graph={<CustomCard value="17" />} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <Table rows={tableRows} {...propsCCAT} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default ColorChange;
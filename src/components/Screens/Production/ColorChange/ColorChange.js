import React, { Component } from 'react';
import { Row, Col } from "antd";
import styles from "./ColorChange.module.css";
import GraphContainer from "../../../Container/GraphContainer";
import { propsCCQL, propsCCD, propsCCA } from "./utilities/props";
import CustomChart from "./utilities/CustomChart";
import CustomCard from "./utilities/CustomCard";

class ColorChange extends Component {

  render() {

    // Data for Color change duration
    const dataCCD = [
      {
        id: 'Time',
        data: [
          { x: '2021-01-01', y: 17 },
          { x: '2021-01-02', y: 5 },
          { x: '2021-01-03', y: 1 },
          { x: '2021-01-04', y: 9 },
          { x: '2021-01-05', y: 12 },
          { x: '2021-01-06', y: 16 },
          { x: '2021-01-07', y: 3 },
          { x: '2021-01-08', y: 3 },
          { x: '2021-01-09', y: 3 },
          { x: '2021-01-10', y: 3 },
          { x: '2021-01-11', y: 7 },
          { x: '2021-01-12', y: 5 },
          { x: '2021-01-13', y: 11 },
          { x: '2021-01-14', y: 9 },
          { x: '2021-01-15', y: 2 },
          { x: '2021-01-16', y: 6 },
          { x: '2021-01-17', y: 13 },
          { x: '2021-01-18', y: 3 },
          { x: '2021-01-19', y: 13 },
          { x: '2021-01-20', y: 3 },
          { x: '2021-01-21', y: 7 },
          { x: '2021-01-22', y: 5 },
          { x: '2021-01-23', y: 11 },
          { x: '2021-01-24', y: 9 },
          { x: '2021-01-25', y: 12 },
          { x: '2021-01-26', y: 6 },
          { x: '2021-01-27', y: 13 },
          { x: '2021-01-28', y: 13 },
          { x: '2021-01-29', y: 3 },
          { x: '2021-01-30', y: 11 },
        ]
      }
    ];

    // Properties for color change duration graph
    const propsGraphCCD = {
      id: "CCD",
      lineData: dataCCD,
      cardData: {
        value: 18,
        label: "▬ Previous month",
        previousValue: "8 min"
      }
    }

    // Graph: Color change duration
    const graphCCD = <CustomChart {...propsGraphCCD} />;

    // Data for color change quickest longest
    const dataCCQL = [
      {
        "date": "2021/01/01",
        "Quickest CC": 17,
        "Longest CC": 19
      },
      {
        "date": "2021/01/02",
        "Quickest CC": 17,
        "Longest CC": 20
      },
      {
        "date": "2021/01/03",
        "Quickest CC": 14,
        "Longest CC": 20
      },
      {
        "date": "2021/01/04",
        "Quickest CC": 13,
        "Longest CC": 21
      },
      {
        "date": "2021/01/05",
        "Quickest CC": 8,
        "Longest CC": 25
      },
      {
        "date": "2021/01/06",
        "Quickest CC": 4,
        "Longest CC": 22

      },
      {
        "date": "2021/01/07",
        "Quickest CC": 6,
        "Longest CC": 20
      },
      {
        "date": "2021/01/08",
        "Quickest CC": 8,
        "Longest CC": 22
      },
      {
        "date": "2021/01/09",
        "Quickest CC": 8,
        "Longest CC": 20
      },
      {
        "date": "2021/01/10",
        "Quickest CC": 18,
        "Longest CC": 23
      },
      {
        "date": "2021/01/11",
        "Quickest CC": 7,
        "Longest CC": 20
      },
      {
        "date": "2021/01/12",
        "Quickest CC": 11,
        "Longest CC": 24
      },
      {
        "date": "2021/01/13",
        "Quickest CC": 9,
        "Longest CC": 20
      },
      {
        "date": "2021/01/14",
        "Quickest CC": 9,
        "Longest CC": 23

      },
      {
        "date": "2021/01/15",
        "Quickest CC": 6,
        "Longest CC": 22
      },
      {
        "date": "2021/01/16",
        "Quickest CC": 18,
        "Longest CC": 20
      },
      {
        "date": "2021/01/17",
        "Quickest CC": 18,
        "Longest CC": 20
      },
      {
        "date": "2021/01/18",
        "Quickest CC": 7,
        "Longest CC": 17
      },
      {
        "date": "2021/01/19",
        "Quickest CC": 13,
        "Longest CC": 19
      },
      {
        "date": "2021/01/20",
        "Quickest CC": 9,
        "Longest CC": 15
      }
    ];

    // Properties for color change duration graph
    const propsGraphCCQL = {
      id: "CCQL",
      barData: dataCCQL,
      cardData: {
        value: 7,
        label: "▬ Previous month",
        previousValue: "6 min"
      }
    }

    // Graph: Color change duration
    const graphCCQL = <CustomChart {...propsGraphCCQL} />;


    return (
      <Row className={styles.colorChange}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContainer
              {...propsCCQL}
              graph={graphCCQL}
            />
          </div>

          <div className={styles.bottom}>
            <GraphContainer
              {...propsCCD}
              graph={graphCCD}
            />
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContainer
              {...propsCCA}
              graph={<CustomCard value="17" />}
            />
          </div>

          <div className={styles.bottom}>
            <div className={styles.full}>TABLE</div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default ColorChange;
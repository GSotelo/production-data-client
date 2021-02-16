import React, { Component } from 'react';
import Chart from "./Chart/Chart";
import { Row, Col } from "antd";
import {
  propsCoatedSurface,
  propsConveyorSpeed, 
  propsLineDensity, 
  propsRunningHours, 
  propsSprayMode, 
  propsSystemStatus 
} from "./props";

import styles from "./Monitoring.module.css";

class Monitoring extends Component {

  render() {

    /*Spraying mode data*/
    const dataSprayingMode = [
      {
        "id": "automatic",
        "label": "Automatic",
        "value": 70
      },
      {
        "id": "manual",
        "label": "Manual",
        "value": 20
      },
      {
        "id": "idle",
        "label": "Idle",
        "value": 10,
      }
    ]

    /*System status data*/
    const dataSystemStatus = [
      {
        "id": "production",
        "label": "Production",
        "value": 75
      },
      {
        "id": "system fault",
        "label": "System fault",
        "value": 16
      },
      {
        "id": "color change",
        "label": "Color change",
        "value": 15,
      },
      {
        "id": "standby",
        "label": "Standby",
        "value": 10,
      }
    ]

    /* Line density data */
    const dataLineDensity = [
      {
        "date": "2021/01/01",
        "Coated parts": 118
      },
      {
        "date": "2021/01/02",
        "Coated parts": 182
      },
      {
        "date": "2021/01/03",
        "Coated parts": 74
      },
      {
        "date": "2021/01/04",
        "Coated parts": 131
      },
      {
        "date": "2021/01/05",
        "Coated parts": 89
      },
      {
        "date": "2021/01/06",
        "Coated parts": 94
    
      },
      {
        "date": "2021/01/07",
        "Coated parts": 36
      },
      {
        "date": "2021/01/08",
        "Coated parts": 18
      },
      {
        "date": "2021/01/09",
        "Coated parts": 78
      },
      {
        "date": "2021/01/10",
        "Coated parts": 182
      },
      {
        "date": "2021/01/11",
        "Coated parts": 74
      },
      {
        "date": "2021/01/12",
        "Coated parts": 131
      },
      {
        "date": "2021/01/13",
        "Coated parts": 89
      },
      {
        "date": "2021/01/14",
        "Coated parts": 94
    
      },
      {
        "date": "2021/01/15",
        "Coated parts": 36
      },
      {
        "date": "2021/01/16",
        "Coated parts": 18
      },
      {
        "date": "2021/01/17",
        "Coated parts": 182
      },
      {
        "date": "2021/01/18",
        "Coated parts": 74
      },
      {
        "date": "2021/01/19",
        "Coated parts": 131
      },
      {
        "date": "2021/01/20",
        "Coated parts": 89
      },
      // {
      //   "date": "2021/01/21",
      //   "Coated parts": 94
    
      // },
      // {
      //   "date": "2021/01/22",
      //   "Coated parts": 36
      // },
      // {
      //   "date": "2021/01/23",
      //   "Coated parts": 18
      // },
      // {
      //   "date": "2021/01/24",
      //   "Coated parts": 182
      // },
      // {
      //   "date": "2021/01/25",
      //   "Coated parts": 74
      // },
      // {
      //   "date": "2021/01/26",
      //   "Coated parts": 131
      // },
      // {
      //   "date": "2021/01/27",
      //   "Coated parts": 89
      // },
      // {
      //   "date": "2021/01/28",
      //   "Coated parts": 94
    
      // },
      // {
      //   "date": "2021/01/29",
      //   "Coated parts": 36
      // },
      // {
      //   "date": "2021/01/30",
      //   "Coated parts": 36
      // },
      // {
      //   "date": "2021/01/31",
      //   "Coated parts": 36
      // }
    ];

    /* Conveyor speed data */
    const dataConveyorSpeed = [
      {
        id: 'Speed',
        data: [
          { x: '2021-01-01', y: 7 },
          { x: '2021-01-02', y: 5 },
          { x: '2021-01-03', y: 11 },
          { x: '2021-01-04', y: 9 },
          { x: '2021-01-05', y: 12 },
          { x: '2021-01-06', y: 16 },
          { x: '2021-01-07', y: 13 },
          { x: '2021-01-08', y: 13 },
          { x: '2021-01-09', y: 13 },
          { x: '2021-01-10', y: 13 },
          { x: '2021-01-11', y: 7 },
          { x: '2021-01-12', y: 5 },
          { x: '2021-01-13', y: 11 },
          { x: '2021-01-14', y: 9 },
          { x: '2021-01-15', y: 12 },
          { x: '2021-01-16', y: 16 },
          { x: '2021-01-17', y: 13 },
          { x: '2021-01-18', y: 13 },
          { x: '2021-01-19', y: 13 },
          { x: '2021-01-20', y: 13 },
          { x: '2021-01-21', y: 7 },
          { x: '2021-01-22', y: 5 },
          { x: '2021-01-23', y: 11 },
          { x: '2021-01-24', y: 9 },
          { x: '2021-01-25', y: 12 },
          { x: '2021-01-26', y: 16 },
          { x: '2021-01-27', y: 13 },
          { x: '2021-01-28', y: 13 },
          { x: '2021-01-27', y: 13 },
          { x: '2021-01-28', y: 13 },
        ]
      }
    ];

    
    /* Conveyor speed data */
    const dataCoatedSurface = [
      {
        id: 'Square meters',
        data: [
          { x: '2021-01-01', y: 7 },
          { x: '2021-01-02', y: 5 },
          { x: '2021-01-03', y: 11 },
          { x: '2021-01-04', y: 9 },
          { x: '2021-01-05', y: 17 },
          { x: '2021-01-06', y: 11 },
          { x: '2021-01-07', y: 13 },
          { x: '2021-01-08', y: 13 },
          { x: '2021-01-09', y: 13 },
          { x: '2021-01-10', y: 13 },
          { x: '2021-01-11', y: 7 },
          { x: '2021-01-12', y: 5 },
          { x: '2021-01-13', y: 11 },
          { x: '2021-01-14', y: 9 },
          { x: '2021-01-15', y: 12 },
          { x: '2021-01-16', y: 16 },
          { x: '2021-01-17', y: 13 },
          { x: '2021-01-18', y: 13 },
          { x: '2021-01-19', y: 13 },
          { x: '2021-01-20', y: 13 },
          { x: '2021-01-21', y: 7 },
          { x: '2021-01-22', y: 5 },
          { x: '2021-01-23', y: 11 },
          { x: '2021-01-24', y: 9 },
          { x: '2021-01-25', y: 12 },
          { x: '2021-01-26', y: 16 },
          { x: '2021-01-27', y: 13 },
          { x: '2021-01-28', y: 13 },
          { x: '2021-01-29', y: 13 },
          { x: '2021-01-30', y: 13 },
        ]
      },
      // {
      //   id: 'Coated area',
      //   data: [
      //     { x: '2021-01-01', y: 10 },
      //     { x: '2021-01-02', y: 7 },
      //     { x: '2021-01-03', y: 13 },
      //     { x: '2021-01-04', y: 11 },
      //     { x: '2021-01-05', y: 22 },
      //     { x: '2021-01-06', y: 17 },
      //     { x: '2021-01-07', y: 18 },
      //     { x: '2021-01-08', y: 19 },
      //     { x: '2021-01-09', y: 16 },
      //     { x: '2021-01-10', y: 15 },
      //     { x: '2021-01-11', y: 10 },
      //     { x: '2021-01-12', y: 15 },
      //     { x: '2021-01-13', y: 21 },
      //     { x: '2021-01-14', y: 19 },
      //     { x: '2021-01-15', y: 16 },
      //     { x: '2021-01-16', y: 18 },
      //     { x: '2021-01-17', y: 17 },
      //     { x: '2021-01-18', y: 15 },
      //     { x: '2021-01-19', y: 20 },
      //     { x: '2021-01-20', y: 33 },
      //     { x: '2021-01-21', y: 12 },
      //     { x: '2021-01-22', y: 15 },
      //     { x: '2021-01-23', y: 21 },
      //     { x: '2021-01-24', y: 19 },
      //     { x: '2021-01-25', y: 17 },
      //     { x: '2021-01-26', y: 19 },
      //     { x: '2021-01-27', y: 23 },
      //     { x: '2021-01-28', y: 33 },
      //     { x: '2021-01-29', y: 23 },
      //     { x: '2021-01-30', y: 17 },
      //   ]
      // }
    ];

    /*Triple horizontal cards*/
    const dataRunningHours = [
      { type: 1, value: 47, units: "h" },
      { type: 2, value: 40, units: "h" },
      { type: 3, value: 40, units: "#" }
    ];

    return (
      <Row className={styles.monitoring}>
        <Col className={[styles.left, styles.pb0].join(" ")}>
          <Chart 
            config={propsRunningHours}
            data={dataRunningHours}  

          />
          <Chart 
            config={propsSprayMode}
            data={dataSprayingMode}  
          />
          <Chart 
            config={propsSystemStatus}
            data={dataSystemStatus}  
          />
        </Col>

        <Col className={styles.right}>
          <Chart 
              config={propsCoatedSurface}
              data={dataCoatedSurface}
          />

          <div className={[styles.group, styles.pb0].join(" ")}>
            <div>
              <Chart 
                config={propsLineDensity}
                data={dataLineDensity}/>

              <Chart 
                config={propsConveyorSpeed}
                data={dataConveyorSpeed}/>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Monitoring;
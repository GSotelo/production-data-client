import React, { Component } from "react";
import ControlBar from "../Bar/ControlBar/ControlBar";
import { Row, Col } from "antd";
import StandardTitleBar from "../Bar/TitleBar/StandardTitleBar";
import TwoIconsTitleBar from "../Bar/TitleBar/TwoIconsTitleBar";
import DropdownTitleBar from "../Bar/TitleBar/DropdownTitleBar";

import "./GraphContainer.css";

class GraphContainer extends Component {

  render() {
    const {
      dropdown,
      graph,
      icon,
      icon1,
      icon2,
      title,
      type,
      controlBarVisibility
    } = this.props;

    const setControlBarVisibility = typeof controlBarVisibility !== 'undefined' ? controlBarVisibility : true;

    return (
      <Row className="graphContainer">
        <Col className="titleBox">
          {
            type === 1 &&
            <StandardTitleBar
              icon={icon}
              title={title}
            />
          }
          {
            type === 2 &&
            <TwoIconsTitleBar
              icon1={icon1}
              icon2={icon2}
              title={title}
            />
          }
          {
            type === 3 &&
            <DropdownTitleBar
              dropdown={dropdown}
              icon={icon}
              title={title}
            />
          }
        </Col>

        {
          setControlBarVisibility &&
          <Col className="controlBox">
            <ControlBar />
          </Col>
        }

        <Col className="graphBox">
          {graph}
        </Col>
      </Row>
    );
  }
}

export default GraphContainer;
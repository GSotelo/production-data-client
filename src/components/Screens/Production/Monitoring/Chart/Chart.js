import React, { Component } from "react";
import Pie from "../../../../UI/Graph/Pie/Pie";
import Bar from "../../../../UI/Graph/Bar/Bar";
import Line from "../../../../UI/Graph/Line/Line";
import GraphContainer from "../../../../Container/GraphContainer";

import { propsLineDensityLayout, propsLayoutConveyorSpeed, propsLayoutCoatedSurface } from "../props";
import styles from "./Chart.module.css";

// TEST MODE
import HorizontalCards from "../../../../UI/Cards/HorizontalCards/HorizontalCards";
import { CustomCard } from "../CustomCard";


class Chart extends Component {

  setCustomStyles = size => {
    if (size === "small") return styles.small;
    if (size === "medium") return styles.medium;
    if (size === "large") return styles.large;
  }

  selectGraph = type => {
    if (type === "bar") return <Bar {...propsLineDensityLayout} data={this.props.data} />
    if (type === "line" && this.props.config.id === "coated-surface") return <Line {...propsLayoutCoatedSurface} data={this.props.data} />
    if (type === "line" && this.props.config.id === "conveyor-speed") return <Line {...propsLayoutConveyorSpeed} data={this.props.data} />
    if (type === "pie") return <Pie data={this.props.data} />

    if (type === "cards") {
      const cardItems = this.props.data.map(el => <CustomCard type={el.type} value={el.value} units={el.units} />)
      return <HorizontalCards cards={cardItems} />
    }
  }
  render() {
    const customStyles = this.setCustomStyles(this.props.config.size);
    const graph = this.selectGraph(this.props.config.graph);
    return (
      <div className={customStyles}>
        <GraphContainer
          {...this.props.config}
          graph={graph}
        />
      </div>
    );
  }
}

export default Chart;
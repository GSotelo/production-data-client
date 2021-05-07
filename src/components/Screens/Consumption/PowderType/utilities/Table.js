import React, { Fragment, PureComponent } from "react";
import Table from "../../../../UI/Table/MaterialUI/Table";


import groupData from "../../../../../utils/groupDataByDate";
import _ from "lodash";

const { filterArrayByObjectProperty, getTotalValueFromArray } = groupData;

class CustomTable extends PureComponent {


  render() {
    console.log("MOUNTING");

    // From local storage get powder type descriptions
    const powderDescriptions = JSON.parse(localStorage.getItem("pd"));

    // Data contains all powder types sent by the server
    const { data, ...otherProps } = this.props;

    // If not data from server, then render "Table" with empty data
    let dataFromServer = data;
    if(_.isEmpty(data)){
      dataFromServer=[];
    }

    // Unpacking each powder type and do some calculations 
    const processedData = dataFromServer?.map(powderType => {
     const powderTypeValues = filterArrayByObjectProperty(powderType, "y");
     return getTotalValueFromArray(powderTypeValues); 
    });

    let tableRows =[];
    /**
     * Generating table rows
     * When no data from server, "processedData" returns []
     */
    if(!_.isEmpty(processedData) && !_.isEmpty(powderDescriptions)){
      tableRows = processedData.map((el, index) => (
        { id: index, 
          type: `${powderDescriptions[index]}`, 
          consumption: el 
        }
      ));
    }
    
    return (
      <Fragment>
        <Table rows={tableRows} {...otherProps} enableToolbar={true} />
      </Fragment>
    );
  }
}

export default CustomTable;

// This how data should look like
// const tableRows = [
//   { id: 1, type: "2021/03/17", consumption: 5.7 }
// ];
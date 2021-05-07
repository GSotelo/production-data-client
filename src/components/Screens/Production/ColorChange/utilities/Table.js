import React, { Fragment } from "react";
import Table from "../../../../UI/Table/MaterialUI/Table";

import _ from "lodash";
import { createDateObject } from "../../../../../utils/time";

/**
 * 
 * @param {*} data Data from express server
 * @param {*} fallback If function fails, provide default data
 * @returns 
 */
const processDataTable = (data, fallback) => {
  // If no data from server, then send default data
  if (!data || !(data instanceof Array)) {
    return fallback;
  }

  // Format data for "Table" component (including custom date format)
  return _.map(data, (el, index) => (
    {
      id: index,
      //date: formatDate(el.x),
      date: createDateObject(el.x).format('YYYY/MM/DD HH:mm'),
      pressure: el.y
    }
  ));
};

/**
 * This component is a customization of Material UI "Table".
 * Main focus here is to create a table component for
 * number of color changes aborted (CCA). I do this in a 
 * separate file because I don't want to populate the main 
 * flow of the screen with configuration data for inner
 * components.
 */
const TableCCA = (props) => {
  const { data, ...propsTable } = props;

  // Parse table rows
  const parsedTableRows = processDataTable(data, false);

  // If "processDataCard" fails, then function returns false
  const isBoolean = _.isBoolean(parsedTableRows);

  /**
  *  If no data to display, then use default table
  *  Fields: Must be always defined in the table properties
  *  Fields for table: "data", "pressure"
  */
  const defaulDataTable = _.map([1, 2, 3, 4, 5], (el, index) => (
    {
      id: index,
      date: "",
      pressure: ""
    }
  ));
  
  // Check if default data is required
  const tableRows = !isBoolean ? parsedTableRows : defaulDataTable;

  return (
    <Fragment>
      <Table rows={tableRows} {...propsTable} enableToolbar={true} />
    </Fragment>
  );
}

export default TableCCA;
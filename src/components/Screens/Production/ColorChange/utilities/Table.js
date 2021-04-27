import React, { Fragment } from "react";
import Table from "../../../../UI/Table/MaterialUI/Table";

import _ from "lodash";
import { createDateObject } from "../../../../../utils/time";

/**
 * @param {*} dateAsString "2021-04-03T23:08:01.000Z"
 * @returns 03.04.2021 23:08:01
 */
const formatDate = (dateAsString) => {
  const createTwoDigits = (el) => el <= 9 ? `0${el}` : el;
  const dayjs = createDateObject(dateAsString);
  const { $y, $M, $D, $H, $m, $s } = dayjs;

  // Format each date component
  const day = createTwoDigits($D);
  const month = createTwoDigits($M + 1);
  const hour = createTwoDigits($H);
  const minute = createTwoDigits($m);
  const second = createTwoDigits($s);

  // Format
  return `${day}.${month}.${$y} ${hour}:${minute}:${second}`;
};

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
      date: formatDate(el.x),
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
      <Table rows={tableRows} {...propsTable} />
    </Fragment>
  );
}

export default TableCCA;
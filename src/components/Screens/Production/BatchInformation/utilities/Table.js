import React, { useState } from "react";
import Modal from "./Modal";
import Table from "../../../../UI/Table/MaterialUI/Table";

import _ from "lodash";
import { createDateObject } from "../../../../../utils/time";
import { BatchDetails } from "../../../../Screen/utilities/lazyLoad";

const assertData = (data) => {
  if ((data === false) || _.isEmpty(data)) {
    return false;
  }
  return true;
};

const processTableData = (data, fallback, assertData) => {
  if (!assertData(data)) {
    return fallback;
  }
  /**
   * id: number
   * date: Date
   * startTime: string
   * stopTime: string
   * batchNumber: number
   * duration: number
   * color: string
   */
  const rows = data.map((el, index) => {
    return {
      id: index,
      date: createDateObject(el.date).format('YYYY/MM/DD HH:mm'),
      startTime: el.startTime,
      stopTime: el.stopTime,
      batchNumber: el.batchNumber,
      duration: el.duration,
      color: el.color,
      parameters: "📝",
      params: el.parameters
    }
  });

  return rows;
};

const CustomTable = ({ data, ...propsTable }) => {
  // State management (Modal)
  const [visibilityBD, setVisibilityBD] = useState(false);
  const [visibilityBP, setVisibilityBP] = useState(false);

  // State management (Table)
  const [rowDataTable, setRowDataTable] = useState({});

  /**
   * Double click on any table row pops up a "Modal" component, 
   * which contains several details about the specific batch. 
   * There are two possible variants either for "Batch details" 
   * or "Batch parameters". I'm doing two kinds of function 
   * binding on purpose for educational reasons
   */

  /**
   * Modal callback: Arrow functions must receive the "e" event 
   * to work properly (see biding in "Modal" component)
   */
  const onDownload = (e, data, id) => {
    console.log("Create JSON file with data: ", data);
    (id === "BD") && setVisibilityBD(false);
    (id === "BP") && setVisibilityBP(false);
  }

  /**
   * Modal callback: Function declarations doesn't need to 
   * receive the "e" event explicitely to work properly
   * (see biding in "Modal" component)
   */
  function onCancel(id) {
    console.log("Close modal...", id);
    (id === "BD") && setVisibilityBD(false);
    (id === "BP") && setVisibilityBP(false);
  }

  // Modal props for configuration
  const propsModalBD = {
    data: { foo: "foo" },
    id: "BD",
    title: "Batch Details",
    visibility: visibilityBD,
    onCancel,
    onDownload,
  };

  const propsModalBP = {
    data: { bar: "bar" },
    id: "BP",
    title: "Batch Parameters",
    visibility: visibilityBP,
    onCancel,
    onDownload
  };

  // Table callback
  const onCellDoubleClick = (params, id) => {
    const { field, row } = params;
    setRowDataTable({ trigger: field, rowData: row });
    if (field === "parameters") {
      setVisibilityBP(true);
    } else {
      setVisibilityBD(true);
    }
  }

  // Table: Data processing
  const fallbackData = [];
  const tableRows = processTableData(data, fallbackData, assertData);

  return (
    <>
      <Table rows={tableRows} {...propsTable} onCellDoubleClick={onCellDoubleClick} />
      <Modal {...propsModalBD}><BatchDetails /></Modal>
      <Modal {...propsModalBP}>Batch parameters component</Modal>
    </>
  );
};

export default CustomTable;


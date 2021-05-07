/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import Modal from "./Modal";
import Table from "../../../../UI/Table/MaterialUI/Table";
import TitleBar from "../../../../Bar/TitleBar/StandardTitleBar";
import { BatchDetails } from "../../../../Screen/utilities/lazyLoad";
import { ReactComponent as Batch } from "../../../../../assets/svg/batch.svg";
import { ReactComponent as Parameters } from "../../../../../assets/svg/configOverview.svg";
import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import styles from "./Table.module.css";
import _ from "lodash";
import cryptoRandomString from "crypto-random-string";
import { propsTableBP } from "../utilities/props";
import { createDateObject } from "../../../../../utils/time";

const assertData = (data) => {
  if ((data === false) || _.isEmpty(data)) {
    return false;
  }
  return true;
};

const processTableData = (data, assertData) => {
  if (!assertData(data)) {
    return { detailsData: [], overviewData: [], parametersData: [] };
  }

  const detailsData = data.map(({ details }) => details);

  /**
   * id: number
   * date: Date
   * startTime: string
   * stopTime: string
   * batchNumber: number
   * duration: number
   * color: string
   */
  const overviewData = data.map(({ overview }, index) => (
    {
      id: index,
      date: createDateObject(overview.date).format('YYYY/MM/DD HH:mm'),
      startTime: overview.startTime,
      stopTime: overview.stopTime,
      batchNumber: overview.batchNumber,
      duration: overview.duration,
      color: overview.color
    }
  ));

  //const parametersData = data.map(({ parameters }) => parameters);
  const parametersData = data.map(({ parameters }, index) => (
    {
      id: index,
      ...parameters
    }
  ));

  return { detailsData, overviewData, parametersData };
};

const CustomTable = ({ data, ...propsTable }) => {
  const { mainContent, buttonBox, tableBox } = styles;
  /**
   * Table management
   */
  // Processing data
  const processedData = processTableData(data, assertData);
  const { detailsData, overviewData, parametersData } = processedData;
  const donwloadLink = useRef(null);

  // State management
  const [rowDataTable, setRowDataTable] = useState({});

  // Callbacks
  const onCellDoubleClick = (params, id) => {
    const { field, row } = params;
    setRowDataTable({ trigger: field, rowData: row });
    setVisibilityBD(true);
  }

  /**
   * Modal management
   */
  // State management
  const [visibilityBD, setVisibilityBD] = useState(false);
  const [visibilityBP, setVisibilityBP] = useState(false);

  /**
   * Callbacks
   * Notes: Arrow functions must receive the "e" event 
   * to work properly (see biding in "Modal" component).
   * Function declarations doesn't need to receive the 
   * "e" event explicitely to work properly (see biding 
   * in "Modal" component)
   */
  const onDownload = (e, data, id) => {
    // Create "Blob"
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

    // Create URL from Blob
    const url = window.URL.createObjectURL(blob);

    // Create unique id for JSON file
    const cryptoID = cryptoRandomString({ length: 10 });

    // Use URL and link to start download
    donwloadLink.current.href = url;

    // Setting filename
    const filename = (id==="BD")?`batchDetails_${cryptoID}.json`:`batchParameters_${cryptoID}.json`;

    donwloadLink.current.setAttribute("download", filename);
    donwloadLink.current.click();

    // Free URL resources
    URL.revokeObjectURL(url);

    // Modal management
    (id === "BD") && setVisibilityBD(false);
    (id === "BP") && setVisibilityBP(false);
  }

  // Closing modal based on id
  function onCancel(id) {
    if (id === "BD") {
      return setVisibilityBD(false);
    }
    return setVisibilityBP(false);
  }

  // Props for "Batch details" modal component
  const propsModalBD = {
    id: "BD",
    title: <TitleBar title="Batch details" icon={<Batch />} />,
    visibility: visibilityBD,
    onCancel,
    onDownload,
  };

  // Props for "Batch parameters" modal component
  const propsModalBP = {
    id: "BP",
    title: <TitleBar title="Batch parameters" icon={<Parameters />} />,
    visibility: visibilityBP,
    onCancel,
    onDownload
  };

  // Data for components:
  let index = 0; // Row index when user clicks any
  if (!_.isEmpty(rowDataTable) && !_.isEmpty(detailsData)) {
    index = rowDataTable.rowData.id;
  }

  const dataModalBD = {
    overview: overviewData[index],
    details: detailsData[index],
  };

  return (
    <div className={mainContent}>
      <div className={buttonBox}>
        <Button
          type="primary"
          icon={<SettingOutlined />}
          onClick={setVisibilityBP}
        >
          Parameters
      </Button>
      </div>

      <div className={tableBox}>
        <Table
          rows={overviewData}
          {...propsTable}
          onCellDoubleClick={onCellDoubleClick}
          enableToolbar={true}
        />
      </div>

      <Modal data={{ ...dataModalBD }}  {...propsModalBD} >
        <BatchDetails data={{ processedData, index }} />
      </Modal>

      <Modal data={{ parametersData }}  {...propsModalBP}>
        <Table
          rows={parametersData}
          {...propsTableBP}
          onCellDoubleClick={(e) => { }}
          enableToolbar={false}
        />
      </Modal>

      <a
        ref={donwloadLink}
        style={{ display: "none" }}
      >
        downloadLink
      </a>
    </div>
  );
};

export default CustomTable;


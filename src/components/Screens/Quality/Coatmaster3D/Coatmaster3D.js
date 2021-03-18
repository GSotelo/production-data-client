import React, { Component } from 'react';
import Table from "../../../UI/Table/Ant/Table";
import styles from "./Coatmaster3D.module.css";
import TitleBar from "../../../Bar/TitleBar/DropdownTitleBar";

import { ReactComponent as Thickness } from "../../../../assets/svg/thickness.svg";
import Dropdown from "../../../UI/Dropdown/Dropdown";

const dropdownOptionsSPCR = [
  { key: 1, text: "Cabinet", value: 1 },
  { key: 2, text: "Flat panel", value: 2 },
  { key: 3, text: "Plate", value: 3 },
  { key: 4, text: "Door", value: 4 }
];

class Coatmaster3D extends Component {

  render() {
    const dropdownSPCR = <Dropdown options={dropdownOptionsSPCR} />
    const {
      coatmaster3D,
      tableBox,
      titleBox,
      content
    } = styles;
    return (
      <div className={coatmaster3D}>
        <div className={content}>
          <div className={titleBox}>
            <TitleBar title="Coatmaster 3D" icon={<Thickness />} dropdown={dropdownSPCR} />
          </div>

          <div className={tableBox}>
            <Table />
          </div>
        </div>
      </div>
    );
  }
}

export default Coatmaster3D;
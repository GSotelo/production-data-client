import React, { Fragment } from "react";
import Table from "../../../../UI/Table/MaterialUI/Table";

const tableRows = [
  { id: 1, type: "2021/03/17", consumption: 5.7 },
  { id: 2, type: "2021/03/18", consumption: 5.3 },
  { id: 3, type: "2021/03/19", consumption: 5.6 },
  { id: 4, type: "2021/03/20", consumption: 4.3 },
  { id: 5, type: "2021/03/21", consumption: 4.7 },
  { id: 6, type: "2021/03/22", consumption: 5.1 },
  { id: 7, type: "2021/03/23", consumption: 5.4 },
  { id: 8, type: "2021/03/24", consumption: 5.9 },
  { id: 9, type: "2021/03/25", consumption: 4.8 },
  { id: 10, type: "2021/03/26", consumption: 4.9 },
  { id: 11, type: "2021/03/27", consumption: 4.1 },
  { id: 12, type: "2021/03/28", consumption: 5.9 },
  { id: 13, type: "2021/03/29", consumption: 6.2 },
  { id: 14, type: "2021/03/30", consumption: 6.7 },
  { id: 15, type: "2021/04/17", consumption: 5.7 },
  { id: 16, type: "2021/04/18", consumption: 5.3 },
  { id: 17, type: "2021/04/19", consumption: 5.6 },
  { id: 18, type: "2021/04/20", consumption: 4.3 },
  { id: 19, type: "2021/04/21", consumption: 4.7 },
  { id: 20, type: "2021/04/22", consumption: 5.1 },
  { id: 21, type: "2021/04/23", consumption: 5.4 },
  { id: 22, type: "2021/04/24", consumption: 5.9 },
  { id: 23, type: "2021/04/25", consumption: 4.8 },
  { id: 24, type: "2021/04/26", consumption: 4.9 },
  { id: 25, type: "2021/04/27", consumption: 4.1 },
  { id: 26, type: "2021/04/28", consumption: 5.9 },
  { id: 27, type: "2021/04/29", consumption: 6.2 },
  { id: 28, type: "2021/04/30", consumption: 6.7 },
  { id: 29, type: "2021/05/17", consumption: 5.7 },
  { id: 30, type: "2021/05/18", consumption: 5.3 },
  { id: 31, type: "2021/05/19", consumption: 5.6 },
  { id: 32, type: "2021/05/20", consumption: 4.3 },
  { id: 33, type: "2021/05/21", consumption: 4.7 },
  { id: 34, type: "2021/05/22", consumption: 5.1 },
  { id: 35, type: "2021/05/23", consumption: 5.4 },
  { id: 36, type: "2021/05/24", consumption: 5.9 },
  { id: 37, type: "2021/05/25", consumption: 4.8 },
  { id: 38, type: "2021/05/26", consumption: 4.9 },
  { id: 39, type: "2021/05/27", consumption: 4.1 },
  { id: 40, type: "2021/05/28", consumption: 5.9 },
  { id: 41, type: "2021/05/29", consumption: 6.2 },
  { id: 42, type: "2021/05/30", consumption: 6.7 }
];


class CustomTable extends React.PureComponent {


  render() {
    console.log("MOUNTING");
    const { data, ...otherProps } = this.props;
    console.log("Data for table: ", data);

    // Here some processing for data...

    return (
      <Fragment>
        <Table rows={tableRows} {...otherProps} enableToolbar={true} />
      </Fragment>
    );
  }
}

export default CustomTable;

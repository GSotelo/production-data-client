import { Modal, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import React, { Component } from 'react';

import "./Modal.css";

class CustomModal extends Component {

  render() {
    // Unpacking some props
    const { 
      children, 
      data, 
      id, 
      onCancel, 
      onDownload, 
      title, 
      visibility, 
    } = this.props;

    // Props for buttons
    const propsCloseBtn = {
      key: "cancel",
      type: "primary",
      onClick: onCancel.bind(this, id),
    };

    const propsDownloadBtn = {
      icon: <DownloadOutlined />,
      key: "download",
      type: "primary",
      onClick: (e) => onDownload(e, data, id),
    };

    return (
      <div>
        <Modal
          title={title}
          visible={visibility}
          centered={true}
          onCancel={onCancel.bind(this, id)}
          closable={false}
         // bodyStyle={{display:"flex", maxHeight:650, height:600}}
          width={"90%"}
          height={"90%"}
          footer={
            [
              <Button {...propsCloseBtn}>Close</Button>,
              <Button {...propsDownloadBtn}>Donwload</Button>
            ]
          }
        >
          {children}
        </Modal>
      </div>
    )
  }
}

export default CustomModal


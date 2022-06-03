import { useState } from 'react'
 
import { Upload, Modal } from "antd";

import {
    PlusOutlined
} from '@ant-design/icons';

export default function UploadVideo({fileList, handleChange}) {
    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Добавить видео</div>
        </div>
      );

    return  <>
        <Upload
            beforeUpload={() => false}
            accept='video/mov'
            listType="picture-card"
            className="video-upload"
            fileList={fileList}
            onChange={handleChange}
        >
            {fileList?.length === 1 ? null : uploadButton}
        </Upload>
    </>
}

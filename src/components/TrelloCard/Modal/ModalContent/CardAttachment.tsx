import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Col, Modal, Upload } from "antd";
import type { RcFile } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { getBase64 } from "@/utils/func";
import { useCardModalContext } from "@/context/CardModalContext";
import { SectionHeaderStyled } from "./style";

const CardAttachment: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { cardData } = useCardModalContext();
  const [fileList, setFileList] = useState<UploadFile[]>(
    cardData?.attachment.map(({ _id, filename, dirname }) => {
      return {
        uid: _id,
        name: filename,
        url: dirname,
      };
    }) || []
  );

  const handlePreview = async (file: UploadFile<RcFile>) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || `${file.preview}`);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  return (
    <>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>附件</h3>
        </Col>
      </SectionHeaderStyled>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={({ fileList }) => setFileList(fileList)}
      >
        {fileList.length <= 8 && <PlusOutlined />}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CardAttachment;

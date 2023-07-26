import React from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";

const TextEditor: React.FC<ReactQuillProps> = (props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [
        { list: "ordered" },
        { list: "bullet" },
        // { indent: "-1" }, // 要正確顯示縮排需要額外處理先拿掉
        // { indent: "+1" },
      ],
      ["link", "code"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "code",
  ];

  return (
    <div className="react-quill-container">
      <ReactQuill {...props} theme="snow" modules={modules} formats={formats} />
    </div>
  );
};

export default TextEditor;

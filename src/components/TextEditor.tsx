import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@/css/react-quill-custom.css";

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

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value: any;
  placeholder: string;
  onChange: OnChangeHandler;
};

const TextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <div className="react-quill-container">
      <ReactQuill
        theme="snow"
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextEditor;

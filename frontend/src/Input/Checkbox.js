import React from "react";
import Form from "react-bootstrap/Form";

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <Form.Check inline>
    <label className="noselect">
      <input
        type="checkbox"
        name={label || ""}
        checked={isSelected || ""}
        onChange={onCheckboxChange || ""}
        className="form-check-input"
      />
      <div className="check-control noselect"></div>
      {label}
    </label>
  </Form.Check>
);

export default Checkbox;

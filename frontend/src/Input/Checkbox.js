import React from 'react'
import Form from 'react-bootstrap/Form'

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
    <Form.Check inline>
      <label>
        <input
          type="checkbox"
          name={label || ''}
          checked={isSelected || ''}
          onChange={onCheckboxChange || ''}
          className="form-check-input"
        />
        {label}
      </label>
    </Form.Check>
  );
  
  export default Checkbox;
  
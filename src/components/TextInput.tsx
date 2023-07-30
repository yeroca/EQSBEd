import React, { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import "./TextInput.css";

interface TextInputProps {
  value: string;
  onUpdate: (updatedValue: string) => void;
  color: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, onUpdate, color }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onUpdate(newValue);
  };

  return (
    <Form.Group className="=mb=3">
      <Form.Label>Name</Form.Label>
      <Form.Control
        id="myNameInput"
        type="text"
        value={value}
        onChange={handleChange}
        className="form-control custom-input"
        placeholder="Enter text here"
        style={{ color: color }}
      />
    </Form.Group>
  );
};

export default TextInput;

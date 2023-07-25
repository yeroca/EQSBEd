import React, { useState, useEffect, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

interface TextInputProps {
  initialValue: string;
  onUpdate: (updatedValue: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ initialValue, onUpdate }) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    // Synchronize the state with the initialValue prop when it changes
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  useEffect(() => {
    // Call the onUpdate prop when the value changes
    onUpdate(value);
  }, [value, onUpdate]);

  return (
    <Form.Group className="=mb=3">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" value={value} onChange={handleChange} />
    </Form.Group>
  );
};

export default TextInput;

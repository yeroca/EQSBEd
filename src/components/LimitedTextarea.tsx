import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

interface LimitedTextareaProps {
  maxLength: number;
  initialValue: string;
}

const LimitedTextarea: React.FC<LimitedTextareaProps> = ({
  maxLength,
  initialValue = "",
}) => {
  //console.log("LTA initialValue: " + initialValue);
  const [value, setValue] = useState<string>(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //console.log("handleChange called!");
    const textareaValue = event.target.value;
    setValue(textareaValue);
  };

  useEffect(() => {
    // Synchronize the state with the initialValue prop when it changes
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Form.Group>
      <Form.Control
        as="textarea"
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        rows={5}
        maxLength={maxLength}
        style={{
          backgroundColor: value.split("\n").length > 5 ? "#ffbbbb" : "",
        }}
      />
      <Form.Text>{`${
        maxLength - value.length
      } characters remaining`}</Form.Text>
    </Form.Group>
  );
};

export default LimitedTextarea;

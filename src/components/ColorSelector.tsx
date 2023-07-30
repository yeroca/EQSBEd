import { FC } from "react";
import { Dropdown } from "react-bootstrap";
import { colors } from "../utils/colors";

interface ColorSelectorProps {
  onSelectColor: (color: number) => void;
}

const ColorSelector: FC<ColorSelectorProps> = ({ onSelectColor }) => {
  const handleOnSelect = (eventKey: any) => {
    onSelectColor(eventKey);
  };
  return (
    <Dropdown onSelect={handleOnSelect}>
      <Dropdown.Toggle variant="light" id="dropdown-custom-select">
        Select a color
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {colors.map((color, index) => {
          return (
            <Dropdown.Item
              key={index}
              eventKey={index}
              style={{ color: color }}
            >
              &#x25A0; {/* Solid square character: ▪ */} {index}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ColorSelector;

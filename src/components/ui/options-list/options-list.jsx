import React from "react";
import { Ul } from "/src/components/styled";
import { Option, Property } from "./styles";

// Логотип сайта с названием
function OptionsList({ list = [], delimeter = ": " }) {
  return (
    <Ul>
      {list.map((option, index) => (
        <Option key={`tab${index * 10}`}>
          <Property>
            {option.property}
            {delimeter}
          </Property>
          {option.value}
        </Option>
      ))}
    </Ul>
  );
}

export default OptionsList;

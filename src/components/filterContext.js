import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useValue = () => useContext(FilterContext);

export const FilterProvaider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  return (
    <FilterContext.Provider
      value={{ inputValue, setInputValue, selectValue, setSelectValue }}
    >
      {children}
    </FilterContext.Provider>
  );
};

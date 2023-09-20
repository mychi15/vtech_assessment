import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Outlet } from "react-router-dom";
import "./App.scss";

import Navigation from "./Navigation";

import themes from "./assets/themes/theme.json";
import { ListContext, ThemeContext } from "./context";

function App() {
  const [theme, setTheme] = useState("blue");
  const [list, setList] = useState([]);
  const [showItemType, setShowItemType] = useState("all");

  const themeOptions = themes.themeOptions;

  const handleAddToList = (item) => {
    let newItem = {
      id: uuid(),
      title: item,
      remarks: "",
      duration: "",
      parent: "",
      status: "pending",
      subList: [],
    };
    setList([newItem, ...list]);
  };

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, setTheme, themeOptions }}>
        <ListContext.Provider
          value={{
            list,
            handleAddToList,
            setList,
            showItemType,
            setShowItemType,
          }}
        >
          <Navigation />
          <Outlet />
        </ListContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Outlet } from "react-router-dom";
import "./App.scss";

import Navigation from "./Navigation";

import themes from "./assets/themes/theme.json";
import { ListContext, ThemeContext } from "./context";

function App() {
  const [theme, setTheme] = useState("blue");
  const [pendingList, setPendingList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const themeOptions = themes.themeOptions;

  const handleAddToList = (item) => {
    let newItem = {
      id: uuid(),
      title: item,
      remarks: "",
      duration: "",
      parent: "",
      subList: [],
    };
    setPendingList([newItem, ...pendingList]);
  };

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, setTheme, themeOptions }}>
        <ListContext.Provider value={{ pendingList, handleAddToList, setPendingList, completedList, setCompletedList }}>
          <Navigation />
          <Outlet />
        </ListContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

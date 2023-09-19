import { useState } from 'react';
import './App.scss';

import Navigation from './Navigation';
import List from './List';

import { ListContext, ThemeContext } from './context';

function App() {
  const themeOptions = [
    {color: "blue", text:"藍色"}, 
    {color: "purple", text: "紫色"}, 
    {color: "green", text: "綠色"}, 
    {color: "orange", text: "橘色"}
  ]
  const [ theme, setTheme] = useState("blue");
  const [ pendingList, setPendingList] = useState([]);

  const handleAddToList = (item) => {
    let newItem = {
      title: item,
      subList: [],
    };
    setPendingList([newItem, ...pendingList]);
  }

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, setTheme, themeOptions}}>
        <ListContext.Provider value={{ pendingList, handleAddToList}}>
          <Navigation />
          <List />
        </ListContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

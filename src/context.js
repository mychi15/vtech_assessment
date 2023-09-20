import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: "blue",
  themeOptions: [
    {color: "blue", text:"藍色"}, 
    {color: "purple", text: "紫色"}, 
    {color: "green", text: "綠色"}, 
    {color: "orange", text: "橘色"}
  ]
});
export const ListContext = createContext("");
export const SearchContext = createContext("");
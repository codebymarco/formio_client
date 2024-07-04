import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App: React.FC = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const formStyles2 = {
    title: "this si the title",
    backgroundColor: "transparent",
    color: "black",
    border: "1px solid black",
    buttonBg: "black",
    buttonTxt: "white",
  };

  const formStyles = {
    title: "this si the title",
    backgroundColor: "black",
    color: "gray",
    border: "",
    inputBG: "#1a2421",
    buttonBg: "gray",
    buttonTxt: "black",
  };

  const formStyles3 = {
    title: "this si the title",
    backgroundColor: "dodgerblue",
    color: "gray",
    border: "",
    inputBG: "#1a2421",
    buttonBg: "gray",
    buttonTxt: "black",
  };

  return (
    <div
      style={{
        backgroundColor: formStyles.backgroundColor,
        color: formStyles.color,
      }}
      className="form"
    >
      <h1>{formStyles.title}</h1>
      <input
        style={{backgroundColor: formStyles.inputBG, border: formStyles.border }}
        type="text"
        placeholder="name"
      />
      <input
        style={{backgroundColor: formStyles.inputBG, border: formStyles.border }}
        type="text"
        placeholder="email"
      />
      <textarea
        style={{backgroundColor: formStyles.inputBG, border: formStyles.border }}
        placeholder="body"
      ></textarea>
      <button style={{ border: formStyles.border, background: formStyles.buttonBg, color: formStyles.buttonTxt }}>submit</button>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import { form } from "./helpers";
import useGetData from "./useGetData";

const App: React.FC = () => {
  const formStylesOne = {
    title: "this si the title",
    backgroundColor: "transparent",
    color: "black",
    border: "1px solid black",
    buttonBg: "black",
    buttonTxt: "white",
    inputTxt: "black",
    inputBG: "",
  };

  const formStylesTwo = {
    title: "this si the title",
    backgroundColor: "black",
    color: "gray",
    border: "",
    inputBG: "#1a2421",
    buttonBg: "#1a2421",
    buttonTxt: "white",
    inputTxt: "white",
  };

  const formStylesThree = {
    title: "this si the title",
    backgroundColor: "dodgerblue",
    color: "black",
    border: "",
    inputBG: "white",
    buttonBg: "black",
    buttonTxt: "white",
    inputTxt: "black",
  };

  const { data } = useGetData(
    `http://localhost:5000/api/scripts/668938bdbe6a410a31e7828b`
  );
  const [form, setForm] = useState<form>({});

  useEffect(() => {
    if (data) {
      setForm(data);

      if (data.theme === `ONE`) {
        setForm((prevData: any) => ({
          ...prevData,
          backgroundColor: formStylesOne.backgroundColor,
          color: formStylesOne.color,
          border: formStylesOne.border,
          inputBG: formStylesOne.inputBG,
          buttonBg: formStylesOne.buttonBg,
          buttonTxt: formStylesOne.buttonTxt,
          inputTxt: formStylesOne.inputTxt,
        }));
      }
      if (data.theme === `TWO`) {
        setForm((prevData: any) => ({
          ...prevData,
          backgroundColor: formStylesTwo.backgroundColor,
          color: formStylesTwo.color,
          border: formStylesTwo.border,
          inputBG: formStylesTwo.inputBG,
          buttonBg: formStylesTwo.buttonBg,
          buttonTxt: formStylesTwo.buttonTxt,
          inputTxt: formStylesTwo.inputTxt,
        }));
      }
      if (data.theme === `THREE`) {
        setForm((prevData: any) => ({
          ...prevData,
          backgroundColor: formStylesThree.backgroundColor,
          color: formStylesThree.color,
          border: formStylesThree.border,
          inputBG: formStylesThree.inputBG,
          buttonBg: formStylesThree.buttonBg,
          buttonTxt: formStylesThree.buttonTxt,
          inputTxt: formStylesThree.inputTxt,
        }));
      }
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: form.backgroundColor,
        border: form.border,
        color: form.color,
      }}
      className="form"
    >
      <h1>{form.title}</h1>
      <input
        style={{
          backgroundColor: form.inputBG,
          border: form.border,
          color: form.inputTxt,
        }}
        type="text"
        placeholder="name"
      />
      <input
        style={{
          backgroundColor: form.inputBG,
          border: form.border,
          color: form.inputTxt,
        }}
        type="text"
        placeholder="email"
      />
      <textarea
        style={{
          backgroundColor: form.inputBG,
          border: form.border,
          color: form.inputTxt,
        }}
        placeholder="body"
      ></textarea>
      <button
        style={{
          border: form.border,
          background: form.buttonBg,
          color: form.buttonTxt,
        }}
      >
        submit
      </button>
    </div>
  );
};

export default App;

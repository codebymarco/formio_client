import React, { useState, useEffect } from "react";
import "./App.css";
import { form } from "./helpers";
import useGetData from "./useGetData";
import { usePostData } from "./usePostData";

const App: React.FC = () => {
  const [siteId, setSiteId] = useState<string | null>(null);

  const { postdata, suc, loading } = usePostData();

  useEffect(() => {
    const siteIdFromWindow = (window as any).siteId || null;
    if (siteIdFromWindow) {
      setSiteId(siteIdFromWindow);
    } else {
      setSiteId("66ec6d7ae6f3f44e1c46f8da");
    }
    console.log("Site dow:", siteIdFromWindow);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [emailInvalidError, setEmailInvalidError] = useState(false); // New state for invalid email

  const formStylesOne = {
    title: "this is the title",
    backgroundColor: "transparent",
    color: "black",
    border: "1px solid black",
    buttonBg: "black",
    buttonTxt: "white",
    inputTxt: "black",
    inputBG: "",
  };

  const formStylesTwo = {
    title: "this is the title",
    backgroundColor: "black",
    color: "gray",
    border: "",
    inputBG: "#1a2421",
    buttonBg: "#1a2421",
    buttonTxt: "white",
    inputTxt: "white",
  };

  const formStylesThree = {
    title: "this is the title",
    backgroundColor: "dodgerblue",
    color: "black",
    border: "",
    inputBG: "white",
    buttonBg: "black",
    buttonTxt: "white",
    inputTxt: "black",
  };

  const { data } = useGetData(`https://formio-backend-35jj.onrender.com/api/scripts/${siteId}`);
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

  console.log("form", form);

  // Email validation function
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const sendEmail = async () => {
    let isValid = true;

    if (form.namefield && name === "") {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (form.emailfield && email === "") {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    // Check if the email is in a valid format
    if (form.emailfield && email !== "" && !validateEmail(email)) {
      setEmailInvalidError(true);
      isValid = false;
    } else {
      setEmailInvalidError(false);
    }

    if (form.bodyfield && body === "") {
      setBodyError(true);
      isValid = false;
    } else {
      setBodyError(false);
    }

    if (isValid) {
      console.log("All active fields have values.");
      const obj = {
        name,
        email,
        body,
        recipient: form.email,
        reply_email: form.reply_email,
        reply_email_content: form.reply_email_content,
      };
      await postdata(obj);
      setName("");
      setBody("");
      setEmail("");
    } else {
      console.log("All active fields don't have values.");
    }
  };

  if (!data || !siteId) {
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
      {form.namefield ? (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          style={{
            backgroundColor: form.inputBG,
            border: nameError ? "2px solid red" : form.border,
            color: form.inputTxt,
          }}
          onFocus={() => setNameError(false)}
          type="text"
          placeholder="name"
        />
      ) : null}

      {form.emailfield ? (
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={{
            backgroundColor: form.inputBG,
            border:
              emailError || emailInvalidError ? "2px solid red" : form.border,
            color: form.inputTxt,
          }}
          onFocus={() => {
            setEmailError(false);
            setEmailInvalidError(false); // Reset invalid error on focus
          }}
          type="text"
          placeholder="email"
        />
      ) : null}

      {form.bodyfield ? (
        <textarea
          onChange={(e) => setBody(e.target.value)}
          value={body}
          style={{
            backgroundColor: form.inputBG,
            border: bodyError ? "2px solid red" : form.border,
            color: form.inputTxt,
          }}
          onFocus={() => setBodyError(false)}
          placeholder="body"
        ></textarea>
      ) : null}

      <button
        disabled={loading}
        style={{
          border: form.border,
          background: form.buttonBg,
          color: form.buttonTxt,
        }}
        onClick={sendEmail}
      >
        {suc ? "sent" : loading ? "loading" : "submit"}
      </button>
    </div>
  );
};

export default App;

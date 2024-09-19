import { useState } from "react";
import { api } from "./api/api";

export const usePostData = () => {

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [suc, setSuc] = useState<boolean>(false);

  const postdata = async (obj: any) => {
    setSuc(false)
    setLoading(true);
    setError(null);
    const response = await fetch(`${api}/api/message/siteid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setLoading(false);
      setSuc(true);
      setTimeout(()=>{
        setSuc(false);
      }, 2000)
    }
  };

  return { postdata, loading, error, suc };
};

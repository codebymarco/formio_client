import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "./api/api";

export const usePostData = () => {
  const { formID } = useParams();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const postdata = async (obj: any) => {
    setLoading(true);
    setError(null);
    const response = await fetch(`${api}/api/user/forms/edit/${formID}`, {
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
    }
  };

  return { postdata, loading, error };
};

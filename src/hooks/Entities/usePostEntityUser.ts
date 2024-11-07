import { useState } from "react";
import { axiosInstance, getAccessToken } from "../../utils/genericOps";
import { entityMaster } from "../../utils/constants";

export default function useCreateUser() {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const createUser = async (username: string) => {
    setError(undefined);
    const user = {
      "usernameType": "text",
      "username": username,
      "secrets": [
          {
              "secretType": "password",
              "secretValue": "123"
          }
      ]
    }
    try {
      const token = await getAccessToken();
      const responseRequest = await axiosInstance.post(
        `${import.meta.env.VITE_PUBLIC_API_ENTITIES}/${entityMaster}/users`,
        user,
        {
          headers: {
            "X-User-Bearer": `Bearer ${token}`,
            "apikey": import.meta.env.VITE_PUBLIC_API_KEY,
            "Content-Type": `application/json`
          },
        }
      );
      setResponse(responseRequest.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    response,
    loading,
    error,
  };
}

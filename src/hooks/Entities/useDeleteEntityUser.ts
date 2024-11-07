import { useState } from "react";
import { axiosInstance, getAccessToken } from "../../utils/genericOps";
import { entityMaster } from "../../utils/constants";

export default function useDeleteEntityUser() {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState<string>();

  const deleteUser = async (usernameType: string, username: string) => {
    setMessage(undefined);
    setLoading(true);
    try {
      const token = await getAccessToken();
      const responseRequest = await axiosInstance.delete(
        `${import.meta.env.VITE_PUBLIC_API_ENTITIES}/${entityMaster}/users/${usernameType}%40${username}`,
        {
          headers: {
            "X-User-Bearer": `Bearer ${token}`,
            "apikey": import.meta.env.VITE_PUBLIC_API_KEY,
            "Content-Type": `application/json`
          },
        }
      );
      setMessage(`Usuario ${username} eliminado de forma correcta`);
      setResponse(responseRequest.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    response,
    loading,
    error,
    message,
  };
}
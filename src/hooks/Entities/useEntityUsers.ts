import { useEffect, useState } from "react";
import { axiosInstance, getAccessToken } from "../../utils/genericOps";
import { entityMaster } from "../../utils/constants";

export default function useEntityUsers() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getUsers = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      const entitiesRequest = await axiosInstance.get(
        `${import.meta.env.VITE_PUBLIC_API_ENTITIES}/${entityMaster}/users`,
        {
          headers: {
            "X-User-Bearer": `Bearer ${token}`,
          },
        }
      );
      setUsers(entitiesRequest.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    getUsers,
    users,
    loading,
    error,
  };
}
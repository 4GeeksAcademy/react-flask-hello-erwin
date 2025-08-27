import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [privateMessage, setPrivateMessage] = useState("");

  
  const loadMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

      const response = await fetch(`${backendUrl}/api/hello`);
      const data = await response.json();

      if (response.ok) dispatch({ type: "set_hello", payload: data.msg });
    } catch (error) {
      console.error(error.message);
    }
  };

  
  const loadPrivateMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = store.token; 
      if (!token) return;

      const response = await fetch(`${backendUrl}/private`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();

      if (response.ok) setPrivateMessage(data.msg);
      else setPrivateMessage(data.msg || "No access");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMessage();
    loadPrivateMessage();
  }, [store.token]);

  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Hello Rigo!!</h1>
      <p className="lead">
        <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
      </p>

      <div className="alert alert-info">
        {store.message ? (
          <span>{store.message}</span>
        ) : (
          <span className="text-danger">
            Loading message from the backend (make sure your python  backend is running)...
          </span>
        )}
      </div>

      {store.token && (
        <div className="alert alert-success">
          {privateMessage || "Loading private message..."}
        </div>
      )}
    </div>
  );
};

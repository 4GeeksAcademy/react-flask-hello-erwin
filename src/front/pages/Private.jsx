import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const Private = () => {
    const { token, userEmail } = useAuth();
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchPrivate = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/private`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setMsg(data.msg || "No message");
            } catch (error) {
                setMsg(error.message);
            }
        };

        if (token) fetchPrivate();
    }, [token]);

    if (!token) return <p>Debes iniciar sesión para ver esta página</p>;

    return (
        <div>
            <h2>Ruta privada</h2>
            <p>{msg}</p>
            <p>Email: {userEmail}</p>
        </div>
    );
};

export default Private;

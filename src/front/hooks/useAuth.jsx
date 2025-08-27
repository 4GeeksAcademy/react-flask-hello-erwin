import { useState } from "react";

const useAuth = () => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const login = async (email, password) => {
        try {
            const res = await fetch(`${backendUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userEmail", email);
                setToken(data.token);
                setUserEmail(email);
                return { success: true };
            } else {
                return { success: false, msg: data.msg || "Login failed" };
            }
        } catch (error) {
            return { success: false, msg: error.message };
        }
    };

    const signup = async (email, password) => {
        try {
            const res = await fetch(`${backendUrl}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                return { success: true, msg: data.msg };
            } else {
                return { success: false, msg: data.msg || "Signup failed" };
            }
        } catch (error) {
            return { success: false, msg: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setToken(null);
        setUserEmail(null);
    };

    const isLoggedIn = () => !!token;

    return { token, userEmail, login, signup, logout, isLoggedIn };
};

export default useAuth;

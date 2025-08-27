import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";


import  Signup  from "./pages/Signup";
import Login from "./pages/Login";
import  Private  from "./pages/Private";


const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token"); 
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/single/:theId" element={<Single />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Ruta privada */}
            <Route
                path="/private"
                element={
                    <ProtectedRoute>
                        <Private />
                    </ProtectedRoute>
                }
            />
        </Route>
    )
);

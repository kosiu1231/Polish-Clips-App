import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Clip from "./pages/Clip";
import ForgotPassword from "./pages/ForgotPassword";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Create from "./pages/Create";
import VerifyEmail from "./pages/VerifyEmail";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Home */}
                <Route path="/" element={<Home />} />
                {/* Auth */}
                <Route path="/rejestracja" element={<Register />} />
                <Route path="/weryfikacja" element={<VerifyEmail />} />
                <Route path="/logowanie" element={<Login />} />
                <Route path="/zmianahasla" element={<ResetPassword />} />
                <Route path="/przypomnijhaslo" element={<ForgotPassword />} />
                {/* Protected */}
                <Route
                    element={<RequireAuth allowedRoles={["User", "Admin"]} />}
                >
                    {/* logged user */}
                    <Route path="/dodaj" element={<Create />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                    {/* logged admin */}
                    <Route path="/admin" element={<AdminPanel />} />
                </Route>
                {/* Other */}
                <Route path="/klip/:id" element={<Clip />} />
                <Route path="/gry" element={<Games />} />
                <Route path="/nieuprawniony" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import LocationList from "./pages/LocationList";
import EditLocation from "./pages/EditLocation";
import AddLocation from "./pages/AddLocation";

import AdminUsers from "./pages/AdminUsers";

import CompanyList from "./pages/CompanyList";
import AddCompany from "./pages/AddCompany";
import EditCompany from "./pages/EditCompany";

import SubcompanyList from "./pages/SubcompanyList";
import AddSubcompany from "./pages/AddSubcompany";
import EditSubcompany from "./pages/EditSubcompany";

import BuildingList from "./pages/BuildingList";
import EmployeeList from "./pages/EmployeeList";
import JobRoleList from "./pages/JobRoleList";
import Reports from "./pages/Reports";

import "./App.css";


function App() {

    return (

        <BrowserRouter>

            <AuthProvider>

                <Routes>

                    {/* =========================
                        DEFAULT
                    ========================= */}

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/login"
                                replace
                            />
                        }
                    />


                    {/* =========================
                        PUBLIC PAGES
                    ========================= */}

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />


                    {/* =========================
                        ADMIN DASHBOARD
                    ========================= */}

                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            >
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        USER DASHBOARD
                    ========================= */}

                    <Route
                        path="/user-dashboard"
                        element={
                            <ProtectedRoute
                                allowedRoles={["USER"]}
                            >
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        LOCATIONS
                        ADMIN + USER
                    ========================= */}

                    <Route
                        path="/locations"
                        element={
                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN",
                                    "USER"
                                ]}
                            >
                                <LocationList />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        ADD LOCATION
                        ADMIN ONLY
                    ========================= */}

                    <Route
                        path="/locations/add"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            >
                                <AddLocation />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        EDIT LOCATION
                        ADMIN ONLY
                    ========================= */}

                    <Route
                        path="/locations/edit/:id"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            >
                                <EditLocation />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        ADMIN USERS
                        ADMIN ONLY
                    ========================= */}

                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            >
                                <AdminUsers />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        COMPANIES
                        ADMIN + USER
                    ========================= */}

                    <Route
                        path="/companies"
                        element={
                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN",
                                    "USER"
                                ]}
                            >
                                <CompanyList />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        ADD COMPANY
                        ADMIN ONLY
                    ========================= */}

                    <Route
                        path="/companies/add"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            >
                                <AddCompany />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        EDIT COMPANY
                        ADMIN ONLY
                    ========================= */}

                    <Route
                        path="/companies/edit/:id"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            >
                                <EditCompany />
                            </ProtectedRoute>
                        }
                    />
                    {/* =========================
                          SUBCOMPANIES
                            ADMIN + USER
                        ========================= */}

                    <Route
                        path="/subcompanies"
                        element={
                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN",
                                    "USER"
                                ]}
                            >
                                <SubcompanyList />
                            </ProtectedRoute>
                        }
                    />
                    {/* =========================
                           ADD SUBCOMPANY
                             ADMIN ONLY
                         ========================= */}

                    <Route
                        path="/subcompanies/add"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            >
                                <AddSubcompany />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/subcompanies/edit/:id"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            >
                                <EditSubcompany />
                            </ProtectedRoute>
                        }
                    />

                    {/* =========================
                        BUILDINGS
                        ADMIN + USER
                    ========================= */}

                    <Route
                        path="/buildings"
                        element={
                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN",
                                    "USER"
                                ]}
                            >
                                <BuildingList />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        EMPLOYEES
                        ADMIN + USER
                    ========================= */}

                    <Route
                        path="/employees"
                        element={
                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN",
                                    "USER"
                                ]}
                            >
                                <EmployeeList />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        JOB ROLES
                        ADMIN + USER
                    ========================= */}

                    <Route
                        path="/job-roles"
                        element={
                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN",
                                    "USER"
                                ]}
                            >
                                <JobRoleList />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        REPORTS
                        ADMIN + USER
                    ========================= */}

                    <Route
                        path="/reports"
                        element={
                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN",
                                    "USER"
                                ]}
                            >
                                <Reports />
                            </ProtectedRoute>
                        }
                    />


                    {/* =========================
                        UNKNOWN URL
                    ========================= */}

                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/login"
                                replace
                            />
                        }
                    />

                </Routes>

            </AuthProvider>

        </BrowserRouter>
    );
}


export default App;
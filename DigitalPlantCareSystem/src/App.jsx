import { useState } from "react";
import "./App.css";
import Header from "./components/general/header";
import Landing from "./components/landing";
import Profile from "./components/profile";
import AdminDashboard from "./components/admin/adminDashboard";
import AdminDatabase from "./components/admin/adminDatabase";
import AdminCareSchedule from "./components/admin/adminCareSchedule";

function App() {
  const [page, setPage] = useState("landing");

  return (
    <>
      {page !== "admin" &&
        page !== "admin-db" &&
        page !== "admin-calendar" &&
        page !== "profile" && <Header />}

      {page === "landing" && <Landing />}
      {page === "profile" && <Profile setPage={setPage} />}
      {page === "admin" && <AdminDashboard setPage={setPage} />}
      {page === "admin-db" && <AdminDatabase setPage={setPage} />}
      {page === "admin-calendar" && <AdminCareSchedule setPage={setPage} />}

      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
        <button onClick={() => setPage("landing")}>Landing</button>
        <button onClick={() => setPage("profile")}>Profile</button>
        <button onClick={() => setPage("admin")}>Admin</button>
        <button onClick={() => setPage("admin-db")}>Admin DB</button>
        <button onClick={() => setPage("admin-calendar")}>Admin Calendar</button>
      </div>
    </>
  );
}

export default App;
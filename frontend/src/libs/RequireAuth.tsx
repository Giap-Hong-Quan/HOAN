import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ()=>{
    const token = localStorage.getItem("accessToken");
    if(!token){ return <Navigate to={"/signin"}/>}
    return <Outlet/>
}
export default RequireAuth;
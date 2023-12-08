import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context";

export const UserRoute = ({ children }) => {

    const { isLogged, userData } = AuthContext();
    //console.log(isLogged, userData)
    const navigate = useNavigate();

    if (!isLogged, !userData?.rol.some(x => x.name === "USER")) {
        return navigate("/signin")
    }
    return children
};

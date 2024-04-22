import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/use-auth.ts";
import Header from "../components/Header.tsx";

const HomePage = () => {

    const {isAuth} = useAuth();

    return isAuth ? (
            <div>
                <Header/>
                <h1>Welcome</h1>
            </div>
        ) :
        (
            <Navigate replace to='/login'/>
        )
}

export default HomePage;
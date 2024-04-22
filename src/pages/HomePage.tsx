import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/use-auth.ts";
import Header from "../components/Header.tsx";
import Products from "../components/Products.tsx";

const HomePage = () => {

    const {isAuth} = useAuth();

    return isAuth ? (
            <div>
                <Header/>
                <Products/>
            </div>
        ) :
        (
            <Navigate replace to='/login'/>
        )
}

export default HomePage;
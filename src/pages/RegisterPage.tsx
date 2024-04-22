import {Link} from "react-router-dom";
import {SignUp} from "../components/SignUp.tsx";

const RegisterPage = () => {
    return (
        <div>
            <h1>Регистрация</h1>
            <SignUp/>
            <p>
                Или <Link to='/login'>авторизируйтесь</Link>
            </p>
        </div>
    )
}

export default RegisterPage;
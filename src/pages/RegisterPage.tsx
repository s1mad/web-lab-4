import {Link} from "react-router-dom";
import {SignUp} from "../components/SignUp.tsx";

const RegisterPage = () => {
    return(
        <div>
            <h1>RegisterPage</h1>
            <SignUp/>
            <p>
                Or <Link to='/login'>Login</Link>
            </p>
        </div>
    )
}

export default RegisterPage;
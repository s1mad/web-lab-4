import {useState} from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {setUser} from "../store/slices/UserSlice.ts";
import {useAppDispatch} from "../hooks/redux-hooks.ts";

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = (email: string, password: string, confirmPassword: string) => {
        if (!email.includes("@")) {
            window.alert("Invalid email format");
            return;
        }
        if (password.length < 6) {
            window.alert("Password should be at least 6 characters long");
            return;
        }
        if (password !== confirmPassword) {
            window.alert("Passwords do not match");
            return;
        }

        setLoading(true);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(
                    setUser({
                        id: user.uid,
                        email: user.email,
                        token: user.refreshToken,
                    })
                );
                navigate("/");
            })
            .catch((error) => {
                window.alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="input-container">
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"/>
            <input type='Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                   placeholder="Repeat password"/>
            <button onClick={() => handleRegister(email, password, confirmPassword)} disabled={loading}>{loading ? "Loading..." : "Register"}</button>
        </div>
    );
};

export {SignUp};

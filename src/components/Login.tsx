import {useState} from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {setUser} from "../store/slices/UserSlice.ts";
import {useAppDispatch} from "../hooks/redux-hooks.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (email: string, password: string) => {
        if (!email.includes("@")) {
            window.alert("Invalid email format");
            return;
        }
        if (password.length < 6) {
            window.alert("Password should be at least 6 characters long");
            return;
        }

        setLoading(true);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
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
                if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
                    window.alert("Invalid email or password");
                } else {
                    window.alert(error.message);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="input-container">
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"/>
            <button onClick={() => handleLogin(email, password)}
                    disabled={loading}>{loading ? "Загрузка..." : "Войти"}</button>
        </div>
    );
};

export {Login};

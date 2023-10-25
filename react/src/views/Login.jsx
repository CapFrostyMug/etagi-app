import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors(null);

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Войти в систему
            </h1>
            {
                errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            <input ref={emailRef} type="email" placeholder="Email"/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <button className="btn btn-block">Login</button>
            {/*<div className="message">
                <span>Not registered?</span>
                <span><Link to="/signup">Создать аккаунт</Link></span>
            </div>*/}
        </form>
    )
}

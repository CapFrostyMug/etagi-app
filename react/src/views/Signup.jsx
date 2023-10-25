import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider";

export default function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Signup new account
            </h1>
            {
                errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            <input ref={nameRef} type="text" placeholder="Name"/>
            <input ref={emailRef} type="email" placeholder="Email"/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <input ref={passwordConfirmationRef} type="password" placeholder="Password confirmation"/>
            <button className="btn btn-block">Signup</button>
            {/*<div className="message">
                <span>Already registered?</span>
                <span><Link to="/login">Sign in account</Link></span>
            </div>*/}
        </form>
    )
}

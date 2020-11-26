import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Auth from './Auth.js';

function Login(props) {

    const history = useHistory();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault()

        Auth.authorize(email, password).then((data) => {
            if (data.token) {
                props.handleLoggedIn();
                history.push('/');
                props.handleInfoTooltipOpen();
            } 
        })
        .catch(() => {
            props.handleInfoTooltipOpen();
        })
    }

    return(
        <>
            <section className="login">
                <div className="login__container">
                    <h2 className="login__title">Вход</h2>
                    <form className="login__forms" noValidate>
                        <input id="login-email" type="email" className="login__input" value={email} onChange={handleEmailChange} placeholder="Email" required minLength="1" maxLength="30" />
                        <input id="login-password" type="password" className="login__input" value={password} onChange={handlePasswordChange} placeholder="Пароль" minLength="1" maxLength="30" required />
                        <button className="login__submit-button" type="submit" onClick={handleSubmit}>Войти</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login;
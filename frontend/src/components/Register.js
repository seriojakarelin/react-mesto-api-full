import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Auth from './Auth.js';

function Register(props) {

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

        Auth.register(email, password).then((res) => {
            if (res) {
                props.handleSignedUp();
                history.push('/sign-in');
                props.handleInfoTooltipOpen();
            }
        })
    }

    return(
            <section className="login">
                <div className="login__container">
                    <h2 className="login__title">Регистрация</h2>
                    <form className="login__forms" noValidate>
                        <input id="login-email" type="email" className="login__input" value={email} onChange={handleEmailChange} placeholder="Email" required minLength="2" maxLength="30" />
                        <input id="login-password" type="password" className="login__input" value={password} onChange={handlePasswordChange} placeholder="Пароль" minLength="2" maxLength="30" required />
                        <button className="login__submit-button" type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
                    </form>
                    <Link className="login__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
                </div>
            </section>
    )
}

export default Register;
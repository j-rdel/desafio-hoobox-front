import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import apiService from '../../services/apiService';
import toastr from "toastr";
import 'toastr/build/toastr.min.css';

import './style.scss';



export default function (){
    const history = useHistory();
    const goRegister = () => history.push('/register');
    
    const [user, setUser] = useState<String>();
    const [password, setPassword] = useState<String>();

    async function submitLogin(e: any) {
        try {
          e.preventDefault();
          const loginResponse = await apiService.post('/login', {
            user,
            password,
          });

          localStorage.setItem('TOKEN', loginResponse.data.token);
          localStorage.setItem('user', JSON.stringify(user));
          history.push('/dashboard');

        } catch (error) {
            setUser("");
            setPassword("");
            toastr.error("Usuário ou senha incorretos")
        }
      }
  

    return (
        <div className="container">
            <div className="doctor-image" />
            <div className="login-content">
                <form 
                    onSubmit={(e) => {
                        submitLogin(e);
                    }}
                >
                    <h1>DOCTOR</h1>
                    <p>Bem vindo! Por favor entre em sua conta.</p>
                    <input 
                        type="text" 
                        placeholder='Usuário'
                        onChange={(e) => {
                            setUser(e.target.value);
                        }} 
                    />
                    <input 
                        type="password" 
                        placeholder='Senha'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <div className="form-group">
                        <div className='remember'>
                            <input type="checkbox" name="lembrar" />
                            <span>Lembrar</span>
                        </div>                
                        <a href='#forgot'>Esqueceu a senha?</a>
                    </div>
                    <div className="button-group">
                        <button 
                            className="login-button"
                            type='submit'
                        >
                            Entrar
                        </button>
                        <button onClick={goRegister} className="register-button">Cadastre-se</button>
                    </div>
                </form>
                <div className="terms">
                    <span>Termo de responsabilidade Hoobox</span>
                </div>
            </div>
        </div>
    )
}
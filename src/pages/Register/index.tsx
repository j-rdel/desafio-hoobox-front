import './style.scss';
import {Link, useHistory} from 'react-router-dom';
import { useState } from 'react';
import apiService from '../../services/apiService';

import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { useAuth } from '../../contexts/authContext';

export default function (){
    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('');
    const [terms, setTerms] = useState(false);

    // const { setCurrentUser } = useAuth();

    async function signUp(e: any) {
        try {
            e.preventDefault();

            if (firstName == '' || lastName == '' || user == '' || email == '' || password == '' || confirmPassword == '' ){
                toastr.error("Preencha todos os campos")
                return ;
            }
          
            if(password !== confirmPassword){
                toastr.error("Senhas devem ser iguais")
                return ;
            }

            if (!terms) {
                toastr.error("Por favor preencha os termos de cadastro")
                return ;
            }

            const signUpResponse = await apiService.post('/register', {
                firstName,
                lastName,
                user,
                email,
                password,
                confirmPassword,
            });

            // setCurrentUser(user);

            localStorage.setItem('TOKEN', signUpResponse.data.token);
            localStorage.setItem('user', JSON.stringify(user));
            history.push('/dashboard');
        } catch (error) {
            toastr.error("E-mail ou usuário já cadastrados no sistema")
        }
      }

    return (
        <div className="container">
            <div className="equipment-image" />
            <div className="register-content">
                <form
                    onSubmit={(e) => {
                       signUp(e);
                    }}
                >
                    <h1>DOCTOR</h1>
                    <p>Preencha os campos a baixo para criar a sua conta.</p>
                    <div className='form-group 2'>
                        <input 
                            type="text" 
                            placeholder='Nome' 
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <input 
                            type="text" 
                            placeholder='Sobrenome'
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>
                    <input 
                        type="text" 
                        placeholder='Usuário' 
                        onChange={(e) => {
                            setUser(e.target.value);
                        }}
                    />
                    <input 
                        type="text" 
                        placeholder='E-mail'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} 
                    />
                    <input 
                        type="password" 
                        placeholder='Senha'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <input 
                        type="password" 
                        placeholder='Confirmar senha'
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    <div className='terms'>
                        <input 
                            type="checkbox" 
                            name="lembrar" 
                            onChange={(e) => {
                                setTerms(true);
                            }}
                        />
                        <span>Concordo com os termos e condições</span>
                    </div>
                    <div className='button-group'>              
                        <button 
                            type="submit"
                        >
                            Cadastrar
                        </button>
                    </div>
                    <div className='link-group'>
                        <Link className='link' to="/">Já tem cadastro? Clique aqui</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
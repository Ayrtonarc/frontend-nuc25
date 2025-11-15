import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import client from '../apolloClient';
import './Login.css';

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			id
			firstname
			lastname
			username
			token
		}
	}
`;

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [login, { loading }] = useMutation(LOGIN_MUTATION, { client });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const { data } = await login({ variables: { email, password } });
			// Aquí puedes guardar el token en localStorage, redirigir, etc.
			if (data?.login?.token) {
				localStorage.setItem('token', data.login.token);
				// window.location.href = '/'; // Redirigir si lo deseas
			}
		} catch (err: any) {
			setError(err.message || 'Error al iniciar sesión');
		}
	};

		return (
			<div className="login-container">
				<form className="login-form" onSubmit={handleSubmit}>
					<h2>Iniciar sesión</h2>
					<div className="form-group">
						<label htmlFor="email">Correo electrónico</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							disabled={loading}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							disabled={loading}
						/>
					</div>
					{error && <div style={{ color: '#3a5ca8', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
					<button type="submit" className="login-btn" disabled={loading}>
						{loading ? 'Entrando...' : 'Entrar'}
					</button>
				</form>
			</div>
		);
};

export default Login;

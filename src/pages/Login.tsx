import React, { useState } from 'react';
import { gql } from '@apollo/client';
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
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const result = await client.mutate({
				mutation: LOGIN_MUTATION,
				variables: { email, password },
			});
			const data: any = result?.data;
			if (data?.login?.token) {
				localStorage.setItem('token', data.login.token);
				// window.location.href = '/'; // Redirigir si lo deseas
			}
		} catch (err: any) {
			setError(err?.message || 'Error al iniciar sesión');
		} finally {
			setLoading(false);
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

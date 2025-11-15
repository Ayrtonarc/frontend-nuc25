import React, { useState } from 'react';
import './Register.css';

const Register: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Aquí irá la lógica de registro
	};

	return (
		<div className="register-container">
			<form className="register-form" onSubmit={handleSubmit}>
				<h2>Registrarse</h2>
				<div className="form-group">
					<label htmlFor="name">Nombre</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Correo electrónico</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
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
					/>
				</div>
				<button type="submit" className="register-btn">Registrarse</button>
			</form>
		</div>
	);
};

export default Register;

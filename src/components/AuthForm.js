import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './layouts/Button'
import { Link, useHistory } from 'react-router-dom'
import { loginUser, signUpUser } from '../redux/actions/userActions'

export const AuthForm = () => {
	const [toggleSlides, setToggleSlides] = useState(false)
	const history = useHistory()
	const ui = useSelector(state => state.ui)
	const dispatch = useDispatch()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState('') 
	
	useEffect(() => {ui.error !== null ? setErrors(ui.error) : setErrors('')}, [ui.error])
	
	return (
			<div className="containerForm">
				<div className={toggleSlides ? "container right-panel-active" : "container"}>
					<div className="form-container sign-up-container">
						<form onSubmit={
							(event) => {
								event.preventDefault()
								dispatch(signUpUser({name, email, password, confirmPassword}, history))
							}
						}>
							<h1>Create Account</h1> 
							<div className="social-container">
								<Link to="#"><i className="fab fa-facebook-f"></i></Link>
								<Link to="#"><i className="fab fa-google"></i></Link>
								<Link to="#"><i className="fab fa-linkedin-in"></i></Link>
								<Link to="#"><i className="fab fa-instagram"></i></Link>
							</div>
							{errors.general && (<span style={{ color: 'red', fontSize: '1.5rem' }}>{errors.account}</span>)}
							<input 
								type="text" 
								value={name} 
								onChange={event => setName(event.target.value)}
								placeholder="Name" />
							{errors.name && (<span style={{color: 'red'}}>{errors.name}</span>)}
							<input 
								type="email" 
								value={email} 
								onChange={event=>setEmail(event.target.value)} 
								placeholder="Email" />
							{errors.email && (<span style={{color: 'red'}}>{errors.email}</span>)}
							<input 
								type="password" 
								value={password} 
								onChange={event=>setPassword(event.target.value)} 
								placeholder="Password" />
							{errors.password && (<span style={{ color: 'red' }}>{errors.password}</span>)}
							<input 
								type="password" 
								value={confirmPassword} 
								onChange={event=>setConfirmPassword(event.target.value)} 
								placeholder="confirmPassword" />
							{errors.confirmPassword && (<span style={{ color: 'red' }}>{errors.confirmPassword}</span>)}
							{ui.loading ? <i className="fas fa-spinner fa-pulse fa-lg" style={{ color: "var(--main-color)", marginTop: "1em" }}></i> : <Button type="submit">Sign Up</Button>}
						</form>
					</div>
					<div className="form-container sign-in-container">
						<form onSubmit={
							(event) => {
								event.preventDefault()
								dispatch(loginUser({ email, password }, history))
							}
						}>
							<h1>Sign in</h1>
							<div className="social-container">
								<Link to="#"><i className="fab fa-facebook-f"></i></Link>
								<Link to="#"><i className="fab fa-google"></i></Link>
								<Link to="#"><i className="fab fa-linkedin-in"></i></Link>
								<Link to="#"><i className="fab fa-instagram"></i></Link>
							</div>
							{errors.general && (<span style={{ color: 'red', fontSize: '1.5rem' }}>{errors.general}</span>)}
							<input 
								type="email" 
								value={email} 
								onChange={event=>setEmail(event.target.value)} 
								placeholder="Email" />
							{errors.email && (<span style={{ color: 'red' }}>{errors.email}</span>)}
							<input 
								type="password" 
								value={password} 
								onChange={event=>setPassword(event.target.value)} 
								placeholder="Password" />
							{errors.password && (<span style={{ color: 'red' }}>{errors.password}</span>)}
							<Link to="#" onClick={() => setToggleSlides(!toggleSlides)}>Forgot your password?</Link>
						{ui.loading ? <i className="fas fa-spinner fa-pulse fa-lg" style={{ color: "var(--main-color)", marginTop: "1em" }}></i> : <Button type="submit">Sign In</Button>}
						</form>
					</div>
					<div className="overlay-container">
						<div className="overlay">
							<div className="overlay-panel overlay-left">
								<h1>Welcome Back!</h1>
								<p>
									To keep connected with us please login with your personal info
								</p>
								<Button className="ghost" onClick={() => {
									setToggleSlides(!toggleSlides)
									setPassword('')
									setConfirmPassword('')
									setEmail('')
									setName('')
									setErrors('')
								}}>Sign In</Button>
							</div>
							<div className="overlay-panel overlay-right">
								<h1>Hello, Friend!</h1>
								<p>Enter your personal details and start journey with us</p>
								<Button className="ghost" onClick={() => {
									setToggleSlides(!toggleSlides)
									setPassword('')
									setEmail('')
									setErrors('')
									}}>Sign Up</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
	)
}

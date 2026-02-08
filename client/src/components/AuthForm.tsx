import React, { useState } from "react";
import { HiEnvelope } from "react-icons/hi2";
import { HiLockClosed, HiEye, HiEyeSlash } from "react-icons/hi2";
import { Icon } from "./Icon";
import "./AuthForm.css";

interface AuthFormProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onRegister(email, password);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">MY CONTACTS</h1>
          <p className="auth-description">
            Login or create an account to manage your contacts
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <Icon icon={HiEnvelope} className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <Icon icon={HiLockClosed} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon icon={showPassword ? HiEyeSlash : HiEye} className="toggle-icon" />
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

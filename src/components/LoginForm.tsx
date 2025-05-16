import React, { useState } from "react";
import styles from "../styles/LoginForm.module.css";

interface Props {
  onSuccess: (user: { name: string; email: string }) => void;
}

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({ name: "Ignacio", email }); // Simula login
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <img src="/logo.svg" className={styles.logo} alt="Zentis Logo" />
        <h2>Inicia sesión en Zentis</h2>
        <p className={styles.subtext}>Tu criterio, nuestra IA</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <label>Contraseña</label>
          <div className={styles.passwordRow}>
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <button
              type="button"
              className={styles.showPwdBtn}
              onClick={() => setShowPwd((v) => !v)}
              tabIndex={-1}
            >
              <span role="img" aria-label="show">
                👁️
              </span>
            </button>
          </div>
          <button
            type="submit"
            className={styles.submit}
            disabled={!email || !password}
          >
            Iniciar sesión
          </button>
        </form>
        <div className={styles.footerText}>
          Aun no tienes cuenta ? <a href="#">Crear cuenta</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

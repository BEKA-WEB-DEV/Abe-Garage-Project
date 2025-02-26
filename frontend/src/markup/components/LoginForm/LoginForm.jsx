import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logIn } from "../../../services/login.service";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    if (!employee_email) {
      setEmailError("Please enter your email address first");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 8 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    const formData = {
      employee_email,
      employee_password,
    };

    try {
      const loginEmployee = await logIn(formData);
      const response = await loginEmployee.json();
      if (response.status === "success") {
        if (response.data.employee_token) {
          localStorage.setItem("employee", JSON.stringify(response.data));
        }
        if (location.pathname === "/login") {
          window.location.replace("/");
        } else {
          window.location.reload();
        }
      } else {
        setServerError(response.message);
      }
    } catch (err) {
      setServerError("An error has occurred. Please try again later." + err);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="email"
                        name="employee_email"
                        value={employee_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <div className="password-container">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="employee_password"
                          value={employee_password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Password"
                          className="password-input"
                        />
                        <span
                          className="password-toggle-icon"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Login</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
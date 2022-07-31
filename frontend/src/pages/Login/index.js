import React, { useState } from "react";
import { InputField } from "../../components";
import "./styles.css";
import { useFirebaseUser } from "../../context/UserContext";
import { useNavigate, Outlet } from "react-router-dom";

const validName = new RegExp("^[a-zA-Z]+ [a-zA-Z]+$");
const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

export const Login = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { createUser, signIn } = useFirebaseUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUser(fullName, email, password);
      navigate("/");
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn(email, password);
      console.log(res);
      navigate("/");
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  const isSubmitDisabled = () => {
    if (isNewUser) {
      return !(
        validEmail.test(email) &&
        validPassword.test(password) &&
        validName.test(fullName)
      );
    } else {
      return !(validEmail.test(email) && validPassword.test(password));
    }
  };

  return (
    <div className="no-gutters my-container">
      <div className="row h-100 no-gutters">
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div className="my-img-container">
            <img
              src="/assets/svgs/todoList.svg"
              alt="todo-list"
              className="my-todo-img"
            />
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div className="my-login-form-container d-flex justify-content-center align-items-center">
            <div className="my-login-form-container-content">
              <div className="my-login-form-header">
                <p
                  className={`h5 heading-${!isNewUser ? "active" : "muted"}`}
                  onClick={(e) => setIsNewUser(false)}
                >
                  Login
                </p>
                <p
                  className={`h5 heading-${isNewUser ? "active" : "muted"}`}
                  onClick={(e) => setIsNewUser(true)}
                >
                  Sign Up
                </p>
              </div>
              <div className="my-login-form-content">
                {!isNewUser && (
                  <div className="my-login-form-title-container">
                    <p className="h5 my-login-form-title">To Continue</p>
                    <p className="h6 my-login-form-subtitle">
                      We need your Name &amp; Email
                    </p>
                  </div>
                )}
                <form
                  className="form"
                  onSubmit={(e) =>
                    isNewUser ? handleSignUp(e) : handleSignIn(e)
                  }
                >
                  {isNewUser && (
                    <InputField
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      error={
                        validName.test(fullName)
                          ? ""
                          : "Please enter a valid name"
                      }
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  )}
                  <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    error={
                      validEmail.test(email) ? "" : "Please enter a valid email"
                    }
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    error={
                      validPassword.test(password)
                        ? ""
                        : "Please enter a valid password"
                    }
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputField
                    type="Submit"
                    value={isNewUser ? "Sign Up" : "Log In"}
                    isDisabled={isSubmitDisabled()}
                    error={error}
                  />
                  <InputField
                    type="checkbox"
                    label="Remember Me"
                    value={rememberMe}
                    isDisabled={
                      validEmail.test(email) || validEmail.test(email)
                    }
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

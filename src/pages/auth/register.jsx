import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobileNo: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = window.localStorage.getItem("access");

    if (token) {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/register`,
      formData
    );

    console.log(res.data);

    if (res.data) {
      window.location.href = "/auth/login";
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="custom-login-form">
            <h2 className="text-primary">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </div>{" "}
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Mobile no</label>
                <input
                  type="mobileNo"
                  className="form-control"
                  id="mobileNo"
                  name="mobileNo"
                  onChange={handleChange}
                  placeholder="Enter mobile no"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
              </div>
              <button
                disabled={
                  !formData.email ||
                  !formData.mobileNo ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  formData.confirmPassword !== formData.password
                }
                type="submit"
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
              <div className="py-2 text-center d-flex justify-content-center">
                <p className="m-0">Already have an account?</p>
                <a className="" href="/auth/login">
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

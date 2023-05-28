import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      `${process.env.REACT_APP_API_URL}/users/login`,
      formData
    );

    console.log(res.data);

    if (res.data) {
      window.localStorage.setItem("access", res.data.access);

      if (res.data.isAdmin) {
        window.localStorage.setItem("admin", true);
        window.location.href = "/admin";
      } else {
        window.localStorage.setItem("admin", false);
        window.location.href = "/";
      }
    } else {
      Swal.fire("Invalid username or password");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="custom-login-form">
            <h2 style={{ color: "#0a418e" }} className="">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                disabled={!formData.email || !formData.password}
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
              <div className="py-2 text-center d-flex justify-content-center">
                <p className="m-0">Don't have an account?</p>
                <a className="" href="/auth/register">
                  Register
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

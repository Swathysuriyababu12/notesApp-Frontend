import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signUpSchema } from "../../validations/Validation";
import { clearSomeState, signup } from "../../redux/features/userSlice";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Spinner = function () {
  return (
    <MutatingDots
      height="30"
      width="60"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="8"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.warn(error);
      dispatch(clearSomeState());
    }
    if (success) {
      toast.success("Successful signup.");
      dispatch(clearSomeState());
      navigate("/");
    }
  }, [error, success, navigate]);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        console.log(values);
        dispatch(signup(values));
      },
    });

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Sign Up</h3>
        <div className="mb-3">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter UserName"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="mb-3">
          <label>Email </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched ? (
            <span className="error">{errors.email}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched ? (
            <span className="error">{errors.password}</span>
          ) : null}
        </div>

        <div className="d-grid mb-2">
          <button type="submit" className="btn btn-primary">
            {console.log(success)}
            {loading ? <Spinner /> : "Register"}
          </button>
        </div>
        {/* <p className="text-right">
          Already have an account?
          <Link to="/">Login</Link>
        </p> */}

        <div className="btn">
          <Link to="/">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../../validations/Validation";
import { clearSomeState,login } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";




const initialValues = {
  email: "",
  password: "",
};


const loginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.user);
   useEffect(() => {
     if (error) {
       toast.warn(error);
       dispatch(clearSomeState());
     }
     if (success === true) {
       toast.success("Successful Login");
       dispatch(clearSomeState());
       navigate("/editor");
     }
   });
  
   const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
     useFormik({
       initialValues,
       validationSchema: loginSchema,
       onSubmit: (values) => {
         dispatch(login(values));
       },
     });
    return (
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Sign In</h3>
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

          <div className="btn">
            <div className="container mb-3" >
              <Link to="/sign-up">Dont have an account?</Link>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    );
};

export default loginForm;

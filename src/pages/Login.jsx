import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import API_URL from "../config/global";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here, e.g., sending the data to a server.

    if (!formData.email || !formData.password) {
      alert("please fill all the fields");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      console.log(data);
      localStorage.setItem("userInfo", data.token);
      console.log(JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;

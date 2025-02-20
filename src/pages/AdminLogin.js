import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { FormInput } from "../components/Form/FormField";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const AdminLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await adminLogin(data);
      localStorage.setItem("token", response.data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto shadow p-4 rounded bg-white">
          <h2 className="text-center mb-4">Admin Login</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register("email")}
              error={errors.email?.message}
              required={true}
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              register={register("password")}
              error={errors.password?.message}
              required={true}
            />

            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>

          {error && <p className="text-center mt-3 text-danger">{error}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;

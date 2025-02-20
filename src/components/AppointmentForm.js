import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bookAppointment } from "../api/api";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { FormInput, FormTextarea } from "./Form/FormField"; // Import reusable input component

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  reason: yup.string().required("Reason is required"),
});

const AppointmentForm = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await bookAppointment(data);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to book appointment.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto shadow p-4 rounded bg-white">
          <h2 className="text-center mb-4">Book an Appointment</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Name"
              placeholder="Enter your name"
              register={register("name")}
              error={errors.name?.message}
              required={true}
            />

            <FormInput
              label="Date"
              type="date"
              register={register("date")}
              error={errors.date?.message}
              required={true}
            />

            <FormInput
              label="Time"
              type="time"
              register={register("time")}
              error={errors.time?.message}
              required={true}
            />

            <FormTextarea
              label="Reason for Appointment"
              placeholder="Enter reason"
              register={register("reason")}
              error={errors.reason?.message}
              required={true}
            />

            <FormInput
              label="Phone"
              placeholder="Enter your phone number"
              register={register("phone")}
              error={errors.phone?.message}
            />

            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register("email")}
              error={errors.email?.message}
            />

            <FormInput
              label="Address"
              placeholder="Enter your address"
              register={register("address")}
              error={errors.address?.message}
            />

            <Button type="submit" variant="primary" className="w-100">
              Book Appointment
            </Button>
          </Form>

          {message && (
            <p className="text-center mt-3 text-success">{message}</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentForm;

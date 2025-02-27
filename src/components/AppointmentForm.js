import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bookAppointment } from "../api/api";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { FormInput, FormTextarea } from "./Form/FormField"; // Import reusable input component
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Please select a time slot"),
  reason: yup.string().required("Reason is required"),
  phone: yup
    .string()
    .trim()
    .nullable()
    .notRequired()
    .test("isValidPhone", "Phone number must be 10 digits", (value) => {
      if (!value) return true; // If empty, it's valid
      return /^[0-9]{10}$/.test(value);
    }),
  email: yup.string().nullable().notRequired().email("Invalid email format"),
  // .optional(),
});

const AppointmentForm = () => {
  const [message, setMessage] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Watch for date selection changes
  const selectedDate = watch("date");
  const selectedSlot = watch("time");

  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/appointments/available-slots/${selectedDate}`
        )
        .then((response) => setAvailableSlots(response.data.availableSlots))
        .catch(() => setAvailableSlots([]));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const onSubmit = async (data) => {
    try {
      const response = await bookAppointment(data);
      setMessage(response.data.message);
      reset();
      setAvailableSlots([]);
      setValue("date", "");
    } catch (error) {
      setMessage("Failed to book appointment.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto shadow p-4 rounded bg-white">
          <h2 className="text-center mb-4">Book an Appointment</h2>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              min={new Date().toISOString().split("T")[0]}
            />

            {/* Time Slots Selection */}
            {selectedDate && (
              <div className="mb-3">
                <p className="mb-2">
                  Select a Time Slot
                  <span className="text-danger"> *</span>
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => (
                      <Button
                        key={slot}
                        variant={
                          slot === selectedSlot
                            ? "primary"
                            : "outline-secondary"
                        }
                        className="px-3 py-2"
                        onClick={() => {
                          setValue("time", slot);
                          clearErrors("time");
                        }}
                        // disabled={slot.booked}
                      >
                        {slot}
                      </Button>
                    ))
                  ) : (
                    <p className="text-danger">No slots available</p>
                  )}
                </div>
                {errors.time && (
                  <p className="text-danger mt-2">{errors.time.message}</p>
                )}
              </div>
            )}

            <FormTextarea
              label="Reason for Appointment"
              placeholder="Enter reason"
              register={register("reason")}
              error={errors.reason?.message}
              required={true}
            />

            <FormInput
              label="Phone"
              type="tel"
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

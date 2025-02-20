import { Form } from "react-bootstrap";

export const FormInput = ({
  label,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export const FormTextarea = ({
  label,
  placeholder,
  register,
  error,
  required = false, // Handles required fields
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        as="textarea"
        placeholder={placeholder}
        {...register}
        isInvalid={required && !!error} // Only mark invalid if required
      />
      {required && error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

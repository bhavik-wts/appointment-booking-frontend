import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Controller } from "react-hook-form";

export const FormInput = ({
  label,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
  control,
  ...rest
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>
      {type === "tel" ? (
        <>
          <Controller
            name="phone"
            control={control}
            rules={{ required: required ? "Phone number is required" : false }}
            render={({ field }) => (
              <PhoneInput
                country={"in"}
                enableSearch={true}
                inputStyle={{ width: "100%" }}
                inputProps={{
                  name: field.name, // Ensures form handling works
                  required: required,
                  className: `form-control ${error ? "is-invalid" : ""}`,
                }}
                value={field.value}
                onChange={(phone) => field.onChange("+" + phone)}
              />
            )}
          />
          {error && (
            <div className="text-danger mt-1 small">Invalid phone number</div>
          )}{" "}
        </>
      ) : (
        <Form.Control
          type={type}
          placeholder={placeholder}
          {...register}
          isInvalid={!!error}
          noValidate
          {...rest}
        />
      )}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export const FormTextarea = ({
  label,
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

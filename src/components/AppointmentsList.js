import { useEffect, useState } from "react";
import { getAppointments } from "../api/api";
import { Table, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(/\//g, "-")); // Convert "2025/02/12" to "2025-02-12"
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    getAppointments(token)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error(error));
  }, [navigate]);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Appointments List</h2>

          {/* Appointments Table */}
          <Table
            // striped
            rounded
            bordered
            hover
            responsive="md"
            className="w-100 shadow-sm"
          >
            <thead className="table-primary text-center">
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Meet Link</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <tr key={appointment._id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{appointment.name}</td>
                    <td>{formatDate(appointment.date)}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.phone || "N/A"}</td>
                    <td>{appointment.email || "N/A"}</td>
                    <td>{appointment.address || "N/A"}</td>
                    <td>
                      <a
                        href={appointment.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {appointment.meetLink}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No Appointments Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentsList;

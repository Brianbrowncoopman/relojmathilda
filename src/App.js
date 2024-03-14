import React, { useState, useEffect } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [targetDate, setTargetDate] = useState(moment());
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const difference = moment.duration(targetDate.diff(now));
      const days = Math.floor(difference.asDays());
      const hours = difference.hours();
      const minutes = difference.minutes();
      const seconds = difference.seconds();
      setRemainingTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const handleDateChange = (date) => {
    setTargetDate(moment(date));
  };

  return (
    <div
      style={{
        backgroundColor: "#ead1dc",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <h1>Contador de tiempo hasta mi cumpleaños</h1>
            <DatePicker
              selected={targetDate.toDate()}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="mb-3 bg-light text-center border border-primary p-2 rounded mr-2"
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="border border-primary p-2 rounded mr-2">
                <span className="font-weight-bold" style={{ fontSize: "40px" }}>
                  {remainingTime.days}
                </span>{" "}
                D
              </div>
              <div className="border border-primary p-2 rounded mr-2">
                <span className="font-weight-bold" style={{ fontSize: "40px" }}>
                  {remainingTime.hours}
                </span>{" "}
                H
              </div>
              <div className="border border-primary p-2 rounded mr-2">
                <span className="font-weight-bold" style={{ fontSize: "40px" }}>
                  {remainingTime.minutes}
                </span>{" "}
                M
              </div>
              <div className="border border-primary p-2 rounded mr-2 center">
                <span className="font-weight-bold" style={{ fontSize: "40px" }}>
                  {remainingTime.seconds}
                </span>{" "}
                S
              </div>
            </div>
            <div
              style={{
                marginRight: "10px",
                fontSize: "40px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              restantes
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

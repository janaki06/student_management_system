// Importing required libraries and hooks
import React, { useState } from "react";
import "./Create.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

// defining a functional component called 'Create'
function Create() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    location: "",
    email: "",
    dob: "",
    education: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/student", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="createelement">
      <form onSubmit={handleSubmit} className="form-inline">
        <br />
        <br />
        <div className="form-group">
          <label htmlFor="firstName" className="col-md-1 ">
            FirstName:
          </label>
          <input
            id="firstName"
            type="text"
            className="col-md-3"
            onChange={(e) =>
              setValues({ ...values, firstname: e.target.value })
            }
          />{" "}
          <label htmlFor="LastName" className="col-md-1">
            LastName:
          </label>
          <input
            id="LastName"
            type="text"
            className="col-md-3"
            onChange={(e) => setValues({ ...values, lastname: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="location" className="col-md-1">
            Location:
          </label>
          <input
            id="location"
            type="text"
            className="col-md-3"
            onChange={(e) => setValues({ ...values, location: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email" className="col-md-1">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="col-md-3"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="dateOfBirth" className="col-md-1">
            DOB:
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className="col-md-1"
            onChange={(e) => setValues({ ...values, dob: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="education" className="col-md-1">
            Education:
          </label>
          <input
            id="education"
            type="text"
            className="col-md-3"
            onChange={(e) =>
              setValues({ ...values, education: e.target.value })
            }
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="about" className="col-md-1">
            About:
          </label>
          <input id="about" type="text" className="col-md-3 aboutwidth"></input>
        </div>
        <br />

        <button className="btn btn-dark icon submit"> Submite</button>
      </form>
    </div>
  );
}

export default Create;

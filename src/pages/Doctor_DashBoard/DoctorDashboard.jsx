import React, { useEffect, useState } from 'react';
import './doctordashboard.css';
import axios from 'axios';
import emailjs from 'emailjs-com';

const Doctor_DashBoard = () => {
  const [doctor, Setdoctor] = useState();

  const getDoctor = async () => {
    await axios.get("https://prescripto-backend.up.railway.app/mng/alldoctors").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        const doctor = res.data[i];
        if (doctor._id == window.localStorage.getItem("doctor")) {
          Setdoctor(doctor);
        }
      }
    });
  };

  useEffect(() => {
    getDoctor();
  }, [window.localStorage.getItem("doctor")]);

  // Accept Appointment Function
  const AcceptApponiemnt = async (appointment) => {
    // Update appointment status
    await axios.post(`https://prescripto-backend.up.railway.app/mng/acceptappoiment/${doctor._id}/${appointment._id}`).then(async (res) => {
      console.log('Appointment accepted');

      // Send email to patient
      const templateParams = {
        to_email: appointment.email, // Make sure appointment object has the patient's email
        patient_name: appointment.username,
        doctor_name: doctor.username,
        message: `Your appointment with Dr. ${doctor.username} has been accepted. Please contact the doctor now.`
      };

      try {
        const response = await emailjs.send(
          'service_zy1slkk',  // Replace with your EmailJS service ID
          'template_d2zs79r',  // Replace with your EmailJS template ID
          templateParams,
          '9Nq7Q7mYbYHZW6UQi'  // Replace with your EmailJS user ID
        );
        console.log('Email sent successfully', response);
      } catch (error) {
        console.error('Failed to send email', error);
      }

      // Reload page to reflect changes
      window.location.reload();
    }).catch(err => {
      console.error('Error accepting appointment', err);
    });
  };

  // Reject Appointment Function
  const RejectAppoinment = async (appointment) => {
    // Update appointment status
    await axios.post(`https://prescripto-backend.up.railway.app/mng/denyappoiment/${doctor._id}/${appointment._id}`).then(async (res) => {
      console.log('Appointment Denied');

      // Send email to patient
      const templateParams = {
        to_email: appointment.email, // Make sure appointment object has the patient's email
        patient_name: appointment.username,
        doctor_name: doctor.username,
        message: `Your appointment with Dr. ${doctor.username} has been denied.`
      };

      try {
        const response = await emailjs.send(
          'service_zy1slkk',  // Replace with your EmailJS service ID
          'template_vqguqen',  // Replace with your EmailJS template ID
          templateParams,
          '9Nq7Q7mYbYHZW6UQi'  // Replace with your EmailJS user ID
        );
        console.log('Email sent successfully', response);
      } catch (error) {
        console.error('Failed to send email', error);
      }

      // Reload page to reflect changes
      window.location.reload();
    }).catch(err => {
      console.error('Error rejecting appointment', err);
    });
  };

  // Mark Appointment as Done Function
  const done = async (appointment) => {
    // Update appointment status
    await axios.post(`https://prescripto-backend.up.railway.app/mng/donepatient/${doctor._id}/${appointment._id}`).then(async (res) => {
      console.log('Appointment Done Successfully');
      window.location.reload();
    }).catch(err => {
      console.error('Error marking appointment as done', err);
    });
  };

  return (
    <div className='container'>
      {doctor ?
        <div className='Doctor'>
          <div className="head">
            <div className="intro-card">
              <div className='userImg'>
                <img src='../../../public/departments/doc1.png' alt="" />
              </div>
              <div className="doctor-description">
                <h1>Hello, <span>{doctor.username}</span></h1>
              </div>
            </div>
            <div className="total-appoinments">
              <div className="data">
                <h1>Total Appointments</h1>
                <h2>{doctor.appoiments.length}</h2>
              </div>
            </div>
            <div className="total-appoinments waiting">
              <div className="data">
                <h1>Waiting Appointments</h1>
                <h2>{doctor.waitingappoiments.length}</h2>
              </div>
            </div>
          </div>
          <div className="heading">
            <h1 style={{
              "padding": "20px",
              "color": "rgb(95 111 255 / 1)",
              "border-bottom-color": "rgb(173 173 173 / 1)",
              "border-bottom-style": "solid",
              "padding-bottom": "20px",
              "border-width": "1px"
            }}>Waiting Appointments</h1>
          </div>
          <div className="body">
            {doctor.waitingappoiments.map((appointment) => (
              <div className="Data" key={appointment._id}>
                <div className="patient">
                  <img src={appointment.profilepic} alt="Patient" />
                  <h2>{appointment.username}</h2>
                  <div className="illness">
                    <p>{appointment.illness || "No details provided"}</p>
                  </div>
                </div>
                <div className="btns">
                  <button className="accept" onClick={() => AcceptApponiemnt(appointment)}>Accept</button>
                  <button className="reject" onClick={() => RejectAppoinment(appointment)}>Reject</button>
                </div>
              </div>
            ))}
          </div>
          <div className="heading">
            <h1 style={{
              "padding": "20px",
              "color": "rgb(95 111 255 / 1)",
              "border-bottom-color": "rgb(173 173 173 / 1)",
              "border-bottom-style": "solid",
              "padding-bottom": "20px",
              "border-width": "1px"
            }}>Completed Appointments</h1>
          </div>
          <div className="body">
            {doctor.appoiments.map((appointment) => (
              <div className="Data" key={appointment._id}>
                <div className="patient">
                  <img src={appointment.profilepic} alt="Patient" />
                  <h2>{appointment.username}</h2>
                  <div className="illness">
                    <p>{appointment.illness || "No details provided"}</p>
                    <p>{appointment.phonenumber || "No details provided"}</p>
                  </div>
                </div>
                <div className="btns">
                  <button className="accept" onClick={() => done(appointment)}>Mark as Done</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        : null}
    </div>
  );
};

export default Doctor_DashBoard;

import React, { useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const FindDoctorAccount = () => {
        useEffect(()=>{
            if(window.localStorage.getItem("doctor")){
                Navigate('/')
            }
        },[])
    const Navigate = useNavigate();
    const validateForm = async ()=> {
        const allField = document.querySelectorAll("input");
        const errors = document.querySelectorAll(".error");
        if(allField[0].value.length == 0){
            errors[0].style.display = "flex";
            return;
        }else {
            errors[0].style.display = "none";
            if(!allField[0].value.match(/\w+(\d+)?@gmail.com/)){
                errors[1].style.display = "flex";
                return;
            }else {
                errors[1].style.display = "none";
                if(allField[1].value < 5){
                    errors[2].style.display = "flex";
                    return;
                }else {
                    errors[2].style.display = "none";
                }
            }
        }

        try {
            const res = await axios.get("https://prescripto-backend.up.railway.app/mng/alldoctors");
            let doctorFound = false;
        
            for (const doctor of res.data) {
                if (doctor.email === allField[0].value) {
                    doctorFound = true;
        
                    if (doctor.password !== allField[1].value) {
                        document.querySelector(".message1").style.display = "flex";
                        return;
                    }
        
                    // Store doctor ID in localStorage
                    window.localStorage.setItem("doctor", doctor._id);
                    Navigate('/')
                    return;
                }
            }
        
            if (!doctorFound) {
                console.log("No doctor with this email.");
                document.querySelector(".message1").style.display = "flex";
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            document.querySelector(".message1").style.display = "flex";
        }
        
        }
        const show =  ()=> {
            document.querySelector(".message1").style.display = "none"
        }
  return (
<div className='container'>
    <div className="message1" onClick={show}>
        <h1>Email  OR  Password  Error</h1>
    </div>
            <div className="login-field">
                <div className="login">
                    <h1>Find Doctor Account</h1>
                    <p>Easy Find Your Doctor Account</p>
                    <form>
                        <div className="field">
                            <span>Email</span>
                            <br />
                            <input type="email" required />
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Fill This Field</p>
                            </span>
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Enter A Valid Email</p>
                            </span>
                        </div>
                        <div className="field">
                            <span>Password</span>
                            <br />
                            <input type="password" required />
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Fill This Field</p>
                            </span>
                        </div>
                        <button type="button" onClick={validateForm}>
                            Find account
                        </button>
                    </form>
                </div>
            </div>
        </div>
  );
};

export default FindDoctorAccount;
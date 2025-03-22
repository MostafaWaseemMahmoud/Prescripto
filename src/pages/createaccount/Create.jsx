import React, { useEffect, useState } from 'react';
import Header from '../../component/Header/Header';
import './create.css';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const formData = new FormData();
    const Navigate = useNavigate();
    const [Types,SetTypes] = useState([]);
    const checkfileAvillablity = ()=> {
        const allFields = document.querySelectorAll("input");
        const fileInput = document.querySelector("#fileField");
        if (!fileInput.files || fileInput.files.length === 0) {
            window.document.querySelector(".hh").textContent = "Please Upload An  Profile Image!"
            window.document.querySelector(".hh").style.color = "red"
            return false;
        }else{
            window.document.querySelector(".hh").textContent = "Image Uploded!"
            window.document.querySelector(".hh").style.color = "green"
            return true;
        }
        
    }


    const get_All_Ilness_Type = async()=> {
        const res = await axios.get("https://prescripto-backend.up.railway.app/def/page");
        SetTypes(res.data.types);
    }

    useEffect(()=>{
        if(window.localStorage.getItem("patient")){
            Navigate('/')
        }else {
            get_All_Ilness_Type()
        }
    },[])
    
    const validateForm = async () => {
        const fileInput = document.querySelector("#fileField");
        const allFields = document.querySelectorAll("input");
        const allErrors = document.querySelectorAll(".error");
        const Avillablity = checkfileAvillablity();
        if(!Avillablity) {
            return;
        }

            const field1 = allFields[0];
            if(field1.value.length == 0 || field1.value.length <= 3){
                console.log("No Full Data");
                allErrors[0].style.display = "flex"
                return
            }else {
                if(allErrors[0].style.display == "flex"){
                    allErrors[0].style.display = "none"
                }
                // Validate next Form Index [1]
                if(allFields[1].value.length == 0){                    
                    console.log("No Full Data");
                    allErrors[1].style.display = "flex"
                    return
                }else {
                    allErrors[1].style.display = "none"
                    formData.append("username", allFields[0].value)
                    if(!allFields[1].value.match(/\w+(\d+)?@gmail.com/)){
                        console.log("No Full Data");
                        allErrors[2].style.display = "flex"
                        return
                    }else {
                        allErrors[2].style.display = "none";
                        const res = await axios.get("https://prescripto-backend.up.railway.app/mng/allpatients");
                        for (let i = 0; i < res.data.length; i++) {
                            const doctor = res.data[i];
                            if(doctor.email === allFields[1].value){
                                console.log("This Email Already Exist");
                                allFields[1].value = "This Email Already Exist";
                                allFields[1].style.color = "red";
                                return 
                            }
                        };
                        formData.append("email", allFields[1].value)
                        allFields[1].value = allFields[1].value;
                        allFields[1].style.color = "unset";
                        // Validate next Form
                        if(allFields[2].value.length == 0 || !allFields[2].value.match(/010\d\d\d\d\d\d\d\d/)){
                            allErrors[3].style.display = "flex";
                            return
                        }else {
                            allErrors[3].style.display = "none";
                            formData.append("phonenumber", allFields[2].value)
                            // Validate Next Field
                            if(allFields[3].value.length < 5){
                                allErrors[4].style.display = "flex";
                                return
                            }else {
                                formData.append("password", allFields[3].value)
                                allErrors[4].style.display = "none";
                                if(!document.querySelector(".selection1").value){
                                    document.querySelector(".selection1").style.color = "red"
                                    return
                                }else {
                                    formData.append("illness", allFields[4].value);
                                    formData.append("profilePic", fileInput.files[0])
                                    document.querySelector(".selection1").style.color = "green"
                                }
                            }
                        }
                    }
                }
            }

        // Log FormData for debugging
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        try {
            const response = await axios.post(
                "https://prescripto-backend.up.railway.app/signup/patient",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            window.localStorage.setItem("patient" , response.data._id);
            Navigate("/");
        } catch (error) {
            console.error("Error: ", error.response ? error.response.data : error.message);
            alert("Error creating account. Please try again.");
        }
    };

    return (
        <div className='container'>
            <div className="login-field">
                <div className="login">
                    <h1>Create Account</h1>
                    <p>Please sign up to book an appointment</p>
                    <form>
                        <div className="field">
                            <span>Full Name</span>
                            <br />
                            <input type="text" required />
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Fill This Field</p>
                            </span>
                        </div>
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
                            <span>Phone Number</span>
                            <br />
                            <input type="text" required />
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Enter A Valid Phone Number</p>
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
                        <div className="field">
                            <span>What Kind Of A Doctor You Need</span>
                            <br />
                            {
                                Types ? (
                                    <select className="selection1" id="cars" name="cars">
                                        {
                                            Types.map((t) => (
                                                <option value={t} key={t}>
                                                    {t} 
                                                </option>
                                            ))
                                        }
                                    </select>
                                ) : (
                                    <h1>Loading</h1>
                                )
                            }

                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Fill This Field</p>
                            </span>
                        </div>
                        <div className="field1">
                            <label htmlFor="fileField" className='hh'>Upload Profile Image</label>
                            <input type="file" id="fileField" onChange={checkfileAvillablity}required />
                        </div>
                        <button type="button" onClick={validateForm}>
                            Create account
                        </button>
                    </form>
                    <p className="outLink">Are You Doctor? <a onClick={()=>Navigate("/create/doctor")}>Create Doctor Account</a></p>
                    <p className="outLink">Already have An Account: <a onClick={()=>Navigate("/findaccount")}>Find It</a></p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;

import React, { useState } from "react";
import { sendOtp, verifyOtp, setPassword } from "../../apiconfig/apiService";
import "../../all_css/UserRegister.css";

const UserRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: send OTP
  const handleSendOtp = async () => {
    try {
      const res = await sendOtp({ name: formData.name, mobile: formData.mobile, email: formData.email });
      console.log(res);
      setStep(2);
    } catch (err) {
      console.error(err);
    }
  };

  // Step 2: verify OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp({ mobile: formData.mobile, otp: formData.otp });
      console.log(res);
      setStep(3);
    } catch (err) {
      console.error(err);
    }
  };

  // Step 3: set password
  const handleSetPassword = async () => {
    try {
      const res = await setPassword({
        mobile: formData.mobile,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      console.log(res);
      alert("Registration complete!");
      setStep(1);
      setFormData({ name: "", mobile: "", email: "", otp: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-register-form">
      {step === 1 && (
        <>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </>
      )}

      {step === 2 && (
        <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} />
      )}

      {step === 3 && (
        <>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        </>
      )}

      <div className="signupbtn">
        <button
          className="button"
          type="button"
          onClick={() => {
            if (step === 1) handleSendOtp();
            else if (step === 2) handleVerifyOtp();
            else if (step === 3) handleSetPassword();
          }}
        >
          {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Set Password"}
        </button>
      </div>
    </div>
  );
};

export default UserRegister;

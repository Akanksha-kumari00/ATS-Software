/*import LoginForm from "../components/Auth/LoginForm";
import doctorImage from "../assets/doctor.jpg";

function Login() {
  return (
    
    <div className="w-screen h-screen  flex items-center justify-center">
      <div className="w-[100%] h-screen bg-white  flex overflow-hidden">

        <div className="w-full md:w-1/2 h-screen flex items-center justify-center px-6 sm:px-10">
          <LoginForm />
        </div>
        <div className="hidden md:block md:w-1/2">
          <img
            src={doctorImage}
            alt="doctor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
export default Login;*/
import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import teamImage from "../assets/healthcare-team.png";

function Login() {
  return (
    <div className="min-h-screen bg-slate-300 flex items-center justify-center p-4">
  <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
    <div className="w-full lg:w-2/5">
      <LoginForm />
    </div>

    <div className="hidden lg:flex lg:w-3/5 bg-[#13578f] items-center justify-center p-6">
      <img
        src={teamImage}
        alt="Healthcare Team"
        className="w-full h-[90%] object-cover rounded-3xl"
      />
    </div>
  </div>
</div>
  );
}


export default Login;
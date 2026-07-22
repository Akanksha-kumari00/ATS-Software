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
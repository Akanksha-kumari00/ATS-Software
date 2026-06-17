import LoginForm from "../components/Auth/LoginForm";
import doctorImage from "../assets/doctor.jpg";

function Login() {
  return (
    /*<div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <LoginForm />
    </div>*/
    <div className="w-screen h-screen  flex items-center justify-center">
      <div className="w-[100%] h-screen bg-white  flex overflow-hidden">

        {/* Left Side */}
        <div className="w-[50%] h-screen flex items-center justify-center px-10">
          <LoginForm />
        </div>

        {/* Right Side */}
        <div className="hidden md:block w-[50%]">
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

export default Login;
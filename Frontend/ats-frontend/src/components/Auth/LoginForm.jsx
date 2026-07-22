import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

function LoginForm() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Admin");
  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset

const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
  const roles = ["ADMIN", "RECRITER", "BDE"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name?.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      if (!isLogin) {
        // Register
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              role,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Account Created Successfully");
          setIsLogin(true);
        } else {
          alert(data.message);
        }

        return;
      }

      // Login
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
       localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

const handleForgotPassword = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/users/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
  alert(data.message);

  console.log("OTP sent successfully");

  setStep(2);


} else {
      alert(data.message);
    }

  } catch (err) {
    console.log(err);
    alert("Server Error");
  }
};
    
const handleVerifyOtp = () => {
  
  setStep(3);
};

const handleResetPassword = async () => {
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/users/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail,
          otp,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      setShowForgot(false);
      setStep(1);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};
  if (showForgot) {
  return (
    <div className="p-10 flex flex-col justify-center h-full">
      <div className="text-center mb-6">
        <img
          src={logo}
          alt="Logo"
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">
        Forgot Password
      </h2>


      {/* STEP 1 - Enter Email */}
      {step === 1 && (
        <>
          <input
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            placeholder="Enter Email"
            className="px-5 py-4 border border-gray-300 rounded-full mb-5 outline-none focus:border-[#13578f]"
          />

          <button
            type="button"
            onClick={handleForgotPassword}
            className="bg-[#13578f] text-white py-4 rounded-full hover:bg-[#0d4874]"
          >
            Send OTP
          </button>
        </>
      )}

      {/* STEP 2 - Verify OTP */}
      {step === 2 && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="px-5 py-4 border border-gray-300 rounded-full mb-5 outline-none focus:border-[#13578f]"
          />

          <button
            type="button"
            onClick={handleVerifyOtp} // next step me banayenge
            className="bg-[#13578f] text-white py-4 rounded-full hover:bg-[#0d4874]"
          >
            Verify OTP
          </button>
        </>
      )}

      {/* STEP 3 - Reset Password */}
      {step === 3 && (
        <>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="px-5 py-4 border border-gray-300 rounded-full mb-5 outline-none focus:border-[#13578f]"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="px-5 py-4 border border-gray-300 rounded-full mb-5 outline-none focus:border-[#13578f]"
          />

          <button
            type="button"
            onClick={handleResetPassword} // next step me banayenge
            className="bg-[#13578f] text-white py-4 rounded-full hover:bg-[#0d4874]"
          >
            Reset Password
          </button>
        </>
      )}

      <button
        onClick={() => {
          setShowForgot(false);
          setStep(1);
          setForgotEmail("");
          setOtp("");
          setNewPassword("");
          setConfirmPassword("");
        }}
        className="mt-5 text-[#13578f]"
      >
        Back To Login
      </button>
    </div>
  );
}

  return (
    <div className="p-6 lg:p-5 flex flex-col justify-center min-h-full overflow-y-auto">
      <div className="w-28 h-28 rounded-full bg-white overflow-hidden mx-auto p-2 flex items-center justify-center">
        <img
          src={logo}
          alt="DCS Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-4xl font-bold text-center mb-3">
        {isLogin ? "Welcome Back!" : "Create Account"}
      </h1>

      <p className="text-gray-500 text-center mb-8">
        {isLogin
          ? "Login to DCS Healthcare ATS Portal and manage candidates efficiently."
          : "Create your account to access the DCS Healthcare ATS Portal."}
      </p>

      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {roles.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRole(item)}
            className={`px-6 py-3 rounded-full ${
              role === item
                ? "bg-[#13578f] text-white"
                : "bg-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="px-5 py-4 border border-gray-300 rounded-full"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="px-5 py-4 border border-gray-300 rounded-full"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="px-5 py-4 border border-gray-300 rounded-full"
          required
        />

        {isLogin && (
          <button
            type="button"
            onClick={() => setShowForgot(true)}
            className="text-right text-[#13578f]"
          >
            Forgot Password?
          </button>
        )}

        <button
          type="submit"
          className="bg-[#13578f] text-white py-4 rounded-full"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <div className="text-center mt-6">
        {isLogin ? (
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-[#13578f] font-semibold"
            >
              Create Account
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setIsLogin(true)}
              className="text-[#13578f] font-semibold"
            >
              Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
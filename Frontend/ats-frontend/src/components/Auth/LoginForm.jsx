import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

function LoginForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Admin");
  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const roles = ["Admin", "Recruiter", "BDE"];
const handleSubmit = (e) => {
  e.preventDefault();

  const name = e.target.name?.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  if (!isLogin) {
    const accounts =
      JSON.parse(localStorage.getItem("accounts")) || [];

    const existingUser = accounts.find(
      (acc) => acc.email === email
    );

    if (existingUser) {
      alert("Account already exists");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role,
    };

    accounts.push(newUser);

    localStorage.setItem(
      "accounts",
      JSON.stringify(accounts)
    );

    alert("Account Created Successfully");
    setIsLogin(true);
    return;
  }

  const accounts =
    JSON.parse(localStorage.getItem("accounts")) || [];

  const user = accounts.find(
    (acc) =>
      acc.email === email &&
      acc.password === password &&
      acc.role === role
  );

  if (user) {
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  navigate("/dashboard");
} else {
  alert("Invalid Email, Password or Role");
}

   
}
  // FORGOT PASSWORD SCREEN
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

        <input
          type="email"
          placeholder="Enter Email"
          className="px-5 py-4 border border-gray-300 rounded-full mb-5 outline-none focus:border-[#13578f]"
        />

        <button className="bg-[#13578f] text-white py-4 rounded-full hover:bg-[#0d4874] transition">
          Send Reset Link
        </button>

        <button
          onClick={() => setShowForgot(false)}
          className="mt-5 text-[#13578f] font-medium"
        >
          Back To Login
        </button>
      </div>
    );
  }

  return (
   <div className="p-6 lg:p-5 flex flex-col justify-center min-h-full overflow-y-auto">
      {/* Logo */}
      <div className="w-28 h-28 rounded-full bg-white overflow-hidden mx-auto p-2 flex items-center justify-center">
  <img
    src={logo}
    alt="DCS Logo"
    className="w-full h-full object-contain"
  />
</div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-3">
        {isLogin ? "Welcome Back!" : "Create Account"}
      </h1>

      <p className="text-gray-500 text-center mb-8">
        {isLogin
          ? "Login to DCS Healthcare ATS Portal and manage candidates efficiently."
          : "Create your account to access the DCS Healthcare ATS Portal."}
      </p>

      {/* Roles */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {roles.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRole(item)}
            className={`px-6 py-3 rounded-full transition ${
              role === item
                ? "bg-[#13578f] text-white"
                : "bg-gray-200 hover:-translate-y-1"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="px-5 py-4 border border-gray-300 rounded-full outline-none focus:border-[#13578f]"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="px-5 py-4 border border-gray-300 rounded-full outline-none focus:border-[#13578f]"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="px-5 py-4 border border-gray-300 rounded-full outline-none focus:border-[#13578f]"
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
          className="bg-[#13578f] text-white py-4 rounded-full text-lg hover:bg-[#0d4874] transition"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      {/* Toggle Login/Create Account */}
      <div className="text-center mt-6">
        {isLogin ? (
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-[#13578f] font-semibold"
            >
              Create Account
            </button>
          </p>
        ) : (
          <p className="text-gray-600">
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

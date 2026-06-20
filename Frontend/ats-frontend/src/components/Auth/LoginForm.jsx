import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name?.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // CREATE ACCOUNT
    if (!isLogin) {
      const account = {
        name,
        email,
        password,
        role,
      };
      localStorage.setItem(
        "account",
        JSON.stringify(account)
      );
      alert("Account Created Successfully");
      setIsLogin(true);
      return;
    }

    // LOGIN
    const savedAccount = JSON.parse(
      localStorage.getItem("account")
    );
    if (!savedAccount) {
      alert("Please create account first");
      return;
    }
    if (
      savedAccount.email === email &&
      savedAccount.password === password
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          role: savedAccount.role,
        })
      );
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };
  // FORGOT PASSWORD
  if (showForgot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-full bg-cyan-400"></div>
            <h1 className="text-2xl font-bold">
              DCS
            </h1>
          </div>
          <h2 className="text-center text-2xl font-semibold mb-8">
            FORGOT PASSWORD
          </h2>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border rounded-lg p-3 mb-6"
          />
          <button
            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600"
          >
            Send Reset Link
          </button>
          <button
            onClick={() => setShowForgot(false)}
            className="w-full mt-5 text-cyan-600"
          >
            Back To Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5">
        <h2 className="text-center text-2xl font-semibold mb-6">
          {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2">
              Login As
            </label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            >

              <option value="admin">
                Admin
              </option>
              <option value="recruiter">
                Recruiter
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Passwor
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>
          {isLogin && (
            <div className="text-right mb-5">
              <button
                type="button"
                onClick={() =>
                  setShowForgot(true)
                }
                className="text-cyan-600 text-sm"
              >
                Forgot Password?
              </button>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600"
          >

            {isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </form>
        <div className="text-center mt-6">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() =>
                  setIsLogin(false)
                }
                className="text-cyan-600 font-semibold"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() =>
                  setIsLogin(true)
                }
                className="text-cyan-600 font-semibold"
              >
                Sign In
              </button>
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default LoginForm;
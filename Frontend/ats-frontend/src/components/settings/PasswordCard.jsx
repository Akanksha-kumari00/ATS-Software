import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

function PasswordCard() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New password and Confirm password do not match.");
      return;
    }

    // Backend API yaha call hogi
    console.log(form);

    alert("Password update feature will be connected with backend.");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <div className="flex items-center gap-2 mb-5">
        <Lock size={20} />
        <h2 className="text-lg font-semibold">
          Change Password
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Current Password
          </label>

          <div className="relative">
            <input
              type={show.current ? "text" : "password"}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShow({
                  ...show,
                  current: !show.current,
                })
              }
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium mb-2">
            New Password
          </label>

          <div className="relative">
            <input
              type={show.new ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShow({
                  ...show,
                  new: !show.new,
                })
              }
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShow({
                  ...show,
                  confirm: !show.confirm,
                })
              }
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}

export default PasswordCard;
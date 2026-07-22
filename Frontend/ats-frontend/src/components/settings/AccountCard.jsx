import { useState, useEffect } from "react";
import axios from "axios";
import { Camera, Eye, EyeOff } from "lucide-react";

function AccountCard() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

const [user, setUser] = useState({
  name: "",
  email: "",
  role: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  profile_image: "",
});
const [imageFile, setImageFile] = useState(null);
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        profile_image: res.data.profile_image
          ? `http://localhost:5000/uploads/profile/${res.data.profile_image}`
          : "",
      }));

    } catch (err) {
      console.log(err);
    }
  };

  fetchProfile();
}, []);

const handleImage = (e) => {
  const file = e.target.files[0];

  if (file) {
    setImageFile(file);

    setUser((prev) => ({
      ...prev,
      profile_image: URL.createObjectURL(file), 
    }));
  }
};

const handleSave = async () => {
  try {
    // Confirm Password Validation
    if (
      user.newPassword &&
      user.newPassword !== user.confirmPassword
    ) {
      alert("New Password and Confirm Password do not match");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("name", user.name);

    if (imageFile) {
      formData.append("profile_image", imageFile);
    }

    if (user.currentPassword) {
      formData.append(
        "currentPassword",
        user.currentPassword
      );
    }

    if (user.newPassword) {
      formData.append(
        "newPassword",
        user.newPassword
      );
    }

    const res = await axios.put(
      "http://localhost:5000/api/users/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Update Local Storage
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    // Update UI
    setUser((prev) => ({
      ...prev,
      ...res.data.user,
      profile_image: res.data.user.profile_image
        ? `http://localhost:5000/uploads/profile/${res.data.user.profile_image}`
        : "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

    setImageFile(null);

    alert(res.data.message);

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Something went wrong"
    );
  }
};
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-1">Account</h2>
      <p className="text-gray-500 mb-8">
        Manage your account information and password
      </p>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl">👤</span>
              )}
            </div>

            <label className="absolute bottom-1 right-1 bg-white shadow rounded-full p-2 cursor-pointer">
              <Camera size={18} />
              <input
                type="file"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>

          <label className="mt-4 border px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50">
            Change Photo
            <input
              type="file"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value })
                }
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">Email Address</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
              />
            </div>

            <div className="relative">
              <label className="font-medium">
                Current Password
              </label>

              <input
                type={showCurrent ? "text" : "password"}
                value={user.currentPassword}
                onChange={(e) =>
                  setUser({
                    ...user,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3 mt-2"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-[42px] text-gray-500"
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <label className="font-medium">
                New Password
              </label>
              
              <input
                type={showNew ? "text" : "password"}
                value={user.newPassword}
                onChange={(e) =>
                  setUser({
                    ...user,
                    newPassword: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3 mt-2"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-11"
              >
                {showNew ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <div className="relative">
              <label className="font-medium">
                Confirm Password
              </label>

              <input
                type={showConfirm ? "text" : "password"}
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({
                    ...user,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3 mt-2"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-11"
              >
                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
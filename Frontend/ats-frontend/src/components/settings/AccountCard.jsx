import { useState } from "react";

function AccountCard() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    profile_image: ""
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      <h2 className="text-lg font-semibold mb-5">
        Account
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <div>
          <label>Name</label>

          <input
            type="text"
            value={user.name}
            onChange={(e)=>
              setUser({...user,name:e.target.value})
            }
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border rounded-lg p-2 mt-1 bg-gray-100"
          />
        </div>

        <div>
          <label>Role</label>

          <input
            type="text"
            value={user.role}
            disabled
            className="w-full border rounded-lg p-2 mt-1 bg-gray-100"
          />
        </div>

      </div>

      <div className="flex justify-end mt-6">

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Save Profile
        </button>

      </div>

    </div>
  );
}

export default AccountCard;
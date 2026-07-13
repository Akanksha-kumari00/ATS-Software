import { useState } from "react";
import { Settings2 } from "lucide-react";

function PreferenceCard() {
  const [preferences, setPreferences] = useState({
    tableRows: "25",
    theme: "light",
    language: "English",
    dateFormat: "DD/MM/YYYY",
  });

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log(preferences);
    alert("Preferences saved successfully.");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mt-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white">
          <Settings2 size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Preferences
          </h2>

          <p className="text-gray-500 text-sm">
            Customize your application preferences
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Table Rows */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Table Rows
          </label>

          <select
            name="tableRows"
            value={preferences.tableRows}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Theme
          </label>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={preferences.theme === "light"}
                onChange={handleChange}
              />
              <span>Light</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-gray-400">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={preferences.theme === "dark"}
                onChange={handleChange}
              />
              <span>Dark (Coming Soon)</span>
            </label>
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>

          <select
            name="language"
            value={preferences.language}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Format
          </label>

          <select
            name="dateFormat"
            value={preferences.dateFormat}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default PreferenceCard;
import { useState } from "react";
import { Settings2 } from "lucide-react";

function PreferenceCard() {
  const [preferences, setPreferences] = useState({
    tableRows: "10",
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
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <div className="flex items-center gap-2 mb-5">
        <Settings2 size={20} />
        <h2 className="text-lg font-semibold">
          Preferences
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Table Rows */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Default Table Rows
          </label>

          <select
            name="tableRows"
            value={preferences.tableRows}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10">10 Rows</option>
            <option value="25">25 Rows</option>
            <option value="50">50 Rows</option>
            <option value="100">100 Rows</option>
          </select>
        </div>
        {/* Language */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Language
          </label>
          <select
            name="language"
            value={preferences.language}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        {/* Date Format */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Date Format
          </label>
          <select
            name="dateFormat"
            value={preferences.dateFormat}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DD/MM/YYYY">
              DD/MM/YYYY
            </option>
            <option value="MM/DD/YYYY">
              MM/DD/YYYY
            </option>
            <option value="YYYY-MM-DD">
              YYYY-MM-DD
            </option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default PreferenceCard;
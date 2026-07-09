import { useState } from "react";
import { Bell } from "lucide-react";

function NotificationCard() {
  const [notifications, setNotifications] = useState({
    interviewReminder: true,
    candidateStatus: true,
    emailNotification: true,
  });
  const handleToggle = (field) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const handleSave = () => {
    console.log(notifications);
    alert("Notification settings saved successfully.");
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <div className="flex items-center gap-2 mb-5">
        <Bell size={20} />
        <h2 className="text-lg font-semibold">
          Notifications
        </h2>
      </div>

      <div className="space-y-5">

        <label className="flex items-center justify-between border rounded-lg p-4">

          <div>
            <p className="font-medium">
              Interview Reminder
            </p>

            <p className="text-sm text-gray-500">
              Receive reminder before interview.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifications.interviewReminder}
            onChange={() =>
              handleToggle("interviewReminder")
            }
            className="h-5 w-5"
          />
        </label>
        <label className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <p className="font-medium">
              Candidate Status Update
            </p>
            <p className="text-sm text-gray-500">
              Notify when candidate status changes.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifications.candidateStatus}
            onChange={() =>
              handleToggle("candidateStatus")
            }
            className="h-5 w-5"
          />
        </label>
        <label className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <p className="font-medium">
              Email Notification
            </p>
            <p className="text-sm text-gray-500">
              Receive email notifications.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifications.emailNotification}
            onChange={() =>
              handleToggle("emailNotification")
            }
            className="h-5 w-5"
          />
        </label>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
export default NotificationCard;
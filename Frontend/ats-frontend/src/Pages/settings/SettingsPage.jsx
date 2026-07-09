import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import LayoutHeader from "../../components/layout/LayoutHeader";
import AccountCard from "../../components/settings/AccountCard";
import PasswordCard from "../../components/settings/PasswordCard";
import NotificationCard from "../../components/settings/NotificationCard";
import PreferenceCard from "../../components/settings/PreferenceCard";

function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="p-2 max-w-6xl mx-auto">
            <LayoutHeader />
          {/* Page Title */}
          <div className="mb-3">
            <h1 className="text-2xl font-bold text-gray-800">
              Settings
            </h1>
            <p className="text-sm text-gray-500">
              Manage your account and application preferences.
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-6">
            <AccountCard />
            <PasswordCard />
            <NotificationCard />
            <PreferenceCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
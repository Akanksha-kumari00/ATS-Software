import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import AccountCard from "../../components/settings/AccountCard";
import NotificationCard from "../../components/settings/NotificationCard";
import PreferenceCard from "../../components/settings/PreferenceCard";

function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
          {/* Cards */}
          <div className="space-y-6">
            <AccountCard />
          
            <NotificationCard />
            <PreferenceCard />
          </div>
        </div>
      </div>
   
  );
}

export default SettingsPage;
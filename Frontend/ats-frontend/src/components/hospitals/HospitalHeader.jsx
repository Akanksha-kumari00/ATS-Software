import {
  Search,
  Plus,
  Building2,
  Briefcase,
  CheckCircle2,
  Clock3,
  Users,

  RotateCcw,
} from "lucide-react";
export default function HospitalHeader({
  stats,
  hospitals = [],
  search,
  setSearch,
  filters,
  setFilters,
  onAddHospital,
}) {

  const cards = [
    {
      title: "Total Clients",
      value: stats?.totalClients || 0,
      icon: Building2,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Active Clients",
      value: stats?.activeClients || 0,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Open Positions",
      value: stats?.openPositions || 0,
     
      icon: Briefcase,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      title: "Placements",
      value: stats?.placements || 0,
      icon: CheckCircle2,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Pending Follow-ups",
      value: stats?.followups || 0,
      icon: Clock3,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
  ];
const states = [...new Set(
  hospitals
    .map(h => h.state)
    .filter(Boolean)
)];

const cities = [...new Set(
  hospitals
    .map(h => h.city)
    .filter(Boolean)
)];
  return (
    <div className="space-y-3">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {cards.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border p-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>
                  <h2 className="text-sm font-bold mt-1">
                    {item.value}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {item.subtitle}
                  </p>
                </div>
                <div className={`${item.bg} p-3 rounded-xl`}>
                  <Icon className={item.color} size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Filters */}
   
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {/* Search */}
          <div className="relative col-span-2">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Hospital..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-17 border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
              value={filters.state}
              onChange={(e) =>
                setFilters({ ...filters, state: e.target.value })
              }
              className="border rounded-xl px-3"
            >
              <option value="">All States</option>

              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          <select
              value={filters.city}
              onChange={(e) =>
                setFilters({ ...filters, city: e.target.value })
              }
              className="border rounded-xl px-3"
            >
            <option value="">All Cities</option>

            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
            className="border rounded-xl px-3"
          >
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Hold</option>
          </select>
          <div className="flex gap-3">
            <button
          onClick={onAddHospital}
          className="flex items-center  bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Add Hospital
        </button>
            <button
              onClick={() => {
                setSearch("");
                setFilters({
                  state: "",
                  city: "",
                  status: "",
                });
              }}
              className="border rounded-xl px-4 hover:bg-slate-50"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
   
    </div>
  );
}

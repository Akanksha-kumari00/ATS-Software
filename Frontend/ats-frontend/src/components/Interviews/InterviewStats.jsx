import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function InterviewStats({ stats }) {
  const cards = [
    {
      title: "Today's Interviews",
      value: stats?.today || 0,
      icon: <CalendarDays size={20} />,
      bg: "bg-blue-500",
    },
    {
      title: "Upcoming",
      value: stats?.upcoming || 0,
      icon: <Clock3 size={20} />,
      bg: "bg-orange-500",
    },
    {
      title: "Completed",
      value: stats?.completed || 0,
      icon: <CheckCircle2 size={20} />,
      bg: "bg-green-500",
    },
    {
      title: "Cancelled",
      value: stats?.cancelled || 0,
      icon: <XCircle size={20} />,
      bg: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-4 flex items-center gap-4 hover:shadow-md transition"
        >
          <div
            className={`${card.bg} w-12 h-12 rounded-xl flex items-center justify-center text-white`}
          >
            {card.icon}
          </div>

          <div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {card.value}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
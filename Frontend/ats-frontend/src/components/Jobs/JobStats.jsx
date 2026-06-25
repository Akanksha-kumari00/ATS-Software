export default function JobStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <Card title="Total Positions" value="24" color="blue" />
      <Card title="Open Positions" value="18" color="green" />
      <Card title="On Hold" value="3" color="orange" />
      <Card title="Closed Positions" value="3" color="red" />

    </div>
  );
}

function Card({ title, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className={`p-4 rounded-xl shadow-sm ${colors[color]}`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
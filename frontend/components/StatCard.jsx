export default function StatCard({ title, value, color }) {
  return (
    <div className={`flex-1 p-5 rounded text-white ${color}`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}

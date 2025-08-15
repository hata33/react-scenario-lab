export default function BarChart() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">柱状图</h2>
      <div className="h-48 grid grid-cols-6 items-end gap-2">
        {[30, 60, 40, 80, 55, 35].map((h, i) => (
          <div key={i} className="bg-gray-900 rounded" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}



export default function PieChart() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">饼图</h2>
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 32 32" className="w-full h-full rotate-[-90deg]">
          <circle r="16" cx="16" cy="16" fill="#e5e7eb"></circle>
          <circle r="16" cx="16" cy="16" fill="transparent" stroke="#111827" strokeWidth="32" strokeDasharray="25 75"></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg">25%</div>
      </div>
    </div>
  )
}



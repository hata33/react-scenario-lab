export default function LineChart() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">折线图</h2>
      <svg className="w-full h-48 bg-white rounded border" viewBox="0 0 100 40" preserveAspectRatio="none">
        <polyline fill="none" stroke="#111827" strokeWidth="2" points="0,30 10,25 20,28 30,20 40,22 50,18 60,24 70,15 80,22 90,18 100,12" />
      </svg>
    </div>
  )
}



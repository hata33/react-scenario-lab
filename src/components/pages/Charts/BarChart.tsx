export default function BarChart() {
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">柱状图</h2>
			<div className="grid h-48 grid-cols-6 items-end gap-2">
				{[30, 60, 40, 80, 55, 35].map((h, i) => (
					<div key={i} className="rounded bg-gray-900" style={{ height: `${h}%` }} />
				))}
			</div>
		</div>
	);
}

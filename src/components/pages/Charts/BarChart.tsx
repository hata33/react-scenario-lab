export default function BarChart() {
	return (
		<div>
			<h2 className="mb-4 font-semibold text-responsive-base md:text-responsive-xl">柱状图</h2>
			<div className="grid h-32 grid-cols-2 items-end gap-2 sm:h-48 sm:grid-cols-3 md:h-64 md:grid-cols-4 lg:grid-cols-6">
				{[30, 60, 40, 80, 55, 35].map((h, i) => (
					<div
						key={i}
						className="cursor-pointer rounded bg-gray-900 transition-transform active:scale-95"
						style={{ height: `${h}%` }}
					/>
				))}
			</div>
		</div>
	);
}

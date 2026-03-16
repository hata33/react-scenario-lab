export default function PieChart() {
	return (
		<div>
			<h2 className="mb-4 font-semibold text-responsive-base md:text-responsive-xl">饼图</h2>
			<div className="relative mx-auto h-32 w-32 cursor-pointer transition-transform active:scale-95 sm:h-48 sm:w-48 md:h-64 md:w-64">
				<svg viewBox="0 0 32 32" className="h-full w-full rotate-[-90deg]">
					<circle r="16" cx="16" cy="16" fill="#e5e7eb"></circle>
					<circle
						r="16"
						cx="16"
						cy="16"
						fill="transparent"
						stroke="#111827"
						strokeWidth="32"
						strokeDasharray="25 75"
					></circle>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center text-responsive-sm md:text-responsive-base">
					25%
				</div>
			</div>
		</div>
	);
}

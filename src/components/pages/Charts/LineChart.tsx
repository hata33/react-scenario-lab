export default function LineChart() {
	return (
		<div>
			<h2 className="mb-4 font-semibold text-responsive-base md:text-responsive-xl">折线图</h2>
			<svg
				className="h-32 w-full rounded border bg-white sm:h-48 md:h-64"
				viewBox="0 0 100 40"
				preserveAspectRatio="none"
			>
				<polyline
					fill="none"
					stroke="#111827"
					strokeWidth="2"
					className="cursor-pointer transition-opacity hover:opacity-80"
					points="0,30 10,25 20,28 30,20 40,22 50,18 60,24 70,15 80,22 90,18 100,12"
				/>
			</svg>
		</div>
	);
}

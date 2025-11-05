import { useMemo, useRef, useState } from "react";

const DATA = Array.from({ length: 10000 }).map((_, i) => `Row ${i + 1}`);

export default function VirtualList() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const rowHeight = 32;
	const [scrollTop, setScrollTop] = useState(0);
	const visibleCount = 12;

	const startIndex = Math.floor(scrollTop / rowHeight);
	const endIndex = startIndex + visibleCount;
	const offsetyoY = startIndex * rowHeight;
	const visibleData = useMemo(() => DATA.slice(startIndex, endIndex), [startIndex, endIndex]);

	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">虚拟列表</h2>
			<div
				ref={containerRef}
				onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
				className="h-96 overflow-auto rounded border bg-white"
			>
				<div style={{ height: DATA.length * rowHeight }}>
					<div style={{ transform: `translateY(${offsetyoY}px)` }}>
						{visibleData.map((text, _i) => (
							<div key={startIndex + text} className="px-3" style={{ height: rowHeight, lineHeight: `${rowHeight}px` }}>
								{text}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

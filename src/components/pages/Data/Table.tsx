const rows = Array.from({ length: 8 }).map((_, i) => ({
	id: i + 1,
	name: `Item ${i + 1}`,
	price: (Math.random() * 100).toFixed(2),
}));

export default function Table() {
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">表格</h2>

			{/* 移动端卡片视图 / 桌面端表格视图 */}
			<div className="overflow-x-auto rounded border">
				<table className="w-full min-w-[560px]">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-3 text-left font-medium">ID</th>
							<th className="px-4 py-3 text-left font-medium">名称</th>
							<th className="px-4 py-3 text-left font-medium">价格</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr key={r.id} className="odd:bg-white even:bg-gray-50">
								<td className="px-4 py-3">{r.id}</td>
								<td className="px-4 py-3">{r.name}</td>
								<td className="px-4 py-3 font-medium">{r.price}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* 移动端卡片视图 - 响应式显示 */}
			<div className="mt-4 grid gap-3 md:hidden lg:hidden">
				{rows.map((r) => (
					<div
						key={r.id}
						className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm transition-transform active:scale-[0.99]"
					>
						<div>
							<p className="text-gray-600 text-sm">ID: {r.id}</p>
							<p className="font-medium text-gray-900">{r.name}</p>
						</div>
						<span className="font-semibold text-blue-600">{r.price}</span>
					</div>
				))}
			</div>
		</div>
	);
}

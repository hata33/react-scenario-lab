const rows = Array.from({ length: 8 }).map((_, i) => ({ id: i + 1, name: `Item ${i + 1}`, price: (Math.random() * 100).toFixed(2) }))

export default function Table() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">表格</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[560px] w-full border rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-3 py-2">ID</th>
              <th className="text-left px-3 py-2">名称</th>
              <th className="text-left px-3 py-2">价格</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-3 py-2">{r.id}</td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">${r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



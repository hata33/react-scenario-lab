"use client";

import { useState } from "react";
import { type Layout, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GridLayoutClient() {
  const [layout, setLayout] = useState<Layout[]>([
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
    { i: "d", x: 0, y: 2, w: 2, h: 2 },
    { i: "e", x: 2, y: 2, w: 2, h: 4 },
    { i: "f", x: 4, y: 2, w: 1, h: 2 },
  ]);

  const handleLayoutChange = (layout: Layout[]) => {
    setLayout(layout);
  };

  const generateDOM = () => {
    return layout.map((item, i) => (
      <div
        key={item.i}
        className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-700 text-lg shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        {item.i.toUpperCase()}
      </div>
    ));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 dark:bg-gray-900">
      <h1 className="mb-4 font-bold text-2xl text-gray-800 dark:text-gray-200">Grid Layout Demo</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Drag and resize the grid items below. Static items cannot be moved.
      </p>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        isDraggable={true}
        isResizable={true}
        useCSSTransforms={true}
        compactType="vertical"
        preventCollision={false}
      >
        {generateDOM()}
      </ResponsiveGridLayout>
    </div>
  );
}

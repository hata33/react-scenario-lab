import Image from "next/image";
import { useMemo, useState } from "react";
import img1 from "@/assets/imgs/LiquidGlass-bg/1.webp";
import img2 from "@/assets/imgs/LiquidGlass-bg/2.webp";
import img3 from "@/assets/imgs/LiquidGlass-bg/3.webp";

const images = [img1, img2, img3];

export default function LiquidGlass() {
  const [index, setIndex] = useState(0);
  const [intensity, setIntensity] = useState(16);
  const bg = images[index % images.length];
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [hovering, setHovering] = useState(false);
  const lensSize = 160;

  const glassStyle = useMemo(
    () =>
      ({
        backdropFilter: `blur(${intensity}px) saturate(140%)`,
        WebkitBackdropFilter: `blur(${intensity}px) saturate(140%)`,
        background:
          "linear-gradient(135deg, rgba(255,255,255,.25), rgba(255,255,255,.05))",
        border: "1px solid rgba(255,255,255,.3)",
        boxShadow: "0 10px 30px rgba(0,0,0,.12)",
      } as React.CSSProperties),
    [intensity]
  );

  const lensStyle = useMemo(
    () =>
      ({
        width: `${lensSize}px`,
        height: `${lensSize}px`,
        left: `${(cursor?.x ?? 0) - lensSize / 2}px`,
        top: `${(cursor?.y ?? 0) - lensSize / 2}px`,
        borderRadius: "9999px",
        backdropFilter: `blur(${intensity}px) saturate(140%)`,
        WebkitBackdropFilter: `blur(${intensity}px) saturate(140%)`,
        background:
          "linear-gradient(135deg, rgba(255,255,255,.35), rgba(255,255,255,.08))",
        border: "1px solid rgba(255,255,255,.4)",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        position: "fixed",
        pointerEvents: "none",
        zIndex: 40,
        transform: "translateZ(0)",
      } as React.CSSProperties),
    [cursor, intensity]
  );

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      {/* 三张背景图纵向平铺，每张占满一屏高度，无边距 */}
      <section className="relative w-full h-screen">
        <Image
          src={images[0]}
          alt="liquid-glass-bg-1"
          fill
          priority
          className="object-cover"
        />
      </section>

      <section className="relative w-full h-screen">
        <Image
          src={images[1]}
          alt="liquid-glass-bg-2"
          fill
          className="object-cover"
        />
      </section>

      <section className="relative w-full h-screen">
        <Image
          src={images[2]}
          alt="liquid-glass-bg-3"
          fill
          className="object-cover"
        />
      </section>

      {/* 固定在屏幕中心的玻璃卡片 - 使用 fixed 但不覆盖整个屏幕 */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <div
          className="rounded-3xl w-96 p-8 text-gray-800"
          style={glassStyle}
        >
          <h2 className="text-2xl font-semibold">Liquid Glass</h2>
          <p className="mt-2 text-sm text-gray-700">
            固定的玻璃卡片，背景滚动时卡片保持居中位置。
          </p>
          <div className="mt-6">
            <label className="text-sm text-gray-600">
              模糊强度：{intensity}px
            </label>
            <input
              className="block w-full mt-2"
              type="range"
              min={0}
              max={30}
              step={1}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
            />
          </div> 
        </div>
      </div>

      {/* 跟随鼠标的圆形玻璃块 */}
      {hovering && cursor && <div style={lensStyle} />}

      {/* 说明区域固定在底部左侧，避免遮挡主卡片 */}
      <div className="fixed left-6 bottom-6 z-20 p-4 rounded-xl border bg-white/70 backdrop-blur">
        <h3 className="text-sm font-medium mb-1">说明</h3>
        <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-700 max-w-sm">
          <li>三张背景图垂直平铺（每屏一张），滚动查看效果。</li>
          <li>玻璃卡片固定在屏幕中心，不随滚动移动。</li>
          <li>鼠标有圆形玻璃块跟随，可与背景产生折射模糊效果。</li>
        </ul>
      </div>
    </div>
  );
}

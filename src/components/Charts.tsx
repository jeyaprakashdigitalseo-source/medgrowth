import React, { useState, useRef, useEffect } from "react";
import { TrendingUp, PieChart, BarChart2, DollarSign, Users, Award } from "lucide-react";

// Types
interface MonthlyData {
  month: string;
  spend: number;
  leads: number;
  appointments: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
  rawLabel?: string;
}

// Line Chart
export function MonthlySpendChart({ data }: { data: MonthlyData[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const padding = { top: 30, right: 20, bottom: 30, left: 55 };
  const width = 680;
  const height = 240;

  const maxVal = Math.max(...data.map((d) => d.spend)) * 1.15 || 400000;
  const minVal = 0;

  // Generate Bezier path
  const getCoordinates = () => {
    return data.map((d, idx) => {
      const x = padding.left + (idx / (data.length - 1)) * (width - padding.left - padding.right);
      const y = padding.top + (1 - (d.spend - minVal) / (maxVal - minVal)) * (height - padding.top - padding.bottom);
      return { x, y };
    });
  };

  const coords = getCoordinates();

  // Create Bezier path string
  let pathString = "";
  if (coords.length > 0) {
    pathString = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const cpX1 = coords[i - 1].x + (coords[i].x - coords[i - 1].x) / 2;
      const cpY1 = coords[i - 1].y;
      const cpX2 = coords[i - 1].x + (coords[i].x - coords[i - 1].x) / 2;
      const cpY2 = coords[i].y;
      pathString += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${coords[i].x} ${coords[i].y}`;
    }
  }

  // Create Area under line path
  const areaPathString = coords.length > 0
    ? `${pathString} L ${coords[coords.length - 1].x} ${height - padding.bottom} L ${coords[0].x} ${height - padding.bottom} Z`
    : "";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find closest index
    let closestIdx = 0;
    let minDiff = Infinity;
    coords.forEach((coord, index) => {
      const diff = Math.abs(coord.x - x);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = index;
      }
    });

    setHoveredIdx(closestIdx);
    setTooltipPos({ x: coords[closestIdx].x, y: coords[closestIdx].y });
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  // Grid lines
  const gridLines = Array.from({ length: 5 }).map((_, i) => {
    const val = minVal + (maxVal - minVal) * (i / 4);
    const y = padding.top + (1 - i / 4) * (height - padding.top - padding.bottom);
    return { y, val };
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        <defs>
          <linearGradient id="spendAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="spendLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* Horizontal Gridlines & Y-Axis Labels */}
        {gridLines.map((line, i) => (
          <g key={i} className="opacity-40">
            <line
              x1={padding.left}
              y1={line.y}
              x2={width - padding.right}
              y2={line.y}
              stroke="#E2E8F0"
              strokeWidth="0.8"
              strokeDasharray={i === 0 ? "0" : "3,3"}
            />
            <text
              x={padding.left - 10}
              y={line.y + 4}
              textAnchor="end"
              className="font-mono text-[9px] font-medium text-slate-400"
            >
              ₹{Math.round(line.val / 1000)}k
            </text>
          </g>
        ))}

        {/* Shaded Area under spline */}
        <path d={areaPathString} fill="url(#spendAreaGrad)" />

        {/* Spline Curve */}
        <path
          d={pathString}
          fill="none"
          stroke="url(#spendLineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* X-Axis Labels */}
        {data.map((d, idx) => {
          const x = padding.left + (idx / (data.length - 1)) * (width - padding.left - padding.right);
          const isHovered = hoveredIdx === idx;
          return (
            <text
              key={idx}
              x={x}
              y={height - 8}
              textAnchor="middle"
              className={`text-[9.5px] font-semibold transition-colors duration-150 ${
                isHovered ? "text-blue-600 font-bold" : "text-slate-400"
              }`}
            >
              {d.month.substring(0, 3)}
            </text>
          );
        })}

        {/* Active Gridline on Hover */}
        {hoveredIdx !== null && (
          <line
            x1={coords[hoveredIdx].x}
            y1={padding.top}
            x2={coords[hoveredIdx].x}
            y2={height - padding.bottom}
            stroke="#2563EB"
            strokeWidth="1"
            strokeDasharray="4,4"
            className="opacity-50"
          />
        )}

        {/* Data points */}
        {coords.map((coord, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <g key={idx}>
              {/* Invisible touch target */}
              <circle cx={coord.x} cy={coord.y} r="14" fill="transparent" className="cursor-pointer" />
              {/* Actual dot */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r={isHovered ? "5" : "3.5"}
                fill={isHovered ? "#2563EB" : "white"}
                stroke={isHovered ? "white" : "#2563EB"}
                strokeWidth={isHovered ? "2.5" : "1.8"}
                className="transition-all duration-150 cursor-pointer"
              />
            </g>
          );
        })}
      </svg>

      {/* HTML Floating Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="absolute z-30 pointer-events-none bg-slate-900/95 backdrop-blur-md text-white rounded-xl shadow-xl shadow-slate-900/15 p-3.5 border border-slate-800 text-xs flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-100"
          style={{
            left: `${Math.min(tooltipPos.x + 15, width - 180)}px`,
            top: `${Math.min(tooltipPos.y - 20, height - 100)}px`,
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
            <span className="font-bold text-slate-300">{data[hoveredIdx].month} 2026</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 font-semibold px-1.5 py-0.2 rounded border border-blue-500/30">
              Spend Audit
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-[11px]">
            <span className="text-slate-400">Total Budget:</span>
            <span className="font-mono font-bold text-slate-100 text-right">
              ₹{data[hoveredIdx].spend.toLocaleString()}
            </span>
            <span className="text-slate-400">Leads Captured:</span>
            <span className="font-mono font-bold text-emerald-400 text-right">
              {data[hoveredIdx].leads}
            </span>
            <span className="text-slate-400">Appointments:</span>
            <span className="font-mono font-bold text-indigo-400 text-right">
              {data[hoveredIdx].appointments}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Donut Chart
export function DonutChart({
  title,
  data,
  centerLabel = "Total",
  centerValue
}: {
  title: string;
  data: CategoryData[];
  centerLabel?: string;
  centerValue?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  // SVG parameters
  const size = 180;
  const radius = 64;
  const strokeWidth = 14;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate arc values
  let currentOffset = 0;
  const segments = data.map((item) => {
    const percentage = total > 0 ? item.value / total : 0;
    const strokeDasharray = `${percentage * circumference} ${circumference}`;
    const strokeDashoffset = circumference - currentOffset;
    currentOffset += percentage * circumference;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      percentage
    };
  });

  return (
    <div className="flex flex-col xl:flex-row items-center gap-6 justify-center h-full">
      {/* Donut Graphic */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />
          {segments.map((seg, idx) => {
            const isHovered = activeIndex === idx;
            return (
              <circle
                key={seg.name}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-200 hover:opacity-95"
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            );
          })}
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            {activeIndex !== null ? segments[activeIndex].name : centerLabel}
          </span>
          <span className="text-[15px] font-extrabold text-slate-800 tracking-tight mt-0.5">
            {activeIndex !== null
              ? segments[activeIndex].rawLabel || `₹${segments[activeIndex].value.toLocaleString()}`
              : centerValue}
          </span>
          {activeIndex !== null && (
            <span className="text-[10px] font-bold text-blue-600 mt-0.5">
              {Math.round(segments[activeIndex].percentage * 100)}% of share
            </span>
          )}
        </div>
      </div>

      {/* Legend Column */}
      <div className="flex-1 w-full xl:max-w-[200px] flex flex-col justify-center space-y-2 mt-4 xl:mt-0 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
        {segments.map((seg, idx) => {
          const isHovered = activeIndex === idx;
          return (
            <div
              key={seg.name}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`flex items-center justify-between p-1.5 rounded-lg transition-all duration-150 cursor-pointer ${
                isHovered ? "bg-slate-50 border-l-4 border-l-blue-600 pl-2.5" : "hover:bg-slate-50/50 pl-2"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                <span className="text-[11px] font-semibold text-slate-600 truncate">{seg.name}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-800 font-mono">
                {seg.rawLabel || `₹${Math.round(seg.value / 1000)}k`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { MonthlyComparison } from "../types";
import { TrendingUp, TrendingDown, Info, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface ComparisonProps {
  comparisons: MonthlyComparison[];
}

export default function Comparison({ comparisons }: { comparisons: MonthlyComparison[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      {comparisons.map((comp) => {
        const isGrowthPositive = comp.growth >= 0;
        const jVal = comp.juneVal;
        const yVal = comp.julyVal;

        // Visual progress computation
        const numJ = typeof jVal === "number" ? jVal : parseFloat(String(jVal).replace(/[^0-9.]/g, ""));
        const numY = typeof yVal === "number" ? yVal : parseFloat(String(yVal).replace(/[^0-9.]/g, ""));
        const total = numJ + numY || 1;
        const ratioJuly = (numY / total) * 100;

        return (
          <div
            key={comp.id}
            className="glass-card p-5 rounded-[22px] flex flex-col justify-between hover:border-slate-300 transition-all duration-200 bg-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                {comp.metricName}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isGrowthPositive ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                }`}
              >
                {isGrowthPositive ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                    <span>+{comp.growth}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 stroke-[2.5]" />
                    <span>{comp.growth}%</span>
                  </>
                )}
              </span>
            </div>

            {/* Comparison values */}
            <div className="mt-4 grid grid-cols-2 border-b border-slate-100 pb-3 mb-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400">June 2026</span>
                <span className="font-display font-bold text-sm text-slate-600 mt-0.5">
                  {comp.isCurrency ? "₹" : ""}
                  {typeof jVal === "number" ? jVal.toLocaleString() : jVal}
                  {comp.isMultiplier ? "x" : ""}
                </span>
              </div>
              <div className="flex flex-col border-l border-slate-100 pl-3">
                <span className="text-[10px] font-bold text-slate-400">July 2026</span>
                <span className="font-display font-bold text-sm text-blue-600 mt-0.5">
                  {comp.isCurrency ? "₹" : ""}
                  {typeof yVal === "number" ? yVal.toLocaleString() : yVal}
                  {comp.isMultiplier ? "x" : ""}
                </span>
              </div>
            </div>

            {/* Visual Ratio Slide-bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                <span>June share</span>
                <span>July share</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-slate-300 transition-all duration-300"
                  style={{ width: `${100 - ratioJuly}%` }}
                />
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${ratioJuly}%` }}
                />
              </div>
              <div className="text-[9px] text-right text-blue-600 font-bold">
                {Math.round(ratioJuly)}% of bi-monthly sum
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Users,
  CalendarCheck,
  CheckCircle2,
  DollarSign,
  Activity
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  growth: string;
  isPositive: boolean;
  statusLabel?: string;
  icon: any;
  sparklineData: number[];
  color: string;
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const width = 120;
  const height = 36;
  const padding = 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((val, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((val - min) / range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    })
    .join(" ");

  const fillPoints = `${padding},${height} ` + points + ` ${width - padding},${height}`;

  return (
    <svg className="overflow-visible" width={width} height={height}>
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill={`url(#gradient-${color})`} />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <circle
        cx={(width - padding * 2) + padding}
        cy={height - ((data[data.length - 1] - min) / range) * (height - padding * 2) - padding}
        r="3"
        fill={color}
        stroke="white"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function KPICards({ data }: { data: any }) {
  const cards = [
    {
      title: "Total Marketing Spend",
      value: data.spend,
      growth: data.spendGrowth,
      isPositive: data.spendGrowthIsPositive ?? true,
      icon: IndianRupee,
      sparklineData: data.spendSparkline || [30, 45, 38, 52, 48, 60, 58],
      color: "#2563EB" // blue
    },
    {
      title: "Leads Generated",
      value: data.leads,
      growth: data.leadsGrowth,
      isPositive: true,
      icon: Users,
      sparklineData: data.leadsSparkline || [45, 52, 60, 58, 65, 70, 75],
      color: "#10B981" // emerald
    },
    {
      title: "Appointments Booked",
      value: data.appointments,
      growth: data.appointmentsGrowth,
      isPositive: true,
      icon: CalendarCheck,
      sparklineData: data.appointmentsSparkline || [15, 22, 18, 25, 28, 30, 32],
      color: "#6366F1" // indigo
    },
    {
      title: "Patients Visited",
      value: data.patients,
      growth: data.patientsGrowth,
      isPositive: true,
      icon: CheckCircle2,
      sparklineData: data.patientsSparkline || [10, 15, 12, 18, 20, 22, 25],
      color: "#8B5CF6" // violet
    },
    {
      title: "Generated Revenue",
      value: data.revenue,
      growth: data.revenueGrowth,
      isPositive: true,
      icon: DollarSign,
      sparklineData: data.revenueSparkline || [100, 120, 115, 140, 150, 170, 184],
      color: "#059669" // dark green
    },
    {
      title: "Overall ROI Factor",
      value: data.roi,
      growth: data.roiGrowth,
      isPositive: true,
      statusLabel: "Excellent",
      icon: Activity,
      sparklineData: data.roiSparkline || [4.2, 4.5, 4.8, 5.0, 5.2, 5.3, 5.4],
      color: "#D97706" // amber
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            id={`kpi-card-${idx}`}
            key={card.title}
            className="glass-card glass-card-hover p-5 rounded-[22px] flex flex-col justify-between transition-all duration-200 relative overflow-hidden bg-white"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 tracking-tight uppercase">
                {card.title}
              </span>
              <div className="h-7 w-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                <Icon className="h-4 w-4" style={{ color: card.color }} />
              </div>
            </div>

            {/* Value and growth */}
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 tracking-tight">
                  {card.value}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  {card.isPositive ? (
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-amber-500" />
                  )}
                  <span
                    className={`text-[10px] font-bold ${
                      card.isPositive ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {card.growth}
                  </span>
                  {card.statusLabel && (
                    <span className="ml-1 text-[9px] font-bold text-emerald-700 px-1.5 py-0.2 bg-emerald-50 rounded">
                      {card.statusLabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Sparkline */}
              <div className="pt-2">
                <MiniSparkline data={card.sparklineData} color={card.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

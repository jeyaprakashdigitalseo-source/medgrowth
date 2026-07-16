import { useState } from "react";
import { CalendarEvent } from "../types";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Tv,
  Newspaper,
  Sparkles,
  Users,
  Video,
  FileText,
  Bookmark
} from "lucide-react";

interface CalendarProps {
  events: CalendarEvent[];
  onAddEventClick: () => void;
}

export default function Calendar({ events, onAddEventClick }: { events: CalendarEvent[]; onAddEventClick: () => void }) {
  const [selectedDay, setSelectedDay] = useState<number>(15); // Default to July 15, 2026

  // Type color mapping
  const eventStyles = {
    "Campaign Launch": { dot: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-100" },
    "Doctor Visit": { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" },
    "Video Shoot": { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50", border: "border-red-100" },
    "TV Interview": { dot: "bg-indigo-500", text: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-100" },
    "Newspaper Publication": { dot: "bg-stone-500", text: "text-stone-700", bg: "bg-stone-50", border: "border-stone-150" },
    "Influencer Campaign": { dot: "bg-pink-500", text: "text-pink-700", bg: "bg-pink-50", border: "border-pink-100" },
    "Blog Publish": { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100" },
    "Festival Campaign": { dot: "bg-violet-500", text: "text-violet-700", bg: "bg-violet-50", border: "border-violet-100" }
  };

  const daysInJuly = 31;
  const startDayOffset = 3; // July 2026 starts on Wednesday (offset of 3 if Sunday is 0)

  // Calendar cells array
  const cells = [];
  // Empty offset cells
  for (let i = 0; i < startDayOffset; i++) {
    cells.push({ day: null, key: `empty-${i}` });
  }
  // Actual days
  for (let d = 1; d <= daysInJuly; d++) {
    const dayEvents = events.filter((e) => e.day === d);
    cells.push({ day: d, key: `day-${d}`, events: dayEvents });
  }

  // Selected day's activities
  const activeDayEvents = events.filter((e) => e.day === selectedDay);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar Grid Card */}
      <div className="lg:col-span-2 glass-card p-6 rounded-[22px] bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">July 2026</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Healthcare Marketing Calendar</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((cell) => {
            if (!cell.day) {
              return <div key={cell.key} className="aspect-square bg-slate-50/30 rounded-lg" />;
            }

            const isSelected = selectedDay === cell.day;
            const hasEvents = cell.events && cell.events.length > 0;

            return (
              <button
                key={cell.key}
                onClick={() => setSelectedDay(cell.day!)}
                className={`aspect-square rounded-xl p-1 flex flex-col justify-between items-center relative transition-all group ${
                  isSelected
                    ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 scale-[1.03] z-10"
                    : "hover:bg-slate-50 text-slate-700 bg-white border border-slate-100"
                }`}
              >
                <span className="text-[11px] self-start ml-1 mt-0.5">{cell.day}</span>

                {/* Event Markers dots */}
                {hasEvents && (
                  <div className="flex gap-0.8 mt-auto mb-1 flex-wrap justify-center px-1 max-w-full">
                    {cell.events!.slice(0, 3).map((e) => {
                      const styles = eventStyles[e.type] || { dot: "bg-slate-400" };
                      return (
                        <span
                          key={e.id}
                          className={`h-1.2 w-1.2 rounded-full ${
                            isSelected ? "bg-white" : styles.dot
                          }`}
                        />
                      );
                    })}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Side Event Display Panel */}
      <div className="glass-card p-6 rounded-[22px] bg-slate-50/30 flex flex-col justify-between border border-slate-200/80">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h4 className="text-xs font-bold text-slate-800">
              Activities for July {selectedDay}, 2026
            </h4>
            <span className="text-[10px] font-bold text-blue-600 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-md">
              {activeDayEvents.length} Scheduled
            </span>
          </div>

          <div className="space-y-3.5 max-h-[280px] overflow-y-auto no-scrollbar pr-1">
            {activeDayEvents.length > 0 ? (
              activeDayEvents.map((evt) => {
                const styles = eventStyles[evt.type] || { text: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200", dot: "bg-slate-400" };
                return (
                  <div
                    key={evt.id}
                    className={`p-3 rounded-xl border ${styles.bg} ${styles.border} flex flex-col gap-1 hover:shadow-sm transition-all duration-150`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                      <span className={`text-[10px] font-extrabold uppercase tracking-wide ${styles.text}`}>
                        {evt.type}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-1">
                      {evt.title}
                    </span>
                    {evt.budget && (
                      <span className="text-[10px] font-semibold text-slate-500 mt-1">
                        Allocated Budget: ₹{evt.budget.toLocaleString()}
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs font-normal">
                No marketing activities scheduled on this day. Use the quick action button to map custom media runs.
              </div>
            )}
          </div>
        </div>

        <button
          id="calendar-add-event-btn"
          onClick={onAddEventClick}
          className="mt-4 w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5] text-slate-400" />
          <span>Schedule Campaign Run</span>
        </button>
      </div>
    </div>
  );
}

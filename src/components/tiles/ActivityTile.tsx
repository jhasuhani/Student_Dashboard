"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BentoTile } from "./BentoTile";
import { Activity as ActivityIcon } from "lucide-react";
import type { Activity } from "@/types/database";

const intensityClasses = [
  "bg-white/[0.04]",
  "bg-indigo-500/20",
  "bg-indigo-500/40",
  "bg-indigo-500/60",
  "bg-indigo-500/80",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayLabels = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

interface DayCell {
  date: string;
  level: number;
  isReal: boolean; 
}

interface ActivityTileProps {
  activityData: Activity[];
}

export function ActivityTile({ activityData }: ActivityTileProps) {
 const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

const dummyData = [
  { activity_date: "2026-01-03", activity_level: 2 },
  { activity_date: "2026-01-04", activity_level: 4 },
  { activity_date: "2026-01-05", activity_level: 1 },
  { activity_date: "2026-01-06", activity_level: 3 },

  { activity_date: "2026-02-01", activity_level: 3 },
  { activity_date: "2026-02-03", activity_level: 2 },
  { activity_date: "2026-02-14", activity_level: 4 },

  { activity_date: "2026-04-02", activity_level: 2 },
  { activity_date: "2026-04-03", activity_level: 4 },

  { activity_date: "2026-05-20", activity_level: 4 },
  { activity_date: "2026-05-22", activity_level: 2 },

  { activity_date: "2026-06-01", activity_level: 4 },
  { activity_date: "2026-06-02", activity_level: 1 },
  { activity_date: "2026-06-03", activity_level: 3 },
];

const displayData =
  activityData.length > 0
    ? activityData
    : dummyData;

const activityMap = useMemo(
  () =>
    new Map(
      displayData.map((item) => [item.activity_date, item.activity_level]),
    ),
  [displayData],
);
  const monthGroups = useMemo(() => {
    const year = selectedYear;
    const groups: { month: string; daysInMonth: number; weeks: DayCell[][] }[] =
      [];

    for (let m = 0; m < 12; m++) {
      const daysInMonth = new Date(year, m + 1, 0).getDate(); 
      const firstDay = new Date(year, m, 1);
      const firstDayIdx = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
      const totalSlots = Math.ceil((firstDayIdx + daysInMonth) / 7) * 7;
      const cells: DayCell[] = [];

      for (let i = 0; i < totalSlots; i++) {
        const dayNum = i - firstDayIdx + 1;

        if (dayNum >= 1 && dayNum <= daysInMonth) {
          const d = new Date(year, m, dayNum);
          const dateKey = d.toISOString().split("T")[0];
          cells.push({
            date: dateKey,
            level: activityMap.get(dateKey) ?? 0,
            isReal: true,
          });
        } else {
          cells.push({ date: "", level: 0, isReal: false });
        }
      }
      const weeks: DayCell[][] = [];
      for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
      }

      groups.push({
        month: MONTHS[m],
        daysInMonth,
        weeks,
      });
    }

    return groups;
  }, [selectedYear, activityMap]);

  // Stats
const totalHours = displayData.reduce(
  (sum, item) => sum + item.activity_level,
  0,
);

const activeDays = displayData.filter(
  (item) => item.activity_level > 0,
).length;

  const cellSize = 14;
  const cellGap = 3;

  return (
    <BentoTile className="lg:col-span-4" index={5}>
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-accent-primary" />
            <h2 className="text-sm font-semibold text-white">
              Learning Activity
            </h2>
          </div>
          <div className="flex items-center gap-3">
          
            <div className="flex gap-1.5">
              {[new Date().getFullYear() - 1, new Date().getFullYear()].map(
                (year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      selectedYear === year
                        ? "bg-indigo-500 text-white"
                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    {year}
                  </button>
                ),
              )}
            </div>
            {/* Legend */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <span>Less</span>
              {intensityClasses.map((cls, i) => (
                <div
                  key={i}
                  className={`h-[11px] w-[11px] rounded-sm ${cls}`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="flex">
          <div
            className="flex flex-col flex-shrink-0 pr-2"
            style={{ gap: `${cellGap}px` }}
          >
            {dayLabels.map((label, i) => (
              <div
                key={i}
                className="flex items-center justify-end"
                style={{ height: `${cellSize}px`, minWidth: "28px" }}
              >
                <span className="text-[10px] text-slate-500 leading-none">
                  {label}
                </span>
              </div>
            ))}
          </div>

        
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="flex w-max" style={{ gap: "8px" }}>
              {monthGroups.map((group, mi) => (
                <div key={group.month} className="flex flex-col">
                  <div className="flex" style={{ gap: `${cellGap}px` }}>
                    {group.weeks.map((week, wi) => (
                      <div
                        key={wi}
                        className="flex flex-col"
                        style={{ gap: `${cellGap}px` }}
                      >
                        {week.map((day, di) => (
                          <motion.div
                            key={`${mi}-${wi}-${di}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: day.isReal ? 1 : 0,
                              scale: day.isReal ? 1 : 0,
                            }}
                            transition={{
                              delay: Math.min(0.2 + mi * 0.05 + wi * 0.01, 1.0),
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                            className={`rounded-[3px] transition-all duration-150 ${
                              day.isReal
                                ? `cursor-pointer hover:ring-1 hover:ring-accent-primary/60 hover:brightness-125 ${intensityClasses[day.level]}`
                                : ""
                            }`}
                            style={{
                              width: `${cellSize}px`,
                              height: `${cellSize}px`,
                              visibility: day.isReal ? "visible" : "hidden",
                            }}
                            title={
                              day.isReal
                                ? `${day.date} • Level ${day.level}`
                                : ""
                            }
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="mt-1.5">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {group.month}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1">
          <span>
            <strong className="text-white">{totalHours}</strong> hours total
          </span>
          <span>
            <strong className="text-white">{activeDays}</strong> active days
          </span>
          <span>
            <strong className="text-green-400">↑ 12%</strong> vs last month
          </span>
        </div>
      </div>
    </BentoTile>
  );
}

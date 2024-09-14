import React, { useState } from "react";
import dayjs from "dayjs";
import "../../style/scheduler.css"; // Add custom CSS for styling

export default function LineworkScheduler() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Simulated workers data with assigned work dates
  const workersData = [
    { name: "Alice", date: dayjs().startOf("month").add(3, "day") },
    { name: "Bob", date: dayjs().startOf("month").add(5, "day") },
    { name: "Charlie", date: dayjs().startOf("month").add(5, "day") },
    { name: "David", date: dayjs().startOf("month").add(12, "day") },
    { name: "Eve", date: dayjs().add(1, "day") }, // Tomorrow's worker
  ];

  const getDaysInMonth = () => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");

    const days = [];

    // Add current month's days
    for (let i = 1; i <= endOfMonth.date(); i++) {
      days.push({
        date: currentMonth.date(i),
        currentMonth: true,
      });
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  // Find workers for a given day
  const findWorkersForDay = (date) => {
    return workersData
      .filter((worker) => worker.date.isSame(date, "day"))
      .map((worker) => worker.name);
  };

  const days = getDaysInMonth();

  return (
    <div className="scheduler-container">
      <header className="scheduler-header">
        <button onClick={prevMonth}>Previous</button>
        <h2>{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={nextMonth}>Next</button>
      </header>

      {/* Row for the days of the month */}
      <div className="scheduler-days-row">
        {days.map((day, index) => (
          <div
            key={index}
            className={`scheduler-day ${
              day.currentMonth ? "current-month" : "other-month"
            }`}
          >
            {day.date.date()}
          </div>
        ))}
      </div>

      {/* Row for the workers */}
      <div className="scheduler-workers-row">
        {days.map((day, index) => (
          <div
            key={index}
            className={`scheduler-workers ${
              day.currentMonth ? "current-month" : "other-month"
            }`}
          >
            {findWorkersForDay(day.date).length > 0 ? (
              findWorkersForDay(day.date).map((worker, idx) => (
                <div key={idx} className="worker">
                  {worker}
                </div>
              ))
            ) : (
              <div className="no-worker">No Workers</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

export default function DateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <div className="taskbar-datetime" id="taskbarDatetime">
      <span>{time}</span>
      <span>{date}</span>
    </div>
  );
} 
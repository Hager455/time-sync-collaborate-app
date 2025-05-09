
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TimePickerDemoProps {
  date: Date;
  setDate: (date: Date) => void;
}

export function TimePickerDemo({ date, setDate }: TimePickerDemoProps) {
  const [hours, setHours] = useState<number>(date.getHours());
  const [minutes, setMinutes] = useState<number>(date.getMinutes());
  
  // Update the time when hours or minutes change
  useEffect(() => {
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setDate(newDate);
  }, [hours, minutes, date, setDate]);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">Hours</Label>
        <Input
          id="hours"
          className="w-16 text-center"
          value={hours.toString().padStart(2, "0")}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 0 && value <= 23) {
              setHours(value);
            }
          }}
        />
      </div>
      <div className="mt-auto">:</div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">Minutes</Label>
        <Input
          id="minutes"
          className="w-16 text-center"
          value={minutes.toString().padStart(2, "0")}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 0 && value <= 59) {
              setMinutes(value);
            }
          }}
        />
      </div>
    </div>
  );
}

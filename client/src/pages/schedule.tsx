import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface ScheduleSettings {
  startTime: string;
  endTime: string;
  isEnabled: boolean;
  reminderInterval: string;
}

export default function Schedule() {
  const form = useForm<ScheduleSettings>({
    defaultValues: {
      startTime: "09:00",
      endTime: "17:00",
      isEnabled: true,
      reminderInterval: "20"
    }
  });

  const onSubmit = (data: ScheduleSettings) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-bold mb-6 uppercase">⏰ Schedule Settings</h2>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xl font-bold block mb-2">START TIME</label>
              <Input
                type="time"
                {...form.register("startTime")}
                className="w-full text-xl border-2 border-black bg-white"
              />
            </div>

            <div>
              <label className="text-xl font-bold block mb-2">END TIME</label>
              <Input
                type="time"
                {...form.register("endTime")}
                className="w-full text-xl border-2 border-black bg-white"
              />
            </div>

            <div>
              <label className="text-xl font-bold block mb-2">INTERVAL (MIN)</label>
              <Input
                type="number"
                {...form.register("reminderInterval")}
                className="w-full text-xl border-2 border-black bg-white"
              />
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-black bg-[#e0e0e0]">
              <label className="text-xl font-bold">ENABLED</label>
              <Switch {...form.register("isEnabled")} />
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full bg-primary text-white border-4 border-black font-bold text-xl py-6"
          >
            SAVE SCHEDULE
          </Button>
        </form>
      </Card>
    </div>
  );
}

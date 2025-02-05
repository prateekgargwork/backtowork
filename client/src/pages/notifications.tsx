import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface NotificationSettings {
  title: string;
  message: string;
  sound: string;
}

export default function Notifications() {
  const form = useForm<NotificationSettings>({
    defaultValues: {
      title: "Back to Work!",
      message: "You've been on your phone for too long!",
      sound: "default"
    }
  });

  const onSubmit = (data: NotificationSettings) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-bold mb-6 uppercase">🔔 Notification Settings</h2>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xl font-bold block mb-2">NOTIFICATION TITLE</label>
              <Input
                {...form.register("title")}
                className="w-full border-2 border-black bg-white"
              />
            </div>

            <div>
              <label className="text-xl font-bold block mb-2">NOTIFICATION MESSAGE</label>
              <Textarea
                {...form.register("message")}
                className="w-full border-2 border-black bg-white resize-none"
              />
            </div>

            <div>
              <label className="text-xl font-bold block mb-2">NOTIFICATION SOUND</label>
              <select
                {...form.register("sound")}
                className="w-full border-2 border-black bg-white p-2 text-lg"
              >
                <option value="default">Default Notification</option>
                <option value="bell">Bell Ring</option>
                <option value="alarm">Alarm Clock</option>
                <option value="beep">Simple Beep</option>
              </select>
              <Button 
                type="button" 
                onClick={() => {/* Play sound preview */}}
                className="mt-2 border-2 border-black"
              >
                Preview Sound
              </Button>
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full bg-primary text-white border-4 border-black font-bold text-xl py-6"
          >
            SAVE SETTINGS
          </Button>
        </form>
      </Card>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { WorkTimer } from "@/lib/timer";
import { requestNotificationPermission, sendNotification } from "@/lib/notifications";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { NotificationPermission } from "@/components/notification-permission";
import { Timer, Plus, Minus } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const timerRef = useRef<WorkTimer>();
  const [timeLeft, setTimeLeft] = useState(20);
  const [interval, setInterval] = useState(20);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  const onTimerComplete = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      sendNotification("Back to Work!", {
        body: "You've been on your phone for too long!",
        icon: "/favicon.ico"
      });
    }
  };

  // Initialize timer once and handle visibility changes
  useEffect(() => {
    timerRef.current = new WorkTimer(onTimerComplete, interval);

    // Load saved timer state
    const savedStartTime = localStorage.getItem('timerStartTime');
    const savedInterval = localStorage.getItem('timerInterval');

    if (savedStartTime && savedInterval) {
      const parsedInterval = parseInt(savedInterval);
      setInterval(parsedInterval);
      timerRef.current.setInterval(parsedInterval);

      // Calculate remaining time
      const elapsedMinutes = (Date.now() - parseInt(savedStartTime)) / (1000 * 60);
      const remainingTime = Math.max(0, parsedInterval - elapsedMinutes);

      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
        timerRef.current.start();
      } else {
        localStorage.removeItem('timerStartTime');
        localStorage.removeItem('timerInterval');
        setTimeLeft(parsedInterval);
      }
    }

    const updateInterval = window.setInterval(() => {
      if (timerRef.current?.isRunning()) {
        setTimeLeft(timerRef.current.getTimeLeft());
      }
    }, 1000);

    return () => {
      window.clearInterval(updateInterval);
      timerRef.current?.stop();
    };
  }, []);

  // Update timer interval when it changes
  useEffect(() => {
    if (timerRef.current) {
      timerRef.current.setInterval(interval);
      if (!timerRef.current.isRunning()) {
        setTimeLeft(interval);
      }
    }
  }, [interval]);

  const toggleTimer = async () => {
    if (!timerRef.current) return;

    if (!timerRef.current.isRunning()) {
      // Check if notifications are supported
      if (!("Notification" in window)) {
        toast({
          title: "Error",
          description: "This browser does not support notifications",
          variant: "destructive"
        });
        return;
      }

      // Show permission dialog if permission hasn't been granted yet
      if (Notification.permission === "default") {
        setShowPermissionDialog(true);
        return;
      }

      try {
        if (Notification.permission !== "granted") {
          await requestNotificationPermission();
        }
        timerRef.current.start();
        // Save timer state
        localStorage.setItem('timerStartTime', Date.now().toString());
        localStorage.setItem('timerInterval', interval.toString());

        toast({
          title: "Timer Started",
          description: "You'll be notified when it's time to get back to work."
        });
      } catch (err) {
        toast({
          title: "Error",
          description: (err as Error).message,
          variant: "destructive"
        });
      }
    } else {
      timerRef.current.stop();
      localStorage.removeItem('timerStartTime');
      localStorage.removeItem('timerInterval');
      setTimeLeft(interval);
      toast({
        title: "Timer Stopped",
        description: "Timer has been cancelled."
      });
    }
  };

  const adjustInterval = (amount: number) => {
    const newInterval = Math.max(1, interval + amount);
    setInterval(newInterval);
  };

  const handlePermissionAllow = async () => {
    setShowPermissionDialog(false);
    try {
      await requestNotificationPermission();
      if (timerRef.current) {
        timerRef.current.start();
        localStorage.setItem('timerStartTime', Date.now().toString());
        localStorage.setItem('timerInterval', interval.toString());
        toast({
          title: "Timer Started",
          description: "You'll be notified when it's time to get back to work."
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive"
      });
    }
  };

  // Format the time display
  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* ASCII Art Header */}
        <pre className="font-mono text-xs leading-none hidden md:block text-center mb-8 whitespace-pre overflow-x-hidden">
          {`
██████╗  █████╗  ██████╗██╗  ██╗████████╗ ██████╗ ██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝╚══██╔══╝██╔═══██╗██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝
██████╔╝███████║██║     █████╔╝    ██║   ██║   ██║██║ █╗ ██║██║   ██║██████╔╝█████╔╝ 
██╔══██╗██╔══██║██║     ██╔═██╗    ██║   ██║   ██║██║███╗██║██║   ██║██╔══██╗██╔═██╗ 
██████╔╝██║  ██║╚██████╗██║  ██╗   ██║   ╚██████╔╝╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗
╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
          `}
        </pre>

        <Card className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Timer Display */}
          <div className="relative border-4 border-black p-6 bg-primary text-white mb-6">
            <div className="absolute top-0 left-0 w-full h-2 bg-black opacity-10"></div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-4xl sm:text-6xl font-mono font-bold text-center sm:text-left">
                {formatTime(timeLeft)}
              </span>
              <Button 
                onClick={toggleTimer}
                className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 text-xl px-8 py-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {timerRef.current?.isRunning() ? 'STOP' : 'START'}
              </Button>
            </div>
          </div>

          {/* Quick Timer Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              onClick={() => adjustInterval(-5)}
              variant="outline"
              className="border-2 border-black p-2"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 border-2 border-black px-4 py-2 bg-gray-50">
              <Timer className="h-4 w-4" />
              <Input
                type="number"
                value={interval}
                onChange={(e) => setInterval(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-xl border-none bg-transparent text-center"
              />
              <span className="text-sm font-bold">MIN</span>
            </div>
            <Button
              onClick={() => adjustInterval(5)}
              variant="outline"
              className="border-2 border-black p-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-lg text-center">
            Configure more options in the <strong>Schedule</strong> and <strong>Notifications</strong> tabs above.
          </p>
        </Card>
      </div>

      <NotificationPermission
        isOpen={showPermissionDialog}
        onClose={() => setShowPermissionDialog(false)}
        onAllow={handlePermissionAllow}
      />
    </div>
  );
}
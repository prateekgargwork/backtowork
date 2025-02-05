import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface NotificationPermissionProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
}

export function NotificationPermission({
  isOpen,
  onClose,
  onAllow,
}: NotificationPermissionProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="border-4 border-black">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-2xl">
            <Bell className="h-6 w-6" />
            Enable Notifications
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            To help you stay productive, backtowork needs permission to send you notifications when it's time to get back to work.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-2 border-black"
          >
            Later
          </Button>
          <Button
            onClick={onAllow}
            className="bg-primary text-white border-2 border-black"
          >
            Allow Notifications
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

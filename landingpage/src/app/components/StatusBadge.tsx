import { Clock, Download, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";

type Status = "PENDING" | "CLONING" | "ANALYZING" | "COMPLETED" | "FAILED";

interface StatusBadgeProps {
  status: Status;
  size?: "sm" | "lg";
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const configs = {
    PENDING: {
      icon: Clock,
      label: "PENDING",
      className: "bg-gray-100 text-gray-700 border-gray-300",
    },
    CLONING: {
      icon: Download,
      label: "CLONING",
      className: "bg-blue-100 text-blue-700 border-blue-300",
    },
    ANALYZING: {
      icon: Loader2,
      label: "ANALYZING",
      className: "bg-blue-100 text-blue-700 border-blue-300 animate-pulse",
      spinning: true,
    },
    COMPLETED: {
      icon: CheckCircle2,
      label: "COMPLETED",
      className: "bg-green-100 text-green-700 border-green-300",
    },
    FAILED: {
      icon: XCircle,
      label: "FAILED",
      className: "bg-red-100 text-red-700 border-red-300",
    },
  };

  const config = configs[status];
  const Icon = config.icon;
  const isLarge = size === "lg";

  return (
    <Badge
      variant="outline"
      className={`${config.className} ${
        isLarge ? "px-4 py-2 text-sm" : "px-2 py-1 text-xs"
      } font-medium uppercase gap-1.5`}
    >
      <Icon
        className={`${isLarge ? "w-4 h-4" : "w-3 h-3"} ${
          config.spinning ? "animate-spin" : ""
        }`}
      />
      {config.label}
    </Badge>
  );
}

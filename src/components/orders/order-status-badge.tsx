import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/db/entities/order.entity";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pending",
  [OrderStatus.PAID]: "Paid",
  [OrderStatus.FAILED]: "Failed",
};

const STATUS_CLASSNAME: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "border-accent bg-accent/20 text-accent-foreground",
  [OrderStatus.PAID]: "border-primary bg-primary/10 text-primary",
  [OrderStatus.FAILED]: "border-destructive bg-destructive/10 text-destructive",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant="outline" className={cn(STATUS_CLASSNAME[status])}>
      {STATUS_LABEL[status]}
    </Badge>
  );
}

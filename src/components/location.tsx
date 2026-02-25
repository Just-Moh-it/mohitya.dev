import * as HoverCard from "@radix-ui/react-hover-card";
import { IconMapPinFilled } from "@tabler/icons-react";

export default function LocationLine() {
  return (
    <HoverCard.Root openDelay={100}>
      <HoverCard.Trigger asChild>
        <div className="flex items-center gap-2 mb-6 w-fit">
          <IconMapPinFilled className="size-4 text-muted-foreground" />
          <span className="font-mono">Austin, TX</span>
        </div>
      </HoverCard.Trigger>
    </HoverCard.Root>
  );
}

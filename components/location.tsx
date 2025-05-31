import * as HoverCard from "@radix-ui/react-hover-card";
import { IconMapPinFilled } from "@tabler/icons-react";
// import AustinMap from "../app/austin-map.png";
// import Image from "next/image";

export default function LocationLine() {
  return (
    <HoverCard.Root openDelay={100}>
      <HoverCard.Trigger asChild>
        <div className="flex items-center gap-2 mb-8 w-fit">
          <IconMapPinFilled className="size-4" />
          <span className="text-gray-600 font-medium after:underline after:underline-offset-4">
            Austin, TX
          </span>
        </div>
      </HoverCard.Trigger>
      {/* <HoverCard.Portal>
        <HoverCard.Content className="bg-white rounded-lg p-4 shadow-lg animate-in fade-in duration-200">
          <Image
            src={AustinMap}
            alt="Austin Map"
            height={200}
            className="size-50"
            priority
            placeholder="blur"
          />
        </HoverCard.Content>
      </HoverCard.Portal> */}
    </HoverCard.Root>
  );
}

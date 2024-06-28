"use client";
import { useBalance } from "@repo/store/useBalance";
import { Button } from "@repo/ui/button";

export default function Home() {
  const value = useBalance();
  return (
    <div className="text-red-500">
      Hi there {value}
      <Button appName="Patym" className="text-blue-500">
        Click
      </Button>
    </div>
  );
}

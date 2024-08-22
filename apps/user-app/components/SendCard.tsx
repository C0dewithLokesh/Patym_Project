"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

const SendCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <Card title="Send">
      <div className="w-[300px]">
        <TextInput
          label={"Number"}
          placeholder={"Number"}
          onChange={(value) => {
            setNumber(value);
          }}
        />
        <TextInput
          label={"Amount"}
          placeholder={"amount"}
          onChange={(value) => {
            setAmount(value);
          }}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              if (!amount) return;
              await p2pTransfer(number, Number(amount) * 100);
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SendCard;

"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";

const SendCard = () => {
  return (
    <Card title="Send">
      <div className="w-[300px]">
        <TextInput
          label={"Number"}
          placeholder={"Number"}
          onChange={() => {}}
        />
        <TextInput
          label={"Amount"}
          placeholder={"amount"}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              // if (!amount) return;
              // await createOnRampTransaction(+amount * 100, provider);
              // window.location.href = redirectUrl || "";
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

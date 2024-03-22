"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {};

export default function TestPage({}: Props) {
  const [animation, setAnimation] = useState(false);

  const startAnimation = () => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold">TEST SAYFASI</h1>
      <Button onClick={startAnimation}>Test</Button>
      <div className="mx-16"></div>
      <div className="flex w-full gap-4 px-8">
        <div className="flex w-full flex-col gap-2">
          <EmptyTitle animate={animation ? "disappear" : ""} />
          <EmptyCard animate={animation ? "disappear" : ""} />
          <EmptyCard animate={animation ? "disappear" : ""} />
          <EmptyCard animate={animation ? "disappear" : ""} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <EmptyTitle animate={animation ? "disappear" : ""} />
          <EmptyCard animate={animation ? "disappear" : ""} />
          <EmptyCard animate={animation ? "disappear" : ""} />
          <EmptyCard animate={animation ? "disappear" : ""} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <EmptyTitle animate={animation ? "disappear" : ""} />
          <EmptyCard animate={animation ? "disappear" : ""} />
          <EmptyCard animate={animation ? "disappear" : ""} />
          <EmptyCard animate={animation ? "disappear" : ""} />
        </div>
      </div>
    </div>
  );
}

const EmptyTitle = ({ animate }: { animate: string }) => {
  return <div className={`flex min-h-12 w-full items-center border bg-accent px-4 shadow ${animate}`}></div>;
};

const EmptyCard = ({ animate }: { animate: string }) => {
  return <div className={`min-h-64 min-w-40 rounded-lg border bg-card text-card-foreground shadow ${animate}`}></div>;
};

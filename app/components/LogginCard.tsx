import { Slot } from "@radix-ui/react-slot";
import React, { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "~/libs/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";

export interface LogginCardProps extends ComponentPropsWithRef<"div"> {
	asChild?: boolean;
}

export const LogginCard = forwardRef<HTMLDivElement, LogginCardProps>(
	({ className }) => {
		return (
			<Card className={cn("flex flex-col items-center gap-y-4 p-4", className)}>
				<h1 className={"text-2xl drop-shadow-base"}>名前を入力して登録！</h1>
				<Input placeholder="名前" />
				<Button type="submit">登録</Button>
			</Card>
		);
	},
);

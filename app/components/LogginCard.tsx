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
			<Card
				className={cn(
					"flex flex-col items-center gap-y-4 p-4 text-[24px]",
					className,
				)}
			>
				<h1 className={cn(className)}>名前を入力して登録！</h1>
				<Input placeholder="名前" className={cn("text-[16px]", className)} />
				<Button type="submit" className={cn("text-[16px]", className)}>
					登録
				</Button>
			</Card>
		);
	},
);

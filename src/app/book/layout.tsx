import BookingLayoutBase from "@/components/Base/BookingLayoutBase";
import React from "react";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <React.Fragment>{children}</React.Fragment>;
}

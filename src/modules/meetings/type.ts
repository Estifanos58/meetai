import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type MeetingsGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];
export type MeetingsGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];
export enum MeetingStatus {
    Upcoming = "upcoming",
    Active = "active",
    Completed = "complete",
    Processing = "processing",
    Cancelled = "cancelled",
}


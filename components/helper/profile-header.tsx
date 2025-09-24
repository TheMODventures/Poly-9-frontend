"use client";

import { User, Globe, Layers } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { Buyer } from "@/interfaces/interface";
import { Skeleton } from "../ui/skeleton";

interface ProfileHeaderProps {
  buyer?: Buyer;
  isLoading?: boolean;
}

export default function ProfileHeader({
  buyer,
  isLoading,
}: ProfileHeaderProps) {
  const website = buyer?.website || "Not provided";
  const buyerType = buyer?.type || "Not provided";
  const totalGenerations = buyer?.total_generations ?? 0;
  const totalDocuments = buyer?.total_documents ?? 0;

  return (
    <div className="bg-white rounded-md p-6 shadow-sm border">
      <div className="flex items-center ml-5 justify-between">
        {isLoading ? (
          <Skeleton className="h-8 w-56" />
        ) : (
          <h1 className="text-2xl font-semibold text-gray-900">
            {buyer?.company || "Buyer profile"}
          </h1>
        )}
        <div className="absolute top-14 right-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <BsThreeDots className="w-6 h-6 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/chat">Chat</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/context-file">Context Files</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-6 space-y-4 ml-5">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">Website</span>
          {isLoading ? (
            <Skeleton className="h-4 w-48" />
          ) : (
            <span className="text-sm font-medium text-gray-900 break-all">
              {website}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">Buyer Type</span>
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span className="text-sm font-medium text-gray-900">
              {buyerType}
            </span>
          )}
        </div>

        {!isLoading && (
          <div className="flex items-center gap-6 pt-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {totalGenerations}
              </span>
              <span className="text-gray-600">Generations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {totalDocuments}
              </span>
              <span className="text-gray-600">Documents</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Buyer } from "@/interfaces/interface";
import { useRouter } from "next/navigation";

interface BuyerActionsMenuProps {
  buyer: Buyer;
}

export default function BuyerActionsMenu({ buyer }: BuyerActionsMenuProps) {
  const router = useRouter();
  const handleRowClick = useCallback(() => {
    router.push(`/profile?buyerId=${buyer.buyer_id}`);
  }, [router]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8"
          onClick={(event) => event.stopPropagation()}
        >
          <BsThreeDotsVertical className="w-4 h-4 text-gray-400 translate-y-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleRowClick}>
          View Buyer Profile
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

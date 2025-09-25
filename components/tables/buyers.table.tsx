"use client";

import React, { useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import EditBuyerModal from "@/components/forms/buyers/edit-modal/edit.form";
import DeleteModal from "@/components/helper/buyers-delete-button";
import ViewBuyerModal from "@/components/dialogs/view-buyer-modal";
import { Buyer } from "@/interfaces/interface";
import BuyerActionsMenu from "../helper/buyer-actions-menu";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { getSocialIcon } from "@/utils/helper";

const INTERACTIVE_SELECTOR =
  'button,a,input,textarea,select,[role="menuitem"],[data-rowclick="ignore"]';

interface BuyersTableProps {
  buyersData:
    | {
        data: Buyer[];
        total: number;
        page: number;
        limit: number;
      }
    | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
}

export default function BuyersTable({
  buyersData,
  isLoading,
  isError,
  error,
  refetch,
}: BuyersTableProps) {
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const router = useRouter();

  // Guard: only navigate if the click wasn't on an interactive child
  const handleRowClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement>, buyerId: string) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(INTERACTIVE_SELECTOR)) return;
      router.push(`/profile?buyerId=${buyerId}`);
    },
    [router]
  );
  const buyers = buyersData?.data || [];

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);

  const handleViewBuyer = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedBuyer(null);
  };

  if (isLoading) return <TableSkeleton />;

  if (isError) {
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <ErrorState
          title="Failed to load buyers"
          message={
            error?.message ||
            "Something went wrong while loading the buyers list."
          }
          onRetry={refetch}
          className="h-64"
        />
      </div>
    );
  }

  if (!buyers || buyers.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <EmptyState
          title="No buyers found"
          message="You haven't added any buyers yet. Create your first buyer to get started."
          actionLabel="Add Buyer"
          className="h-64"
        />
      </div>
    );
  }

  const toggleSelect = (id: string | number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scroll-smooth">
        <Table className="relative w-full border-collapse">
          <TableHeader className="sticky top-0 z-10 bg-blue-500">
            <TableRow>
              <TableHead className="text-white font-medium translate-x-4">
                Company Name
              </TableHead>
              <TableHead className="text-white font-medium">Context</TableHead>
              <TableHead className="text-white font-medium">Websites</TableHead>
              <TableHead className="text-white font-medium">Type</TableHead>
              <TableHead className="text-white font-medium">Socials</TableHead>
              <TableHead className="text-white font-medium space-x-4 w-4 translate-x-8">
                Action
              </TableHead>
              <TableHead className="text-white font-medium"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {buyers.map((buyer: Buyer) => (
              <TableRow
                key={buyer.buyer_id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={(e) => handleRowClick(e, buyer.buyer_id)}
                tabIndex={0}
              >
                <TableCell>
                  <div className="flex items-center gap-3 translate-x-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                      {buyer.company.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900">
                      {buyer.company}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-gray-900 font-medium">
                  {buyer.files.length} files
                </TableCell>

                <TableCell className="text-gray-900 font-medium">
                  {buyer.website || "N/A"}
                </TableCell>

                <TableCell>
                  <span className="text-gray-600">{buyer.type || "N/A"}</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    {buyer.socials.map((social, index) => {
                      const IconComponent = getSocialIcon(social.name);
                      return (
                        <div
                          key={index}
                          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-200"
                          title={social.name}
                          data-rowclick="ignore" // safety: always ignore row click from here
                        >
                          {IconComponent ? (
                            <IconComponent className="w-6 h-6 text-gray-600" />
                          ) : (
                            <span className="text-sm text-gray-600 font-semibold">
                              {social.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {buyer.socials.length === 0 && (
                      <span className="text-gray-400 text-sm">No socials</span>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-0">
                    {/* View */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent row navigation
                        handleViewBuyer(buyer);
                      }}
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </Button>

                    {/* Edit */}
                    <EditBuyerModal
                      trigger={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-8 w-8"
                          onClick={(e) => e.stopPropagation()} // already present; keep it
                        >
                          <Edit className="w-4 h-4 text-gray-400" />
                        </Button>
                      }
                      buyerData={buyer}
                    />

                    {/* Delete */}
                    <DeleteModal
                      trigger={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-8 w-8"
                          onClick={(e) => e.stopPropagation()} // already present; keep it
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      }
                      buyerData={buyer}
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="-translate-y-1" data-rowclick="ignore">
                    <BuyerActionsMenu buyer={buyer} />
                    <Checkbox
                      checked={selected.includes(buyer.buyer_id)}
                      onCheckedChange={() => toggleSelect(buyer.buyer_id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedBuyer && (
        <ViewBuyerModal
          isOpen={viewModalOpen}
          onClose={handleCloseViewModal}
          buyerData={selectedBuyer}
        />
      )}
    </div>
  );
}

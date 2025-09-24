"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Buyer } from "@/interfaces/interface";
import { getSocialIcon, getSocialColor, getSocialHoverColor, getSocialIconColor } from "@/utils/helper";
import { X, ExternalLink, FileText } from "lucide-react";

interface ViewBuyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyerData: Buyer;
}

export default function ViewBuyerModal({
  isOpen,
  onClose,
  buyerData,
}: ViewBuyerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0 max-h-[90vh] overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <DialogTitle className="text-lg font-medium text-blue-500">
            Buyer Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-600">
                {buyerData.company.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {buyerData.company}
                </h3>
                <p className="text-sm text-gray-500">
                  {buyerData.type || "No type specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Website */}
          {buyerData.website && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Website
              </Label>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-gray-400" />
                <a
                  href={buyerData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  {buyerData.website}
                </a>
              </div>
            </div>
          )}

          {/* Social Media */}
          {buyerData.socials && buyerData.socials.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Social Media
              </Label>
              <div className="flex flex-wrap gap-2">
                {buyerData.socials.map((social, index) => {
                  const IconComponent = getSocialIcon(social.name);
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2"
                    >
                      {IconComponent && (
                        <IconComponent className="w-4 h-4 text-gray-600" />
                      )}
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {social.name}
                      </span>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Files */}
          {buyerData.files && buyerData.files.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Files ({buyerData.files.length})
              </Label>
              <div className="space-y-2">
                {buyerData.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {typeof file === 'string' ? file : (file as any).filename || 'Unknown file'}
                    </span>
                    {typeof file === 'object' && (file as any).url && (
                      <a
                        href={(file as any).url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          {buyerData.note && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Note
              </Label>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-700">{buyerData.note}</p>
              </div>
            </div>
          )}

          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

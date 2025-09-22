"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SOCIAL_OPTIONS } from "@/utils/social.constants";

interface SocialLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
  socialName: string;
  initialUrl?: string;
  isEditing?: boolean;
}

export default function SocialLinkModal({
  isOpen,
  onClose,
  onSave,
  socialName,
  initialUrl = "",
  isEditing = false,
}: SocialLinkModalProps) {
  const [url, setUrl] = useState(initialUrl);
  const socialOption = SOCIAL_OPTIONS.find((s) => s.value === socialName);
  const IconComponent = socialOption?.icon || SOCIAL_OPTIONS[0].icon;

  // Reset URL when modal opens/closes or when editing changes
  useEffect(() => {
    if (isOpen) {
      setUrl(initialUrl);
    } else {
      setUrl("");
    }
  }, [isOpen, initialUrl]);

  const handleSave = () => {
    if (url.trim()) {
      onSave(url.trim());
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md! w-[80%]!">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className="w-5 h-5" />
            {isEditing
              ? `Edit ${socialOption?.label} Link`
              : `Add ${socialOption?.label} Link`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {socialOption?.label} URL
            </label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={`Enter ${socialOption?.label} URL`}
              className="bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

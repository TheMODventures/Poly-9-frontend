import { useState } from "react";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TfiShare } from "react-icons/tfi";
import { BiSolidFolder } from "react-icons/bi";

export default function ShareDialog() {
  const [searchTerm, setSearchTerm] = useState("Yameenyousuf@");
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      "https://example.com/collection/modern-coffee-table"
    );
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleInvite = () => {
    console.log("Inviting user:", searchTerm);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition">
          <TfiShare className="w-5 h-5 text-gray-700" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0">
        <div className="p-4">
          <DialogHeader className="space-y-0 mb-4">
            <DialogTitle className="text-lg font-medium">
              Share Collection
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Share your product with your clients
            </DialogDescription>
          </DialogHeader>
        <hr className="border-gray-200" />
        </div>

        <div className="px-6 py-4 flex items-center gap-2">
          <BiSolidFolder className="w-6 h-6 text-blue-500" />
          <span className="text-sm font-medium text-gray-800">
            Modern coffee table
          </span>
        </div>

        <div className="bg-blue-50 px-6 py-4 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">
              Invite members via a sharable link
            </div>
            <div className="text-xs text-gray-600">
              Anyone with the link can view
            </div>
          </div>
          <Button
            onClick={handleCopyLink}
            size="sm"
            className={`ml-4 ${
              linkCopied
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {linkCopied ? "Copied!" : "Copy Link"}
          </Button>
        </div>

        <div className="px-6 py-4 space-y-2">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Yameenyousuf@"
            className="w-full"
          />

          {searchTerm && (
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-pink-100 text-pink-600 text-sm">
                    Y
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Yameen yousuf
                  </div>
                  <div className="text-xs text-gray-600">
                    Yameenyousuf@gmail.com
                  </div>
                </div>
              </div>
              <button
                onClick={handleInvite}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Invite
              </button>
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        <div className="flex items-center justify-between px-6 py-4">
          <Button variant="outline" className="text-sm">
            Cancel
          </Button>
          <Button className="text-sm border border-blue-600 bg-white text-blue-700 hover:bg-blue-700 hover:text-white">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

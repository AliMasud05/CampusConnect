"use client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const CopyClipboard = () => {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("URL Copied to clipboard");
      }}
      variant="ghost"
      size="icon"
      className="h-8 w-8"
    >
      <Copy className="h-4 w-4" />
      <span className="sr-only">Copy link</span>
    </Button>
  );
};

export default CopyClipboard;

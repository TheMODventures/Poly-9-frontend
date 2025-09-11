"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion";
import { ChevronDown, MoreVertical } from "lucide-react";
import { colors, bases } from "@/utils/constant";
import Image from "next/image";

export default function TransformProduct() {
  const [selectedColors, setSelectedColors] = useState<string[]>(["Green"]);
  const [selectedBase, setSelectedBase] = useState<string>("Brushed Brass");

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  return (
    <div className="w-75 bg-white border-l border-gray-100 flex flex-col">
      <div className="p-[1.13rem] border-b border-gray-100">
        <div className="flex items-center justify-between mb-0">
          <h2 className="text-lg font-inter text-blue-600" style={{ fontWeight: "600" }}>
            Transform
          </h2>
          <Button variant="ghost" size="sm" className="p-1">
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <Accordion type="multiple" className="w-full space-y-3">
          <AccordionItem value="specification" className="border-0">
            <AccordionTrigger className="bg-gray-50 px-4 py-3 rounded-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span className="text-sm font-medium text-gray-700">Product Specification</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-600 leading-relaxed">
              The Swedish Designer Monica Forstar&apos;s Style Is Characterised By Her Enternal
              Love For New Materials And Beautiful Pure Shapes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="color" className="border-0">
            <AccordionTrigger className="bg-gray-50 px-4 py-3 rounded-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span className="text-sm font-medium text-gray-700">Color</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3">
              <div className="space-y-3">
                {colors.map((color) => (
                  <div key={color.name} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 cursor-pointer ${
                        selectedColors.includes(color.name)
                          ? "border-gray-800"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => toggleColor(color.name)}
                    />
                    <span className="text-sm text-gray-700 flex-1">{color.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="base" className="border-0">
            <AccordionTrigger className="bg-gray-50 px-4 py-3 rounded-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span className="text-sm font-medium text-gray-700">Base</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3">
              <div className="grid grid-cols-5 gap-2">
                {bases.map((base, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-12 h-12 rounded cursor-pointer border-2 ${
                        selectedBase === base.name ? "border-blue-500" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: base.color }}
                      onClick={() => setSelectedBase(base.name)}
                    />
                    <span className="text-xs text-gray-600 mt-1 block leading-tight">
                      {base.name}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Product Style</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg p-0 text-center">
              <Image
                src="/assets/table1.svg"
                width={80}
                height={60}
                alt="Table style 1"
                className="w-full h-26 object-contain mb-2"
              />
            </div>
            <div className="rounded-lg p-0 text-center">
              <Image
                src="/assets/table2.svg"
                width={80}
                height={60}
                alt="Table style 2"
                className="w-full h-26 object-contain mb-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
          Apply Changes
        </Button>
      </div>
    </div>
  );
}

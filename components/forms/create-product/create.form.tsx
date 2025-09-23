"use client";

import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createProductSchema,
  CreateProductFormValues,
} from "./create.validation";
import { buildItemGenerationPrompt, getFormContent } from "@/utils/helper";
import { useCreateBuyerItem } from "@/services/mutation/buyer.mutation";
import { toast } from "sonner";
import { TagInput } from "@/components/shared/tag-input";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/store/chat.store";

interface CreateProductProps {
  trigger: React.ReactNode;
  variant: "collection" | "product";
  buyerId?: string;
}

export default function CreateProduct({
  trigger,
  variant,
  buyerId,
}: CreateProductProps) {
  const [open, setOpen] = useState(false);
  const isCollection = variant === "collection";
  const content = useMemo(() => getFormContent(variant), [variant]);
  const createItemMutation = useCreateBuyerItem();
  const router = useRouter();
  const setContext = useChatStore((state) => state.setContext);
  const resetSession = useChatStore((state) => state.resetSession);

  const form = useForm<CreateProductFormValues>({
    resolver: yupResolver(createProductSchema, {
      context: { isCollection },
    }),
    defaultValues: {
      collectionName: "",
      season: "",
      styles: [],
      targetImageCount: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const handleDialogChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      reset();
    }
  };

  const onSubmit = async (values: CreateProductFormValues) => {
    if (!buyerId) {
      toast.error("No buyer selected");
      return;
    }

    try {
      const rawTargetCount = isCollection
        ? Number.parseInt(values.targetImageCount, 10)
        : undefined;
      const parsedTargetCount = Number.isNaN(rawTargetCount)
        ? undefined
        : rawTargetCount;

      const payload = {
        buyer_id: buyerId,
        type: isCollection ? "collection" : "product",
        name: values.collectionName.trim(),
        season: values.season.trim(),
        style: values.styles.map((style) => style.trim()).filter(Boolean),
        target_image_count: parsedTargetCount,
      };

      const result = await createItemMutation.mutateAsync(payload);
      reset();
      setOpen(false);

      const autoPrompt = buildItemGenerationPrompt({
        type: variant,
        name: payload.name,
        season: payload.season,
        styles: payload.style,
        targetImageCount: parsedTargetCount,
      });

      const newItemId = result.item_id;

      setContext({ buyerId, itemId: newItemId });
      resetSession();

      const params = new URLSearchParams();
      params.set("buyerId", buyerId);
      params.set("itemId", newItemId);
      if (autoPrompt) {
        params.set("autoQuery", autoPrompt);
      }

      router.push(`/chat?${params.toString()}`);
    } catch (error) {
      console.error(
        `Error creating ${isCollection ? "collection" : "product"}:`,
        error
      );
      // axios middleware will surface the user-facing error
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg p-0 gap-0 scale-78">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {content.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mx-6 mb-6 p-4 bg-blue-500 text-white rounded-lg">
          <p className="text-sm">{content.subtitle}</p>
        </div>

        <div className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={control}
                name="collectionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-900">
                      {content.nameLabel}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        className="bg-gray-50 border-gray-200 focus:bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-900">
                      {content.seasonLabel}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the season context"
                        className="bg-gray-50 border-gray-200 focus:bg-white min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="styles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-900">
                      {content.styleLabel}
                    </FormLabel>
                    <FormControl>
                      <TagInput
                        value={field.value || []}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Add style and press Space"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isCollection && (
                <FormField
                  control={control}
                  name="targetImageCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-900">
                        Target image count
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="5"
                          className="bg-gray-50 border-gray-200 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={createItemMutation.isPending}
                  className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer px-8 py-2 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {createItemMutation.isPending ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

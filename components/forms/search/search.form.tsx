"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import { searchValidation } from "./search.validation";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdSearch } from "react-icons/io";

interface SearchFormValues {
  search: string;
}

interface SearchFormProps {
  onSearchChange?: (searchTerm: string) => void;
}

const SearchFormInner = ({ onSearchChange }: SearchFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<SearchFormValues>({
    resolver: yupResolver(searchValidation) as Resolver<SearchFormValues>,
    defaultValues: {
      search: searchParams.get("q") || "",
    },
  });

  const searchTerm = form.watch("search");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const onSubmit = (values: SearchFormValues) => {
    onSearchChange?.(values.search);
  };

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      onSearchChange?.(debouncedSearchTerm);

      const params = new URLSearchParams(searchParams);
      if (debouncedSearchTerm) {
        params.set("q", debouncedSearchTerm);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearchTerm, onSearchChange, router, searchParams]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Search Buyers</FormLabel>
              <FormControl>
                <div className="relative">
                  <IoMdSearch className="absolute left-3 top-4 text-gray-700 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search Buyers"
                    {...field}
                    className="pl-10 pr-4 py-6 border border-gray-300 rounded-xl"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export const SearchForm = (props: SearchFormProps) => {
  return (
    <Suspense
      fallback={<div className="h-12 bg-gray-100 animate-pulse rounded-3xl" />}
    >
      <SearchFormInner {...props} />
    </Suspense>
  );
};

"use client";

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import { searchValidation } from "./search.validation";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0 m-0 bg-transparent border-none cursor-pointer"
        >
          <svg
            className="h-5 w-5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>

        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Search Buyes</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Search Buyers"
                  {...field}
                  className="pr-8 pl-4 py-6 border border-gray-300 rounded-xl"
                />
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

"use client";

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema, RegisterFormValues } from "./register.validation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterForm(): React.ReactNode {
  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    console.log("Register form values:", values);
  };


  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="relative w-[380px] p-7 space-y-4 bg-white rounded-xl shadow-lg scale-94">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="mt-2 text-sm text-gray-500">
            Let&apos;s Create An Account Together
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Representator Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.companyName?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="companyEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Representator Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.companyEmail?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 rounded-lg">
              Sign Up
            </Button>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1/4 h-px bg-gray-300"></div>
              <span className="text-sm font-medium text-gray-500">Or</span>
              <div className="w-1/4 h-px bg-gray-300"></div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg"
            >
              <Image
                src="/assets/google-icon.svg"
                alt="Google icon"
                width={22}
                height={22}
                className="mr-1"
              />
              Sign Up With Google
            </Button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Already Have An Account?{" "}
              <Link href="/login" className="font-semibold leading-6 text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormValues } from "./login.validation";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "@/services/mutation/auth.mutation";

export default function LoginForm(): React.ReactNode {
  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const loginMutation = useLogin();

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate({ email: values.email, password: values.password });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="relative w-[380px] p-12 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1
            className="text-2xl text-gray-800"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Welcome Back! Please Enter Your Details.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
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
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between text-sm">
              <FormField
                control={control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-gray-500">
                      Remember Me
                    </FormLabel>
                  </FormItem>
                )}
              />
              <a
                href="#"
                className="text-sm font-medium text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1/4 h-px bg-gray-300"></div>
              <span className="text-sm font-medium text-gray-500">Or</span>
              <div className="w-1/4 h-px bg-gray-300"></div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-md"
            >
              <Image
                src="/assets/google-icon.svg"
                alt="Google icon"
                width={22}
                height={23}
                className="mr-1"
              />
              Sign Up With Google
            </Button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Don&apos;t Have An Account?{" "}
              <Link
                href="/register"
                className="font-semibold leading-6 text-blue-500 hover:underline"
              >
                Sign Up For Free
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

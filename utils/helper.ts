import { AddBuyerFormValues } from "@/components/forms/buyers/add-modal/add.validation";
import { setCookie } from "cookies-next/client";
import { ControllerRenderProps } from "react-hook-form";

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("access-token");
  return accessToken;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("access-token", token);
  setCookie("access-token", token);
};

export const removeAccessToken = () => {
  localStorage.removeItem("access-token");
};

export const toggleSocial = (
  field: ControllerRenderProps<AddBuyerFormValues, "socials">,
  social: string
) => {
  field.onChange(
    field.value?.includes(social)
      ? field.value.filter((s) => s !== social)
      : [...(field.value || []), social]
  )
}

  export const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
  }
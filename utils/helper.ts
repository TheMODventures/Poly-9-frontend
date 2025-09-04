import { AddBuyerFormValues } from "@/components/forms/buyers/add-modal/add.validation";
import { setCookie } from "cookies-next/client";
import { ControllerRenderProps } from "react-hook-form";
import React from "react"
import { FormContentConfig } from "@/interfaces/interface";

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

export const getFormContent = (isCollection: boolean): FormContentConfig => {
  if (isCollection) {
    return {
      title: "Create New Collection",
      subtitle: "Lets create a new product collection. I've prepared a few questions to help get started",
      nameLabel: "Whats your collection name?",
      seasonLabel: "Which season is the collection for?",
      styleLabel: "What style should it include?",
      countLabel: "How many products should be in the collection?"
    }
  } else {
    return {
      title: "Create New Product",
      subtitle: "Lets create a new product. I've prepared a few questions to help get started",
      nameLabel: "Whats your product name?",
      seasonLabel: "Which season is the product for?",
      styleLabel: "What style should it include?",
      countLabel: "How many products should be in the collection?"
    }
  }
}

export const isCollectionTrigger = (trigger: React.ReactNode): boolean => {
  if (React.isValidElement(trigger)) {
    const element = trigger as React.ReactElement<any>
    
    if (element.props?.children) {
      const children = element.props.children
      
      if (typeof children === 'string') {
        return children.toLowerCase().includes('collection')
      }
      
      if (Array.isArray(children)) {
        return children.some(child => 
          typeof child === 'string' && child.toLowerCase().includes('collection')
        )
      }
    }
  }
  return false
}

import { UseFormSetValue } from "react-hook-form"
import { CreateProductFormValues } from "@/components/forms/create-product/create.validation"

export function createStyleHandlers(
  watchedStyles: string[],
  setValue: UseFormSetValue<CreateProductFormValues>,
  setNewStyle: React.Dispatch<React.SetStateAction<string>>
) {
  const addStyle = (style: string) => {
    if (style && !watchedStyles.includes(style)) {
      setValue("styles", [...watchedStyles, style])
      setNewStyle("")
    }
  }

  const removeStyle = (style: string) => {
    setValue("styles", watchedStyles.filter((s) => s !== style))
  }

  return { addStyle, removeStyle }
}

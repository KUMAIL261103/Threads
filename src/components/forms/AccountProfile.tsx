"use client";

import { useForm } from "react-hook-form";
// import { Form } from "../ui/form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import profileimg from "../../assets/profile.svg";
import { Button } from "../ui/button";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadThing";
import { usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";
import { ChangeEvent, useState } from "react";
import { updateuser } from "@/lib/actions/user.actions";
interface Props {
  user: {
    username: string;
    objectid: string;
    image: string;
    bio: string;
    name: string;
    id: string;
  };
  btn_title: string;
}
const AccountProfile = ({ user, btn_title }: Props) => {
  const [files, setfiles] = useState<File[]>();
  const router = useRouter();
  const path = usePathname();
  const { startUpload } = useUploadThing("media");
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      username: user?.username || "",
      name: user?.name || "",
      bio: user?.bio || "",
    },
  });
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldchange: (value: string) => void
  ) => {
    e.preventDefault();
    const filereader = new FileReader();
    if (e.target.files?.length) {
      const file = e.target.files[0];
      console.log(file);
      setfiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      filereader.onload = async (event) => {
        const imgDataUrl = event.target?.result?.toString() || "";
        fieldchange(imgDataUrl);
      };
      filereader.readAsDataURL(file);
    }
  };
  async function onSubmit(values: z.infer<typeof userValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgg = await startUpload(files || []);
      console.log(imgg);
      if (imgg && imgg[0].url) {
        values.profile_photo = imgg[0].url;
      }
    }
    await updateuser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      profile_photo: values.profile_photo,
      path: path,
    });
    if (path === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-7"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center max-sm:flex-col">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src={profileimg}
                    alt="profile_photo"
                    width={24}
                    height={24}
                    className="object-cover rounded-full"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 max-sm:flex-col ">
                <Input
                  type="file"
                  placeholder="upload a photo"
                  accept="image/*"
                  className="account-form_image-input max-sm:text-center max-sm:text-small-regular max-sm:px-0 max-sm:file:w-[50%] "
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center max-sm:flex-col gap-x-11">
              <FormLabel className="text-base-semibold">Name</FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 max-sm:flex-col">
                <Input
                  className="account-form_input no-focus max-w-[500px] max-sm:text-center max-sm:text-small-regular max-sm:px-0 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex items-center max-sm:flex-col gap-x-3.5 ">
              <FormLabel className="text-base-semibold">Username</FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 max-sm:flex-col">
                <Input
                  className="account-form_input no-focus max-w-[500px] max-sm:text-center max-sm:text-small-regular max-sm:px-0 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex items-center max-sm:flex-col gap-x-16 ">
              <FormLabel className="text-base-semibold">Bio</FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 max-sm:flex-col">
                <Textarea
                  rows={10}
                  className="account-form_input no-focus max-w-[500px] max-sm:text-center max-sm:text-small-regular max-sm:px-0 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary-500 hover:scale-[102%] transition-all hover:ease-in-out hover:duration-300 text-light-2 font-semibold"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;

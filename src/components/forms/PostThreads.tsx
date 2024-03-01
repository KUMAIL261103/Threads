"use client";

import { useForm } from "react-hook-form";
// import { Form } from "../ui/form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
// import profileimg from "../../assets/profile.svg";
import { Button } from "../ui/button";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreadValidation } from "@/lib/validations/threads";
// import { updateuser } from "@/lib/actions/user.actions";
import { createThread } from "@/lib/actions/threads";
// interface Props{
//     user:{
//         username:string,
//         objectid:string,
//         image:string,
//         bio:string,
//         name:string,
//         id:string,

//     },
//     btn_title:string

// }

const PostThread = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const path = usePathname();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      threads: "",
      accountId: userId,
    },
  });
  //console.log(userId);

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    // console.log(userId);
    await createThread({
      text: values.threads,
      author: userId,
      communityId: null,
      path: path,
    });
    router.push("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-7"
      >
        <FormField
          control={form.control}
          name="threads"
          render={({ field }) => (
            <FormItem className="flex flex-col mx-auto max-md:mx-0 gap-3 ">
              <FormLabel className="text-base-semibold text-light-2 ">
                Content
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 max-sm:flex-col">
                <Textarea
                  rows={15}
                  className="account-form_input no-focus  min-w-[700px] max-md:min-w-full   max-sm:text-small-regular max-sm:px-0 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary-500 w-[50%] max-md:w-full flex justify-center mx-auto "
        >
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;

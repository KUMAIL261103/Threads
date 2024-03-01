"use client";

import { useForm } from "react-hook-form";
// import { Form } from "../ui/form";
import * as z from "zod";
import { Input } from "../ui/input";
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
// import { ThreadValidation } from "@/lib/validations/threads";
import { CommentValidation } from "@/lib/validations/threads";
// import { updateuser } from "@/lib/actions/user.actions";
import { addComment, createThread } from "@/lib/actions/threads";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
const Comment = ({
  threadId,
  currentUserImage,
  currentUserId,
}: {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}) => {
  const router = useRouter();
  const path = usePathname();
  // const user = await currentUser();
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      threads: "",
      //   accountId: currentUserId,
    },
  });
  //console.log(userId);

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    // const currentUser = await user;
    // console.log(typeof threadId);
    // console.log(typeof values.threads);
    // console.log(typeof currentUserId);
    // console.log(typeof path);
    await addComment(threadId, values.threads, currentUserId, path);
    form.reset();
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
          <FormField
            control={form.control}
            name="threads"
            render={({ field }) => (
              <FormItem className="flex  w-full items-center gap-3 ">
                <FormLabel>
                  <Image
                    src={currentUserImage}
                    alt="img"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    className=" no-focus outline-none text-light-2  bg-dark-2  "
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="comment-form_btn  ">
            Reply
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Comment;

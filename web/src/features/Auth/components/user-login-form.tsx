import * as React from "react";

import { Icons } from "../../../components/icons";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ({ className, ...props }: UserLoginFormProps) {
  const { toast } = useToast();

  const auth = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await auth.login({
        email: values.email,
        password: values.password,
      });
      toast({ title: "Успешный логин", description: "Бро все гуд" });
    } catch (e: any) {
      toast({
        title: "Не удалось сделать логин",
        description: "Бро все плохо!",
        variant: "destructive",
      });
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }

  return (
    <div className={className} {...props}>
      <Form {...form}>
        <form className="grid gap-1" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="sr-only" htmlFor="email">
                  Почта
                </Label>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label className="sr-only" htmlFor="password">
                  Почта
                </Label>
                <FormControl>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2 mt-2">
            <div className="grid gap-1"></div>
            <Button disabled={isLoading} variant="default">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Войти в аккаунт
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

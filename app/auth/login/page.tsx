import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-6 bg-white dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

export function WelcomeHeader({ email }: { email: string }) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2">
        Selamat datang!
      </h1>
      <p className="text-xl text-gray-500">
        Account: <span className="font-medium text-black dark:text-white">{email}</span>
      </p>
    </div>
  );
}
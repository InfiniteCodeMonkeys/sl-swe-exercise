import SignupForm from "./components/SignupForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">New Signup</h1>
      <p className="mb-6">
        Please fill out the form below to create a new account.
      </p>
      <SignupForm />
    </main>
  );
}

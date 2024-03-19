import { LoginButton } from "@/components/auth/auth-buttons";

const randomnumberarray = [1, 6, 7, 8, 9, 10, 32, 2, 5, 4, 8, 15, 42, 38, 102, 110];

export default async function LandingPage() {
  return (
    <>
      <p>Hello, World!</p>
      <p>Landing Page</p>
      {randomnumberarray
        .sort((a, b) => a - b) // Remove .id property access
        .map((number) => (
          <p key={number}>{number}</p>
        ))}
      <LoginButton />
    </>
  );
}

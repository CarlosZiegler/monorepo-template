import AuthButton from "../../components/auth-button";

import Header from "@/components/header";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <AuthButton />
          <ThemeToggle />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://github.com/CarlosZiegler"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Carlos Ziegler
          </a>
        </p>
      </footer>
    </div>
  );
}

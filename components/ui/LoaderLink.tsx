"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";

interface LoaderLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function LoaderLink({ href, children, className }: LoaderLinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePress = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link 
      href={href} 
      onClick={handlePress} 
      className={`${className} ${isPending ? "opacity-50 cursor-wait" : ""}`}
    >
      {children}
    </Link>
  );
}

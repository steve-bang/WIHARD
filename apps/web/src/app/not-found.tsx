import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link href="/templates" className="mt-6 inline-block text-brand-600 underline">
        Explore templates
      </Link>
    </Container>
  );
}

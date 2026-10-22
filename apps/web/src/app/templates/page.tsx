import type { Metadata } from "next";
import { TemplatesListingPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Templates",
  description: "Websites, apps, and business tools you can start from.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage({ searchParams }: PageProps<"/templates">) {
  return <TemplatesListingPage searchParams={searchParams} />;
}

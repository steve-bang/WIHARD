import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { TemplatesListingPage } from "@/components/category-page";

export const metadata: Metadata = pageMetadata({
  title: "Templates",
  description:
    "Browse ready-to-use websites, web apps, and business tools. Compare features, customization options, pricing, and support, then make one yours.",
  path: "/templates",
});

export default function TemplatesPage({ searchParams }: PageProps<"/templates">) {
  return <TemplatesListingPage searchParams={searchParams} />;
}

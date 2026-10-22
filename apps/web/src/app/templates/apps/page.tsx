import { TemplatesListingPage, categoryMetadata } from "@/components/category-page";

export const metadata = categoryMetadata("apps");

export default function Page({ searchParams }: PageProps<"/templates/apps">) {
  return <TemplatesListingPage searchParams={searchParams} category="apps" />;
}

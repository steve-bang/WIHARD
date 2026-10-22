import { TemplatesListingPage, categoryMetadata } from "@/components/category-page";

export const metadata = categoryMetadata("business-tools");

export default function Page({ searchParams }: PageProps<"/templates/business-tools">) {
  return <TemplatesListingPage searchParams={searchParams} category="business-tools" />;
}

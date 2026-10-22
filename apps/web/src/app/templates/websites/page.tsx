import { TemplatesListingPage, categoryMetadata } from "@/components/category-page";

export const metadata = categoryMetadata("websites");

export default function Page({ searchParams }: PageProps<"/templates/websites">) {
  return <TemplatesListingPage searchParams={searchParams} category="websites" />;
}

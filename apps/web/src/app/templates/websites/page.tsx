import { CategoryPage, categoryMetadata } from "@/components/category-page";

export const metadata = categoryMetadata("websites");

export default function Page() {
  return <CategoryPage slug="websites" />;
}

import { CategoryPage, categoryMetadata } from "@/components/category-page";

export const metadata = categoryMetadata("business-tools");

export default function Page() {
  return <CategoryPage slug="business-tools" />;
}

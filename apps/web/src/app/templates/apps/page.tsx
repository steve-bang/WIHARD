import { CategoryPage, categoryMetadata } from "@/components/category-page";

export const metadata = categoryMetadata("apps");

export default function Page() {
  return <CategoryPage slug="apps" />;
}

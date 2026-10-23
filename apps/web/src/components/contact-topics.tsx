import Link from "next/link";
import { ArrowRight, Bug, Headphones, MessageCircle, ShoppingBag, Sparkles, type LucideIcon } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { businessDays, policies } from "@/lib/policies";

// Contact topics for /contact. Buttons across the site link here with ?product=<slug> or ?topic=<id>;
// the matching topic is highlighted and moved first. The form itself arrives with services/api (FR-L01–L02).

export type ContactTopicId = "product" | "support" | "creator" | "security" | "general";

const [critical, standard, general] = policies.responseTimes;

const topics: {
  id: ContactTopicId;
  icon: LucideIcon;
  title: string;
  when: string;
  prepare: string[];
  response: string;
  link: { href: string; label: string };
}[] = [
  {
    id: "product",
    icon: ShoppingBag,
    title: "Interest in a product",
    when: "You found a product you like and want to make it yours, or you're not sure which product fits.",
    prepare: [
      "The product name, or the problem you want to solve",
      "What you'd like to change, described in plain words",
      "Your timeline and budget, if you have them",
    ],
    response: businessDays(general.days),
    link: { href: "/templates", label: "Browse products" },
  },
  {
    id: "support",
    icon: Headphones,
    title: "Support for a product you use",
    when: "Something isn't working as the product page describes, or you need help using a feature.",
    prepare: ["The product name", "What happened and what you expected", "Screenshots, if you can take them"],
    response: `${businessDays(critical.days)} for critical issues, ${businessDays(standard.days)} for others`,
    link: { href: "/support-policy", label: "Read the support policy" },
  },
  {
    id: "creator",
    icon: Sparkles,
    title: "Become a creator",
    when: "You build websites, apps, or business tools and want to publish them on WIHARD.",
    prepare: [
      "What you build and who it's for",
      "Links to your work or a live demo",
      "Confirmation that you own the code and know the licences of what it uses",
    ],
    response: businessDays(general.days),
    link: { href: "/for-creators", label: "See how publishing works" },
  },
  {
    id: "security",
    icon: Bug,
    title: "Report a security issue",
    when: "You found a vulnerability in WIHARD or in a product listed on it.",
    prepare: [
      "Where you found it (page or product)",
      "Steps to reproduce it",
      "Please don't share details publicly until it is fixed",
    ],
    response: `Acknowledged within ${businessDays(policies.vulnerabilityAckDays)}`,
    link: { href: "/security", label: "How we handle vulnerabilities" },
  },
  {
    id: "general",
    icon: MessageCircle,
    title: "Anything else",
    when: "Partnerships, press, feedback on the website, or a question that doesn't fit above.",
    prepare: ["Who you are", "What you'd like to talk about"],
    response: businessDays(general.days),
    link: { href: "/about", label: "Learn about WIHARD" },
  },
];

const isTopic = (v: unknown): v is ContactTopicId => topics.some((t) => t.id === v);

export function ContactTopics({ topic, productSlug }: { topic?: string; productSlug?: string }) {
  const product = productSlug ? getProduct(productSlug) : undefined;
  const active: ContactTopicId | undefined = isTopic(topic) ? topic : product ? "product" : undefined;
  const ordered = active ? [...topics.filter((t) => t.id === active), ...topics.filter((t) => t.id !== active)] : topics;

  return (
    <div className="space-y-6">
      {product && (
        <div className="rounded-2xl border-2 border-brand-600 bg-brand-50/60 p-6">
          <p className="text-sm text-muted">You&apos;re asking about</p>
          <p className="mt-1 text-xl font-bold">{product.name}</p>
          <p className="mt-2 text-sm text-muted">
            When the form opens, tell us which of its {product.customization.allowed.length} customization options you
            need and anything else you&apos;d like to change. Until then, its page lists the price, extras, and support
            terms.
          </p>
          <Link
            href={`/templates/${product.slug}`}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600"
          >
            Back to {product.name} <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      )}

      <ul className="grid gap-6 md:grid-cols-2">
        {ordered.map(({ id, icon: Icon, title, when, prepare, response, link }) => {
          const current = id === active;
          return (
            <li
              key={id}
              id={id}
              aria-current={current ? "true" : undefined}
              className={`scroll-mt-20 rounded-2xl p-6 ${current ? "border-2 border-brand-600 bg-white shadow-sm md:col-span-2" : "border border-line bg-white"}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-50">
                  <Icon aria-hidden className="size-5 text-brand-600" />
                </span>
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted">{when}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">What to include</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {prepare.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                <span className="font-medium">First response:</span> <span className="text-muted">{response}</span>
              </p>
              <Link href={link.href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                {link.label} <ArrowRight aria-hidden className="size-4" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

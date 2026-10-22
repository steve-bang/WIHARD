# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

The repository contains no application code yet — only a spec and reference images. There are no build, lint, or test commands until a project is scaffolded. When one is added, update this file with the real commands (including how to run a single test).

- `docs/PRODUCT_VISION.md` — the source of truth for what to build: product positioning, audiences, principles, the full sitemap, and the required sections of product detail pages. Read it before implementing anything.
- `images/` — page screenshots (`home`, `templates`, `template-details`, `solutions`, `for-creators`, `login`) to use as visual references for the corresponding pages.

## What is being built

WIHARD is a public marketing/discovery website for a platform connecting software creators (vibe coders, indie hackers, studios) with non-technical customers who want to discover a product, preview it, customize it in plain language, deploy it, and keep it running. The platform — not the individual creator — is the customer's long-term point of contact.

## Stack (from the spec)

If starting from scratch, use: Next.js (App Router), TypeScript, Tailwind CSS, Lucide icons, and a lightweight set of reusable accessible components with consistent design tokens. Keep dependencies stable and minimal. If a stack already exists, preserve it rather than replacing it.

## Required pages

All routes are listed in `docs/PRODUCT_VISION.md` §5. In short: `/`, `/how-it-works`, `/templates` (+ `/websites`, `/apps`, `/business-tools`), `/templates/[slug]` (dynamic, driven by realistic sample data), `/solutions` (+ `/garage-management`, `/customer-management`, `/booking-management`), `/for-creators`, `/pricing`, `/security`, `/support-policy`, `/about`, `/contact`.

The `/templates/[slug]` page must cover every section enumerated in the spec (preview, demo CTA, customization workflow, deployment, pricing and extra costs, support level, maintenance, creator info, version history, FAQ, related products, "Make it yours" CTA) and should make products easy to compare. Model the sample product data so that categories, solution pages, and detail pages all draw from the same source.

## Copy and content rules

- Headline: "Build software for your work, without coding." Supporting: "Discover it. Make it yours. Put it to work." CTAs: "Explore templates" (primary), "How it works" (secondary), "Build with us" (creators).
- Use transparent, credible language: never imply infinite customization, free coverage of every problem, or capabilities that don't exist. Pricing must state what's included and what may cost extra; support levels must be explicit.
- Creator profiles build trust but must not be presented as the only support route.

## Working conventions

The spec asks that routine implementation decisions be made without asking for approval — make sensible choices, document important assumptions, and proceed.

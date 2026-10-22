## 1. PRODUCT VISION

We are building a platform that connects software creators, including vibe coders, with people who need websites, apps, and business tools but do not know how to code.

Customers should be able to:

1. Discover an existing website, application, or business tool.
2. Preview a live demo and understand what it does.
3. Choose a product that fits their needs.
4. Customize it using natural-language instructions, including AI-assisted modifications.
5. Deploy and publish it without managing complex infrastructure.
6. Operate, maintain, update, and grow their product without depending entirely on its original creator.

Creators can publish software products and templates, demonstrate their capabilities, and earn revenue.

The platform is the central trusted service provider. Creators contribute products and creative capabilities, while the platform owns the customer experience and establishes clear standards for deployment, billing, support, security, backups, product continuity, and operational reliability.

### Core positioning

Primary headline:
“Build software for your work, without coding.”

Supporting headline:
“Discover it. Make it yours. Put it to work.”

Supporting message:
“Find a product that fits your needs, customize it in plain language, and launch with a platform that helps you keep it running.”

Primary CTA: “Explore templates”

Secondary CTA: “How it works”

Creator CTA: “Build with us”

Do not imply that every product can be customized infinitely, that every problem is covered for free, or that the platform has capabilities that have not been implemented. Use transparent and credible language.

## 2. TARGET AUDIENCES

### Audience A — Non-technical customers

Examples:
- Small business owners
- Freelancers and independent professionals
- Startup founders
- Local service businesses
- People who need an internal business tool
- People who need a website or web application

Pain points:
- They cannot code.
- Hiring developers is expensive and slow.
- They do not know which technical decisions to make.
- They worry about maintenance and hidden costs.
- They fear the original developer will disappear.
- They need to own and control their business workflow and data.

### Audience B — Software creators

Examples:
- Vibe coders
- Indie hackers
- Freelance developers
- Small software studios
- AI-assisted builders

Pain points:
- They need distribution and customers.
- They want to monetize reusable software.
- They do not want to handle every aspect of marketing and customer acquisition themselves.
- They need clear publishing standards and commercial terms.

## 3. CORE PRODUCT PRINCIPLES

Reflect these principles throughout the public website:

- Customers choose outcomes, not programming languages.
- Customers can start from an existing product instead of a blank screen.
- Natural language should be a primary customization interaction.
- The platform is the long-term point of contact for customers.
- Customer data, product ownership, licensing, and support terms must be transparent.
- Platform-managed products must clearly explain their support level.
- Creator profiles build trust but must not become the only route to customer support.
- Pricing must explain what is included and what might cost extra.
- The product should feel approachable to non-technical people while remaining credible to technical creators.

## 4. FIRST ACTION: INSPECT THE REPOSITORY

Before implementation:

1. Inspect the current repository structure.
2. Read package.json, existing README, framework configuration, routing setup, styling setup, and reusable components.
3. Identify the existing framework and working conventions.
4. Preserve working functionality and avoid replacing the stack without a compelling reason.
5. If the repository is empty, establish a modern frontend architecture using the most suitable supported stack.

Preferred stack when starting from scratch:
- Next.js with App Router
- TypeScript
- Tailwind CSS
- Reusable accessible components
- Lucide icons
- A lightweight component system with consistent design tokens

Use stable dependencies compatible with the existing project. Avoid unnecessary packages.

Do not ask me to approve routine implementation decisions. Make sensible decisions, document important assumptions, and proceed.

## 5. INFORMATION ARCHITECTURE AND SITEMAP

Implement all of the following public pages.

### A. Main marketing pages

1. `/`
   Homepage

2. `/how-it-works`
   Explain the full journey from discovery to customization, deployment, and ongoing operation.

3. `/templates`
   Main template and product discovery page.

4. `/templates/websites`
   Website templates.

5. `/templates/apps`
   Web applications and software tools.

6. `/templates/business-tools`
   Business management tools.

7. `/solutions`
   Browse products by problem, workflow, and business use case.

8. `/solutions/garage-management`
   Garage and automotive service management.

9. `/solutions/customer-management`
   Customer relationship and lead management.

10. `/solutions/booking-management`
    Appointment and booking management.

11. `/for-creators`
    Creator landing page.

12. `/pricing`
    Transparent pricing and plans.

13. `/security`
    Security, data protection, and platform trust.

14. `/support-policy`
    Explain support responsibilities, coverage, escalation, and limitations.

15. `/about`
    Company mission and platform principles.

16. `/contact`
    Contact and support entry points.

### B. Product discovery and detail pages

17. `/templates/[slug]`
    Dynamic product detail page using realistic sample data.

Every product detail page should be designed around the following sections:
- Product name, short description, category, and status
- Product screenshots or preview
- Live demo CTA when a demo URL exists
- Main features and target audience
- What customers can customize
- Customization workflow
- Deployment and hosting information
- Pricing and possible additional costs
- Support level and coverage
- Update and maintenance information
- Creator information
- Version history or recent updates
- FAQ
- Related products
- Strong “Make it yours” CTA

Make it easy for customers to compare products before committing.

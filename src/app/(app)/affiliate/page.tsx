import { FC } from 'react';
import Link from 'next/link';

const AffiliatePage: FC = () => {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-68px)] max-w-3xl flex-col gap-10 px-4 py-10 md:px-6 lg:px-8">
      <section className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          KYYNK Affiliate Program
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Earn 60%. The Highest Rev-Share In The Industry.
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          Become a KYYNK partner and earn real money by promoting the most
          advanced interactive adult AI platform.
        </p>
        <Link
          href="https://kyynk.tolt.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-primary/90"
        >
          Become an Affiliate — It&apos;s Free
        </Link>
        <p className="text-base text-muted-foreground md:text-lg">
          We offer a massive 60% revenue share on all purchases. No limits. No
          caps. No bullshit.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            60% Rev-Share
          </h2>
          <p className="text-sm text-muted-foreground">
            The highest commission rate in the industry. You keep more than half
            of every sale you bring.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            High-Converting Product
          </h2>
          <p className="text-sm text-muted-foreground">
            Interactive AI roleplay, personalized stories, and immersive adult
            experiences. Users love it. They stay. They buy credits.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Lifetime Earnings
          </h2>
          <p className="text-sm text-muted-foreground">
            Earn from every purchase a user makes — forever. Real passive income
            from long-term relationships.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Serious Earning Potential
          </h2>
          <p className="text-sm text-muted-foreground">
            With our conversion rates, affiliates regularly generate 3–5x more
            than with typical adult platforms.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Instant Approval
          </h2>
          <p className="text-sm text-muted-foreground">
            No interviews, no waiting. Sign up and start promoting KYYNK in
            minutes.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Full Transparency
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time dashboard to track clicks, signups, and revenue. Always
            know exactly what you&apos;re earning.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Who Is This For?
        </h2>
        <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          <p>Adult creators</p>
          <p>Traffic owners</p>
          <p>Marketers</p>
          <p>Review sites</p>
          <p>NSFW Twitter &amp; Reddit pages</p>
          <p>Anyone with an audience looking to monetize big</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">How It Works</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Apply &amp; get your unique affiliate link — instant acceptance.
          </li>
          <li>Share KYYNK on your socials, website, or community.</li>
          <li>Earn 60% every time your users purchase credits on KYYNK.</li>
        </ol>
      </section>

      <section className="mt-2 flex flex-col items-center gap-4 rounded-2xl border border-primary/40 bg-primary/5 px-6 py-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Join &amp; Start Earning
        </h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          KYYNK gives you the tools, product, and payout structure to build a
          serious recurring收入 stream from adult AI.
        </p>
        <Link
          href="https://kyynk.tolt.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-primary/90"
        >
          Become an Affiliate — It&apos;s Free
        </Link>
      </section>
    </main>
  );
};

export default AffiliatePage;

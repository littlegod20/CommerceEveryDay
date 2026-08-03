import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-secondary">
      <Image
        src="https://images.unsplash.com/photo-1505252912265-4e83cec30e2d?q=80&w=1800&auto=format&fit=crop"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/20" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <FadeIn className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Considered, everyday
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-secondary-foreground sm:text-5xl">
            Goods built for daily use, not just first impressions.
          </h1>
          <p className="mt-4 text-lg text-secondary-foreground/80">
            Kitchen, style, and tech essentials — sourced for people who use
            things until they&apos;re worn in, not just worn out.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/products">Shop All</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10"
              asChild
            >
              <Link href="/products?category=kitchen-home">Browse Kitchen & Home</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

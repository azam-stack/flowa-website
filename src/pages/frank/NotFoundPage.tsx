import { Btn } from "@/components/frank/Btn";
import { PageHero } from "@/components/frank/PageHero";
import { FrankAvatar } from "@/components/frank/FrankAvatar";
import { notFound as t } from "@/content/frank/pages";
import { useSeo } from "@/lib/seo";

export function NotFoundPage() {
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/404" });
  return (
    <div className="pb-section-m lg:pb-section">
      <PageHero light={t.h1} bold="" sub={t.body} aside={<FrankAvatar className="aspect-square w-full rounded-frame border border-ink" />}>
        <div className="mt-8">
          <Btn href="/" size="lg">
            {t.cta}
          </Btn>
        </div>
      </PageHero>
    </div>
  );
}

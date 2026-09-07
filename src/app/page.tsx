import Link from "next/link";
import {
  ArrowRight,
  Bird,
  CloudSun,
  Fish,
  Leaf,
  ShieldCheck,
  Stethoscope,
  Trees,
  Wallet,
  Wheat,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";

const features = [
  { icon: Stethoscope, title: "AI Crop Diagnosis", body: "ছবি তুলে ফসলের সমস্যা সম্পর্কে সাজানো পরামর্শ পান।" },
  { icon: CloudSun, title: "Smart Weather", body: "আবহাওয়া ও বৃষ্টির সম্ভাবনা অনুযায়ী কাজের পরিকল্পনা করুন।" },
  { icon: Wheat, title: "Farm Management", body: "জমি, ফসল, কাজ ও খরচ এক জায়গায় রাখুন।" },
  { icon: Leaf, title: "Livestock", body: "গরু, ছাগল ও স্বাস্থ্য রেকর্ড সহজভাবে ট্র্যাক করুন।" },
  { icon: Bird, title: "Poultry", body: "ব্যাচ, খাবার, মৃত্যুহার ও ডিম উৎপাদন দেখুন।" },
  { icon: Fish, title: "Fisheries", body: "পুকুর, মজুদ, খাবার ও ফসল তোলা হিসাব রাখুন।" },
  { icon: Wallet, title: "Farm Finance", body: "আয়-ব্যয় ও লাভ স্পষ্টভাবে দেখুন।" },
  { icon: Trees, title: "AI Advisor", body: "খামারের প্রসঙ্গ অনুযায়ী সহজ বাংলায় পরামর্শ নিন।" },
];

const steps = [
  { n: "১", title: "খামার তৈরি করুন", body: "আপনার জেলা ও খাত বেছে নিন।" },
  { n: "২", title: "সেক্টর যোগ করুন", body: "ফসল, পশু, হাঁস-মুরগি, মাছ বা নার্সারি।" },
  { n: "৩", title: "কাজ রেকর্ড করুন", body: "সেচ, সার, খাবার ও খরচ লিখে রাখুন।" },
  { n: "৪", title: "AI ব্যবহার করুন", body: "ছবি ও প্রশ্ন দিয়ে সহায়তা নিন।" },
  { n: "৫", title: "বিশ্লেষণ দেখুন", body: "লাভ, উৎপাদন ও সতর্কতা এক নজরে।" },
  { n: "৬", title: "সিদ্ধান্ত উন্নত করুন", body: "আবহাওয়া ও ইতিহাস মেনে কাজ করুন।" },
];

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-primary">বাংলাদেশের কৃষকদের জন্য</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              আপনার খামারের জন্য AI-powered কৃষি সহকারী
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              ফসল, গবাদিপশু, হাঁস-মুরগি, মাছ ও নার্সারি—এক প্ল্যাটফর্মে পরিচালনা করুন।
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-fg">
                শুরু করুন <ArrowRight className="size-4" />
              </Link>
              <Link href="/diagnosis" className="inline-flex h-12 items-center justify-center rounded-full bg-surface px-6 font-semibold">
                AI Diagnosis
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-surface p-5">
            <p className="text-sm text-muted">আজকের খামার সারাংশ</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["জমি", "৩.২ একর"],
                ["সক্রিয় ফসল", "ধান, আলু"],
                ["আবহাওয়া", "২৯° · মেঘ"],
                ["মাসিক খরচ", "৪২,৫০০ ৳"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-bg px-4 py-4">
                  <p className="text-xs text-muted">{label}</p>
                  <p className="mt-1 text-lg font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="features" className="bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl font-semibold">এক প্ল্যাটফর্মে পুরো খামার</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((item) => (
                <article key={item.title} className="rounded-2xl bg-bg p-5">
                  <item.icon className="size-5 text-primary" />
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="how" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">কীভাবে কাজ করে</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <li key={step.n} className="rounded-2xl bg-surface p-5">
                <span className="font-display text-2xl text-primary">{step.n}</span>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="bg-surface">
          <div className="mx-auto flex max-w-6xl gap-3 px-4 py-16 sm:px-6">
            <ShieldCheck className="size-6 shrink-0 text-primary" />
            <div>
              <h2 className="font-display text-3xl font-semibold">নিরাপত্তা ও সততা</h2>
              <p className="mt-4 text-muted">AI সহায়তা দেয়, কিন্তু কৃষি বা পশুচিকিৎসকের বিকল্প নয়।</p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

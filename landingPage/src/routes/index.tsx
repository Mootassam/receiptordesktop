import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Check, Zap, Shield, Sparkles, PlayCircle, MessageCircle, Download,
  Send, ArrowRight, Wallet, Clock, Globe, Star, ChevronRight, Flame, Timer, BadgePercent,
  Coins, ArrowDownUp, LayoutGrid, Pencil, Save, Camera, Users, TrendingUp, AlertTriangle
} from "lucide-react";
import * as React from "react";
import { useI18n, LanguageSwitcher } from "@/lib/i18n";
import logoIcon from "@/assets/logo-icon.png";
import softwareUi from "@/assets/software-ui.jpg";
import tplBinanceUsdtWithdraw from "@/assets/tpl-binance-usdt-withdraw.png";
import tplTrustUsdtSend from "@/assets/tpl-trust-usdt-send.png";
import tplCoinbaseUsdtWithdraw from "@/assets/tpl-coinbase-usdt-withdraw.png";
import tplCoinbaseUsdtDeposit from "@/assets/tpl-coinbase-usdt-deposit.png";
import tplCoinbaseUsdtTrc20 from "@/assets/tpl-coinbase-usdt-trc20.png";
import tplTrustUsdtReceive from "@/assets/tpl-trust-usdt-receive.png";
import tplCashappBtc from "@/assets/tpl-cashapp-btc-withdraw.png";
import tplRainbowEth from "@/assets/tpl-rainbow-eth-send.png";
import tplCoinbaseEthDeposit from "@/assets/tpl-coinbase-eth-deposit.png";
import tplCoinbaseBtcWithdraw from "@/assets/tpl-coinbase-btc-withdraw.png";
import tplCoinbaseBtcSent from "@/assets/tpl-coinbase-btc-sent.png";
import tplOkxEthWithdraw from "@/assets/tpl-okx-eth-withdraw.png";
import tplBybitUsdtDeposit from "@/assets/tpl-bybit-usdt-deposit.png";
import tplBybitUsdtWithdraw from "@/assets/tpl-bybit-usdt-withdraw.png";
import tplTrustUsdtTronSend from "@/assets/tpl-trust-usdt-tron-send.png";
import tplBinanceUsdtDeposit from "@/assets/tpl-binance-usdt-deposit.png";
import tplOkxUsdtWithdraw from "@/assets/tpl-okx-usdt-withdraw.png";
import tplOkxUsdtDeposit from "@/assets/tpl-okx-usdt-deposit.png";
import tplBinanceUsdtWithdraw2 from "@/assets/tpl-binance-usdt-withdraw-2.png";
import tplCashappBtcSent from "@/assets/tpl-cashapp-btc-sent.png";
import tplBinancePaySuccess from "@/assets/tpl-binance-pay-success.png";
import tplTrustUsdtTransferIn from "@/assets/tpl-trust-usdt-transfer-in.png";
import tplTrustUsdtTransferOut from "@/assets/tpl-trust-usdt-transfer-out.png";
import tplBinancePayDetails from "@/assets/tpl-binance-pay-details.png";
import tplTrustUsdtReceived from "@/assets/tpl-trust-usdt-received.png";
import tplTrustUsdtSentSmall from "@/assets/tpl-trust-usdt-sent-small.png";
import tplBinanceUsdtWithdraw3 from "@/assets/tpl-binance-usdt-withdraw-3.png";

const TELEGRAM_URL = "https://t.me/CryptoReceiptPro";
const DOWNLOAD_URL = "#pricing";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PromoBar />
      <Nav />
      <Hero />
      <BestSellerBanner />
      <SocialProofBar />
      <LogosStrip />
      <Features />
      <HowItWorks />
      <SeeInAction />
      <ReceiptShowcase />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------- PROMO BAR ---------- */
function PromoBar() {
  const { t } = useI18n();
  const items = [
    { icon: Flame, text: t("promo.1") },
    { icon: BadgePercent, text: t("promo.2") },
    { icon: Timer, text: t("promo.3") },
    { icon: Star, text: t("promo.4") },
    { icon: Shield, text: t("promo.5") },
  ];
  const loop = [...items, ...items];
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-gradient-to-r from-primary via-emerald-glow to-accent text-primary-foreground border-b border-primary/40 overflow-hidden">
      <div className="relative h-9 flex items-center">
        <div className="flex animate-promo whitespace-nowrap will-change-transform">
          {loop.map((it, i) => {
            const Icon = it.icon;
            return (
              <span key={i} className="inline-flex items-center gap-2 px-6 text-xs font-semibold tracking-wide uppercase">
                <Icon className="w-3.5 h-3.5" />
                {it.text}
                <span className="opacity-60">•</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const { t } = useI18n();
  return (
    <header className="fixed top-9 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
          <img src={logoIcon} alt="CryptoReceiptPro" className="w-9 h-9 rounded-lg object-contain" />
          <span>CryptoReceipt<span className="text-gradient-gold">Pro</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">{t("nav.features")}</a>
          <a href="#how" className="hover:text-foreground transition">{t("nav.how")}</a>
          <a href="#action" className="hover:text-foreground transition">{t("nav.action")}</a>
          <a href="#pricing" className="hover:text-foreground transition">{t("nav.pricing")}</a>
          <a href="#faq" className="hover:text-foreground transition">{t("nav.faq")}</a>
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher />
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
             className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
            {t("nav.cta")} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative pt-36 md:pt-44 pb-24 bg-hero overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/25 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-accent/20 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary mb-6 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5" /> {t("hero.badge")}
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight">
            {t("hero.title.a")}<span className="text-gradient-emerald">{t("hero.title.b")}</span>{t("hero.title.c")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            {t("hero.desc")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
               className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-glow px-6 py-3.5 font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.68_0.2_250/0.7)] hover:scale-105 transition animate-pulse-glow">
              {t("hero.buy")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a href={DOWNLOAD_URL}
               className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/40 px-6 py-3.5 font-semibold text-accent hover:bg-accent/25 transition">
              <Download className="w-5 h-5" /> {t("hero.download")}
            </a>
            <a href="#action"
               className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3.5 font-semibold hover:bg-card transition">
              <PlayCircle className="w-5 h-5 text-primary" /> {t("hero.demo")}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/60 to-accent/60" />
                ))}
              </div>
              <span><strong className="text-foreground">30,000+</strong> {t("hero.users")}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
              <span className="ml-1">4.9/5</span>
            </div>
          </div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}

/* ---------- HERO VISUAL — clean custom phone mockup ---------- */
function HeroVisual() {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[420px]"
    >
      {/* Aura */}
      <div className="absolute -inset-12 bg-gradient-to-tr from-primary/40 via-primary/10 to-accent/30 blur-3xl rounded-full pointer-events-none" />

      {/* Phone frame */}
      <div className="relative animate-float">
        <div className="relative rounded-[3rem] bg-gradient-to-b from-secondary to-background p-2 shadow-[var(--shadow-elegant)] border border-border">
          <div className="rounded-[2.6rem] bg-background overflow-hidden border border-border/60">
            {/* Notch */}
            <div className="relative h-7 flex items-center justify-center">
              <div className="w-28 h-5 rounded-full bg-black/80" />
            </div>

            {/* Screen */}
            <div className="px-5 pb-6 pt-2 bg-gradient-to-b from-card to-background">
              {/* Status bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-4">
                <span>9:41</span>
                <span className="flex items-center gap-1"><Wallet className="w-3 h-3" /> Binance</span>
              </div>

              {/* Success icon */}
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-glow grid place-items-center shadow-[var(--shadow-glow)]">
                <Check className="w-8 h-8 text-primary-foreground" strokeWidth={3} />
              </div>
              <div className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground">{t("hv.success")}</div>
              <div className="mt-2 text-center font-display font-bold text-3xl">
                +5,000.00 <span className="text-gradient-emerald">USDT</span>
              </div>
              <div className="mt-1 text-center text-xs text-muted-foreground">≈ $5,002.34 USD</div>

              {/* Divider */}
              <div className="my-5 h-px bg-border" />

              {/* Rows */}
              <div className="space-y-3 text-xs">
                {[
                  [t("hv.network"), "TRC20"],
                  [t("hv.from"), "TRX...8fA2"],
                  [t("hv.to"), "TRX...c91E"],
                  [t("hv.date"), "Apr 28, 2026 · 09:41"],
                  [t("hv.txid"), "0x8c4f...e2a1"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-mono text-foreground">{v}</span>
                  </div>
                ))}
              </div>

              {/* CTA pill */}
              <div className="mt-5 rounded-xl bg-primary/15 border border-primary/30 text-primary text-center text-xs font-semibold py-2.5">
                {t("hv.share")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — speed */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute -left-6 md:-left-10 top-24 bg-card border border-border rounded-2xl px-4 py-3 shadow-[var(--shadow-card)] flex items-center gap-3 backdrop-blur"
      >
        <div className="w-10 h-10 rounded-full bg-accent/20 grid place-items-center">
          <Zap className="w-5 h-5 text-accent" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("hv.gen")}</div>
          <div className="font-display font-bold text-xl text-gradient-gold">3.2s</div>
        </div>
      </motion.div>

      {/* Floating badge — verified */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute -right-4 md:-right-10 bottom-24 bg-card border border-border rounded-2xl px-4 py-3 shadow-[var(--shadow-card)] flex items-center gap-3 backdrop-blur"
      >
        <div className="w-10 h-10 rounded-full bg-primary/20 grid place-items-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("hv.pixel")}</div>
          <div className="font-semibold text-sm">{t("hv.real")}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- BEST SELLER TRUST BANNER ---------- */
function BestSellerBanner() {
  const { t } = useI18n();
  const badges = [t("trust.badge1"), t("trust.badge2"), t("trust.badge3")];
  return (
    <section className="relative py-10 md:py-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-3"
      >
        <div className="flex items-center gap-1" aria-label={t("trust.rating")}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-5 h-5 fill-accent text-accent" />
          ))}
        </div>
        <div className="inline-flex items-center gap-1.5 text-sm font-bold text-accent">
          <Users className="w-4 h-4" /> {t("trust.customers")}
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight">
          <span className="text-gradient-emerald">{t("trust.bestseller")}</span>
        </h2>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {badges.map((b) => (
            <span key={b} className="inline-flex items-center gap-2 text-sm font-semibold">
              <span className="w-5 h-5 rounded-full bg-primary/20 grid place-items-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
              </span>
              {b}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- SOCIAL PROOF BAR ---------- */
function SocialProofBar() {
  const { t } = useI18n();
  const [count, setCount] = React.useState(47);
  React.useEffect(() => {
    const iv = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 3) + 1);
    }, 8000 + Math.random() * 12000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="bg-card/50 border-y border-border py-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" /></span>
          <span><strong className="text-foreground">{count}</strong> {t("social.online")}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4 text-primary" />
          <span>{t("social.joined")}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <TrendingUp className="w-4 h-4 text-accent" />
          <span>{t("social.generated")}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- LOGOS STRIP ---------- */
function LogosStrip() {
  const { t } = useI18n();
  const wallets = ["Binance", "Trust Wallet", "Coinbase", "USDT TRC20", "BEP20", "MetaMask", "OKX"];
  return (
    <section className="border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
          {t("logos.title")}
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {wallets.map(w => (
            <div key={w} className="font-display font-semibold text-lg text-muted-foreground/70 hover:text-foreground transition">
              {w}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { icon: Coins, title: t("how.step1.t"), desc: t("how.step1.d") },
    { icon: ArrowDownUp, title: t("how.step2.t"), desc: t("how.step2.d") },
    { icon: LayoutGrid, title: t("how.step3.t"), desc: t("how.step3.d") },
    { icon: Pencil, title: t("how.step4.t"), desc: t("how.step4.d") },
    { icon: Save, title: t("how.step5.t"), desc: t("how.step5.d") },
    { icon: Camera, title: t("how.step6.t"), desc: t("how.step6.d") },
  ];
  return (
    <section id="how" className="py-24 relative overflow-hidden">
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("how.eyebrow")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            {t("how.title.a")}<span className="text-gradient-emerald">{t("how.title.b")}</span>{t("how.title.c")}
          </h2>
          <p className="text-muted-foreground mt-4">{t("how.desc")}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          {/* Software preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 blur-3xl rounded-full pointer-events-none" />
            <div className="relative rounded-3xl border border-border bg-card p-3 shadow-[var(--shadow-elegant)]">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="w-3 h-3 rounded-full bg-destructive/70" />
                <span className="w-3 h-3 rounded-full bg-accent/80" />
                <span className="w-3 h-3 rounded-full bg-primary/70" />
                <span className="ml-3 text-[10px] font-mono text-muted-foreground">cryptoreceipt.app — editor</span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border/60 bg-background">
                <img
                  src={softwareUi}
                  alt="CryptoReceipt Pro editor — select coin, choose template, edit and screenshot"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-5 -right-4 md:-right-8 bg-card border border-border rounded-2xl px-4 py-3 shadow-[var(--shadow-card)] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 grid place-items-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("how.avgtime")}</div>
                <div className="font-display font-bold text-lg">{t("how.under")}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Steps list */}
          <ol className="relative space-y-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card/60 hover:bg-card hover:border-primary/50 p-5 transition"
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-glow grid place-items-center text-primary-foreground font-display font-bold text-lg shadow-[var(--shadow-glow)]">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <s.icon className="w-4 h-4 text-primary" />
                    <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.li>
            ))}

            <div className="pt-2">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-glow px-6 py-3 font-semibold text-primary-foreground hover:scale-105 transition shadow-[var(--shadow-glow)]">
                {t("how.try")} <ArrowRight className="w-4 h-4 animate-arrow" />
              </a>
            </div>
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURES ---------- */
function Features() {
  const { t } = useI18n();
  const items = [
    { icon: Zap, title: t("feat.1.t"), desc: t("feat.1.d") },
    { icon: Shield, title: t("feat.2.t"), desc: t("feat.2.d") },
    { icon: Wallet, title: t("feat.3.t"), desc: t("feat.3.d") },
    { icon: Globe, title: t("feat.4.t"), desc: t("feat.4.d") },
    { icon: Clock, title: t("feat.5.t"), desc: t("feat.5.d") },
    { icon: Sparkles, title: t("feat.6.t"), desc: t("feat.6.d") },
  ];
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("feat.eyebrow")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            {t("feat.title.a")}<span className="text-gradient-emerald">{t("feat.title.b")}</span>{t("feat.title.c")}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 grid place-items-center mb-4 group-hover:scale-110 transition">
                <it.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">{it.title}</h3>
              <p className="text-muted-foreground text-sm">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SEE IN ACTION ---------- */
function SeeInAction() {
  const { t } = useI18n();
  const videos = [
    { title: t("act.v1"), duration: "1:42", tag: "Binance" },
    { title: t("act.v2"), duration: "0:54", tag: "Trust Wallet" },
    { title: t("act.v3"), duration: "2:10", tag: "Coinbase" },
  ];
  return (
    <section id="action" className="py-24 bg-card/30 border-y border-border relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("act.eyebrow")}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 max-w-xl">
              {t("act.title.a")}<span className="text-gradient-gold">{t("act.title.b")}</span>{t("act.title.c")}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">{t("act.desc")}</p>
          </div>
          <a href="#"
             className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:scale-105 transition">
            <PlayCircle className="w-5 h-5" /> {t("act.visit")} 
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {videos.map((v, i) => (
            <motion.a
              key={v.title} href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition"
            >
              <div className="aspect-video relative bg-gradient-to-br from-primary/30 via-card to-accent/20 grid place-items-center overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="relative w-16 h-16 rounded-full bg-primary text-primary-foreground grid place-items-center group-hover:scale-110 transition shadow-[var(--shadow-glow)]">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <span className="absolute bottom-3 right-3 text-xs font-mono bg-background/80 backdrop-blur px-2 py-1 rounded">
                  {v.duration}
                </span>
                <span className="absolute top-3 left-3 text-xs font-semibold bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full">
                  {v.tag}
                </span>
              </div>
              <div className="p-5 flex items-center justify-between gap-3">
                <h3 className="font-semibold leading-snug group-hover:text-primary transition">{v.title}</h3>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- RECEIPT SHOWCASE (visual mockups) ---------- */
function ReceiptShowcase() {
  const { t } = useI18n();
  const templates = [
    { src: tplBinanceUsdtWithdraw, label: "Binance · USDT Withdraw", tint: "bg-neutral-900" },
    { src: tplTrustUsdtSend, label: "Trust Wallet · USDT Send", tint: "bg-black" },
    { src: tplCoinbaseUsdtDeposit, label: "Coinbase · USDT Deposit", tint: "bg-[#0b1530]" },
    { src: tplCoinbaseUsdtWithdraw, label: "Coinbase · USDT Withdraw", tint: "bg-[#0b1530]" },
    { src: tplCoinbaseUsdtTrc20, label: "Coinbase · USDT TRC20", tint: "bg-black" },
    { src: tplTrustUsdtReceive, label: "Trust Wallet · USDT Receive", tint: "bg-black" },
    { src: tplCashappBtc, label: "Cash App · BTC Withdraw", tint: "bg-white" },
    { src: tplRainbowEth, label: "Rainbow · ETH Send", tint: "bg-black" },
    { src: tplCoinbaseEthDeposit, label: "Coinbase · ETH Deposit", tint: "bg-black" },
    { src: tplCoinbaseBtcWithdraw, label: "Coinbase · BTC Withdraw", tint: "bg-black" },
    { src: tplCoinbaseBtcSent, label: "Coinbase · BTC Sent", tint: "bg-white" },
    { src: tplOkxEthWithdraw, label: "OKX · ETH Withdraw", tint: "bg-black" },
    { src: tplBybitUsdtDeposit, label: "Bybit · USDT Deposit", tint: "bg-black" },
    { src: tplBybitUsdtWithdraw, label: "Bybit · USDT Withdraw", tint: "bg-black" },
    { src: tplTrustUsdtTronSend, label: "Trust Wallet · USDT Tron", tint: "bg-neutral-100" },
    { src: tplBinanceUsdtDeposit, label: "Binance · USDT Deposit", tint: "bg-white" },
    { src: tplOkxUsdtWithdraw, label: "OKX · USDT Withdraw", tint: "bg-white" },
    { src: tplOkxUsdtDeposit, label: "OKX · USDT Deposit", tint: "bg-white" },
    { src: tplBinanceUsdtWithdraw2, label: "Binance · USDT Withdraw", tint: "bg-white" },
    { src: tplCashappBtcSent, label: "Cash App · BTC Sent", tint: "bg-[#e8eefc]" },
    { src: tplBinancePaySuccess, label: "Binance Pay · Success", tint: "bg-neutral-900" },
    { src: tplTrustUsdtTransferIn, label: "Trust Wallet · Transfer In", tint: "bg-white" },
    { src: tplTrustUsdtTransferOut, label: "Trust Wallet · Transfer Out", tint: "bg-white" },
    { src: tplBinancePayDetails, label: "Binance Pay · Details", tint: "bg-white" },
    { src: tplTrustUsdtReceived, label: "Trust Wallet · Received", tint: "bg-white" },
    { src: tplTrustUsdtSentSmall, label: "Trust Wallet · Sent", tint: "bg-white" },
    { src: tplBinanceUsdtWithdraw3, label: "Binance · USDT Withdraw", tint: "bg-neutral-900" },
  ];
  // Duplicate the list so the marquee can loop seamlessly (-50% translate).
  const loop = [...templates, ...templates];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("tpl.eyebrow")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            {t("tpl.title.a")}<span className="text-gradient-emerald">{t("tpl.title.b")}</span>{t("tpl.title.c")}
          </h2>
          <p className="text-muted-foreground mt-4">{t("tpl.desc")}</p>
        </div>
      </div>
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max gap-6 animate-marquee py-4 px-3">
          {loop.map(({ src, label, tint }, i) => (
            <div key={i} className="w-[300px] shrink-0">
              <ImageMockup src={src} label={label} tint={tint} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageMockup({ src, label, tint = "bg-black" }: { src: string; label: string; tint?: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition">
      <PhoneFrame tint={tint}>
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </PhoneFrame>
      <div className="mt-4 text-center text-xs text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

function PhoneFrame({ children, tint = "bg-white" }: { children: React.ReactNode; tint?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[280px] aspect-[9/19] rounded-[2.5rem] bg-neutral-900 p-2 shadow-[var(--shadow-elegant)] border border-neutral-700">
      <div className={`relative w-full h-full rounded-[2rem] overflow-hidden ${tint}`}>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
        {children}
      </div>
    </div>
  );
}

function BinanceMockup({ label = "Binance Deposit" }: { label?: string } = {}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition">
      <PhoneFrame tint="bg-white">
        <div className="pt-10 px-5 text-neutral-900">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded bg-yellow-400 grid place-items-center text-black text-xs font-black">B</div>
            <span className="font-bold text-sm">BINANCE</span>
          </div>
          <div className="text-center mt-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-green-100 grid place-items-center mb-2">
              <Check className="w-7 h-7 text-green-600" strokeWidth={3} />
            </div>
            <div className="text-xs text-neutral-500">Deposit Successful</div>
            <div className="text-2xl font-bold mt-1">+5,000.00</div>
            <div className="text-xs font-semibold text-neutral-500">USDT</div>
          </div>
          <div className="mt-5 space-y-2 text-[10px]">
            <Row label="Network" value="TRC20" />
            <Row label="From" value="TQn9Y...4xKp" />
            <Row label="TxID" value="9f8a...c12d" />
            <Row label="Date" value="2026-04-25 14:32" />
          </div>
        </div>
      </PhoneFrame>
      <div className="text-center mt-5 font-display font-semibold">{label}</div>
    </div>
  );
}

function TrustMockup({ label = "Trust Wallet Send" }: { label?: string } = {}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition">
      <PhoneFrame tint="bg-[#0500ff]">
        <div className="pt-10 px-5 text-white">
          <div className="text-center text-xs opacity-80">Trust Wallet</div>
          <div className="mt-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/15 backdrop-blur grid place-items-center mb-3">
              <Check className="w-7 h-7" strokeWidth={3} />
            </div>
            <div className="text-xs opacity-80">Sent</div>
            <div className="text-3xl font-bold mt-1">5,000 USDT</div>
            <div className="text-xs opacity-70 mt-1">≈ $5,000.00</div>
          </div>
          <div className="mt-6 bg-white/10 rounded-xl p-3 space-y-2 text-[10px]">
            <Row label="To" value="0x7a3...e92" light />
            <Row label="Network" value="BEP20" light />
            <Row label="Fee" value="0.0003 BNB" light />
            <Row label="Status" value="Confirmed" light />
          </div>
        </div>
      </PhoneFrame>
      <div className="text-center mt-5 font-display font-semibold">{label}</div>
    </div>
  );
}

function CoinbaseMockup({ label = "Coinbase Receive" }: { label?: string } = {}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition">
      <PhoneFrame tint="bg-[#0052ff]">
        <div className="pt-10 px-5 text-white">
          <div className="flex items-center justify-center gap-2 text-xs opacity-90">
            <div className="w-5 h-5 rounded bg-white grid place-items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0052ff]" />
            </div>
            <span className="font-bold">Coinbase</span>
          </div>
          <div className="mt-8 text-center">
            <div className="text-xs opacity-80">You received</div>
            <div className="text-3xl font-bold mt-1">$5,000.00</div>
            <div className="text-xs opacity-80 mt-1">5,000 USDT</div>
          </div>
          <div className="mt-6 bg-white rounded-xl p-3 space-y-2 text-[10px] text-neutral-900">
            <Row label="From" value="External" />
            <Row label="Asset" value="USD Coin" />
            <Row label="Network" value="Ethereum" />
            <Row label="Status" value="Completed" />
          </div>
        </div>
      </PhoneFrame>
      <div className="text-center mt-5 font-display font-semibold">{label}</div>
    </div>
  );
}

function BinanceWithdrawMockup({ label = "Binance Withdraw" }: { label?: string } = {}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition">
      <PhoneFrame tint="bg-white">
        <div className="pt-10 px-5 text-neutral-900">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded bg-yellow-400 grid place-items-center text-black text-xs font-black">B</div>
            <span className="font-bold text-sm">BINANCE</span>
          </div>
          <div className="text-center mt-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-green-100 grid place-items-center mb-2">
              <Check className="w-7 h-7 text-green-600" strokeWidth={3} />
            </div>
            <div className="text-xs text-neutral-500">Withdrawal Successful</div>
            <div className="text-2xl font-bold mt-1">-2,500.00</div>
            <div className="text-xs font-semibold text-neutral-500">USDT</div>
          </div>
          <div className="mt-5 space-y-2 text-[10px]">
            <Row label="Network" value="BEP20" />
            <Row label="To" value="0x83f...91aE" />
            <Row label="TxID" value="b14e...77fc" />
            <Row label="Fee" value="0.8 USDT" />
          </div>
        </div>
      </PhoneFrame>
      <div className="text-center mt-5 font-display font-semibold">{label}</div>
    </div>
  );
}

function TrustReceiveMockup({ label = "Trust Wallet Receive" }: { label?: string } = {}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition">
      <PhoneFrame tint="bg-[#0500ff]">
        <div className="pt-10 px-5 text-white">
          <div className="text-center text-xs opacity-80">Trust Wallet</div>
          <div className="mt-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/15 backdrop-blur grid place-items-center mb-3">
              <Check className="w-7 h-7" strokeWidth={3} />
            </div>
            <div className="text-xs opacity-80">Received</div>
            <div className="text-3xl font-bold mt-1">10,000 USDT</div>
            <div className="text-xs opacity-70 mt-1">≈ $10,000.00</div>
          </div>
          <div className="mt-6 bg-white/10 rounded-xl p-3 space-y-2 text-[10px]">
            <Row label="From" value="0x4b1...c02" light />
            <Row label="Network" value="TRC20" light />
            <Row label="Fee" value="1.0 TRX" light />
            <Row label="Status" value="Confirmed" light />
          </div>
        </div>
      </PhoneFrame>
      <div className="text-center mt-5 font-display font-semibold">{label}</div>
    </div>
  );
}

function CoinbaseSendMockup({ label = "Coinbase Send" }: { label?: string } = {}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition">
      <PhoneFrame tint="bg-[#0052ff]">
        <div className="pt-10 px-5 text-white">
          <div className="flex items-center justify-center gap-2 text-xs opacity-90">
            <div className="w-5 h-5 rounded bg-white grid place-items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0052ff]" />
            </div>
            <span className="font-bold">Coinbase</span>
          </div>
          <div className="mt-8 text-center">
            <div className="text-xs opacity-80">You sent</div>
            <div className="text-3xl font-bold mt-1">$3,200.00</div>
            <div className="text-xs opacity-80 mt-1">3,200 USDT</div>
          </div>
          <div className="mt-6 bg-white rounded-xl p-3 space-y-2 text-[10px] text-neutral-900">
            <Row label="To" value="External" />
            <Row label="Asset" value="USD Coin" />
            <Row label="Network" value="Polygon" />
            <Row label="Status" value="Completed" />
          </div>
        </div>
      </PhoneFrame>
      <div className="text-center mt-5 font-display font-semibold">{label}</div>
    </div>
  );
}

function Row({ label, value, light }: { label: string; value: string; light?: boolean }) {
  return (
    <div className="flex justify-between font-mono">
      <span className={light ? "opacity-70" : "text-neutral-500"}>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

/* ---------- PRICING ---------- */
function Pricing() {
  const { t } = useI18n();
  const [spots, setSpots] = React.useState(17);
  React.useEffect(() => {
    const iv = setInterval(() => {
      setSpots(s => Math.max(3, s - (Math.random() > 0.6 ? 1 : 0)));
    }, 25000 + Math.random() * 35000);
    return () => clearInterval(iv);
  }, []);
  const includes = [
    t("price.f1"), t("price.f2"), t("price.f3"), t("price.f4"),
    t("price.f5"), t("price.f6"), t("price.f7"),
  ];
  return (
    <section id="pricing" className="py-24 bg-hero relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("price.eyebrow")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            {t("price.title.a")}<span className="text-gradient-gold">{t("price.title.b")}</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border-2 border-primary/40 bg-card p-8 md:p-12 shadow-[var(--shadow-glow)]"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-emerald-glow text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            {t("price.best")}
          </div>

          <div className="text-center">
            <h3 className="font-display text-2xl font-bold">{t("price.plan")}</h3>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/40 px-3 py-1 text-xs font-semibold text-accent">
              <Flame className="w-3.5 h-3.5" /> {t("price.offer")}
            </div>
            <div className="mt-6 flex items-baseline justify-center gap-2">
              <span className="font-display text-3xl text-muted-foreground line-through mr-2">500</span>
              <span className="font-display text-7xl md:text-8xl font-bold text-gradient-emerald">200</span>
              <div className="text-left">
                <div className="font-mono font-bold text-xl">USDT</div>
                <div className="text-sm text-muted-foreground">{t("price.year")}</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {t("price.month")} <strong className="text-foreground">$16.67</strong>{t("price.month.b")}
            </div>

            {/* Urgency banner */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-accent font-semibold animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t("price.spots").replace("{n}", String(spots))}</span>
            </div>
          </div>

          <ul className="mt-10 space-y-3 max-w-md mx-auto">
            {includes.map(f => (
              <li key={f} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 grid place-items-center mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                </div>
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
               className="cta-shimmer animate-cta-pulse group relative flex-1 overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-emerald-glow to-primary bg-[length:200%_100%] px-6 py-5 font-bold text-primary-foreground text-base tracking-wide hover:bg-[position:100%_0] transition-all duration-700">
              <Zap className="w-5 h-5" fill="currentColor" />
              <span>{t("price.cta")}</span>
              <ArrowRight className="w-5 h-5 animate-arrow" />
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-4 font-semibold hover:bg-secondary transition">
              <MessageCircle className="w-5 h-5 text-primary" /> {t("price.contact")}
            </a>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>🔒 {t("price.encrypted")}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-primary" /> {t("price.secure")}</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-accent" /> {t("price.instant")}</span>
            <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-primary" /> {t("price.refund")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const { t } = useI18n();
  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
  ];
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("faq.eyebrow")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            {t("faq.title")}
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map(f => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold list-none">
                {f.q}
                <ChevronRight className="w-5 h-5 text-primary group-open:rotate-90 transition" />
              </summary>
              <p className="mt-3 text-muted-foreground text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  const { t } = useI18n();
  return (
    <section className="py-24 bg-card/30 border-t border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
          {t("fin.title.a")}<span className="text-gradient-emerald">{t("fin.title.b")}</span>{t("fin.title.c")}
        </h2>
        <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">{t("fin.desc")}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-glow px-8 py-4 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-105 transition">
            {t("fin.buy")}
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 font-semibold hover:bg-secondary transition">
            <Send className="w-5 h-5 text-primary" /> {t("fin.channel")}
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 font-semibold hover:bg-secondary transition">
            <MessageCircle className="w-5 h-5 text-primary" /> {t("fin.support")}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-display font-bold text-foreground">
          <img src={logoIcon} alt="CryptoReceiptPro" className="w-8 h-8 rounded-lg object-contain" />
          CryptoReceiptPro
        </div>
        <div>{t("footer.copy")}</div>
        <div className="flex gap-5">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">{t("footer.channel")}</a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">{t("footer.support")}</a>
          <a href="#pricing" className="hover:text-foreground transition">{t("footer.pricing")}</a>
        </div>
      </div>
    </footer>
  );
}

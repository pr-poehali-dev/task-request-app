import { useState } from "react";
import Icon from "@/components/ui/icon";

type Role = "client" | "master";
type Tab = "active" | "done";

const SERVICES = [
  { icon: "Hammer",      label: "Сборка мебели",   price: "от 800₽",  color: "bg-orange-100 text-orange-600" },
  { icon: "Zap",         label: "Электрика",        price: "от 600₽",  color: "bg-yellow-100 text-yellow-600" },
  { icon: "Wrench",      label: "Сантехника",       price: "от 700₽",  color: "bg-blue-100 text-blue-600" },
  { icon: "PaintRoller", label: "Покраска",         price: "от 1200₽", color: "bg-pink-100 text-pink-600" },
  { icon: "Drill",       label: "Монтаж и крепёж",  price: "от 400₽",  color: "bg-purple-100 text-purple-600" },
  { icon: "Lightbulb",   label: "Лампочки и свет",  price: "от 300₽",  color: "bg-green-100 text-green-600" },
];

const CLIENT_ORDERS_ACTIVE = [
  { id: "001", service: "Сборка шкафа-купе", master: "Игорь М.",    date: "Сегодня, 15:00", status: "active", price: "1 800₽", avatar: "И", avatarColor: "bg-orange-500" },
  { id: "002", service: "Замена розетки",    master: "Алексей К.", date: "Завтра, 10:00",  status: "new",    price: "600₽",   avatar: "А", avatarColor: "bg-purple-500" },
];

const CLIENT_ORDERS_DONE = [
  { id: "003", service: "Установка карниза", master: "Дмитрий В.", date: "10 марта", status: "done", price: "500₽", rating: 5, avatar: "Д" },
  { id: "004", service: "Починка крана",     master: "Олег С.",    date: "5 марта",  status: "done", price: "800₽", rating: 4, avatar: "О" },
];

const MASTER_ORDERS_ACTIVE = [
  { id: "101", service: "Сборка кровати", client: "Мария П.",  address: "ул. Ленина, 24", date: "Сегодня, 14:00", price: "1 200₽", status: "active" },
  { id: "102", service: "Крепёж полок",   client: "Виктор Н.", address: "пр. Мира, 8",   date: "Завтра, 9:00",   price: "700₽",   status: "new"    },
];

const MASTER_ORDERS_DONE = [
  { id: "103", service: "Замена лампочек", client: "Ирина С.", date: "12 марта", price: "350₽",  rating: 5 },
  { id: "104", service: "Монтаж карниза",  client: "Павел Д.", date: "8 марта",  price: "550₽",  rating: 5 },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= count ? "star-filled" : "star-empty"} style={{ fontSize: 13 }}>★</span>
      ))}
    </span>
  );
}

function AvatarCircle({ letter, color }: { letter: string; color: string }) {
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${color}`}>
      {letter}
    </div>
  );
}

export default function Index() {
  const [role, setRole] = useState<Role>("client");
  const [tab, setTab] = useState<Tab>("active");
  const [showOrder, setShowOrder] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body">

      {/* ——— HERO ——— */}
      <section className="relative gradient-hero overflow-hidden noise-bg">
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(22,100%,55%) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-60px] left-[10%] w-60 h-60 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(262,80%,60%) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20">
          {/* Nav */}
          <nav className="flex items-center justify-between mb-14">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 gradient-orange rounded-xl flex items-center justify-center">
                <Icon name="Hammer" size={18} className="text-white" />
              </div>
              <span className="font-display text-white text-xl tracking-wide uppercase">МастерРядом</span>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2 rounded-xl text-white/70 text-sm font-medium hover:text-white transition-colors">Войти</button>
              <button className="px-5 py-2 gradient-orange rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                Зарегистрироваться
              </button>
            </div>
          </nav>

          {/* Hero text */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Более 2 400 мастеров онлайн
            </div>

            <h1 className="font-display text-white uppercase leading-none mb-6 animate-fade-up delay-100"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05 }}>
              Мастер придёт<br />
              <span className="text-gradient-orange">в течение часа</span>
            </h1>

            <p className="text-white/60 text-lg mb-10 max-w-lg animate-fade-up delay-200">
              Вызови мастера для любой бытовой задачи — быстро, безопасно, с гарантией качества.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <button
                onClick={() => { setRole("client"); document.getElementById("cabinet")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-8 py-4 gradient-orange rounded-2xl text-white font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95"
                style={{ boxShadow: "0 8px 30px rgba(255,120,0,0.35)" }}
              >
                Заказать мастера
              </button>
              <button
                onClick={() => { setRole("master"); document.getElementById("cabinet")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-8 py-4 bg-white/10 border border-white/20 rounded-2xl text-white font-semibold text-lg hover:bg-white/15 transition-all"
              >
                Я мастер →
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg animate-fade-up delay-400">
            {[
              { val: "18 500+", label: "выполнено заказов" },
              { val: "4.9",     label: "средний рейтинг" },
              { val: "< 1 ч",   label: "время отклика" },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display text-white text-2xl font-bold">{s.val}</div>
                <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— SERVICES ——— */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-foreground text-4xl uppercase font-bold mb-2">Что умеют наши мастера</h2>
        <p className="text-muted-foreground mb-10">Выбери нужную услугу и получи заявку от проверенных специалистов</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SERVICES.map((s, i) => (
            <button
              key={s.label}
              className="card-hover flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border text-center animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <Icon name={s.icon} fallback="Hammer" size={22} />
              </div>
              <span className="font-semibold text-sm text-foreground">{s.label}</span>
              <span className="text-xs text-muted-foreground">{s.price}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ——— CABINET ——— */}
      <section id="cabinet" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="font-display text-foreground text-4xl uppercase font-bold">Личный кабинет</h2>
          <div className="flex bg-muted rounded-2xl p-1 gap-1">
            <button
              onClick={() => setRole("client")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${role === "client" ? "gradient-orange text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Я клиент
            </button>
            <button
              onClick={() => setRole("master")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${role === "master" ? "gradient-purple text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Я мастер
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Profile card */}
          <div className="lg:col-span-1 space-y-4">
            <div className={`rounded-3xl p-6 text-white relative overflow-hidden ${role === "client" ? "gradient-orange" : "gradient-purple"}`}>
              <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-4">
                  {role === "client" ? "👤" : "🔧"}
                </div>
                <div className="font-display text-2xl font-bold mb-1">
                  {role === "client" ? "Александр П." : "Игорь М."}
                </div>
                <div className="text-white/70 text-sm mb-4">
                  {role === "client" ? "Клиент с марта 2025" : "Мастер • Сборка, монтаж, электрика"}
                </div>
                {role === "master" && (
                  <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                    <Stars count={5} />
                    <span className="font-bold text-white">4.9</span>
                    <span className="text-white/60 text-xs">• 127 отзывов</span>
                  </div>
                )}
                {role === "client" && (
                  <div className="flex items-center gap-3">
                    <div className="bg-white/15 rounded-xl px-3 py-2 text-center">
                      <div className="font-bold text-lg">12</div>
                      <div className="text-white/60 text-xs">заказов</div>
                    </div>
                    <div className="bg-white/15 rounded-xl px-3 py-2 text-center">
                      <div className="font-bold text-lg">4.8</div>
                      <div className="text-white/60 text-xs">оценка</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {role === "client" ? (
              <button
                onClick={() => setShowOrder(true)}
                className="w-full gradient-orange rounded-2xl p-5 text-white font-semibold text-base flex items-center gap-3 hover:opacity-90 transition card-hover"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon name="Plus" size={20} />
                </div>
                Создать новый заказ
              </button>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="font-semibold text-foreground mb-1">Мой статус</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Принимаю заказы</span>
                  <div className="w-12 h-6 gradient-green rounded-full flex items-center px-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="TrendingUp" size={14} className="text-green-500" />
                  <span className="text-muted-foreground">Заработано за март: <b className="text-foreground">18 450₽</b></span>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Icon name="Bell" size={16} />
                Уведомления
              </div>
              <div className="space-y-2">
                {(role === "client" ? [
                  { text: "Мастер принял заказ #001",  time: "2 мин назад",  dot: "bg-green-400" },
                  { text: "Заказ #001 подтверждён",    time: "5 мин назад",  dot: "bg-orange-400" },
                ] : [
                  { text: "Новый заказ в вашем районе", time: "1 мин назад",  dot: "bg-green-400" },
                  { text: "Клиент оставил отзыв ★★★★★", time: "3 ч назад",   dot: "bg-yellow-400" },
                ]).map((n, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`} />
                    <div>
                      <div className="text-sm text-foreground">{n.text}</div>
                      <div className="text-xs text-muted-foreground">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-2 bg-muted rounded-2xl p-1">
              <button
                onClick={() => setTab("active")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "active" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                Активные
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${tab === "active" ? "gradient-orange text-white" : "bg-muted-foreground/20 text-muted-foreground"}`}>
                  {role === "client" ? CLIENT_ORDERS_ACTIVE.length : MASTER_ORDERS_ACTIVE.length}
                </span>
              </button>
              <button
                onClick={() => setTab("done")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "done" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                Завершённые
              </button>
            </div>

            {role === "client" && tab === "active" && (
              <div className="space-y-3">
                {CLIENT_ORDERS_ACTIVE.map((o, i) => (
                  <div key={o.id}
                    className="bg-card border border-border rounded-2xl p-5 card-hover animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <AvatarCircle letter={o.avatar} color={o.avatarColor} />
                        <div>
                          <div className="font-semibold text-foreground">{o.service}</div>
                          <div className="text-sm text-muted-foreground">Мастер: {o.master}</div>
                        </div>
                      </div>
                      <span className={o.status === "active" ? "status-active" : "status-new"}>
                        {o.status === "active" ? "В работе" : "Новый"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Icon name="Clock" size={13} />
                        {o.date}
                      </div>
                      <div className="font-bold text-foreground">{o.price}</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition">Написать мастеру</button>
                      <button className="flex-1 py-2 rounded-xl gradient-orange text-white text-sm font-medium hover:opacity-90 transition">Подробнее</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {role === "client" && tab === "done" && (
              <div className="space-y-3">
                {CLIENT_ORDERS_DONE.map((o, i) => (
                  <div key={o.id}
                    className="bg-card border border-border rounded-2xl p-5 card-hover animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <AvatarCircle letter={o.avatar} color="bg-gray-400" />
                        <div>
                          <div className="font-semibold text-foreground">{o.service}</div>
                          <div className="text-sm text-muted-foreground">{o.master}</div>
                        </div>
                      </div>
                      <span className="status-done">Выполнен</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Stars count={o.rating} />
                        <span className="text-muted-foreground">{o.date}</span>
                      </div>
                      <div className="font-bold text-foreground">{o.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {role === "master" && tab === "active" && (
              <div className="space-y-3">
                {MASTER_ORDERS_ACTIVE.map((o, i) => (
                  <div key={o.id}
                    className="bg-card border border-border rounded-2xl p-5 card-hover animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-foreground text-base">{o.service}</div>
                        <div className="text-sm text-muted-foreground mt-0.5">Клиент: {o.client}</div>
                      </div>
                      <span className={o.status === "active" ? "status-active" : "status-new"}>
                        {o.status === "active" ? "В работе" : "Новый"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5"><Icon name="MapPin" size={13} />{o.address}</span>
                      <span className="flex items-center gap-1.5"><Icon name="Clock" size={13} />{o.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xl text-foreground">{o.price}</div>
                      <div className="flex gap-2">
                        {o.status === "new" && (
                          <button className="px-4 py-2 rounded-xl gradient-purple text-white text-sm font-semibold hover:opacity-90 transition">Принять заказ</button>
                        )}
                        {o.status === "active" && (
                          <button className="px-4 py-2 rounded-xl gradient-green text-white text-sm font-semibold hover:opacity-90 transition">Завершить</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {role === "master" && tab === "done" && (
              <div className="space-y-3">
                {MASTER_ORDERS_DONE.map((o, i) => (
                  <div key={o.id}
                    className="bg-card border border-border rounded-2xl p-5 card-hover animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-foreground">{o.service}</div>
                        <div className="text-sm text-muted-foreground">{o.client} • {o.date}</div>
                      </div>
                      <div className="font-bold text-foreground">{o.price}</div>
                    </div>
                    <Stars count={o.rating} />
                  </div>
                ))}
                <div className="gradient-purple rounded-2xl p-5 text-white">
                  <div className="text-white/70 text-sm mb-1">Итого за март</div>
                  <div className="font-display text-3xl font-bold">18 450 ₽</div>
                  <div className="flex items-center gap-1 text-green-300 text-sm mt-1">
                    <Icon name="TrendingUp" size={14} />
                    +23% к прошлому месяцу
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ——— HOW IT WORKS ——— */}
      <section className="bg-muted py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-4xl uppercase font-bold text-center mb-12">Как это работает</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "Search",      title: "Опиши задачу",   desc: "Напиши что нужно сделать, укажи адрес и удобное время",  color: "gradient-orange" },
              { step: "02", icon: "UserCheck",   title: "Выбери мастера", desc: "Получи отклики от проверенных мастеров с рейтингами",     color: "gradient-purple" },
              { step: "03", icon: "CheckCircle", title: "Готово!",        desc: "Мастер выполнит работу, оплати и оставь оценку",          color: "gradient-green"  },
            ].map((s, i) => (
              <div key={s.step}
                className="bg-card rounded-3xl p-6 border border-border card-hover animate-fade-up"
                style={{ animationDelay: `${i * 0.12}s` }}>
                <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center mb-4 text-white`}>
                  <Icon name={s.icon} fallback="Wrench" size={24} />
                </div>
                <div className="font-display text-5xl font-bold text-muted-foreground/30 mb-2">{s.step}</div>
                <div className="font-bold text-lg text-foreground mb-1">{s.title}</div>
                <div className="text-muted-foreground text-sm">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer className="gradient-hero text-white/50 text-center py-8 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-7 h-7 gradient-orange rounded-lg flex items-center justify-center">
            <Icon name="Hammer" size={14} className="text-white" />
          </div>
          <span className="font-display text-white text-base uppercase">МастерРядом</span>
        </div>
        © 2026 МастерРядом — все права защищены
      </footer>

      {/* ——— NEW ORDER MODAL ——— */}
      {showOrder && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowOrder(false)}
        >
          <div
            className="bg-card rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-bold uppercase">Новый заказ</h3>
              <button onClick={() => setShowOrder(false)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Что нужно сделать?</label>
                <textarea
                  className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Например: собрать шкаф ИКЕА, 4 коробки..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Адрес</label>
                <input
                  className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Улица, дом, квартира"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Дата</label>
                  <input type="date" className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Время</label>
                  <input type="time" className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <button
                className="w-full py-4 gradient-orange rounded-2xl text-white font-bold text-base hover:opacity-90 transition mt-2"
                onClick={() => setShowOrder(false)}
              >
                Найти мастера
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
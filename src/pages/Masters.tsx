import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  { id: "all",        label: "Все услуги",       icon: "Grid3x3" },
  { id: "furniture",  label: "Сборка мебели",    icon: "Hammer" },
  { id: "electric",   label: "Электрика",        icon: "Zap" },
  { id: "plumbing",   label: "Сантехника",       icon: "Wrench" },
  { id: "painting",   label: "Покраска",         icon: "PaintRoller" },
  { id: "mounting",   label: "Монтаж и крепёж",  icon: "Drill" },
  { id: "light",      label: "Свет и лампочки",  icon: "Lightbulb" },
];

const SORT_OPTIONS = [
  { id: "rating",  label: "По рейтингу" },
  { id: "price",   label: "По цене" },
  { id: "reviews", label: "По отзывам" },
];

const MASTERS = [
  {
    id: 1,
    name: "Игорь Мельников",
    avatar: "И",
    avatarColor: "bg-orange-500",
    skills: ["furniture", "mounting"],
    skillLabels: ["Сборка мебели", "Монтаж"],
    rating: 4.9,
    reviews: 127,
    orders: 312,
    price: 800,
    priceLabel: "от 800₽",
    location: "Москва, СВАО",
    experience: "7 лет",
    online: true,
    badge: "Топ мастер",
    badgeColor: "gradient-orange",
    about: "Соберу любую мебель ИКЕА и других производителей. Аккуратно, быстро, с гарантией.",
  },
  {
    id: 2,
    name: "Алексей Карпов",
    avatar: "А",
    avatarColor: "bg-purple-500",
    skills: ["electric", "light"],
    skillLabels: ["Электрика", "Свет и лампочки"],
    rating: 4.8,
    reviews: 89,
    orders: 201,
    price: 600,
    priceLabel: "от 600₽",
    location: "Москва, ЦАО",
    experience: "5 лет",
    online: true,
    badge: "Проверен",
    badgeColor: "gradient-purple",
    about: "Электромонтажные работы любой сложности. Замена розеток, выключателей, люстр.",
  },
  {
    id: 3,
    name: "Дмитрий Волков",
    avatar: "Д",
    avatarColor: "bg-blue-500",
    skills: ["plumbing"],
    skillLabels: ["Сантехника"],
    rating: 4.7,
    reviews: 64,
    orders: 143,
    price: 700,
    priceLabel: "от 700₽",
    location: "Москва, ЗАО",
    experience: "4 года",
    online: false,
    badge: null,
    badgeColor: "",
    about: "Устраню течь, заменю смеситель, унитаз, радиатор. Быстро и аккуратно.",
  },
  {
    id: 4,
    name: "Сергей Орлов",
    avatar: "С",
    avatarColor: "bg-green-500",
    skills: ["painting", "mounting"],
    skillLabels: ["Покраска", "Монтаж"],
    rating: 5.0,
    reviews: 48,
    orders: 97,
    price: 1000,
    priceLabel: "от 1000₽",
    location: "Москва, ЮАО",
    experience: "9 лет",
    online: true,
    badge: "Новый",
    badgeColor: "gradient-green",
    about: "Покраска стен, потолков, дверей. Аккуратная подготовка поверхностей.",
  },
  {
    id: 5,
    name: "Павел Данилов",
    avatar: "П",
    avatarColor: "bg-pink-500",
    skills: ["furniture", "mounting", "light"],
    skillLabels: ["Сборка мебели", "Монтаж", "Свет"],
    rating: 4.6,
    reviews: 102,
    orders: 230,
    price: 500,
    priceLabel: "от 500₽",
    location: "Москва, САО",
    experience: "3 года",
    online: false,
    badge: null,
    badgeColor: "",
    about: "Помогу со сборкой мебели, повешу полки, карнизы, картины. Всё аккуратно.",
  },
  {
    id: 6,
    name: "Руслан Ахметов",
    avatar: "Р",
    avatarColor: "bg-yellow-500",
    skills: ["electric", "mounting"],
    skillLabels: ["Электрика", "Монтаж"],
    rating: 4.8,
    reviews: 73,
    orders: 168,
    price: 650,
    priceLabel: "от 650₽",
    location: "Москва, ВАО",
    experience: "6 лет",
    online: true,
    badge: "Топ мастер",
    badgeColor: "gradient-orange",
    about: "Разводка электрики, установка люстр, монтаж карнизов и TV-кронштейнов.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? "star-filled" : "star-empty"} style={{ fontSize: 12 }}>★</span>
      ))}
    </span>
  );
}

export default function Masters() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("rating");
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...MASTERS];

    if (category !== "all") {
      list = list.filter(m => m.skills.includes(category));
    }
    if (onlineOnly) {
      list = list.filter(m => m.online);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.skillLabels.some(s => s.toLowerCase().includes(q)) ||
        m.location.toLowerCase().includes(q)
      );
    }
    if (sort === "rating")  list.sort((a, b) => b.rating - a.rating);
    if (sort === "price")   list.sort((a, b) => a.price - b.price);
    if (sort === "reviews") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [search, category, sort, onlineOnly]);

  return (
    <div className="min-h-screen bg-background font-body">

      {/* Header */}
      <header className="gradient-hero sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 gradient-orange rounded-xl flex items-center justify-center">
              <Icon name="Hammer" size={16} className="text-white" />
            </div>
            <span className="font-display text-white text-lg uppercase hidden sm:block">МастерРядом</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 relative">
            <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по имени, услуге или району..."
              className="w-full bg-white/10 border border-white/15 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition">
                <Icon name="X" size={14} />
              </button>
            )}
          </div>

          <Link to="/" className="flex-shrink-0 px-4 py-2 bg-white/10 border border-white/15 rounded-xl text-white text-sm font-medium hover:bg-white/20 transition hidden sm:block">
            Личный кабинет
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Page title */}
        <div className="mb-8">
          <h1 className="font-display text-4xl uppercase font-bold text-foreground mb-1">Каталог мастеров</h1>
          <p className="text-muted-foreground">Найдено <b className="text-foreground">{filtered.length}</b> мастеров</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ——— Sidebar filters ——— */}
          <aside className="lg:w-64 flex-shrink-0 space-y-6">

            {/* Categories */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="font-semibold text-foreground mb-4">Категория услуг</div>
              <div className="space-y-1">
                {CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                      category === c.id
                        ? "gradient-orange text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon name={c.icon} fallback="Grid3x3" size={15} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="font-semibold text-foreground mb-4">Сортировка</div>
              <div className="space-y-1">
                {SORT_OPTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      sort === s.id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {s.label}
                    {sort === s.id && <Icon name="Check" size={14} className="text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Online toggle */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="font-semibold text-foreground mb-4">Доступность</div>
              <button
                onClick={() => setOnlineOnly(!onlineOnly)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  onlineOnly ? "gradient-green text-white" : "bg-muted text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${onlineOnly ? "bg-white" : "bg-green-500"}`} />
                  Только онлайн
                </span>
                <div className={`w-10 h-5 rounded-full relative transition-all ${onlineOnly ? "bg-white/30" : "bg-gray-200"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-all ${onlineOnly ? "left-5" : "left-0.5"}`} />
                </div>
              </button>
            </div>
          </aside>

          {/* ——— Masters grid ——— */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔍</div>
                <div className="font-display text-2xl font-bold text-foreground mb-2 uppercase">Ничего не найдено</div>
                <p className="text-muted-foreground">Попробуй изменить фильтры или поисковый запрос</p>
                <button onClick={() => { setSearch(""); setCategory("all"); setOnlineOnly(false); }}
                  className="mt-6 px-6 py-3 gradient-orange rounded-xl text-white font-semibold hover:opacity-90 transition">
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4">
                {filtered.map((master, i) => (
                  <div
                    key={master.id}
                    className="bg-card border border-border rounded-2xl p-5 card-hover animate-fade-up flex flex-col"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    {/* Top row */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl ${master.avatarColor}`}>
                          {master.avatar}
                        </div>
                        {master.online && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-bold text-foreground text-base truncate">{master.name}</div>
                          {master.badge && (
                            <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full text-white ${master.badgeColor}`}>
                              {master.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Stars rating={master.rating} />
                          <span className="font-semibold text-sm text-foreground">{master.rating}</span>
                          <span className="text-muted-foreground text-xs">({master.reviews} отзывов)</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Icon name="MapPin" size={11} />
                          {master.location}
                        </div>
                      </div>
                    </div>

                    {/* About */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{master.about}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {master.skillLabels.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4 border-t border-border pt-4">
                      <div className="text-center">
                        <div className="font-bold text-foreground text-sm">{master.orders}</div>
                        <div className="text-muted-foreground text-xs">заказов</div>
                      </div>
                      <div className="text-center border-x border-border">
                        <div className="font-bold text-foreground text-sm">{master.experience}</div>
                        <div className="text-muted-foreground text-xs">опыт</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-foreground text-sm">{master.priceLabel}</div>
                        <div className="text-muted-foreground text-xs">стоимость</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <button className="flex-1 py-2.5 bg-muted text-foreground rounded-xl text-sm font-medium hover:bg-muted/70 transition">
                        Профиль
                      </button>
                      <button className="flex-1 py-2.5 gradient-orange text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
                        style={{ boxShadow: "0 4px 15px rgba(255,120,0,0.25)" }}>
                        Заказать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

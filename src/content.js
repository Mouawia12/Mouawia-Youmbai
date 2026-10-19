// Bilingual content for the portfolio. Facts that aren't yet known are marked
// with the placeholder token "[…]" so they read as intentional, not fabricated.
// Edit copy here; the component stays presentation-only.

export const content = {
  en: {
    dir: "ltr",
    isArabic: false,
    toggle: { label: "AR", aria: "التبديل إلى العربية" },
    nav: {
      links: [
        { label: "Services", href: "#services" },
        { label: "Work", href: "#work" },
        { label: "Approach", href: "#approach" },
        { label: "Contact", href: "#contact" },
      ],
    },
    hero: {
      eyebrow: "Full-stack developer",
      name: "Mouawia Youmbai",
      tagline: ["From the data layer", "to the last pixel."],
      bio: "I ship products end-to-end — resilient backends in Laravel, Node.js and Spring Boot, expressive React interfaces, and AI woven in where it earns its place. Systems that stay fast under load; interfaces that feel effortless.",
      compile: ["> compiling interface", "render complete"],
      location: "Oran, Algeria",
      available: "Available for new work",
      primaryCta: "Start a project",
      secondaryCta: "See the work",
      portraitAlt: "Portrait of Mouawia Youmbai",
    },
    about: {
      eyebrow: "About",
      heading: "An engineer who thinks in whole systems, not screens.",
      body: [
        "I'm a full-stack developer based in Oran, Algeria. I work across the whole stack — from data models and APIs to the interface a person actually touches — because the best products are designed as one piece, not handed between silos.",
        "I care about two things above all: systems that hold up under real load, and interfaces that get out of the way. When AI belongs in a product, I integrate it to remove friction — never as a gimmick.",
      ],
    },
    services: {
      eyebrow: "Services",
      heading: "What I build for teams.",
      items: [
        {
          icon: "layers",
          title: "Full-stack web apps",
          body: "End-to-end delivery: clean APIs, resilient data models, and polished React front-ends — shipped, deployed, and maintained.",
        },
        {
          icon: "cursor",
          title: "Interface & UX engineering",
          body: "Fast, accessible, bilingual interfaces (LTR / RTL) built with design-system discipline and real attention to detail.",
        },
        {
          icon: "spark",
          title: "AI integration & automation",
          body: "LLMs, vector search, and automation embedded where they remove real friction in a workflow — not as decoration.",
        },
        {
          icon: "gauge",
          title: "APIs & performance",
          body: "Robust REST APIs and systems tuned to stay quick, observable, and predictable as they scale.",
        },
      ],
    },
    skills: {
      eyebrow: "Toolkit",
      heading: "The stack I reach for.",
      body: "A pragmatic mix of modern frameworks and battle-tested languages — chosen to ship fast without cutting corners.",
      groups: [
        { label: "Frontend", items: ["React", "TypeScript", "JavaScript", "TailwindCSS"] },
        { label: "Backend", items: ["Laravel", "Node.js", "Spring Boot", "PHP", "REST APIs"] },
        { label: "Data & infra", items: ["MySQL", "PostgreSQL", "Docker", "GitHub"] },
        { label: "AI & tooling", items: ["AI integration", "Vector search", "Automation"] },
      ],
    },
    work: {
      eyebrow: "Selected work",
      heading: "A few things worth showing.",
      note: "Case studies are being written up. Real projects drop in here next.",
      items: [
        { title: "[Project name]", tags: ["[Type]", "[Stack]"], body: "[A short line on what this product does, your role, and the outcome.]", status: "Case study — coming soon" },
        { title: "[Project name]", tags: ["[Type]", "[Stack]"], body: "[A short line on what this product does, your role, and the outcome.]", status: "Case study — coming soon" },
        { title: "[Project name]", tags: ["[Type]", "[Stack]"], body: "[A short line on what this product does, your role, and the outcome.]", status: "Case study — coming soon" },
      ],
    },
    approach: {
      eyebrow: "How I work",
      heading: "Four layers, start to launch.",
      steps: [
        { k: "01", title: "Discover", body: "Understand the problem, the users, and the constraints before a line of code." },
        { k: "02", title: "Design", body: "Shape the architecture and the interface together, so they actually fit." },
        { k: "03", title: "Build", body: "Ship in tight iterations — tests, reviews, and clean commits throughout." },
        { k: "04", title: "Launch", body: "Deploy, monitor, and keep improving the product after go-live." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's build something that lasts.",
      body: "Have a product to launch or a platform to level up? I partner with teams to deliver experiences that feel fast, look refined, and scale responsibly.",
      email: "mouawia.youmbai@souftech.com",
      cta: "Start a project",
      socials: [
        { label: "GitHub", icon: "github", href: "#" },
        { label: "LinkedIn", icon: "linkedin", href: "#" },
        { label: "X", icon: "x", href: "#" },
      ],
    },
    footer: { rights: "Oran, Algeria", built: "Designed & built with React" },
  },

  ar: {
    dir: "rtl",
    isArabic: true,
    toggle: { label: "EN", aria: "Switch to English" },
    nav: {
      links: [
        { label: "الخدمات", href: "#services" },
        { label: "الأعمال", href: "#work" },
        { label: "المنهج", href: "#approach" },
        { label: "تواصل", href: "#contact" },
      ],
    },
    hero: {
      eyebrow: "مطوّر برمجيات متكامل",
      name: "معاوية يومباي",
      tagline: ["من طبقة البيانات", "إلى آخر بكسل."],
      bio: "أبني المنتج من طرفه إلى طرفه — خلفيات متينة بـLaravel وNode.js وSpring Boot، وواجهات React معبّرة، وذكاء اصطناعي مدموج حيث يضيف قيمة فعلية. أنظمة تبقى سريعة تحت الضغط، وواجهات تبدو سلسة بلا جهد.",
      compile: ["> جاري بناء الواجهة", "اكتمل العرض"],
      location: "وهران، الجزائر",
      available: "متاح لأعمال جديدة",
      primaryCta: "لنبدأ مشروعاً",
      secondaryCta: "شاهد الأعمال",
      portraitAlt: "صورة معاوية يومباي",
    },
    about: {
      eyebrow: "نبذة",
      heading: "مهندس يفكّر بالأنظمة كاملةً، لا بالشاشات.",
      body: [
        "مطوّر Full-Stack مقيم في وهران بالجزائر. أعمل عبر المكدّس كاملاً — من نماذج البيانات والواجهات البرمجية إلى الواجهة التي يلمسها المستخدم فعلاً — لأن أفضل المنتجات تُصمَّم كقطعة واحدة لا تُسلَّم بين جُزر منفصلة.",
        "يهمّني أمران قبل كل شيء: أنظمة تصمد تحت الضغط الحقيقي، وواجهات لا تقف في الطريق. وحين يستحق الذكاء الاصطناعي مكاناً في المنتج، أدمجه ليزيل احتكاكاً فعلياً — لا كحيلة.",
      ],
    },
    services: {
      eyebrow: "الخدمات",
      heading: "ما أبنيه للفرق.",
      items: [
        {
          icon: "layers",
          title: "تطبيقات ويب متكاملة",
          body: "تسليم كامل: واجهات برمجية نظيفة، نماذج بيانات متينة، وواجهات React مصقولة — جاهزة للإنتاج ومصانة.",
        },
        {
          icon: "cursor",
          title: "هندسة الواجهات والتجربة",
          body: "واجهات سريعة ومتاحة وثنائية الاتجاه (RTL / LTR) مبنية بانضباط نظام تصميم واهتمام حقيقي بالتفاصيل.",
        },
        {
          icon: "spark",
          title: "دمج الذكاء الاصطناعي والأتمتة",
          body: "نماذج لغوية وبحث دلالي وأتمتة حيث تزيل احتكاكاً حقيقياً في سير العمل — لا كزينة.",
        },
        {
          icon: "gauge",
          title: "الواجهات البرمجية والأداء",
          body: "REST APIs متينة وأنظمة مضبوطة لتبقى سريعة وقابلة للمراقبة ومتوقّعة مع التوسّع.",
        },
      ],
    },
    skills: {
      eyebrow: "صندوق الأدوات",
      heading: "المكدّس الذي أعتمده.",
      body: "مزيج عملي من الأطر الحديثة واللغات المجرَّبة — مختار لأُنجز بسرعة دون تهاون في الجودة.",
      groups: [
        { label: "الواجهة", items: ["React", "TypeScript", "JavaScript", "TailwindCSS"] },
        { label: "الخلفية", items: ["Laravel", "Node.js", "Spring Boot", "PHP", "REST APIs"] },
        { label: "البيانات والبنية", items: ["MySQL", "PostgreSQL", "Docker", "GitHub"] },
        { label: "الذكاء والأدوات", items: ["دمج الذكاء الاصطناعي", "البحث الدلالي", "الأتمتة"] },
      ],
    },
    work: {
      eyebrow: "أعمال مختارة",
      heading: "أعمال تستحق العرض.",
      note: "دراسات الحالة قيد الكتابة. مشاريع حقيقية ستظهر هنا قريباً.",
      items: [
        { title: "[اسم المشروع]", tags: ["[النوع]", "[التقنيات]"], body: "[سطر موجز عمّا يفعله المنتج، ودورك فيه، والنتيجة.]", status: "دراسة حالة — قريباً" },
        { title: "[اسم المشروع]", tags: ["[النوع]", "[التقنيات]"], body: "[سطر موجز عمّا يفعله المنتج، ودورك فيه، والنتيجة.]", status: "دراسة حالة — قريباً" },
        { title: "[اسم المشروع]", tags: ["[النوع]", "[التقنيات]"], body: "[سطر موجز عمّا يفعله المنتج، ودورك فيه، والنتيجة.]", status: "دراسة حالة — قريباً" },
      ],
    },
    approach: {
      eyebrow: "طريقة عملي",
      heading: "أربع طبقات، من البداية إلى الإطلاق.",
      steps: [
        { k: "٠١", title: "اكتشاف", body: "فهم المشكلة والمستخدمين والقيود قبل أول سطر كود." },
        { k: "٠٢", title: "تصميم", body: "تشكيل المعمارية والواجهة معاً حتى تتلاءما فعلاً." },
        { k: "٠٣", title: "بناء", body: "بناء بتكرارات قصيرة — اختبارات ومراجعات وكوميتات نظيفة طوال الوقت." },
        { k: "٠٤", title: "إطلاق", body: "نشر ومراقبة وتحسين مستمر للمنتج بعد الإطلاق." },
      ],
    },
    contact: {
      eyebrow: "تواصل",
      heading: "لنبنِ شيئاً يدوم.",
      body: "عندك منتج تطلقه أو منصّة ترفع مستواها؟ أتعاون مع الفرق لتقديم تجارب سريعة، مصقولة، وقابلة للتوسّع بمسؤولية.",
      email: "mouawia.youmbai@souftech.com",
      cta: "لنبدأ مشروعاً",
      socials: [
        { label: "GitHub", icon: "github", href: "#" },
        { label: "LinkedIn", icon: "linkedin", href: "#" },
        { label: "X", icon: "x", href: "#" },
      ],
    },
    footer: { rights: "وهران، الجزائر", built: "صُمّم وبُني بـReact" },
  },
};

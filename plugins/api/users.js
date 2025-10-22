const CITIES = [
  { id: "60f197849998570020506123", title: "Оренбург" },
  { id: "60f197849998570020506124", title: "Москва" },
  { id: "60f197849998570020506125", title: "Санкт-Петербург" },
  { id: "60f197849998570020506126", title: "Новосибирск" },
  { id: "60f197849998570020506127", title: "Екатеринбург" },
];

const NAMES = ["Галина", "Иван", "Мария", "Петр", "Светлана", "Алексей", "Ольга", "Дмитрий"];

const generateUser = (id) => {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const now = Date.now();
  const createdAt = now - Math.floor(Math.random() * 1000 * 3600 * 24 * 365);

  return {
    id: `64bf8ff405732e001e1d${String(id).padStart(4, '0')}`,
    balance: Math.floor(Math.random() * 5000),
    cashbackPercent: Math.floor(Math.random() * 25),
    city: city,
    isBlocked: Math.random() > 0.9,
    lastSave: now - Math.floor(Math.random() * 1000 * 3600 * 24 * 30),
    lastSpend: now - Math.floor(Math.random() * 1000 * 3600 * 24 * 30),
    lastVisit: now - Math.floor(Math.random() * 1000 * 3600 * 24 * 7),
    name: name,
    phone: `+79*****${String(Math.floor(Math.random() * 9000) + 1000)}`,
    role: "customer",
    saveCount: Math.floor(Math.random() * 100),
    saveTotal: Math.floor(Math.random() * 10000),
    spendCount: Math.floor(Math.random() * 50),
    spendTotal: Math.floor(Math.random() * 8000),
    updatedAt: now,
    createdAt: createdAt,
  };
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
  async list({ offset = 0, limit = 100 }) {
    await sleep(500);
    const users = [];
    for (let i = 0; i < limit; i++) {
      users.push(generateUser(offset + i));
    }
    return users;
  }
};
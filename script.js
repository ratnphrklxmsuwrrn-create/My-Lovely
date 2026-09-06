// My Lovely — product data & rendering
// Single source of truth for all 12 zodiac dolls.
// mood values: "fresh" | "relax" | "focus" | "romance"

const PRODUCTS = [
  {
    id: "rat",
    name: "หนู",
    mood: "romance",
    description: "ตัวจิ๋วแต่หัวใจใหญ่ ขี้เล่นและไวเหมือนแสงแวบเดียว มาพร้อมความน่ารักที่ทำให้ใครเห็นก็ต้องยิ้ม",
    tagline: "ตุ๊กตาหนูน้อย 40 ซม. นุ่มฟูสุดคิ้วท์ กอดแล้วใจละลาย",
  },
  {
    id: "ox",
    name: "วัว",
    mood: "relax",
    description: "อบอุ่น หนักแน่น เหมือนเพื่อนที่พร้อมอยู่เคียงข้างเสมอ กอดแล้วรู้สึกปลอดภัยทุกครั้ง",
    tagline: "ตุ๊กตาวัวอ้วนกลม 40 ซม. อบอุ่นทุกการกอด ราคาเบาๆ",
  },
  {
    id: "tiger",
    name: "เสือ",
    mood: "focus",
    description: "ทรงพลังแต่ซ่อนความนุ่มไว้ข้างใน ให้ความรู้สึกกล้าหาญและมั่นใจในแบบฉบับน่ารัก",
    tagline: "ตุ๊กตาเสือน้อยขนนุ่ม 40 ซม. ความน่ารักที่ซ่อนพลังไว้ข้างใน",
  },
  {
    id: "rabbit",
    name: "กระต่าย",
    mood: "fresh",
    description: "หูยาวนุ่มฟู ขี้อ้อนและอ่อนโยน เหมือนก้อนเมฆน้อยๆ ที่ลอยมาให้กอด",
    tagline: "ตุ๊กตากระต่ายหูยาว 40 ซม. นุ่มละมุนดั่งก้อนเมฆ",
  },
  {
    id: "dragon",
    name: "มังกร",
    mood: "focus",
    description: "เจ้าแห่งความฝันและพลังมหัศจรรย์ ตัวนี้จะพาจินตนาการของคุณโบยบินไปไกล",
    tagline: "ตุ๊กตามังกรมหัศจรรย์ 40 ซม. พาความฝันโบยบิน",
  },
  {
    id: "snake",
    name: "งู",
    mood: "romance",
    description: "ลื่นไหลอย่างมีเสน่ห์ ดูลึกลับนิดๆ แต่แฝงความอ่อนโยนไว้เต็มเปี่ยม",
    tagline: "ตุ๊กตางูลื่นไหลมีเสน่ห์ 40 ซม. น่ารักแบบมีเอกลักษณ์",
  },
  {
    id: "goat",
    name: "แกะ",
    mood: "relax",
    description: "ขนฟูนุ่มละมุนสุดๆ เหมือนหมอนใบโปรดที่กอดแล้วหลับสบายทุกคืน",
    tagline: "ตุ๊กตาแกะขนฟู 40 ซม. นุ่มเหมือนหมอนใบโปรด",
  },
  {
    id: "monkey",
    name: "ลิง",
    mood: "fresh",
    description: "จอมซนน่ารัก เต็มไปด้วยพลังบวกและรอยยิ้ม ทำให้บรรยากาศสดใสทุกที่ที่ไป",
    tagline: "ตุ๊กตาลิงจอมซน 40 ซม. เติมความสดใสให้ทุกวัน",
  },
  {
    id: "rooster",
    name: "ไก่",
    mood: "fresh",
    description: "สดใสร่าเริง ตื่นเช้าพร้อมพลังงานเต็มเปี่ยม เหมือนแสงแดดอ่อนๆ ยามเช้า",
    tagline: "ตุ๊กตาไก่แสนสดใส 40 ซม. พลังบวกเต็มตัว",
  },
  {
    id: "dog",
    name: "สุนัข",
    mood: "romance",
    description: "ซื่อสัตย์และอบอุ่นใจ เหมือนเพื่อนแท้ที่พร้อมอยู่ข้างๆ ไม่ว่าวันไหน",
    tagline: "ตุ๊กตาสุนัขแสนซื่อ 40 ซม. เพื่อนแท้ตัวนุ่มฟู",
  },
  {
    id: "pig",
    name: "หมู",
    mood: "relax",
    description: "กลมมนน่ากอด อวบอิ่มด้วยความสุข มอบความรู้สึกอบอุ่นแบบไม่มีเงื่อนไข",
    tagline: "ตุ๊กตาหมูอวบอิ่ม 40 ซม. กอดแล้วฟินทุกครั้ง",
  },
  {
    id: "horse",
    name: "ม้า",
    mood: "focus",
    description: "สง่างามแต่ใจดี เต็มไปด้วยพลังแห่งอิสระ พร้อมพาความฝันของคุณวิ่งไปข้างหน้า",
    tagline: "ตุ๊กตาม้าสง่างาม 40 ซม. พาใจให้เป็นอิสระ",
  },
];

const PRICE = 189;
const SIZE_CM = 40;

const MOODS = [
  { id: "fresh", label: "Fresh", th: "สดใส" },
  { id: "relax", label: "Relax", th: "ผ่อนคลาย" },
  { id: "focus", label: "Focus", th: "มั่นใจ" },
  { id: "romance", label: "Romance", th: "ละมุน" },
];

function getMoodFromURL() {
  const params = new URLSearchParams(window.location.search);
  const mood = params.get("mood");
  return MOODS.some((m) => m.id === mood) ? mood : null;
}

function setMoodInURL(mood) {
  const url = new URL(window.location.href);
  if (mood) {
    url.searchParams.set("mood", mood);
  } else {
    url.searchParams.delete("mood");
  }
  window.history.replaceState({}, "", url);
}

function renderFilterBar(activeMood) {
  const bar = document.getElementById("filter-bar");
  if (!bar) return;

  bar.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "filter-pill" + (!activeMood ? " is-active" : "");
  allBtn.type = "button";
  allBtn.textContent = "ทั้งหมด";
  allBtn.addEventListener("click", () => {
    setMoodInURL(null);
    renderFilterBar(null);
    renderProductList(null);
  });
  bar.appendChild(allBtn);

  MOODS.forEach((m) => {
    const btn = document.createElement("button");
    btn.className = "filter-pill" + (activeMood === m.id ? " is-active" : "");
    btn.type = "button";
    btn.dataset.mood = m.id;
    btn.textContent = `${m.th}`;
    btn.addEventListener("click", () => {
      setMoodInURL(m.id);
      renderFilterBar(m.id);
      renderProductList(m.id);
    });
    bar.appendChild(btn);
  });
}

function renderProductList(mood) {
  const list = document.getElementById("product-list");
  if (!list) return;

  const items = mood ? PRODUCTS.filter((p) => p.mood === mood) : PRODUCTS;

  list.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "product-empty";
    empty.textContent = "ยังไม่มีสินค้าในหมวดนี้";
    list.appendChild(empty);
    return;
  }

  items.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.mood = p.mood;

    card.innerHTML = `
      <div class="product-card__badge" data-mood="${p.mood}" aria-hidden="true">
        <span>${p.name.charAt(0)}</span>
      </div>
      <h3 class="product-card__name">${p.name}</h3>
      <p class="product-card__desc">${p.description}</p>
      <p class="product-card__tagline">${p.tagline} ${SIZE_CM} ซม. ราคา ${PRICE} บาท</p>
      <div class="product-card__footer">
        <span class="product-card__price">${PRICE} ฿</span>
        <button type="button" class="product-card__cta">หยิบใส่ตะกร้า</button>
      </div>
    `;

    list.appendChild(card);
  });
}

// ---------- Orders (order.html + admin.html) ----------
// Orders are kept in localStorage so admin.html can list what order.html
// submits, without needing a backend. Works once the site is hosted for
// real; browser sandboxes/previews may not persist localStorage.

const ORDERS_KEY = "myLovelyOrders";

function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveOrder(order) {
  const orders = getOrders();
  orders.push(order);
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    // storage unavailable (e.g. sandboxed preview) — fail silently
  }
}

function initOrderForm() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const order = {
      datetime: new Date().toLocaleString("th-TH"),
      customerName: document.getElementById("customerName").value.trim(),
      contact: document.getElementById("contact").value.trim(),
      items: document.getElementById("items").value.trim(),
      total: document.getElementById("total").value.trim(),
      note: document.getElementById("note").value.trim(),
    };

    saveOrder(order);
    window.location.href = "thankyou.html";
  });
}

function initAdminTable() {
  const table = document.getElementById("ordersTable");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  const orders = getOrders();
  tbody.innerHTML = "";

  if (orders.length === 0) {
    const row = document.createElement("tr");
    row.className = "admin-empty-row";
    row.innerHTML = `<td colspan="6">ยังไม่มีคำสั่งซื้อ</td>`;
    tbody.appendChild(row);
    return;
  }

  orders.forEach((o) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${o.datetime}</td>
      <td>${o.customerName}</td>
      <td>${o.contact}</td>
      <td>${o.items}</td>
      <td>${o.total}</td>
      <td>${o.note}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const initialMood = getMoodFromURL();
  renderFilterBar(initialMood);
  renderProductList(initialMood);

  initOrderForm();
  initAdminTable();
});

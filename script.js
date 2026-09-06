/* ============================================================
   My Lovely — script.js
   ใช้ร่วมกันทุกหน้า: product.html, order.html, admin.html
   ============================================================ */

const PRODUCTS_JSON_PATH = 'products.json';

const SUBMIT_ORDER_URL =
  'https://script.google.com/macros/s/AKfycbzpx1hl30WBxSxNEmMbeGjYW5jzmanIWOSwfV8ssSaCOwIjaO9OwHOlcSGYBJKkOuDn/exec';

const ORDERS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3P8FfzC6_Ittm-TFxWBPuizRVBSBDrXqd_5ozgetarMIihCrQwGqvcUAP1XpGt0sYISBhuJor3-TV/pub?gid=0&single=true&output=csv';

const ANIMAL_TYPES = [
  'All', 'Mouse', 'Cow', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Sheep', 'Monkey', 'Chicken', 'Dog', 'Pig', 'Hores'
];

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('product-list')) initProductPage();
  if (document.getElementById('orderForm')) initOrderPage();
  if (document.querySelector('#ordersTable tbody')) initAdminPage();
});

/* ============================================================
   1) product.html — โหลดสินค้า / แสดงการ์ด / กรองตามชนิดสัตว์
   ============================================================ */

let allProducts = [];

function initProductPage() {
  fetch(PRODUCTS_JSON_PATH)
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderFilterBar();

      const params = new URLSearchParams(window.location.search);
      const typeFromUrl = params.get('Type');
      const initialType = (typeFromUrl && ANIMAL_TYPES.includes(typeFromUrl))
        ? typeFromUrl
        : 'All';

      renderProducts(initialType);
      setActiveFilterButton(initialType);
    })
    .catch(err => {
      console.error('โหลด products.json ไม่สำเร็จ:', err);
      const list = document.getElementById('product-list');
      if (list) list.innerHTML = '<p>ไม่สามารถโหลดสินค้าได้ กรุณาลองใหม่อีกครั้ง</p>';
    });
}

function renderFilterBar() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;

  bar.innerHTML = '';
  ANIMAL_TYPES.forEach(type => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-btn';
    btn.dataset.type = type;
    btn.textContent = type;
    btn.addEventListener('click', () => {
      renderProducts(type);
      setActiveFilterButton(type);
    });
    bar.appendChild(btn);
  });
}

function setActiveFilterButton(type) {
  document.querySelectorAll('#filter-bar .filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
}

function renderProducts(type) {
  const list = document.getElementById('product-list');
  if (!list) return;

  const filtered = (type === 'All')
    ? allProducts
    : allProducts.filter(p => p.type === type);

  if (filtered.length === 0) {
    list.innerHTML = '<p>ไม่พบสินค้าในหมวดนี้</p>';
    return;
  }

  list.innerHTML = filtered.map(productCardHTML).join('');
}

function productCardHTML(product) {
  const itemLabel = `${product.type} ${product.size}`;
  const orderUrl = `order.html?item=${encodeURIComponent(itemLabel)}&price=${encodeURIComponent(product.price)}`;

  return `
    <div class="product-card">
      <div class="product-card__image">
        <img src="${product.image}" alt="${escapeHTML(product.name)}" loading="lazy">
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${escapeHTML(product.name)}</h3>
        <p class="product-card__desc">${escapeHTML(product.size)}</p>
        <p class="product-card__price">${product.price} บาท</p>
        <a class="btn btn-primary" href="${orderUrl}">สั่งซื้อ</a>
      </div>
    </div>
  `;
}

/* ============================================================
   2) order.html — เติมฟอร์มจาก URL parameter / ส่งคำสั่งซื้อ
   ============================================================ */

function initOrderPage() {
  const params = new URLSearchParams(window.location.search);
  const item = params.get('item');
  const price = params.get('price');

  const itemsField = document.getElementById('items');
  const totalField = document.getElementById('total');

  if (item && itemsField) itemsField.value = item;
  if (price && totalField) totalField.value = price;

  const form = document.getElementById('orderForm');
  form.addEventListener('submit', handleOrderSubmit);
}

function handleOrderSubmit(e) {
  e.preventDefault();

  const payload = {
    customerName: document.getElementById('customerName').value,
    contact: document.getElementById('contact').value,
    items: document.getElementById('items').value,
    total: document.getElementById('total').value,
    note: document.getElementById('note').value
  };

  fetch(SUBMIT_ORDER_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
    .then(() => {
      window.location.href = 'thankyou.html';
    })
    .catch(error => {
      console.error(error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    });
}

/* ============================================================
   3) admin.html — ดึง CSV จาก Google Sheet / parse เอง / แสดงตาราง
   ============================================================ */

function initAdminPage() {
  const tbody = document.querySelector('#ordersTable tbody');
  if (!tbody) return;

  fetch(ORDERS_CSV_URL)
    .then(res => res.text())
    .then(csvText => {
      const rows = parseCSV(csvText);

      if (rows.length <= 1) {
        tbody.innerHTML = '<tr><td colspan="6">ยังไม่มีรายการสั่งซื้อ</td></tr>';
        return;
      }

      // แถวแรกคือ header ตัดออก แล้วกรองแถวว่างทิ้ง
      const dataRows = rows
        .slice(1)
        .filter(r => r.some(cell => cell.trim() !== ''));

      // เรียงจากรายการล่าสุดขึ้นก่อน
      dataRows.reverse();

      tbody.innerHTML = dataRows.map(rowToTableRowHTML).join('');
    })
    .catch(err => {
      console.error('โหลดข้อมูลคำสั่งซื้อไม่สำเร็จ:', err);
      tbody.innerHTML = '<tr><td colspan="6">ไม่สามารถโหลดข้อมูลได้</td></tr>';
    });
}

function rowToTableRowHTML(row) {
  const [timestamp, customerName, contact, items, total, note] = row;
  return `
    <tr>
      <td>${escapeHTML(timestamp || '')}</td>
      <td>${escapeHTML(customerName || '')}</td>
      <td>${escapeHTML(contact || '')}</td>
      <td>${escapeHTML(items || '')}</td>
      <td>${escapeHTML(total || '')}</td>
      <td>${escapeHTML(note || '')}</td>
    </tr>
  `;
}

/**
 * แปลงข้อความ CSV เป็น array of rows (แต่ละ row เป็น array of cell)
 * รองรับ field ที่ครอบด้วย double quote ซึ่งอาจมี comma หรือ newline อยู่ข้างในได้
 * (เขียนเอง ไม่พึ่ง library ภายนอก)
 */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        field += '"';
        i++; // ข้าม quote ตัวที่สองไปเลย
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(field);
        field = '';
      } else if (char === '\r') {
        // ข้าม carriage return
      } else if (char === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += char;
      }
    }
  }

  // เก็บ field/row สุดท้าย กรณีไฟล์ไม่ลงท้ายด้วย newline
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/* ============================================================
   Helper: ป้องกัน HTML injection เวลาแทรกข้อมูลจากภายนอกลง DOM
   ============================================================ */

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

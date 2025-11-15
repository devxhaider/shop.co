console.log("✅ app.js connected and running");

/* ---------------------------
   Helper functions
--------------------------- */
function formatCurrency(n) {
  return '$' + Math.round(n);
}

function getItemBasePrice(itemEl) {
  return Number(itemEl.getAttribute('data-price')) || 0;
}

function recalcTotals() {
  const cartItems = document.querySelectorAll('.cart-item');
  let subtotal = 0;

  cartItems.forEach(item => {
    const qtyEl = item.querySelector('.qty-count');
    if (!qtyEl) return; // skip if missing
    const qty = Number(qtyEl.textContent) || 1;
    const base = getItemBasePrice(item);
    const itemTotal = base * qty;
    subtotal += itemTotal;

    const priceDisplay = item.querySelector('.price');
    if (priceDisplay) priceDisplay.textContent = formatCurrency(base);
  });

  const subtotalEl = document.getElementById('subtotal');
  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);

  const promoApplied = !!document.body.dataset.promoApplied;
  let discount = promoApplied ? subtotal * 0.2 : 0;

  const discountEl = document.getElementById('discount');
  if (discountEl)
    discountEl.textContent = discount > 0 ? '- ' + formatCurrency(discount) : '- $0';

  const deliveryFee = 15;
  const deliveryEl = document.getElementById('delivery');
  if (deliveryEl) deliveryEl.textContent = formatCurrency(deliveryFee);

  const total = Math.round(subtotal - discount + deliveryFee);
  const totalEl = document.getElementById('total');
  if (totalEl) totalEl.textContent = formatCurrency(total);

  console.log("🧮 Totals recalculated:", { subtotal, discount, total });
}

/* ---------------------------
   Quantity Controls
--------------------------- */
function bindQuantityControls() {
  document.addEventListener('click', function (e) {
    const dec = e.target.closest('.qty-decrease');
    const inc = e.target.closest('.qty-increase');

    if (dec || inc) {
      const btn = dec || inc;
      const item = btn.closest('.cart-item');
      const countEl = item.querySelector('.qty-count');
      let qty = Number(countEl.textContent) || 1;

      if (dec) qty = Math.max(1, qty - 1);
      if (inc) qty++;

      countEl.textContent = qty;
      recalcTotals();
    }
  });
}

/* ---------------------------
   Delete Controls
--------------------------- */
function bindDeleteControls() {
  document.addEventListener('click', function (e) {
    const del = e.target.closest('.cart-item__delete');
    if (del) {
      const item = del.closest('.cart-item');
      if (item) {
        item.remove();
        recalcTotals();
        console.log("🗑️ Item deleted");
      }
    }
  });
}

/* ---------------------------
   Promo Code
--------------------------- */
function bindPromo() {
  const applyBtn = document.getElementById('apply-promo');
  const promoInput = document.getElementById('promo-input');

  if (!applyBtn || !promoInput) {
    console.warn("⚠️ Promo input or button missing in DOM");
    return;
  }

  applyBtn.addEventListener('click', function () {
    const code = promoInput.value.trim();
    document.body.dataset.promoApplied = code ? 'true' : '';
    recalcTotals();

    applyBtn.textContent = code ? 'Applied' : 'Apply';
    setTimeout(() => {
      applyBtn.textContent = code ? 'Applied' : 'Apply';
    }, 600);
  });
}

/* ---------------------------
   Initialize
--------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  bindQuantityControls();
  bindDeleteControls();
  bindPromo();
  recalcTotals();
  console.log("✨ All bindings initialized");
});

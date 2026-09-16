import nodemailer from 'nodemailer';

const escape = (value = '') => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
type OrderData = { orderNumber: string; customerName: string; customerPhone: string; customerEmail?: string | null; address: string; total: number; items: { productName: string; variantName?: string | null; quantity: number; total: number }[] };

export async function sendOrderNotification(order: OrderData, recipient?: string) {
  const host = process.env.EMAIL_SERVER_HOST, port = Number(process.env.EMAIL_SERVER_PORT || 465);
  const user = process.env.EMAIL_SERVER_USER, password = process.env.EMAIL_SERVER_PASSWORD;
  const from = process.env.EMAIL_FROM || user, admin = recipient || process.env.ADMIN_EMAIL;
  if (!host || !user || !password || !from || !admin || !Number.isFinite(port)) throw new Error('SMTP and ADMIN_EMAIL settings are required');
  const rows = order.items.map((item) => `<tr><td>${escape(item.productName)}${item.variantName ? ` — ${escape(item.variantName)}` : ''}</td><td>${item.quantity}</td><td>${item.total.toFixed(0)} DA</td></tr>`).join('');
  const html = `<main style="font-family:Arial,sans-serif;max-width:600px;margin:auto"><h1 style="color:#0f172a">Nouvelle commande ${escape(order.orderNumber)}</h1><p><b>Client :</b> ${escape(order.customerName)}<br><b>Téléphone :</b> ${escape(order.customerPhone)}<br><b>Email :</b> ${escape(order.customerEmail || '—')}<br><b>Adresse :</b> ${escape(order.address)}</p><table width="100%" cellspacing="0" cellpadding="8" style="border-collapse:collapse"><thead><tr style="background:#f59e0b"><th align="left">Produit</th><th>Qté</th><th align="right">Total</th></tr></thead><tbody>${rows}</tbody></table><p style="font-size:18px"><b>Total : ${order.total.toFixed(0)} DA</b></p></main>`;
  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass: password } });
  await transporter.sendMail({ from: `"Aniss Électroménager" <${from}>`, to: admin, subject: `Nouvelle commande ${order.orderNumber}`, html });
  return true;
}

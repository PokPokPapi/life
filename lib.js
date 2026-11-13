let D = {};
let TODAY = new Date();
const PAGE = location.pathname.split("/").pop().replace(".html", "") || "accueil";
const API = "https://rjxvhqgbazhvfggtgylb.supabase.co/functions/v1/life-dashboard";
function __run(fn) {
const k = new URLSearchParams(location.search).get("k") || "";
fetch(API + "?json=1&p=" + PAGE + "&k=" + encodeURIComponent(k), { cache: "no-store" })
.then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
.then((j) => { D = j; const n = new Date(j._now || Date.now()); TODAY = new Date(n.toLocaleDateString("en-CA", { timeZone: "America/Toronto" }) + "T12:00:00"); fn(); document.documentElement.classList.add("ready"); })
.catch((e) => { document.body.insertAdjacentHTML("afterbegin", '<p style="font:14px system-ui;padding:16px;color:#9E1F16">Données indisponibles (' + e + ").</p>"); });
}
const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const MOISL = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const JOURS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = (v) => (typeof v === "number" && isFinite(v) ? v : (v && typeof v === "object" && "start" in v ? null : (isFinite(+v) && v !== null && v !== "" ? +v : null)));
const n0 = (v) => num(v) ?? 0;
function fmt(v, dec = 0) {
const x = num(v);
if (x === null) return "—";
const s = Math.abs(x).toFixed(dec).replace(".", ",");
const [i, d] = s.split(",");
return (x < 0 ? "−" : "") + i.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
}
const cad = (v) => (num(v) === null ? "—" : fmt(v) + " CAD");
function dt(v) { const s = v && typeof v === "object" ? v.start : v; if (!s) return null; return new Date(s.length <= 10 ? s + "T12:00:00" : s); }
function dShort(v) { const d = dt(v); return d ? d.getDate() + " " + MOIS[d.getMonth()] : "—"; }
function dLong(v) { const d = dt(v); return d ? d.getDate() + " " + MOIS[d.getMonth()] + " " + d.getFullYear() : "—"; }
function dMonthYear(v) { const d = dt(v); return d ? MOISL[d.getMonth()] + " " + d.getFullYear() : "—"; }
function days(a, b = TODAY) { return Math.round((dt(a) - b) / 864e5); }
function bar(p, n = 11) {
const x = Math.max(0, Math.min(1, n0(p)));
const k = Math.round(x * n);
return "■".repeat(k) + "□".repeat(n - k);
}
function barHtml(p, label, n = 11) {
const empty = n0(p) <= 0;
return `<span class="bar"${empty ? ' style="color: #6B6B6B"' : ""}>${bar(p, n)}${label ? " " + label : ""}</span>`;
}
const pct = (p) => Math.round(n0(p) * 100) + " %";
function rows(name) { return Array.isArray(D[name]) ? D[name] : []; }
function set(id, html) { const e = $(id); if (e) e.innerHTML = html; }
function tag(s, cls = "") { return s ? `<span class="tag ${cls}">${esc(s)}</span>` : ""; }

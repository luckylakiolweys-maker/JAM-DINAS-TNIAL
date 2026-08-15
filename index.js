require('dotenv').config();
const cron = require('node-cron');
const fetch = require('node-fetch');

async function kirimPesan(pesan) {
  try {
    await fetch(process.env.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: pesan,
        allowed_mentions: {
          parse: ['everyone'],
          roles: ['1536005431980195913'],
        },
      }),
    });
    console.log(`✅ Pesan terkirim: ${new Date().toLocaleString('id-ID')}`);
  } catch (err) {
    console.error('❌ Gagal kirim pesan:', err);
  }
}

// ====== PESAN APEL PAGI ======
const PESAN_PAGI = `# 🔔 BELL DINAS PAGI TELAH BERBUNYI! DIBERITAHUKAN KEPADA SELURUH PRAJURIT RINAF UNTUK SEGERA APEL PAGI DAN MELANJUTKAN PENJAGAAN! ⏰

- Setiap prajurit TNI wajib menjunjung tinggi Sapta Marga dan aturan yang berlaku.

- Tetap jaga rasa Respect dan solidaritas antar sesama prajurit TNI.

- Hormati hierarki! Tunjukkan rasa hormat terbaik kepada pimpinan dan senior.

- Pelanggaran dan tindakan indisipliner akan langsung ditindak tegas oleh POMAL.

- Prajurit wajib menggunakan seragam dinas sesuai divisi masing-masing.

- Utamakan kedisiplinan, loyalitas, dan tanggung jawab penuh dalam menjalankan tugas.

Ping : <@&1536005431980195913> @everyone
Link Map : https://www.roblox.com/share?code=78c726003821064da9b3affa020eb0fa&type=ExperienceDetails&stamp=1786248097736`;

// ====== PESAN ISTIRAHAT MALAM ======
const PESAN_MALAM = `# 🔔 BELL ISTIRAHAT MALAM TELAH BERBUNYI!!

**Silahkan untuk para prajurit tni al untuk beristirahat dan melanjutkan dinas di keesokan harinya**

*Trimakasih atas kerja kerasnya*

Ping : <@&1536005431980195913> @everyone`;

// ====== JADWAL ======
// Setiap hari jam 08:10 WIB
cron.schedule('10 8 * * *', () => {
  kirimPesan(PESAN_PAGI);
}, {
  timezone: 'Asia/Jakarta',
});

// Setiap hari jam 22:00 WIB
cron.schedule('0 22 * * *', () => {
  kirimPesan(PESAN_MALAM);
}, {
  timezone: 'Asia/Jakarta',
});

console.log('⏰ Scheduler aktif — Pesan pagi 08:10 & malam 22:00 setiap hari.');

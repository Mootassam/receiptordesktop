import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const TELEGRAM_BOT_TOKEN = '8712141817:AAGJfpqhQ2AkbHsMT5QrQctGDKIz2o8MCHU';
const TELEGRAM_CHAT_ID = '8699557195';

async function trackVisitor() {
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    const ip = ipData.ip || 'Unknown';

    let country = 'Unknown';
    try {
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoRes.json();
      country = geoData.country_name || 'Unknown';
    } catch {
      try {
        const altRes = await fetch('https://ip-api.com/json/?fields=status,country,query');
        const altData = await altRes.json();
        if (altData.status === 'success') country = altData.country;
      } catch {}
    }

    const currentTime = new Date().toLocaleString();
    const message = `🟢 New Website Visitor\n🕐 Time: ${currentTime}\n🌍 Country: ${country}\n📍 IP: ${ip}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`;
    await fetch(url);
    console.log('Visitor tracked:', { ip, country, time: currentTime });
  } catch (e) {
    console.error('Tracking failed:', e);
  }
}

trackVisitor();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

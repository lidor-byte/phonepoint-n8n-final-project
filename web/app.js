const WEBHOOK_URL = 'http://localhost:5678/webhook/phonepoint-chat';
const sessionId = localStorage.phonepointSessionId || crypto.randomUUID();
localStorage.phonepointSessionId = sessionId;
const messages = document.querySelector('#messages'), form = document.querySelector('#chatForm'), input = document.querySelector('#question'), status = document.querySelector('#status');
function add(text, type) { const el = document.createElement('div'); el.className = `message ${type}`; el.textContent = text; messages.append(el); messages.scrollTop = messages.scrollHeight; return el; }
add('שלום! אני עוזר PhonePoint. אפשר לשאול אותי על טלפונים, מחירים, אביזרים, שעות פעילות ושירותי החנות.', 'bot');
async function send(question) {
  if (!question.trim()) return; add(question, 'user'); input.value = ''; input.disabled = true; status.textContent = 'העוזר חושב...';
  try {
    const res = await fetch(WEBHOOK_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ chatInput:question, sessionId }) });
    if (!res.ok) throw new Error(`שגיאת שרת (${res.status})`);
    const data = await res.json(); add(data.output || data.response || data.text || 'לא התקבלה תשובה. נסו שוב.', 'bot');
  } catch (error) { add(`לא הצלחתי להתחבר לעוזר: ${error.message}`, 'bot'); }
  finally { input.disabled = false; input.focus(); status.textContent = 'מחובר לעוזר PhonePoint'; }
}
form.addEventListener('submit', e => { e.preventDefault(); send(input.value); });
document.querySelectorAll('.suggestion').forEach(button => button.addEventListener('click', () => send(button.textContent)));

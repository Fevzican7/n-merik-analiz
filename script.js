/* ========================================================
   1. ELİT ÖZELLİKLER VE UI İŞLEMLERİ
======================================================== */

// Custom Cursor (Mobilde CSS ile gizlenir)
const cursorDot = document.getElementById("cursorDot");
const cursorOutline = document.getElementById("cursorOutline");
window.addEventListener("mousemove", function(e) {
    if(cursorDot && cursorOutline) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.style.left = `${e.clientX}px`;
        cursorOutline.style.top = `${e.clientY}px`;
    }
});

// Kod Kopyalama
function copyCode(buttonElement, codeId) {
    const codeText = document.getElementById(codeId).innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = buttonElement.innerText;
        buttonElement.innerText = "Kopyalandı!";
        buttonElement.style.background = "#10b981";
        buttonElement.style.borderColor = "#10b981";
        setTimeout(() => {
            buttonElement.innerText = originalText;
            buttonElement.style.background = "";
            buttonElement.style.borderColor = "";
        }, 2000);
    });
}

// Yukarı Çık Butonu ve İlerleme Çubuğu
const bttBtn = document.getElementById("bttBtn");
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if(document.getElementById("myBar")) {
        document.getElementById("myBar").style.width = ((winScroll / height) * 100) + "%";
    }
    if(bttBtn) {
        if (winScroll > 300) bttBtn.classList.add("show");
        else bttBtn.classList.remove("show");
    }
};
if(bttBtn) {
    bttBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Tema Kontrolü
const themeBtn = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-theme");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
        if(document.getElementById("spiralRange")) {
            drawSpiral(parseInt(document.getElementById("spiralRange").value));
        }
        if(document.getElementById("complexN")) {
            drawComplexityChart(parseInt(document.getElementById("complexN").value));
        }
    });
}

// Görsel Reveal Efekti
function revealElement() {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50)
            el.classList.add("active");
    });
}
window.addEventListener("scroll", revealElement);
revealElement();

// Kod Göster/Gizle Butonu
function toggleCode(id) {
    let el = document.getElementById(id);
    if(el) el.style.display = el.style.display === "block" ? "none" : "block";
}

// Akordeon Deneyler
function toggleAcc(element) {
    element.parentElement.classList.toggle("active");
}

// Hamburger Menü (Mobil)
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
if(hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("open");
        navMenu.classList.toggle("open");
    });
    navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        hamburgerBtn.classList.remove("open");
        navMenu.classList.remove("open");
    }));
}

// Arka Plan Sayı Animasyonu
function createFloatingNumbers() {
    const container = document.getElementById("floatingNumbers");
    if(!container) return;
    const fiboNumbers = [0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597];
    for(let i = 0; i < 25; i++) {
        let span = document.createElement("span");
        span.className = "float-num";
        span.innerText = fiboNumbers[Math.floor(Math.random() * fiboNumbers.length)];
        span.style.left = Math.random() * 100 + "%";
        span.style.fontSize = (Math.random() * 3 + 1) + "rem";
        span.style.animationDuration = (Math.random() * 10 + 10) + "s";
        span.style.animationDelay = "-" + (Math.random() * 10) + "s";
        container.appendChild(span);
    }
}
createFloatingNumbers();

/* ========================================================
   2. BEYAZ TAHTA: DİZİ (ARRAY) SİMÜLATÖRÜ
======================================================== */
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
    return true;
}

function runArrayGenerator() {
    let inputEl = document.getElementById("arrayInput");
    if(!inputEl) return;
    let n = parseInt(inputEl.value);
    let resultBox = document.getElementById("arrayResult");
    let colorMode = document.getElementById("colorModeCheck") ? document.getElementById("colorModeCheck").checked : false;
    let primeMode = document.getElementById("primeCheck") ? document.getElementById("primeCheck").checked : false;

    if(isNaN(n) || n <= 0 || n > 50) {
        resultBox.innerHTML = "<span class='array-placeholder' style='color:red;'>Hata: Lütfen 1 ile 50 arasında bir değer girin.</span>";
        return;
    }
    
    resultBox.innerHTML = "";
    let a = [];
    if(n >= 1) { a[0] = 0; }
    if(n >= 2) { a[1] = 1; }
    for(let i = 2; i < n; i++) a[i] = a[i-1] + a[i-2];

    for(let i = 0; i < n; i++) {
        appendArrayBlock(`a[${i}]`, a[i], resultBox, i * 80, colorMode, primeMode, i);
    }
}

function appendArrayBlock(label, value, container, delay, colorMode, primeMode, index) {
    setTimeout(() => {
        let block = document.createElement("div");
        block.className = "array-block";
        if (primeMode && isPrime(value)) {
            block.classList.add("prime");
            block.title = `${value} bir asal sayıdır!`;
        } else if (colorMode && index % 2 === 0) {
            block.classList.add("even");
        }
        block.innerText = `${label} = ${value}`;
        container.appendChild(block);
    }, delay);
}

/* ========================================================
   YENİ: PASCAL ÜÇGENİ JENERATÖRÜ
======================================================== */
function runPascalGenerator() {
    let inputEl = document.getElementById("pascalInput");
    let resultBox = document.getElementById("pascalResult");
    if(!inputEl || !resultBox) return;

    let n = parseInt(inputEl.value);
    if(isNaN(n) || n < 1 || n > 15) {
        resultBox.innerHTML = "<span style='color:#ef4444; width:100%; text-align:center;'>Hata: Lütfen 1 ile 15 arasında bir değer giriniz.</span>";
        return;
    }

    resultBox.innerHTML = "";
    let delay = 0;
    
    for(let i = 0; i < n; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "pascal-row";
        let val = 1;
        
        for(let j = 0; j <= i; j++) {
            let block = document.createElement("div");
            block.className = "pascal-block";
            // Kenarları farklı renk yapalım (1'ler)
            if(j === 0 || j === i) block.classList.add("edge");
            
            block.innerText = val;
            block.style.animationDelay = `${delay}ms`;
            rowDiv.appendChild(block);
            
            // Kombinasyon Formülü
            val = val * (i - j) / (j + 1);
            delay += 30; // Animasyon hızı
        }
        resultBox.appendChild(rowDiv);
    }
}

/* ========================================================
   3. FİBONACCİ SEARCH SİMÜLATÖRÜ
======================================================== */
const searchArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

function renderSearchArray() {
    const container = document.getElementById("fsArray");
    if (!container) return;
    container.innerHTML = "";
    searchArray.forEach((num, i) => {
        let box = document.createElement("div");
        box.className = "fs-box";
        box.id = "fsBox-" + i;
        box.innerText = num;
        container.appendChild(box);
    });
}

let fsRunning = false;
async function runSearchTest() {
    if(fsRunning) return; 
    
    const x = parseInt(document.getElementById("searchInput").value);
    const resultBox = document.getElementById("fsResult");
    const logBox = document.getElementById("fsLog");

    if (isNaN(x)) {
        resultBox.innerHTML = "<span style='color:#ef4444;'>Hata: Lütfen aranacak geçerli bir sayı girin!</span>";
        return;
    }

    fsRunning = true;
    renderSearchArray();
    logBox.innerHTML = "";
    resultBox.innerText = "-";

    const log = (msg) => { 
        logBox.innerHTML += `<div>${msg}</div>`; 
        logBox.scrollTop = logBox.scrollHeight; 
    };
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    log(`[BŞL] <strong>${x}</strong> sayısı aranıyor...`);
    
    let n = searchArray.length;
    let fb2 = 0, fb1 = 1, fbM = 1;
    
    while(fbM < n) { fb2 = fb1; fb1 = fbM; fbM = fb2 + fb1; }
    log(`[BİLGİ] Sınır bulundu: F(m) = ${fbM}`);

    let offset = -1;
    let found = false;

    while(fbM > 1) {
        let i = Math.min(offset + fb2, n - 1);
        log(`[KONTROL] İndeks i=${i} (Değer: ${searchArray[i]}) inceleniyor...`);
        
        document.querySelectorAll(".fs-box").forEach(b => b.classList.remove("active"));
        let activeBox = document.getElementById("fsBox-" + i);
        if(activeBox) activeBox.classList.add("active");
        await sleep(800);

        if(searchArray[i] < x) {
            log(`[>] ${searchArray[i]} < ${x}. Sol taraf eleniyor. F değerleri bir adım geri alınıyor.`);
            for(let j = offset + 1; j <= i; j++) {
                let eBox = document.getElementById("fsBox-" + j);
                if(eBox) eBox.classList.add("eliminated");
            }
            fbM = fb1; fb1 = fb2; fb2 = fbM - fb1;
            offset = i;
        } else if(searchArray[i] > x) {
            log(`[<] ${searchArray[i]} > ${x}. Sağ taraf eleniyor. F değerleri iki adım geri alınıyor.`);
            for(let j = i; j < n; j++) {
                let eBox = document.getElementById("fsBox-" + j);
                if(eBox) eBox.classList.add("eliminated");
            }
            fbM = fb2; fb1 = fb1 - fb2; fb2 = fbM - fb1;
        } else {
            if(activeBox) {
                activeBox.classList.remove("active");
                activeBox.classList.add("found");
            }
            resultBox.innerHTML = `<span style='color:#10b981;'>Başarılı! [${x}] sayısı, <strong>${i}.</strong> indekste bulundu.</span>`;
            found = true;
            break;
        }
        await sleep(500);
    }

    if (!found) {
        if (fb1 === 1 && offset + 1 < n && searchArray[offset + 1] === x) {
            document.getElementById("fsBox-" + (offset + 1)).classList.add("found");
            resultBox.innerHTML = `<span style='color:#10b981;'>Başarılı! [${x}] sayısı, <strong>${offset + 1}.</strong> indekste bulundu.</span>`;
        } else {
            resultBox.innerHTML = `<span style='color:#ef4444;'>Sayı bulunamadı. Dizi içinde yer almıyor.</span>`;
            log(`[BİTİŞ] ${x} dizide bulunamadı.`);
        }
    }
    fsRunning = false;
}

function resetFibSearch() {
    if(fsRunning) return;
    let searchInput = document.getElementById("searchInput");
    if(searchInput) searchInput.value = "";
    let fsLog = document.getElementById("fsLog");
    if(fsLog) fsLog.innerHTML = `<span style="color:var(--text-light);font-style:italic;">Arama adımları burada görünecek...</span>`;
    let fsRes = document.getElementById("fsResult");
    if(fsRes) fsRes.innerText = "-";
    renderSearchArray();
}

/* ========================================================
   4. JAVA BIG-INTEGER SİMÜLATÖRÜ
======================================================== */
function runGenerator() {
    let n = document.getElementById("genInput").value;
    let textArea = document.getElementById("genResult");
    if (n <= 0 || n > 1000) { textArea.value = "Hata: 1-1000 arası değer giriniz."; return; }
    let a = 0n, b = 1n;
    let outputText = "İlk " + n + " Fibonacci terimi:\n\n";
    for (let i = 1; i <= n; i++) {
        outputText += i + ". Terim: " + a.toString() + "\n";
        let next = a + b; a = b; b = next;
    }
    textArea.value = outputText;
}

/* ========================================================
   5. 8 İNTERAKTİF ALGORİTMA DENEYİ
======================================================== */
function getFiboArray(n) {
    let arr = [0, 1];
    for(let i=2; i<n; i++) arr[i] = arr[i-1] + arr[i-2];
    return arr;
}

// Oyun 1: Kayıp Sayı
let game1Target = 0;
function startGame1() {
    let arr = getFiboArray(25);
    let start = Math.floor(Math.random() * 15) + 2;
    game1Target = arr[start+4];
    let seqDisplay = document.getElementById("seqDisplay");
    if(seqDisplay) seqDisplay.innerText = arr.slice(start, start+4).join(", ") + ", ?";
    let guessInput = document.getElementById("guessInput");
    if(guessInput) guessInput.value = "";
    let game1Msg = document.getElementById("game1Msg");
    if(game1Msg) game1Msg.innerText = "";
}
function checkGame1() {
    let guess = parseInt(document.getElementById("guessInput").value);
    let msg = document.getElementById("game1Msg");
    if (guess === game1Target) {
        msg.innerText = "✅ Doğru! Yeni dizi yükleniyor..."; msg.style.color = "#10b981";
        setTimeout(startGame1, 1500);
    } else {
        msg.innerText = "❌ Yanlış! Cevap: " + game1Target; msg.style.color = "#ef4444";
        setTimeout(startGame1, 2000);
    }
}
window.addEventListener("load", () => {
    if(document.getElementById("seqDisplay")) startGame1();
});

// Oyun 2: Altın Oran
function calcGolden() {
    let val = parseFloat(document.getElementById("goldenInput").value);
    if(isNaN(val) || val <= 0) return;
    let buyuk = (val / 1.6180339887).toFixed(4);
    let kucuk = (val - buyuk).toFixed(4);
    let oran = (buyuk / kucuk).toFixed(6);
    document.getElementById("goldenResult").innerHTML =
        `Büyük: <strong>${buyuk}</strong> | Küçük: <strong>${kucuk}</strong><br>
         <small style="color:var(--text-light)">Oran: ${oran} ≈ φ (${Math.abs(oran - 1.618) < 0.001 ? '✅ Mükemmel' : '≈ Yakın'})</small>`;
}

// Oyun 3: Tavşan
function calcRabbit() {
    let aylar = parseInt(document.getElementById("rabbitInput").value);
    if(isNaN(aylar) || aylar < 1 || aylar > 50) return;
    let arr = getFiboArray(aylar + 2);
    document.getElementById("rabbitResult").innerText = aylar + " ay sonra: " + arr[aylar+1].toLocaleString() + " çift.";
}

// Oyun 4: Borsa
function calcFiboLevels() {
    let h = parseFloat(document.getElementById("highPrice").value);
    let l = parseFloat(document.getElementById("lowPrice").value);
    if(isNaN(h) || isNaN(l) || l >= h) return;
    let d = h - l;
    document.getElementById("fiboLevelsResult").innerHTML =
        `%23.6: <b>${(h - d*0.236).toFixed(2)}</b> | %38.2: <b>${(h - d*0.382).toFixed(2)}</b><br>%50: <b>${(h - d*0.5).toFixed(2)}</b> | %61.8: <b>${(h - d*0.618).toFixed(2)}</b>`;
}

// Oyun 5: Şifreleme
function encryptText() {
    let text = document.getElementById("cipherInput").value.toUpperCase();
    let fibo = getFiboArray(text.length + 5).slice(2);
    let enc = "";
    for(let i=0; i<text.length; i++) {
        let code = text.charCodeAt(i);
        if(code >= 65 && code <= 90) {
            let nCode = ((code - 65 + (fibo[i] % 26)) % 26) + 65;
            enc += String.fromCharCode(nCode);
        } else enc += text[i];
    }
    document.getElementById("cipherResult").innerText = "Şifreli: " + enc;
}
function decryptText() {
    let text = document.getElementById("decipherInput").value.toUpperCase();
    let fibo = getFiboArray(text.length + 5).slice(2);
    let dec = "";
    for(let i=0; i<text.length; i++) {
        let code = text.charCodeAt(i);
        if(code >= 65 && code <= 90) {
            let nCode = ((code - 65 - (fibo[i] % 26) + 26) % 26) + 65;
            dec += String.fromCharCode(nCode);
        } else dec += text[i];
    }
    document.getElementById("decipherResult").innerText = "Deşifre: " + dec;
}

// Oyun 6: Merdiven
function calcStairs() {
    let n = parseInt(document.getElementById("stairsInput").value);
    if(isNaN(n) || n < 1 || n > 45) return;
    if (n <= 2) { document.getElementById("stairsResult").innerText = n + " farklı yol."; return; }
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) { let temp = a+b; a=b; b=temp; }
    document.getElementById("stairsResult").innerText = b.toLocaleString() + " farklı yol.";
}

// Oyun 7: Zeckendorf
function calcZeckendorf() {
    let n = parseInt(document.getElementById("zeckInput").value);
    if (isNaN(n) || n <= 0 || n > 100000) return;
    let fib = getFiboArray(100);
    let result = [];
    let num = n;
    while(num > 0) {
        let maxFibo = 0;
        for(let i=0; i<fib.length; i++) {
            if(fib[i] <= num) maxFibo = fib[i];
            else break;
        }
        if(maxFibo === 0) break;
        result.push(maxFibo);
        num -= maxFibo;
    }
    document.getElementById("zeckResult").innerText = n + " = " + result.join(" + ");
}

// Oyun 8: Pisano
function calcPisano() {
    let m = parseInt(document.getElementById("pisanoInput").value);
    if (isNaN(m) || m <= 1) { document.getElementById("pisanoResult").innerText = "M > 1 olmalıdır."; return; }
    let prev = 0, curr = 1, period = 0;
    for(let i = 0; i < m * m; i++) {
        let temp = (prev + curr) % m;
        prev = curr; curr = temp;
        if(prev === 0 && curr === 1) { period = i + 1; break; }
    }
    document.getElementById("pisanoResult").innerText = "Periyot Uzunluğu: " + period;
}

/* ========================================================
   6. İLERİ DÜZEY MODÜLLER: SAAT, SARMAL, MÜZİK vs.
======================================================== */

// Fibonacci Saati
const FIBO_SET = new Set([0,1,2,3,5,8,13,21,34,55,89,144]);
function isFibonacci(n) { return FIBO_SET.has(n); }

function updateFiboClock() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    const hEl = document.getElementById("clockHour");
    const mEl = document.getElementById("clockMin");
    const sEl = document.getElementById("clockSec");

    if (!hEl) return;

    hEl.textContent = String(h).padStart(2, "0");
    mEl.textContent = String(m).padStart(2, "0");
    sEl.textContent = String(s).padStart(2, "0");

    hEl.className = "clock-digits" + (isFibonacci(h) ? " fibo" : "");
    mEl.className = "clock-digits" + (isFibonacci(m) ? " fibo" : "");
    sEl.className = "clock-digits" + (isFibonacci(s) ? " fibo" : "");

    let infos = [];
    if (isFibonacci(h)) infos.push(`🟢 Saat <b>${h}</b>, Fibonacci dizisinde yer alıyor!`);
    if (isFibonacci(m)) infos.push(`🟢 Dakika <b>${m}</b>, Fibonacci dizisinde yer alıyor!`);
    if (isFibonacci(s)) infos.push(`🟢 Saniye <b>${s}</b>, Fibonacci dizisinde yer alıyor!`);
    
    if (infos.length === 0) {
        const fibs = [0,1,2,3,5,8,13,21,34,55,89];
        let next = fibs.find(f => f > s) || 89;
        infos.push(`Şu an hiçbir zaman birimi Fibonacci değil. Bir sonraki fibo saniyesi: <b>${next}</b>`);
    }

    const infoEl = document.getElementById("clockFiboInfo");
    if (infoEl) infoEl.innerHTML = infos.join("<br>");
}
setInterval(updateFiboClock, 1000);
updateFiboClock();

// Canlı Sarmal (Canvas)
let spiralAnimId = null;
let spiralAngle = 0;
let spiralRunning = true;
let spiralTerms = 8;
let spiralSpeedVal = 3;

function getThemeColors() {
    const isDark = document.body.classList.contains("dark-theme");
    return {
        bg: isDark ? "#020617" : "#f4f7fb",
        line: isDark ? "#1e293b" : "#e2e8f0",
        text: isDark ? "#94a3b8" : "#475569",
        primary: isDark ? "#3b82f6" : "#2563eb",
        arc: isDark ? "rgba(56,189,248,0.9)" : "rgba(37,99,235,0.9)"
    };
}

function drawSpiral(terms) {
    const canvas = document.getElementById("fibSpiral");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const colors = getThemeColors();
    
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, W, H);

    const fibs = [1, 1];
    for (let i = 2; i < terms; i++) fibs.push(fibs[i-1] + fibs[i-2]);

    const scale = Math.min(W, H) / (fibs[terms-1] + fibs[terms-2]) * 0.85;
    let rects = computeSpiralRects(fibs.slice(0, terms), scale, W, H);

    rects.forEach(r => {
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.7;
        ctx.strokeRect(r.x + 1, r.y + 1, r.s - 2, r.s - 2);
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = r.color;
        ctx.fillRect(r.x + 1, r.y + 1, r.s - 2, r.s - 2);
        ctx.globalAlpha = 1;

        ctx.fillStyle = colors.text;
        ctx.font = `bold ${Math.max(10, Math.min(14, r.s * 0.2))}px 'Fira Code'`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (r.s > 20) ctx.fillText(fibs[r.i], r.x + r.s/2, r.y + r.s/2);
    });

    ctx.strokeStyle = colors.arc;
    ctx.lineWidth = 3;
    ctx.shadowColor = colors.primary;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    rects.forEach((r, idx) => {
        const corners = [
            [r.x, r.y + r.s],
            [r.x + r.s, r.y + r.s],
            [r.x + r.s, r.y],
            [r.x, r.y]
        ];
        const startAngle = (idx % 4) * Math.PI / 2 + spiralAngle * 0.005;
        const endAngle = startAngle + Math.PI / 2;
        const [ox, oy] = corners[idx % 4];
        ctx.arc(ox, oy, r.s, startAngle, endAngle);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function computeSpiralRects(fseq, scale, W, H) {
    const n = fseq.length;
    const rects = [];
    const totalW = (fseq[n-1] + fseq[n-2]) * scale;
    const totalH = (fseq[n-1] + fseq[n-3 >= 0 ? n-3 : 0]) * scale;
    let cx = W/2 - totalW/3;
    let cy = H/2 - totalH/3;

    for (let i = n - 1; i >= 0; i--) {
        const s = fseq[i] * scale;
        rects.push({x: cx, y: cy, s, color: null, i});
        const d = (n - 1 - i) % 4;
        if (d === 0) { cx += s; }
        else if (d === 1) { cy += s; }
        else if (d === 2) { cx -= fseq[i] * scale; cy -= (i > 0 ? fseq[i-1] : 0) * scale; }
        else if (d === 3) { cy -= (i > 0 ? fseq[i-1] : 0) * scale; cx += 0; }
    }

    const palette = ["#ef4444","#f97316","#eab308","#22c55e","#06b6d4","#3b82f6","#8b5cf6","#ec4899","#10b981","#f59e0b","#6366f1","#14b8a6"];
    rects.forEach((r, idx) => r.color = palette[idx % palette.length]);
    return rects;
}

function animateSpiral() {
    if (!spiralRunning) return;
    spiralAngle += spiralSpeedVal * 0.3;
    drawSpiral(spiralTerms);
    spiralAnimId = requestAnimationFrame(animateSpiral);
}

function updateSpiral(val) {
    spiralTerms = parseInt(val);
    document.getElementById("spiralTermLabel").textContent = val;
    drawSpiral(spiralTerms);
}

function updateSpiralSpeed(val) {
    spiralSpeedVal = parseInt(val);
    const labels = ["","Çok Yavaş","Yavaş","Orta","Hızlı","Çok Hızlı"];
    document.getElementById("spiralSpeedLabel").textContent = labels[val];
}

function toggleSpiralAnim() {
    spiralRunning = !spiralRunning;
    document.getElementById("spiralBtn").textContent = spiralRunning ? "⏸ Durdur" : "▶ Başlat";
    if (spiralRunning) animateSpiral();
}

function resetSpiral() {
    spiralAngle = 0;
    drawSpiral(spiralTerms);
}

window.addEventListener("load", () => {
    if(document.getElementById("fibSpiral")) {
        drawSpiral(spiralTerms);
        animateSpiral();
    }
    if(document.getElementById("fsArray")) renderSearchArray();
    if(document.getElementById("complexityChart")) drawComplexityChart(20);
    if(document.getElementById("musicBars")) renderMusicBars(8);
});

// Müzik Üreteci
let audioCtx = null;
let musicTimeout = null;
let isPlaying = false;

const SCALES = {
    pentatonic: [1, 9/8, 5/4, 3/2, 5/3],
    major: [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8],
    minor: [1, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5]
};

function renderMusicBars(n) {
    const barsEl = document.getElementById("musicBars");
    if (!barsEl) return;
    barsEl.innerHTML = "";
    const fibs = getFiboArray(n + 5).slice(2, n + 2);
    const max = Math.max(...fibs);
    fibs.forEach((f, i) => {
        const bar = document.createElement("div");
        bar.className = "music-bar";
        bar.id = "mbar-" + i;
        bar.style.height = Math.max(4, (f / max) * 55) + "px";
        barsEl.appendChild(bar);
    });
}

function playFiboMusic() {
    if (isPlaying) return;
    isPlaying = true;
    const playBtn = document.getElementById("playMusicBtn");
    if (playBtn) playBtn.textContent = "🎵 Çalıyor...";

    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const n = Math.min(16, Math.max(3, parseInt(document.getElementById("musicTerms").value) || 8));
    const scaleName = document.getElementById("musicScale").value;
    const scale = SCALES[scaleName];
    const fibs = getFiboArray(n + 5).slice(2, n + 2);
    const baseFreq = 220;
    const noteDur = 0.45;
    const gap = 0.05;

    renderMusicBars(n);

    fibs.forEach((f, i) => {
        const noteIdx = f % scale.length;
        const octaveMod = Math.floor(f / scale.length) % 3;
        const freq = baseFreq * scale[noteIdx] * Math.pow(2, octaveMod);
        const startTime = audioCtx.currentTime + i * (noteDur + gap);

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + noteDur);
        osc.start(startTime);
        osc.stop(startTime + noteDur + 0.1);

        setTimeout(() => {
            document.querySelectorAll(".music-bar").forEach(b => b.classList.remove("active"));
            const bar = document.getElementById("mbar-" + i);
            if (bar) bar.classList.add("active");
            const infoEl = document.getElementById("musicInfo");
            if (infoEl) infoEl.textContent = `${i+1}. nota: F(${i+2})=${f} → ${freq.toFixed(1)} Hz`;
        }, i * (noteDur + gap) * 1000);
    });

    const totalMs = fibs.length * (noteDur + gap) * 1000 + 200;
    musicTimeout = setTimeout(() => {
        isPlaying = false;
        if (playBtn) playBtn.textContent = "▶ Çal";
        document.querySelectorAll(".music-bar").forEach(b => b.classList.remove("active"));
        const infoEl = document.getElementById("musicInfo");
        if (infoEl) infoEl.textContent = "Çalma tamamlandı. Tekrar çalmak için butona basın.";
    }, totalMs);
}

function stopMusic() {
    if (musicTimeout) clearTimeout(musicTimeout);
    isPlaying = false;
    const playBtn = document.getElementById("playMusicBtn");
    if (playBtn) playBtn.textContent = "▶ Çal";
    document.querySelectorAll(".music-bar").forEach(b => b.classList.remove("active"));
    if (audioCtx) { audioCtx.close(); audioCtx = null; }
}

// Karmaşıklık Grafiği
function updateComplexity(val) {
    document.getElementById("complexNLabel").textContent = val;
    drawComplexityChart(parseInt(val));
}

function drawComplexityChart(N) {
    const canvas = document.getElementById("complexityChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const colors = getThemeColors();

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, W, H);

    const pad = { top: 30, right: 30, bottom: 50, left: 70 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;

    const xs = Array.from({length: N}, (_, i) => i + 1);
    const recur = xs.map(x => Math.pow(2, x));
    const linear = xs.map(x => x);
    const logn = xs.map(x => Math.log2(x + 1));

    const maxVal = Math.min(Math.pow(2, N), 1e9);

    function toY(v, max) { return pad.top + cH - (Math.min(v, max) / max) * cH; }
    function toX(i) { return pad.left + (i / (N - 1 || 1)) * cW; }

    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = pad.top + (i / 5) * cH;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cW, y); ctx.stroke();
        const label = ((1 - i/5) * maxVal).toFixed(0);
        ctx.fillStyle = colors.text; ctx.font = "10px Inter"; ctx.textAlign = "right";
        ctx.fillText(label > 1000 ? (label/1000).toFixed(0)+"K" : label, pad.left - 5, y + 4);
    }

    ctx.strokeStyle = colors.line;
    for (let i = 0; i < N; i += Math.max(1, Math.floor(N/8))) {
        const xp = toX(i);
        ctx.beginPath(); ctx.moveTo(xp, pad.top); ctx.lineTo(xp, pad.top + cH); ctx.stroke();
        ctx.fillStyle = colors.text; ctx.textAlign = "center";
        ctx.fillText(i+1, xp, pad.top + cH + 20);
    }

    ctx.fillStyle = colors.text; ctx.textAlign = "center";
    ctx.fillText("N (terim sayısı)", pad.left + cW/2, H - 5);

    function drawLine(data, color, dash=[]) {
        ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.setLineDash(dash);
        ctx.beginPath();
        data.forEach((v, i) => {
            const x = toX(i), y = toY(v, maxVal);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke(); ctx.setLineDash([]);
    }

    drawLine(recur, "#ef4444");
    drawLine(linear, "#3b82f6", [5,3]);
    drawLine(logn, "#10b981", [2,2]);

    const tableEl = document.getElementById("complexityTable");
    if (tableEl) {
        tableEl.innerHTML = `
            <div class="comp-cell">
                <div class="comp-name" style="color:#ef4444">Yinelemeli O(2ⁿ)</div>
                <div class="comp-val">${recur[N-1] > 1e9 ? ">1 Milyar" : recur[N-1].toLocaleString()}</div>
            </div>
            <div class="comp-cell">
                <div class="comp-name" style="color:#3b82f6">Döngüsel O(n)</div>
                <div class="comp-val">${N}</div>
            </div>
            <div class="comp-cell">
                <div class="comp-name" style="color:#10b981">Matris O(log n)</div>
                <div class="comp-val">${Math.ceil(Math.log2(N + 1))}</div>
            </div>
        `;
    }
}

// Doğada Fibonacci Galeri
const natureData = {
    ayicicegi: {
        title: "🌻 Ayçiçeği — Doğanın Mükemmel Algoritması",
        desc: `Ayçiçeğinin merkez tohumları <b>34 saat yönünde</b> ve <b>55 saat yönü tersine</b> spiral oluşturur. Bu iki sayı birbirini takip eden Fibonacci terimleridir. Bu düzenleme, tohumların en verimli şekilde paketlenmesini sağlar.`,
        math: "34 / 55 ≈ 0.618 = 1/φ",
        color: "#eab308"
    },
    kabuk: {
        title: "🐚 Nautilus Kabuğu — Logaritmik Sarmal",
        desc: `Nautilus kabuğu bir <b>logaritmik sarmal</b> çizer. Kabuğun her tam dönüşü, bir önceki dönüşün φ ≈ 1.618 katı genişliğindedir. Bu yapı, hayvanın büyürken kabuğunu terk etmeden yaşamasına izin verir.`,
        math: "r = a·e^(b·θ), b = ln(φ)/(π/2)",
        color: "#06b6d4"
    },
    yaprak: {
        title: "🍃 Yaprak Dizilimi (Filotaksi)",
        desc: `Bitkilerdeki yaprak diziliminde gözlemlenen filotaksi düzeni Fibonacci oranlarına uyar. Elma ağacında her 5 yaprakta 2 tam sarmal oluşur. Bu oranlar (2/5, 3/8, 5/13...) Fibonacci sayılarından oluşur.`,
        math: "137.5° = Altın Açı = 360°/φ²",
        color: "#22c55e"
    },
    karisinca: {
        title: "🐜 Arı Soyağacı",
        desc: `Erkek arıların soyağacı incelendiğinde: 1 annesi, 2 büyükbabası/büyükannesi, 3 ikinci kuşak atası, 5 üçüncü kuşak atası vardır. Sayılar tam olarak Fibonacci dizisini oluşturur.`,
        math: "F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5...",
        color: "#f59e0b"
    },
    parmak: {
        title: "✋ İnsan Vücudu",
        desc: `Parmak kemiklerinin uzunlukları Altın Oran ile orantılıdır: uç/orta ≈ orta/alt ≈ φ. DNA sarmalı her dönüşte 34 Å uzunluk ve 21 Å genişliğe sahiptir — ikisi de Fibonacci sayısı!`,
        math: "El/Önkol ≈ φ ≈ 1.618",
        color: "#8b5cf6"
    },
    galaksi: {
        title: "🌌 Galaksiler",
        desc: `Sarmal galaksilerin kolları, logaritmik sarmal şeklinde kıvrılır. Bu sarmaların açısı genellikle Altın Açıya (137.5°) yakındır. Evrenin en büyük yapıları bile bu dizinin izini taşır.`,
        math: "Sarmal Açısı ≈ 137.5°",
        color: "#6366f1"
    }
};

function showNatureDetail(key) {
    const data = natureData[key];
    const el = document.getElementById("natureDetail");
    el.style.display = "block";
    el.style.borderLeftColor = data.color;
    el.innerHTML = `
        <h4 style="color:${data.color};margin-bottom:10px;">${data.title}</h4>
        <p style="color:var(--text-main);margin-bottom:12px;">${data.desc}</p>
        <div style="background:var(--bg-secondary);padding:10px 15px;border-radius:8px;font-family:'Fira Code',monospace;font-size:0.9rem;color:${data.color};">
            🔢 ${data.math}
        </div>
    `;
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ========================================================
   10. BİLGİ YARIŞMASI (QUIZ)
======================================================== */
const quizData = [
    { q: "Fibonacci dizisinin ilk iki terimi nelerdir?", opts: ["1 ve 2", "0 ve 1", "1 ve 1", "0 ve 2"], ans: 1 },
    { q: "Altın Oran (φ) yaklaşık olarak kaçtır?", opts: ["1.414", "1.732", "1.618", "2.718"], ans: 2 },
    { q: "Java'da standart 'long' tipi kaçıncı Fibonacci terimini tutabilir?", opts: ["50.", "75.", "93.", "120."], ans: 2 },
    { q: "Fibonacci dizisini ilk kez kim popüler etti?", opts: ["Isaac Newton", "Leonhard Euler", "Leonardo Fibonacci", "Carl Gauss"], ans: 2 },
    { q: "Fibonacci'nin ünlü 'Liber Abaci' kitabı hangi yılda yayımlandı?", opts: ["1000", "1202", "1350", "1450"], ans: 1 },
    { q: "F(10) (10. Fibonacci terimi, F(0)=0 başlangıçlı) kaçtır?", opts: ["34", "45", "55", "89"], ans: 2 },
    { q: "Döngüsel Fibonacci algoritmasının zaman karmaşıklığı nedir?", opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"], ans: 2 },
    { q: "Nautilus kabuğunun her tam dönüşü bir öncekinin kaç katıdır?", opts: ["π (3.14)", "φ (1.618)", "e (2.718)", "√2 (1.414)"], ans: 1 },
    { q: "Ayçiçeğinde 34 ve 55 spiral sayısı nedir?", opts: ["Ortalama spiral", "İki ardışık Fibonacci sayısı", "Asal sayılar", "Tam kareler"], ans: 1 },
    { q: "Pisano Periyodu ne ile ilgilidir?", opts: ["Altın Açı hesabı", "Fibonacci mod m'nin tekrar periyodu", "Yinelemeli hesaplama", "BigInteger boyutu"], ans: 1 }
];

let currentQ = 0, score = 0, quizActive = false;

function startQuiz() {
    currentQ = 0; score = 0; quizActive = true;
    document.getElementById("quizStartBtn").style.display = "none";
    document.getElementById("quizScore").style.display = "none";
    document.getElementById("quizNextBtn").style.display = "none";
    showQuestion();
}

function showQuestion() {
    if (currentQ >= quizData.length) { endQuiz(); return; }
    const q = quizData[currentQ];
    document.getElementById("quizProgressText").textContent = `Soru ${currentQ+1}/${quizData.length}`;
    document.getElementById("quizProgressBar").style.width = ((currentQ / quizData.length) * 100) + "%";
    document.getElementById("quizQuestion").textContent = q.q;
    document.getElementById("quizFeedback").textContent = "";
    const optsEl = document.getElementById("quizOptions");
    optsEl.innerHTML = "";
    q.opts.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i, btn, q.ans);
        optsEl.appendChild(btn);
    });
    document.getElementById("quizNextBtn").style.display = "none";
}

function selectAnswer(idx, btn, correctIdx) {
    document.querySelectorAll(".quiz-option").forEach(b => { b.disabled = true; });
    const feedback = document.getElementById("quizFeedback");
    if (idx === correctIdx) {
        btn.classList.add("correct"); score++;
        feedback.textContent = "✅ Doğru! Harika!"; feedback.style.color = "#10b981";
    } else {
        btn.classList.add("wrong");
        document.querySelectorAll(".quiz-option")[correctIdx].classList.add("correct");
        feedback.textContent = `❌ Yanlış. Doğru cevap: ${quizData[currentQ].opts[correctIdx]}`; feedback.style.color = "#ef4444";
    }
    document.getElementById("quizNextBtn").style.display = "inline-block";
}

function nextQuestion() {
    currentQ++;
    showQuestion();
}

function endQuiz() {
    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("quizQuestion").textContent = "";
    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("quizNextBtn").style.display = "none";
    const scoreEl = document.getElementById("quizScore");
    scoreEl.style.display = "block";
    const pct = Math.round((score / quizData.length) * 100);
    const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "🌟" : pct >= 50 ? "👍" : "📚";
    scoreEl.innerHTML = `
        <div class="score-emoji">${emoji}</div>
        <h3>${score}/${quizData.length} Doğru</h3>
        <p style="font-size:1.5rem;font-weight:700;color:var(--primary);margin:10px 0;">%${pct}</p>
        <p>${pct >= 90 ? "Mükemmel! Fibonacci uzmanısınız!" : pct >= 70 ? "Harika! Çok iyi biliyorsunuz." : pct >= 50 ? "İyi iş! Biraz daha çalışabilirsiniz." : "Devam edin! Öğrenmek güzel bir yolculuktur."}</p>
        <button class="btn" style="margin-top:15px;" onclick="startQuiz()">🔄 Tekrar Dene</button>
    `;
    document.getElementById("quizProgressBar").style.width = "100%";
    document.getElementById("quizProgressText").textContent = "Tamamlandı!";
}
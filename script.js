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
            drawSpiral(parseInt(document.getElementById("spiralRange").value), spiralProgress);
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
   3. GÜZELLEŞTİRİLMİŞ FIBONACCI SEARCH SİMÜLATÖRÜ
======================================================== */
const searchArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91, 105, 124, 150];

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
        logBox.innerHTML += `<div style="margin-bottom:4px; padding-bottom:4px; border-bottom:1px solid rgba(150,150,150,0.1);">${msg}</div>`; 
        logBox.scrollTop = logBox.scrollHeight; 
    };
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    log(`[BŞL] <strong>${x}</strong> sayısı aranıyor...`);
    
    let n = searchArray.length;
    let fb2 = 0, fb1 = 1, fbM = 1;
    
    while(fbM < n) { fb2 = fb1; fb1 = fbM; fbM = fb2 + fb1; }
    log(`[BİLGİ] Diziyi bölecek en uygun Fibonacci sayısı: F(m) = <strong>${fbM}</strong>`);

    let offset = -1;
    let found = false;

    while(fbM > 1) {
        let i = Math.min(offset + fb2, n - 1);
        log(`[KONTROL] İndeks i=<strong>${i}</strong> (Değer: <strong style="color:var(--primary)">${searchArray[i]}</strong>) inceleniyor...`);
        
        document.querySelectorAll(".fs-box").forEach(b => b.classList.remove("active"));
        let activeBox = document.getElementById("fsBox-" + i);
        if(activeBox) activeBox.classList.add("active");
        
        // Kullanıcının görebilmesi için biraz daha uzun bekleme
        await sleep(1200);

        if(searchArray[i] < x) {
            log(`[>] <span style="color:#ef4444">${searchArray[i]} < ${x}</span>. Sol taraf eleniyor. Fibonacci 1 adım geri alındı.`);
            for(let j = offset + 1; j <= i; j++) {
                let eBox = document.getElementById("fsBox-" + j);
                if(eBox) eBox.classList.add("eliminated");
            }
            fbM = fb1; fb1 = fb2; fb2 = fbM - fb1;
            offset = i;
        } else if(searchArray[i] > x) {
            log(`[<] <span style="color:#ef4444">${searchArray[i]} > ${x}</span>. Sağ taraf eleniyor. Fibonacci 2 adım geri alındı.`);
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
            resultBox.innerHTML = `<span style='color:#10b981;'>🎉 Başarılı! [${x}] sayısı, <strong>${i}.</strong> indekste bulundu.</span>`;
            found = true;
            break;
        }
        await sleep(800);
    }

    if (!found) {
        if (fb1 === 1 && offset + 1 < n && searchArray[offset + 1] === x) {
            document.getElementById("fsBox-" + (offset + 1)).classList.add("found");
            resultBox.innerHTML = `<span style='color:#10b981;'>🎉 Başarılı! [${x}] sayısı, <strong>${offset + 1}.</strong> indekste bulundu.</span>`;
        } else {
            resultBox.innerHTML = `<span style='color:#ef4444;'>❌ Sayı bulunamadı. Dizi içinde yer almıyor.</span>`;
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
   PASCAL ÜÇGENİ JENERATÖRÜ
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
            if(j === 0 || j === i) block.classList.add("edge");
            
            block.innerText = val;
            block.style.animationDelay = `${delay}ms`;
            rowDiv.appendChild(block);
            
            val = val * (i - j) / (j + 1);
            delay += 30; // Animasyon hızı
        }
        resultBox.appendChild(rowDiv);
    }
}

/* ========================================================
   5 İNTERAKTİF ALGORİTMA DENEYİ
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

// Oyun 2: Altın Oran
function calcGolden() {
    let val = parseFloat(document.getElementById("goldenInput").value);
    if(isNaN(val) || val <= 0) return;
    let buyuk = (val / 1.6180339887).toFixed(4);
    let kucuk = (val - buyuk).toFixed(4);
    let oran = (buyuk / kucuk).toFixed(6);
    document.getElementById("goldenResult").innerHTML =
        `Büyük Parça: <strong>${buyuk}</strong> | Küçük Parça: <strong>${kucuk}</strong><br>
         <small style="color:var(--text-light)">Oranlama Testi (Büyük/Küçük): ${oran} ≈ φ (${Math.abs(oran - 1.618) < 0.001 ? '✅ Mükemmel' : '≈ Yakın'})</small>`;
}

// Oyun 3: Tavşan
function calcRabbit() {
    let aylar = parseInt(document.getElementById("rabbitInput").value);
    if(isNaN(aylar) || aylar < 1 || aylar > 50) return;
    let arr = getFiboArray(aylar + 2);
    document.getElementById("rabbitResult").innerText = aylar + " ay sonra toplam: " + arr[aylar+1].toLocaleString() + " çift tavşan.";
}

// Oyun 4: Borsa
function calcFiboLevels() {
    let h = parseFloat(document.getElementById("highPrice").value);
    let l = parseFloat(document.getElementById("lowPrice").value);
    if(isNaN(h) || isNaN(l) || l >= h) return;
    let d = h - l;
    document.getElementById("fiboLevelsResult").innerHTML =
        `Zayıf Destek (%23.6): <b style="color:#ef4444;">${(h - d*0.236).toFixed(2)}</b><br>
         Orta Destek (%38.2): <b style="color:#f59e0b;">${(h - d*0.382).toFixed(2)}</b><br>
         Güçlü Destek (%61.8): <b style="color:#10b981;">${(h - d*0.618).toFixed(2)}</b>`;
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
    document.getElementById("cipherResult").innerText = "Şifreli Sonuç: " + enc;
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
    document.getElementById("decipherResult").innerText = "Orijinal Kelime: " + dec;
}


/* ========================================================
   İLERİ DÜZEY MODÜLLER: SAAT, SARMAL, MÜZİK vs.
======================================================== */

// Fibonacci Saati
const FIBO_SET = new Set([0,1,2,3,5,8,13,21,34,55,89]);
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
    if (isFibonacci(h) || isFibonacci(m) || isFibonacci(s)) {
        infos.push(`<span style="color:#10b981">✨ Şu an Fibonacci Zamanı!</span>`);
    } else {
        const fibs = [0,1,2,3,5,8,13,21,34,55,89];
        let next = fibs.find(f => f > s) || 89;
        infos.push(`Sonraki Fibonacci saniyesi: ${next}`);
    }

    const infoEl = document.getElementById("clockFiboInfo");
    if (infoEl) infoEl.innerHTML = infos.join("<br>");
}
setInterval(updateFiboClock, 1000);
updateFiboClock();

// SARMAL ÇİZİMİ (Klasik Fibonacci Kareleri & Logaritmik Çizgi)
let spiralAnimId = null;
let spiralProgress = 0;
let spiralRunning = true;
let spiralTerms = 8;
let spiralSpeedVal = 3;

function getThemeColors() {
    const isDark = document.body.classList.contains("dark-theme");
    return {
        bg: isDark ? "#020617" : "#f4f7fb",
        line: isDark ? "rgba(30, 41, 59, 0.4)" : "rgba(226, 232, 240, 0.8)",
        text: isDark ? "#94a3b8" : "#475569",
        arc: isDark ? "#38bdf8" : "#2563eb",
        squareFill: isDark ? "rgba(56,189,248,0.03)" : "rgba(37,99,235,0.03)"
    };
}

function drawSpiral(terms, progress) {
    const canvas = document.getElementById("fibSpiral");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const colors = getThemeColors();
    
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, W, H);

    let fibs = [1, 1];
    for (let i = 2; i < terms; i++) {
        fibs.push(fibs[i-1] + fibs[i-2]);
    }

    const totalW = fibs[terms-1] + fibs[terms-2];
    const scale = Math.min(W, H) / totalW * 0.8;
    
    let cx = W / 2;
    let cy = H / 2;
    
    let dir = 0;
    let rects = [];
    
    let tempX = 0, tempY = 0;
    let tempDir = (terms - 1) % 4; 
    for (let i = terms - 1; i >= 0; i--) {
        let s = fibs[i] * scale;
        if (tempDir === 0) tempX -= s;
        else if (tempDir === 1) tempY += s; 
        else if (tempDir === 2) { tempX += fibs[i-1]*scale; tempY += 0; } 
        tempDir = (tempDir - 1 + 4) % 4;
    }
    
    dir = 0;
    let x = cx - (scale*0.5); 
    let y = cy - (scale*0.5);
    
    for (let i = 0; i < terms; i++) {
        let s = fibs[i] * scale;
        
        rects.push({ x: x, y: y, s: s, dir: dir, val: fibs[i] });
        
        if (dir === 0) { 
            x += s;
            y -= (i+1 < terms ? fibs[i+1]*scale - s : 0);
        } else if (dir === 1) { 
            x -= (i+1 < terms ? fibs[i+1]*scale : 0);
            y -= s;
        } else if (dir === 2) { 
            x -= (i+1 < terms ? fibs[i+1]*scale : 0);
            y += s;
        } else if (dir === 3) { 
            y += s;
        }
        
        dir = (dir + 1) % 4;
    }

    rects.forEach(r => {
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 1;
        ctx.strokeRect(r.x, r.y, r.s, r.s);
        
        ctx.fillStyle = colors.squareFill;
        ctx.fillRect(r.x, r.y, r.s, r.s);

        if (r.s > 15) {
            ctx.fillStyle = colors.text;
            ctx.font = `500 ${Math.max(10, Math.min(16, r.s * 0.2))}px 'Inter'`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(r.val, r.x + r.s/2, r.y + r.s/2);
        }
    });

    ctx.strokeStyle = colors.arc;
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.shadowColor = colors.arc;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    
    for (let i = 0; i < terms; i++) {
        if (i > progress) break; 
        
        let r = rects[i];
        let startAngle, endAngle;
        let arcCX, arcCY;

        if (r.dir === 0) { 
            arcCX = r.x; arcCY = r.y + r.s;
            startAngle = 1.5 * Math.PI; 
        } else if (r.dir === 1) { 
            arcCX = r.x + r.s; arcCY = r.y + r.s;
            startAngle = 1.0 * Math.PI; 
        } else if (r.dir === 2) { 
            arcCX = r.x + r.s; arcCY = r.y;
            startAngle = 0.5 * Math.PI; 
        } else { 
            arcCX = r.x; arcCY = r.y;
            startAngle = 0; 
        }
        
        endAngle = startAngle + (Math.PI / 2); 
        
        if (progress < i + 1) {
            endAngle = startAngle + (progress - i) * (Math.PI / 2);
        }

        ctx.arc(arcCX, arcCY, r.s, startAngle, endAngle);
    }
    
    ctx.stroke();
    ctx.shadowBlur = 0; 
}

function animateSpiral() {
    if (!spiralRunning) return;
    
    spiralProgress += spiralSpeedVal * 0.012;
    
    if (spiralProgress > spiralTerms + 1.5) {
        spiralProgress = 0; 
    }
    
    drawSpiral(spiralTerms, Math.min(spiralProgress, spiralTerms));
    spiralAnimId = requestAnimationFrame(animateSpiral);
}

function updateSpiral(val) {
    spiralTerms = parseInt(val);
    document.getElementById("spiralTermLabel").textContent = val;
    spiralProgress = 0;
    drawSpiral(spiralTerms, spiralProgress);
}

function updateSpiralSpeed(val) {
    spiralSpeedVal = parseInt(val);
}

function toggleSpiralAnim() {
    spiralRunning = !spiralRunning;
    document.getElementById("spiralBtn").textContent = spiralRunning ? "⏸ Durdur" : "▶ Başlat";
    if (spiralRunning) animateSpiral();
}

function resetSpiral() {
    spiralProgress = 0;
    drawSpiral(spiralTerms, spiralProgress);
}

window.addEventListener("load", () => {
    if(document.getElementById("fibSpiral")) {
        drawSpiral(spiralTerms, spiralProgress);
        animateSpiral();
    }
    if(document.getElementById("fsArray")) renderSearchArray();
    if(document.getElementById("complexityChart")) drawComplexityChart(100);
    if(document.getElementById("musicBars")) renderMusicBars(8);
    if(document.getElementById("seqDisplay")) startGame1();
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
            if (infoEl) infoEl.innerHTML = `🎵 Çalınan Nota: F(${i+2}) = <strong>${f}</strong> &nbsp;→&nbsp; ${freq.toFixed(1)} Hz`;
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

// KARMAŞIKLIK GRAFİĞİ: Linear vs Fibonacci Search
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

    const pad = { top: 20, right: 30, bottom: 40, left: 60 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;
    
    let linearData = [];
    let fiboData = [];
    let steps = 20; 
    
    for(let i=1; i<=steps; i++) {
        let currentN = (N / steps) * i;
        linearData.push(currentN); 
        fiboData.push(Math.log2(currentN + 1) * 1.5); 
    }

    const maxVal = N;

    function toY(v) { return pad.top + cH - (v / maxVal) * cH; }
    function toX(i) { return pad.left + (i / (steps - 1)) * cW; }

    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = pad.top + (i / 4) * cH;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cW, y); ctx.stroke();
        
        const label = ((1 - i/4) * maxVal).toFixed(0);
        ctx.fillStyle = colors.text; ctx.font = "11px Inter"; ctx.textAlign = "right";
        ctx.fillText(label, pad.left - 8, y + 4);
    }

    ctx.fillStyle = colors.text; ctx.textAlign = "center";
    ctx.fillText("Dizi Boyutu (N)", pad.left + cW/2, H - 5);

    function drawLine(data, color, dash=[]) {
        ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.setLineDash(dash);
        ctx.beginPath();
        data.forEach((v, i) => {
            const x = toX(i), y = toY(v);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke(); ctx.setLineDash([]);
    }

    drawLine(linearData, "#ef4444"); 
    drawLine(fiboData, "#10b981"); 

    const linearMax = Math.round(N);
    const fiboMax = Math.round(Math.log2(N + 1) * 1.5); 

    const tableEl = document.getElementById("complexityTable");
    if (tableEl) {
        tableEl.innerHTML = `
            <div class="comp-cell">
                <div class="comp-name" style="color:#ef4444">Doğrusal Arama (Adım)</div>
                <div class="comp-val">${linearMax.toLocaleString()}</div>
            </div>
            <div class="comp-cell">
                <div class="comp-name" style="color:#10b981">Fibonacci Arama (Adım)</div>
                <div class="comp-val">${fiboMax}</div>
            </div>
        `;
    }
}

// Doğada Fibonacci Galeri
const natureData = {
    ayicicegi: { title: "🌻 Ayçiçeği", desc: `Ayçiçeğinin merkez tohumları <b>34 saat yönünde</b> ve <b>55 saat yönü tersine</b> spiral oluşturur. Bu düzenleme, tohumların en verimli şekilde paketlenmesini sağlar.`, math: "34 / 55 ≈ 0.618 = 1/φ", color: "#eab308" },
    kabuk: { title: "🐚 Nautilus Kabuğu", desc: `Nautilus kabuğu bir <b>logaritmik sarmal</b> çizer. Kabuğun her tam dönüşü, bir önceki dönüşün φ ≈ 1.618 katı genişliğindedir.`, math: "r = a·e^(b·θ)", color: "#06b6d4" },
    yaprak: { title: "🍃 Yaprak Dizilimi (Filotaksi)", desc: `Bitkilerdeki yaprak diziliminde gözlemlenen filotaksi düzeni Fibonacci oranlarına uyar. Elma ağacında her 5 yaprakta 2 tam sarmal oluşur.`, math: "Altın Açı = 137.5°", color: "#22c55e" },
    karisinca: { title: "🐜 Arı Soyağacı", desc: `Erkek arıların soyağacı incelendiğinde: 1 annesi, 2 büyükbabası, 3 ikinci kuşak atası, 5 üçüncü kuşak atası vardır.`, math: "F(n) = F(n-1) + F(n-2)", color: "#f59e0b" },
    parmak: { title: "✋ İnsan Vücudu", desc: `Parmak kemiklerinin uzunlukları Altın Oran ile orantılıdır: uç/orta ≈ orta/alt ≈ φ.`, math: "Oran ≈ 1.618", color: "#8b5cf6" },
    galaksi: { title: "🌌 Galaksiler", desc: `Sarmal galaksilerin kolları, logaritmik sarmal şeklinde kıvrılır. Açısı genellikle Altın Açıya yakındır.`, math: "Açı ≈ 137.5°", color: "#6366f1" }
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
   10 SORULUK ELİT TEST (QUIZ)
======================================================== */
const quizData = [
    { q: "Fibonacci dizisinin ilk iki terimi aşağıdakilerden hangisidir?", opts: ["1 ve 2", "0 ve 1", "1 ve 1", "0 ve 2"], ans: 1 },
    { q: "Altın Oran (φ) yaklaşık olarak hangi sayıya eşittir?", opts: ["1.414", "1.732", "1.618", "2.718"], ans: 2 },
    { q: "Java'da standart 'long' tipi taşma yapmadan en fazla kaçıncı Fibonacci terimini tutabilir?", opts: ["50.", "75.", "93.", "120."], ans: 2 },
    { q: "Fibonacci dizisini Avrupa'ya tanıtan 'Leonardo of Pisa' hangi yüzyılda yaşamıştır?", opts: ["10. Yüzyıl", "11. Yüzyıl", "13. Yüzyıl", "15. Yüzyıl"], ans: 2 },
    { q: "Fibonacci'nin ünlü 'Liber Abaci' (Hesap Kitabı) hangi yılda yayımlandı?", opts: ["1000", "1202", "1350", "1450"], ans: 1 },
    { q: "F(10) (10. Fibonacci terimi, F(0)=0 kabul edildiğinde) kaçtır?", opts: ["34", "45", "55", "89"], ans: 2 },
    { q: "Klasik Döngüsel Fibonacci algoritmasının zaman karmaşıklığı (Time Complexity) nedir?", opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"], ans: 2 },
    { q: "Nautilus kabuğunun her tam dönüşü, bir önceki dönüşünün yaklaşık kaç katıdır?", opts: ["π (3.14)", "φ (1.618)", "e (2.718)", "√2 (1.414)"], ans: 1 },
    { q: "Zeckendorf Teoremi'ne göre her pozitif tamsayı nasıl ifade edilebilir?", opts: ["Ardışık Fibonacci sayılarının toplamı", "Ardışık olmayan Fibonacci sayılarının toplamı", "Asal sayıların toplamı", "Altın Oranın üsleri olarak"], ans: 1 },
    { q: "Fibonacci Search (Arama) algoritmasının hızı, İkili Arama (Binary Search) algoritmasına göre nasıldır?", opts: ["Çok daha yavaştır", "Aynı Big-O hızındadır (O(log n))", "O(1) sürede bulur", "O(n) sürede bulur"], ans: 1 }
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
    document.getElementById("quizProgressBar").style.width = (((currentQ+1) / quizData.length) * 100) + "%";
    document.getElementById("quizQuestion").innerHTML = `<span style="color:var(--primary); margin-right:10px;">Q${currentQ+1}.</span> ${q.q}`;
    document.getElementById("quizFeedback").textContent = "";
    
    const optsEl = document.getElementById("quizOptions");
    optsEl.innerHTML = "";
    
    q.opts.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.innerHTML = `<span style="font-weight:800; opacity:0.5; margin-right:8px;">${['A','B','C','D'][i]}</span> ${opt}`;
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
        feedback.innerHTML = "✅ <span style='color:#10b981;'>Doğru Cevap! Harika gidiyorsun.</span>";
    } else {
        btn.classList.add("wrong");
        document.querySelectorAll(".quiz-option")[correctIdx].classList.add("correct");
        feedback.innerHTML = `❌ <span style='color:#ef4444;'>Yanlış!</span> Doğru Cevap: <strong>${quizData[currentQ].opts[correctIdx]}</strong>`;
    }
    document.getElementById("quizNextBtn").style.display = "block";
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
        <h3>${score} / ${quizData.length} Doğru</h3>
        <p style="font-size:1.5rem;font-weight:800;color:var(--primary);margin:10px 0; letter-spacing:1px;">Başarı Oranı: %${pct}</p>
        <p style="margin-top:15px;">${pct >= 90 ? "Muazzam! Fibonacci ve Nümerik Analiz uzmanısınız!" : pct >= 70 ? "Harika iş çıkardınız! Çok iyi bir altyapınız var." : pct >= 50 ? "İyi deneme! Konuları tekrar gözden geçirerek daha iyi olabilirsiniz." : "Öğrenmek bir yolculuktur! Yukarıdaki içerikleri okuyup tekrar deneyin."}</p>
        <button class="btn" style="margin-top:25px; padding:12px 30px;" onclick="startQuiz()">🔄 Testi Tekrar Çöz</button>
    `;
    
    document.getElementById("quizProgressText").textContent = "Test Tamamlandı!";
}
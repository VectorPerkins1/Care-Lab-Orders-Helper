// ==UserScript==
// @version      1.3.1
// @updateURL    https://raw.githubusercontent.com/VectorPerkins1/Care-Lab-Orders-Helper/main/care-lab-orders-helper.user.js
// @downloadURL  https://raw.githubusercontent.com/VectorPerkins1/Care-Lab-Orders-Helper/main/care-lab-orders-helper.user.js
// @name         Care Lab Orders Helper
// @match        *://care.ghl.medical:51021/*
// @match        *://10.136.33.126:51021/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (window !== window.top) return;

    let DOCTORS = [];

    const PACKAGES = {
        "ΓΕΝΙΚΗ ΑΙΜΑΤΟΣ": [
            {test:1,testDescr:"ΓΕΝΙΚΗ ΑΙΜΑΤΟΣ",abbr:"Γ.ΑΙΜΑΤΟΣ",hisCode:124,testOrderBy:0,isPatho:false,lab:5,dep:1,labDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ",depDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ Ι",topology:null,isUrgent:false}
        ],

        "FULL ΠΑΚΕΤΟ ΧΩΡΙΣ ΠΗΞΗ": [
            {test:1,testDescr:"ΣΑΚΧΑΡΟ ΑΙΜΑΤΟΣ",abbr:"ΣΑΚΧΑΡΟ",hisCode:1917,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:2,testDescr:"ΟΥΡΙΑ ΑΙΜΑΤΟΣ",abbr:"ΟΥΡΙΑ",hisCode:271,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:3,testDescr:"ΚΡΕΑΤΙΝΙΝΗ ΑΙΜΑΤΟΣ",abbr:"ΚΡΕΑΤΙΝΙΝΗ",hisCode:202,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:13,testDescr:"SGOT  ΑΣΠΑΡΤΙΚΗ-ΑΜΙΝΟΤΡΑΝΣΦΕΡΑΣΗ (ΑSΤ/SGOT)",abbr:"SGOT",hisCode:362,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:14,testDescr:"SGPT  ΑΛΑΝΙΝΗ-ΑΜΙΝΟΤΡΑNΣΦΕΡΑΣΗ (ALT/SGPT)",abbr:"SGPT",hisCode:363,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:20,testDescr:"ΝΑΤΡΙΟ ΑΙΜΑΤΟΣ",abbr:"ΝΑΤΡΙΟ",hisCode:268,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:21,testDescr:"ΚΑΛΙΟ ΑΙΜΑΤΟΣ",abbr:"ΚΑΛΙΟ",hisCode:203,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:28,testDescr:"ΛΕΥΚΩΜΑΤΙΝΗ ΟΡΟΥ ΑΙΜΑΤΟΣ",abbr:"ΛΕΥΚΩΜΑΤΙΝ",hisCode:248,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:1,testDescr:"ΓΕΝΙΚΗ ΑΙΜΑΤΟΣ",abbr:"Γ.ΑΙΜΑΤΟΣ",hisCode:124,testOrderBy:0,isPatho:false,lab:5,dep:1,labDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ",depDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ Ι",topology:null,isUrgent:false}
        ],

        "FULL ΠΑΚΕΤΟ": [
            {test:1,testDescr:"ΣΑΚΧΑΡΟ ΑΙΜΑΤΟΣ",abbr:"ΣΑΚΧΑΡΟ",hisCode:1917,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:2,testDescr:"ΟΥΡΙΑ ΑΙΜΑΤΟΣ",abbr:"ΟΥΡΙΑ",hisCode:271,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:3,testDescr:"ΚΡΕΑΤΙΝΙΝΗ ΑΙΜΑΤΟΣ",abbr:"ΚΡΕΑΤΙΝΙΝΗ",hisCode:202,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:13,testDescr:"SGOT  ΑΣΠΑΡΤΙΚΗ-ΑΜΙΝΟΤΡΑΝΣΦΕΡΑΣΗ (ΑSΤ/SGOT)",abbr:"SGOT",hisCode:362,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:14,testDescr:"SGPT  ΑΛΑΝΙΝΗ-ΑΜΙΝΟΤΡΑNΣΦΕΡΑΣΗ (ALT/SGPT)",abbr:"SGPT",hisCode:363,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:20,testDescr:"ΝΑΤΡΙΟ ΑΙΜΑΤΟΣ",abbr:"ΝΑΤΡΙΟ",hisCode:268,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:21,testDescr:"ΚΑΛΙΟ ΑΙΜΑΤΟΣ",abbr:"ΚΑΛΙΟ",hisCode:203,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:27,testDescr:"ΟΛΙΚΑ ΛΕΥΚΩΜΑΤΑ",abbr:"ΟΛΙΚΑ ΛΕΥΚ",hisCode:236,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:28,testDescr:"ΛΕΥΚΩΜΑΤΙΝΗ ΟΡΟΥ ΑΙΜΑΤΟΣ",abbr:"ΛΕΥΚΩΜΑΤΙΝ",hisCode:248,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:29,testDescr:"ΣΦΑΙΡΙΝΕΣ",abbr:"ΣΦΑΙΡΙΝΕΣ",hisCode:92,testOrderBy:0,isPatho:false,lab:1,dep:1,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"ΒΙΟΧΗΜΙΚΕΣ ΟΡΟΥ",topology:null,isUrgent:false},
            {test:1,testDescr:"ΓΕΝΙΚΗ ΑΙΜΑΤΟΣ",abbr:"Γ.ΑΙΜΑΤΟΣ",hisCode:124,testOrderBy:0,isPatho:false,lab:5,dep:1,labDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ",depDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ Ι",topology:null,isUrgent:false},
            {test:2,testDescr:"APTT",abbr:"APTT",hisCode:991,testOrderBy:0,isPatho:false,lab:5,dep:3,labDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ",depDescr:"ΑΙΜΟΣΤΑΣΗ",topology:null,isUrgent:false},
            {test:24,testDescr:"ΧΡΟΝΟΣ ΜΑΡΤΥΡΟΣ",abbr:"Χ.ΜΑΡΤ",hisCode:1653,testOrderBy:0,isPatho:false,lab:5,dep:3,labDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ",depDescr:"ΑΙΜΟΣΤΑΣΗ",topology:null,isUrgent:false},
            {test:25,testDescr:"ΧΡΟΝΟΣ ΑΣΘΕΝΟΥΣ",abbr:"ΧΡΟΝΟΣ ΑΣΘ",hisCode:1654,testOrderBy:0,isPatho:false,lab:5,dep:3,labDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ",depDescr:"ΑΙΜΟΣΤΑΣΗ",topology:null,isUrgent:false},
            {test:26,testDescr:"ΧΡΟΝΟΣ ΠΡΟΘΡΟΜΒΙΝΗΣ KATA QUICK",abbr:"PT",hisCode:425,testOrderBy:0,isPatho:false,lab:5,dep:3,labDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ",depDescr:"ΑΙΜΟΣΤΑΣΗ",topology:null,isUrgent:false},
            {test:27,testDescr:"PT.I.N.R",abbr:"PT.I.N.R",hisCode:997,testOrderBy:0,isPatho:false,lab:5,dep:3,labDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ",depDescr:"ΑΙΜΟΣΤΑΣΗ",topology:null,isUrgent:false}
        ]
    };

    const EXTRA_EXAMS = {
        crp: [
            {test:10,testDescr:"CRP1",abbr:"CRP1",hisCode:346,testOrderBy:0,isPatho:false,lab:2,dep:2,labDescr:"ΜΙΚΡΟΒΙΟΛΟΓΙΚΟ",depDescr:"ΑΝΟΣΟΛΟΓΙΚΟ-ΟΡΜΟΝΟΛΟΓΙΚΟ",topology:null,isUrgent:false}
        ],

        tke: [
            {test:2,testDescr:"ΤΚΕ   ΤΑΧΥΤΗΤΑ ΚΑΘΙΖΗΣΗΣ ΕΡΥΘΡΩΝ",abbr:"ΤΚΕ",hisCode:377,testOrderBy:0,isPatho:false,lab:5,dep:1,labDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ",depDescr:"ΑΙΜΑΤΟΛΟΓΙΚΟ Ι",topology:null,isUrgent:false}
        ],

        thyroid: [
            {test:3,testDescr:"TSH ΘΥΡΕΟΤΡΟΠΟΣ ΟΡΜΟΝΗ",abbr:"TSH",hisCode:382,testOrderBy:0,isPatho:false,lab:1,dep:4,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"LIAISON",topology:null,isUrgent:false},
            {test:4,testDescr:"FT3   ΕΛΕΥΘΕΡΗ ΤΡΙΙΩΔΟΘΥΡΟΝΙΝΗ",abbr:"FT3",hisCode:402,testOrderBy:0,isPatho:false,lab:1,dep:4,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"LIAISON",topology:null,isUrgent:false},
            {test:5,testDescr:"FT4   ΕΛΕΥΘΕΡΗ ΘΥΡΟΞΙΝΗ",abbr:"FT4",hisCode:403,testOrderBy:0,isPatho:false,lab:1,dep:4,labDescr:"ΒΙΟΧΗΜΙΚΟ",depDescr:"LIAISON",topology:null,isUrgent:false}
        ]
    };

    function getNursingFrame() {
        for (let i = 0; i < window.frames.length; i++) {
            try {
                if (window.frames[i].location.href.includes("nursing-station.php")) {
                    return window.frames[i];
                }
            } catch (e) {}
        }
        return null;
    }

    function nowDateTime() {
        return new Date().toISOString().slice(0, 19).replace("T", " ");
    }

    function cleanText(el) {
        return (el?.innerText || "").replace(/\s+/g, " ").trim();
    }

    function initDateTime() {
    const doc = getNursingFrame()?.document;
    if (!doc) return;

    const dateInput = doc.getElementById("lab-date");
    const hourEl = doc.getElementById("lab-hour");
    const minuteEl = doc.getElementById("lab-minute");
    const secondEl = doc.getElementById("lab-second");

    if (!dateInput || !hourEl || !minuteEl || !secondEl) return;

    const now = new Date();
    const pad = n => String(n).padStart(2, "0");

    dateInput.value =
        now.getFullYear() + "-" +
        pad(now.getMonth() + 1) + "-" +
        pad(now.getDate());

    hourEl.textContent = pad(now.getHours());
    minuteEl.textContent = pad(now.getMinutes());
    secondEl.textContent = pad(now.getSeconds());

    doc.querySelectorAll(".time-btn").forEach(btn => {
        btn.onclick = () => {
            const target = btn.dataset.target;
            const dir = btn.dataset.dir;

            const el =
                target === "hour" ? hourEl :
                target === "minute" ? minuteEl :
                secondEl;

            const max = target === "hour" ? 23 : 59;

            let value = Number(el.textContent);

            if (dir === "up") {
                value = value >= max ? 0 : value + 1;
            } else {
                value = value <= 0 ? max : value - 1;
            }

            el.textContent = pad(value);
        };
    });
}

    function selectedDateTime() {
    const doc = getNursingFrame().document;

    const date =
        doc.getElementById("lab-date")?.value;

    const hour =
        doc.getElementById("lab-hour")?.textContent || "00";

    const minute =
        doc.getElementById("lab-minute")?.textContent || "00";

    const second =
        doc.getElementById("lab-second")?.textContent || "00";

    if (!date) return nowDateTime();

    return `${date} ${hour}:${minute}:${second}`;
}

    async function loadDoctors() {
        const doc = getNursingFrame()?.document;
        const select = doc?.getElementById("lab-doctor");
        if (!select) return;

        try {
            const res = await fetch(window.location.origin + "/care/doctors", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dept_id: "10" })
            });

            const data = await res.json();

            DOCTORS = data
                .map(d => d.doct_name?.trim())
                .filter(Boolean)
                .filter((name, index, arr) => arr.indexOf(name) === index)
                .sort((a, b) => a.localeCompare(b, "el"));

            select.innerHTML =
                '<option value="">-- Επιλέξτε Ιατρό --</option>' +
                DOCTORS.map(name =>
                    `<option value="${name}">${name}</option>`
                ).join("");

        } catch (e) {
            console.error("Doctors load error:", e);
            select.innerHTML = '<option value="">-- Επιλέξτε Ιατρό --</option>';
        }
    }

    function selectedDoctor() {
        const doc = getNursingFrame().document;
        return doc.getElementById("lab-doctor")?.value || "";
    }

    function extractPatientNameFromRow(row) {
        if (!row) return "";

        const links = [...row.querySelectorAll("a")]
            .map(a => cleanText(a))
            .filter(Boolean)
            .filter(t => !/^\d+$/.test(t))
            .filter(t => !t.includes("javascript"))
            .filter(t => !t.includes("getinfo"));

        if (links.length >= 2) return `${links[0]} ${links[1]}`;
        if (links.length === 1) return links[0];

        return "";
    }

    function getNearbyPatientName(row, encounterNr) {
        const candidates = [
            row,
            row.nextElementSibling,
            row.nextElementSibling?.nextElementSibling,
            row.previousElementSibling
        ].filter(Boolean);

        for (const r of candidates) {
            const name = extractPatientNameFromRow(r);
            if (name && name !== encounterNr) return name;
        }

        return encounterNr;
    }

    function getPatients(doc) {
        const patients = [];

        doc.querySelectorAll('td[id^="tdMiniColorBars"]').forEach(mini => {
            const encounterNr = mini.id.replace("tdMiniColorBars", "").trim();
            if (!encounterNr) return;

            const row = mini.closest("tr");
            if (!row) return;

            const cells = [...row.querySelectorAll("td")];

            let bed = "?";

            const miniCellIndex = cells.indexOf(mini);

            for (let i = miniCellIndex + 1; i < cells.length; i++) {
                const t = cleanText(cells[i]);

                if (/^\d{1,2}$/.test(t)) {
                    bed = t;
                    break;
                }
            }

            let room = "?";
            let prev = row.previousElementSibling;

            while (prev) {
                const prevText = cleanText(prev);

                const roomMatch = prevText.match(/^\s*(\d{3})\s*\[/);

                if (roomMatch) {
                    room = roomMatch[1];
                    break;
                }

                prev = prev.previousElementSibling;
            }

            const patientName = getNearbyPatientName(row, encounterNr);

            patients.push({
                encounterNr,
                room,
                bed,
                patientName
            });
        });

        return patients;
    }

    function updateSelectedCount() {
        const doc = getNursingFrame()?.document;
        if (!doc) return;

        const total = doc.querySelectorAll(".lab-check").length;
        const selected = doc.querySelectorAll(".lab-check:checked").length;

        const selectedCount = doc.getElementById("lab-selected-count");

        if (selectedCount) {
            selectedCount.textContent = `Επιλεγμένοι ασθενείς: ${selected}/${total}`;
        }
    }

    function createPanel() {
        const nf = getNursingFrame();

        if (!nf || !nf.document || !nf.document.body) {
            setTimeout(createPanel, 1000);
            return;
        }

        const doc = nf.document;

        doc.querySelectorAll("#lab-helper-panel").forEach(p => p.remove());

        const panel = doc.createElement("div");
        panel.id = "lab-helper-panel";
        panel.style.position = "fixed";
        panel.style.top = "20px";
        panel.style.right = "20px";
        panel.style.zIndex = "999999999";
        panel.style.background = "white";
        panel.style.border = "2px solid black";
        panel.style.padding = "10px";
        panel.style.width = "420px";
        panel.style.fontFamily = "Arial";
        panel.style.fontSize = "13px";
        panel.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

        panel.innerHTML = `
            <div id="lab-helper-header" style="display:flex;justify-content:space-between;align-items:center;gap:8px;cursor:pointer;">
                <b>Lab Orders Helper</b>
                <span id="lab-selected-count" style="font-weight:bold;font-size:12px;">
                    Επιλεγμένοι ασθενείς: 0/0
                </span>
                <span id="lab-toggle" style="font-weight:bold;font-size:16px;">▼</span>
            </div>

<div id="lab-helper-body" style="display:none;">

            <div style="margin-top:8px;">
                Πακέτο:
                <select id="lab-package" style="width:100%;margin-top:4px;">
                    <option value="ΓΕΝΙΚΗ ΑΙΜΑΤΟΣ">ΓΕΝΙΚΗ ΑΙΜΑΤΟΣ</option>
                    <option value="FULL ΠΑΚΕΤΟ ΧΩΡΙΣ ΠΗΞΗ">FULL ΠΑΚΕΤΟ ΧΩΡΙΣ ΠΗΞΗ</option>
                    <option value="FULL ΠΑΚΕΤΟ">FULL ΠΑΚΕΤΟ</option>
                </select>
            </div>

            <div style="margin-top:8px;">
                Ημ/νία λήψης δείγματος:
                <input id="lab-date" type="date" style="width:100%;margin-top:4px;">

                <div style="margin-top:6px;text-align:center;">
                    <div style="display:flex;justify-content:center;gap:14px;align-items:center;">
                        <button type="button" class="time-btn" data-target="hour" data-dir="up">▲</button>
                        <button type="button" class="time-btn" data-target="minute" data-dir="up">▲</button>
                        <button type="button" class="time-btn" data-target="second" data-dir="up">▲</button>
                    </div>

                    <div style="display:flex;justify-content:center;gap:8px;align-items:center;font-size:18px;margin:2px 0;">
                        <span id="lab-hour">00</span>
                        <b>:</b>
                        <span id="lab-minute">00</span>
                        <b>:</b>
                        <span id="lab-second">00</span>
                    </div>

                    <div style="display:flex;justify-content:center;gap:14px;align-items:center;">
                        <button type="button" class="time-btn" data-target="hour" data-dir="down">▼</button>
                        <button type="button" class="time-btn" data-target="minute" data-dir="down">▼</button>
                        <button type="button" class="time-btn" data-target="second" data-dir="down">▼</button>
                    </div>
                </div>
            </div>

            <div style="margin-top:8px;">
                Ιατρός:
                <select id="lab-doctor" style="width:100%;margin-top:4px;">
                    <option value="">-- Επιλέξτε Ιατρό --</option>
                </select>
            </div>

            <button id="lab-refresh" style="width:100%;margin-top:6px;">
                Ανανέωση λίστας
            </button>

            <div id="lab-list" style="margin-top:8px;max-height:250px;overflow:auto;border:1px solid #aaa;padding:5px;"></div>

            <button id="lab-vials-check" style="width:100%;margin-top:8px;background:#cfe2f3;">
                Έλεγχος φιαλιδίων
            </button>

            <button id="lab-admission-package" style="width:100%;margin-top:8px;background:#d9ead3;">
                Πακέτο εισαγωγής
            </button>

            <button id="lab-postop-xrays" style="width:100%;margin-top:8px;background:#eadcf8;">
                Ακτινογραφίες
            </button>

            
            <div id="lab-log" style="margin-top:8px;max-height:160px;overflow:auto;border-top:1px solid #aaa;padding-top:5px;"></div>

            </div>
        `;


        doc.body.appendChild(panel);

        const header = doc.getElementById("lab-helper-header");
        const body = doc.getElementById("lab-helper-body");
        const toggle = doc.getElementById("lab-toggle");

        header.onclick = () => {
            const isClosed = body.style.display === "none";
            body.style.display = isClosed ? "block" : "none";
            toggle.textContent = isClosed ? "▲" : "▼";
        };

        doc.getElementById("lab-refresh").onclick = async () => {
            initDateTime();
            renderList();
            await loadDoctors();
        };
        doc.getElementById("lab-vials-check").onclick = openVialsPanel;
        doc.getElementById("lab-admission-package").onclick = openAdmissionPanel;
        doc.getElementById("lab-postop-xrays").onclick = openPostopXrayPanel;

        initDateTime();
        loadDoctors();
        renderList();
        autoRefreshUntilReady();
    }

    function autoRefreshUntilReady(maxTries = 12) {
        let tries = 0;

        const timer = setInterval(async () => {
            tries++;

            const doc = getNursingFrame()?.document;
            if (!doc) return;

            const patients = getPatients(doc);
            const doctorSelect = doc.getElementById("lab-doctor");

            if (patients.length > 0) {
                renderList();
            }

            if (doctorSelect && doctorSelect.options.length <= 1) {
                await loadDoctors();
            }

            const hasPatients = patients.length > 0;
            const hasDoctors = doctorSelect && doctorSelect.options.length > 1;

            if ((hasPatients && hasDoctors) || tries >= maxTries) {
                clearInterval(timer);
            }
        }, 1500);
    }

    function renderList() {
        const nf = getNursingFrame();
        if (!nf || !nf.document) return;

        const doc = nf.document;
        const patients = getPatients(doc);

        const list = doc.getElementById("lab-list");
        if (!list) return;

        if (!patients.length) {
            list.innerHTML = "<i>Δεν βρέθηκαν ασθενείς.</i>";
            updateSelectedCount();
            return;
        }

        list.innerHTML = patients.map(p => `
            <label style="display:block;margin:4px 0;">
            <input type="checkbox" class="lab-check" value="${p.encounterNr}">                
            ${p.room}/${p.bed} - ${p.patientName}
            </label>
        `).join("");

        doc.querySelectorAll(".lab-check").forEach(cb => {
            cb.addEventListener("change", updateSelectedCount);
        });

        updateSelectedCount();
    }

    function selectedIds() {
        const doc = getNursingFrame().document;
        return [...doc.querySelectorAll(".lab-check:checked")].map(x => x.value);
    }

    function selectedPackageName() {
        const doc = getNursingFrame().document;
        return doc.getElementById("lab-package").value;
    }

    function log(msg) {
        const doc = getNursingFrame().document;
        const box = doc.getElementById("lab-log");
        if (!box) return;

        box.innerHTML += `<div>${msg}</div>`;
        box.scrollTop = box.scrollHeight;
    }

    function selectedPatientsFull() {
    const doc = getNursingFrame().document;
    const allPatients = getPatients(doc);

    return [...doc.querySelectorAll(".lab-check:checked")].map(cb => {
        const p = allPatients.find(x => x.encounterNr === cb.value);

        return {
            encounterNr: cb.value,
            label: cb.closest("label")?.innerText.trim() || cb.value,
            room: p?.room || "",
            bed: p?.bed || ""
        };
    });
}

function defaultVialsForPackage(packageName) {
    if (packageName === "ΓΕΝΙΚΗ ΑΙΜΑΤΟΣ") {
        return { general: true, biochem: false, coag: false };
    }

    if (packageName === "FULL ΠΑΚΕΤΟ ΧΩΡΙΣ ΠΗΞΗ") {
        return { general: true, biochem: true, coag: false };
    }

    if (packageName === "FULL ΠΑΚΕΤΟ") {
        return { general: true, biochem: true, coag: true };
    }

    return { general: false, biochem: false, coag: false };
}

function openVialsPanel() {
    const nf = getNursingFrame();
    const doc = nf.document;

    const patients = selectedPatientsFull();
    const packageName = selectedPackageName();
    const defaults = defaultVialsForPackage(packageName);

    if (!patients.length) {
        alert("Δεν έχεις επιλέξει ασθενείς.");
        return;
    }

    doc.querySelectorAll("#lab-vials-panel").forEach(p => p.remove());

    const panel = doc.createElement("div");
    panel.id = "lab-vials-panel";
    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.left = "20px";
    panel.style.zIndex = "999999999";
    panel.style.background = "white";
    panel.style.border = "2px solid #333";
    panel.style.padding = "10px";
    panel.style.width = "760px";
    panel.style.fontFamily = "Arial";
    panel.style.fontSize = "13px";
    panel.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

    panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <b>Έλεγχος φιαλιδίων</b>
            <button id="vials-close">Κλείσιμο</button>
        </div>

        <div style="margin-top:6px;font-size:12px;">
            Πακέτο βάσης: <b>${packageName}</b>
        </div>

        <table style="width:100%;table-layout:fixed;border-collapse:collapse;">
            <thead>
                <tr>
                    <th style="text-align:left;">Ασθενής</th>
                    <th style="width:60px;">Γεν.</th>
                    <th style="width:60px;">Βιοχ.</th>
                    <th style="width:60px;">Πήξη</th>
                    <th style="width:60px;">CRP</th>
                    <th style="width:60px;">ΤΚΕ</th>
                    <th style="width:60px;">Θυρ.</th>
                    <th style="width:80px;">Διαστ.</th>
                </tr>
            </thead>
            <tbody>
                ${patients.map(p => `
                    <tr data-encounter="${p.encounterNr}" data-room="${p.room}" data-bed="${p.bed}">
                        <td style="padding:4px;border-bottom:1px solid #ddd;">${p.label}</td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="vial-general" ${defaults.general ? "checked" : ""}>
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="vial-biochem" ${defaults.biochem ? "checked" : ""}>
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="vial-coag" ${defaults.coag ? "checked" : ""}>
                        </td>
                        
                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="vial-crp">
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="vial-tke">
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="vial-thyroid">
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="vial-crossmatch">
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>

        <button id="vials-send" style="width:100%;margin-top:10px;background:#f4cccc;">
            Αποστολή τικαρισμένων εντολών
        </button>

        
        <div id="vials-log" style="margin-top:8px;max-height:120px;overflow:auto;border-top:1px solid #aaa;padding-top:5px;"></div>
    `;

    doc.body.appendChild(panel);

    doc.getElementById("vials-close").onclick = () => panel.remove();
    doc.getElementById("vials-send").onclick = sendVialsOrders;
}

function getExamGroups() {
    const general = PACKAGES["ΓΕΝΙΚΗ ΑΙΜΑΤΟΣ"];

    const fullNoCoag = PACKAGES["FULL ΠΑΚΕΤΟ ΧΩΡΙΣ ΠΗΞΗ"];
    const full = PACKAGES["FULL ΠΑΚΕΤΟ"];

    const isGeneral = e => e.lab === 5 && e.dep === 1;
    const isCoag = e => e.lab === 5 && e.dep === 3;
    const isBiochem = e => e.lab === 1;

    return {
        general: full.filter(isGeneral),
        biochem: fullNoCoag.filter(isBiochem),
        coag: full.filter(isCoag)
    };
}

function vialsLog(msg) {
    const doc = getNursingFrame().document;
    const box = doc.getElementById("vials-log");
    if (!box) return;

    box.innerHTML += `<div>${msg}</div>`;
    box.scrollTop = box.scrollHeight;
}

const XRAY_EXAMS = {
    knee: {
        exams_id: "488_1909_1926_",
        diagnosis_quiry: "<p>Με γνωμάτευση προς χειρουργείο</p>\r\n",
        lab_exams_json: {
            "488": {
                srchId: 488,
                srchUserCode: "3025",
                srchName: "Ακτινογρ.αμφοτέρων κατά γόνυ αρθρ.Face συγκριτική",
                srchShortName: "Α/Α ΓΟΝΑΤΩΝ F/P",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "<p>Σε όρθια θέση</p>\n"
            },
            "1909": {
                srchId: 1909,
                srchUserCode: "9233",
                srchName: "Ακτινογραφία της κατά γόνυ αρθρώσεως P",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            },
            "1926": {
                srchId: 1926,
                srchUserCode: "9250",
                srchName: "Ακτινογραφία Θώρακος F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "<p>Με γνωμάτευση προς χειρουργείο</p>\n"
            }
        }
    },

    pelvis: {
        exams_id: "505_1926_",
        diagnosis_quiry: "<p>Με γνωμάτευση προς χειρουργείο</p>\r\n",
        lab_exams_json: {
            "505": {
                srchId: 505,
                srchUserCode: "3042",
                srchName: "Α/Α ΛΕΚΑΝΗΣ-ΙΣΧΙΩΝ F ΚΑΙ ΙΣΧΙΩΝ ΑΡΘΡΩΣΕΩΝ",
                srchShortName: "Α/Α ΛΕΚΑΝΗΣ-ΙΣΧΙΩΝ F",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            },
            "1926": {
                srchId: 1926,
                srchUserCode: "9250",
                srchName: "Ακτινογραφία Θώρακος F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "<p>Με γνωμάτευση προς χειρουργείο</p>\n"
            }
        }
    },

    shoulder: {
        exams_id: "1948_1926_",
        diagnosis_quiry: "<p>Με γνωμάτευση προς χειρουργείο</p>\r\n\r\n<p>&nbsp;</p>\r\n",
        lab_exams_json: {
            "1926": {
                srchId: 1926,
                srchUserCode: "9250",
                srchName: "Ακτινογραφία Θώρακος F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "<p>Με γνωμάτευση προς χειρουργείο</p>\n\n<p>&nbsp;</p>\n"
            },
            "1948": {
                srchId: 1948,
                srchUserCode: "9272",
                srchName: "Ακτινογραφία ώμου F σε έσω στροφή",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

};

const POSTOP_XRAY_TYPES = [
    { key: "knee", label: "Γόνατο" },
    { key: "pelvis", label: "Λ-Ι" },
    { key: "pdk", label: "ΠΔΚ" },
    { key: "pxk", label: "ΠΧΚ" },
    { key: "tibia", label: "Κνήμη" },
    { key: "femur", label: "Μηριαίο" },
    { key: "forearmR", label: "Αντιβρ. R" },
    { key: "forearmL", label: "Αντιβρ. L" },
    { key: "shoulder", label: "Ώμος" },
    { key: "elbow", label: "Αγκώνας" },
    { key: "humerus", label: "Βραχιόνιο" },
    { key: "foot", label: "Άκρος πόδας" },
    { key: "hand", label: "Άκρα χείρα" }
];

const POSTOP_XRAY_EXAMS = {

    knee: {
        exams_id: "1908_1909_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1908": {
                srchId: 1908,
                srchUserCode: "9232",
                srchName: "Ακτινογραφία της κατά γόνυ αρθρώσεως F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            },
            "1909": {
                srchId: 1909,
                srchUserCode: "9233",
                srchName: "Ακτινογραφία της κατά γόνυ αρθρώσεως P",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    pelvis: {
        exams_id: "505_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "505": {
                srchId: 505,
                srchUserCode: "3042",
                srchName: "Α/Α ΛΕΚΑΝΗΣ-ΙΣΧΙΩΝ F ΚΑΙ ΙΣΧΙΩΝ ΑΡΘΡΩΣΕΩΝ",
                srchShortName: "Α/Α ΛΕΚΑΝΗΣ-ΙΣΧΙΩΝ F",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    elbow: {
        exams_id: "1932_1933_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1932": {
                srchId: 1932,
                srchUserCode: "9256",
                srchName: "Ακτινογραφία αγκώνος F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            },
            "1933": {
                srchId: 1933,
                srchUserCode: "9257",
                srchName: "Ακτινογραφία αγκώνος P",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    pdk: {
        exams_id: "1900_1901_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1900": {
                srchId: 1900,
                srchUserCode: "9224",
                srchName: "Ακτινογραφίες ποδοκνημικής F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            },
            "1901": {
                srchId: 1901,
                srchUserCode: "9225",
                srchName: "Ακτινογραφίες ποδοκνημικής P",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    pxk: {
        exams_id: "1927_1928_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1927": {
                srchId: 1927,
                srchUserCode: "9251",
                srchName: "Ακτινογραφία πηχεοκαρπικής άρθρωσης F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            },
            "1928": {
                srchId: 1928,
                srchUserCode: "9252",
                srchName: "Ακτινογραφία πηχεοκαρπικής άρθρωσης P",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    tibia: {
        exams_id: "1950_1951_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1950": {
                srchId: 1950,
                srchUserCode: "9274",
                srchName: "Ακτινογραφία κνήμης F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            },
            "1951": {
                srchId: 1951,
                srchUserCode: "9275",
                srchName: "Ακτινογραφία κνήμης P",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    femur: {
        exams_id: "1906_1907_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1906": {
                srchId: 1906,
                srchUserCode: "9230",
                srchName: "Ακτινογραφία μηριαίου F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            },
            "1907": {
                srchId: 1907,
                srchUserCode: "9231",
                srchName: "Ακτινογραφία μηριαίου P",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    forearmL: {
        exams_id: "1952_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1952": {
                srchId: 1952,
                srchUserCode: "9276",
                srchName: "Ακτινογραφία οστών αντιβραχίου Αριστερό (F&P)",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    forearmR: {
        exams_id: "1966_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1966": {
                srchId: 1966,
                srchUserCode: "9290",
                srchName: "Ακτινογραφία οστών αντιβραχίου Δεξί (F&P)",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    humerus: {
        exams_id: "1904_1905_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1904": {
                srchId: 1904,
                srchUserCode: "9228",
                srchName: "Ακτινογραφία βραχιονίων F",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            },
            "1905": {
                srchId: 1905,
                srchUserCode: "9229",
                srchName: "Ακτινογραφία βραχιονίων P",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    hand: {
        exams_id: "468_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "468": {
                srchId: 468,
                srchUserCode: "3005",
                srchName: "Ακτινογραφία άκρων χειρών (F&P)",
                srchShortName: "Α/Α ΑΚΡΑΣ ΧΕΙΡΟΣ F/P",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    foot: {
        exams_id: "1936_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1936": {
                srchId: 1936,
                srchUserCode: "9260",
                srchName: "Ακτινογραφία άκρων ποδών (F&P)",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    },

    shoulder: {
        exams_id: "1948_",
        diagnosis_quiry: "",
        lab_exams_json: {
            "1948": {
                srchId: 1948,
                srchUserCode: "9272",
                srchName: "Ακτινογραφία ώμου F σε έσω στροφή",
                srchShortName: "",
                deptNr: 112,
                mappedElokipExam: null,
                chargeDetails: null,
                comment: "NULL"
            }
        }
    }
};

function openAdmissionPanel() {
    const nf = getNursingFrame();
    const doc = nf.document;

    const patients = selectedPatientsFull();

    if (!patients.length) {
        alert("Δεν έχεις επιλέξει ασθενείς.");
        return;
    }

    doc.querySelectorAll("#lab-admission-panel").forEach(p => p.remove());

    const panel = doc.createElement("div");
    panel.id = "lab-admission-panel";
    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.left = "20px";
    panel.style.zIndex = "999999999";
    panel.style.background = "white";
    panel.style.border = "2px solid #333";
    panel.style.padding = "10px";
    panel.style.width = "820px";
    panel.style.fontFamily = "Arial";
    panel.style.fontSize = "13px";
    panel.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

    panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <b>Πακέτο εισαγωγής</b>
            <button id="admission-close">Κλείσιμο</button>
        </div>

        <table style="width:100%;table-layout:auto;border-collapse:collapse;margin-top:8px;">
            <thead>
                <tr>
                <thead>
                    <th style="text-align:left;white-space:nowrap;">Ασθενής</th>
                    <th style="width:65px;text-align:center;">Πεντάδα</th>
                    <th style="width:85px;text-align:center;">Θυρ.</th>
                    <th style="width:60px;text-align:center;">Γόν.</th>
                    <th style="width:80px;text-align:center;">Λ-Ι</th>
                    <th style="width:60px;text-align:center;">Ώμος</th>
                </tr>
            </thead>
            <tbody>
                ${patients.map(p => `
                    <tr data-encounter="${p.encounterNr}" data-room="${p.room}" data-bed="${p.bed}">
                        <td style="
                            padding:4px;
                            border-bottom:1px solid #ddd;
                            white-space:nowrap;
                        ">
                            ${p.label}
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="adm-pentada" checked>
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="adm-thyroid">
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="adm-xray-knee">
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="adm-xray-pelvis">
                        </td>

                        <td style="text-align:center;border-bottom:1px solid #ddd;">
                            <input type="checkbox" class="adm-xray-shoulder">
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>

        <button id="admission-send" style="width:100%;margin-top:10px;background:#f4cccc;">
            Αποστολή πακέτου εισαγωγής
        </button>

        <div id="admission-log" style="margin-top:8px;max-height:140px;overflow:auto;border-top:1px solid #aaa;padding-top:5px;"></div>
    `;

    doc.body.appendChild(panel);

    doc.getElementById("admission-close").onclick = () => panel.remove();
    doc.getElementById("admission-send").onclick = sendAdmissionOrders;
}

function selectedDateForXray() {
    const dt = selectedDateTime(); // yyyy-mm-dd HH:mm:ss
    const date = dt.split(" ")[0];
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

function openXrayPrint(encounterNr, batchNr) {
    window.open(
        window.location.origin +
        "/modules/pdfmaker/nursing/diagnostics_report_pr_sender.php?pn=" +
        encodeURIComponent(encounterNr) +
        "&batch_nr=" +
        encodeURIComponent(batchNr),
        "_blank"
    );
}

function extractXrayBatchFromHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const batchSpan = doc.querySelector(".batch_nr");

    if (batchSpan) {
        const batch = batchSpan.textContent.trim();
        if (batch) return batch;
    }

    const printLink = [...doc.querySelectorAll("a")]
        .map(a => a.getAttribute("href") || "")
        .find(h => h.includes("diagnostics_report_pr_sender.php") && h.includes("batch_nr="));

    if (printLink) {
        const match = printLink.match(/batch_nr=([0-9]+)/);
        if (match) return match[1];
    }

    return null;
}

async function sendXrayOrder(encounterNr, xrayType) {
    const x = XRAY_EXAMS[xrayType];

    const body = new URLSearchParams();

    body.set("report_dept_nr", "112");
    body.set("notes_id", "");
    body.set("notes_hidden", "");
    body.set("exams_id", x.exams_id);
    body.set("drg_medact_ids", "");
    body.set("cancel_reason", "");
    body.set("diagnosis_quiry", x.diagnosis_quiry);
    body.set("send_date", selectedDateForXray());
    body.set("send_doctor", selectedDoctor());

    body.set("sid", "");
    body.set("lang", "gr");
    body.set("station", "ΟΡΘΟΠΑΙΔΙΚΗ");
    body.set("dept", "");
    body.set("dept_nr", "81");
    body.set("pn", String(encounterNr));
    body.set("batch_nr", "Νέο Αίτημα");
    body.set("edit", "");
    body.set("target", "generic");
    body.set("subtarget", "");
    body.set("tracker", "");
    body.set("noresize", "");
    body.set("user_origin", "");
    body.set("pyear", "");
    body.set("pmonth", "");
    body.set("pday", "");
    body.set("status", "pending");
    body.set("mode", "save");
    body.set("formtitle", "");
    body.set("detail_id", "");
    body.set("ward_nr", "57");
    body.set("lab_exams_json", JSON.stringify(x.lab_exams_json));
    body.set("cs_doc_id", "3895");

    const res = await fetch(
        window.location.origin + "/modules/nursing/nursing-station-patientdaten-doconsil-generic-2.php",
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: body.toString()
        }
    );

    const html = await res.text();
    const batchNr = extractXrayBatchFromHtml(html);

    return {
        success: !!batchNr,
        batch_nr: batchNr,
        html
    };
}

function buildABOPrintUrlFromForm(parsedForm) {
    const action = new URL(
        parsedForm.getAttribute("action"),
        window.location.origin + "/modules/nursing/"
    ).href;

    const params = new URLSearchParams();

    parsedForm.querySelectorAll("input[type='hidden']").forEach(input => {
        params.set(input.name, input.value);
    });

    return action + "?" + params.toString();
}

function buildXrayPrintUrl(encounterNr, batchNr) {
    return window.location.origin +
        "/modules/pdfmaker/nursing/diagnostics_report_pr_sender.php?pn=" +
        encodeURIComponent(encounterNr) +
        "&batch_nr=" +
        encodeURIComponent(batchNr);
}

function admissionLog(msg) {
    const doc = getNursingFrame().document;
    const box = doc.getElementById("admission-log");
    if (!box) return;

    box.innerHTML += `<div>${msg}</div>`;
    box.scrollTop = box.scrollHeight;
}

function createPrintsTab() {
    const w = window.open("about:blank", "_blank");

    if (!w) {
        return null;
    }

    w.document.open();
    w.document.write(`
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Εκτυπώσεις</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    font-size: 15px;
                }
                h2 {
                    margin-top: 0;
                }
                a {
                    display: block;
                    margin: 10px 0;
                    padding: 10px;
                    border: 1px solid #ccc;
                    text-decoration: none;
                    color: #003366;
                    background: #f7f7f7;
                }
                a:hover {
                    background: #e6f0ff;
                }
            </style>
        </head>
        <body>
            <h2>Εκτυπώσεις</h2>
            <div id="prints-list"></div>
        </body>
        </html>
    `);
    w.document.close();

    return w;
}

function addPrintLink(printTab, title, url) {
    if (!printTab || printTab.closed) {
        admissionLog(`⚠️ Δεν υπάρχει καρτέλα Εκτυπώσεων για: ${title}`);
        return;
    }

    let list = printTab.document.getElementById("prints-list");

    if (!list) {
        printTab.document.body.innerHTML += '<div id="prints-list"></div>';
        list = printTab.document.getElementById("prints-list");
    }

    const a = printTab.document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.textContent = title;
    a.style.display = "block";
    a.style.margin = "10px 0";
    a.style.padding = "10px";
    a.style.border = "1px solid #ccc";
    a.style.background = "#f7f7f7";
    a.style.color = "#003366";
    a.style.textDecoration = "none";

    list.appendChild(a);

    admissionLog(`🖨️ Προστέθηκε στις Εκτυπώσεις: ${title}`);
}

function openPostopXrayPanel() {
    const nf = getNursingFrame();
    const doc = nf.document;
    const patients = selectedPatientsFull();

    if (!patients.length) {
        alert("Δεν έχεις επιλέξει ασθενείς.");
        return;
    }

    doc.querySelectorAll("#postop-xray-panel").forEach(p => p.remove());

    const panel = doc.createElement("div");
    panel.id = "postop-xray-panel";
    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.left = "20px";
    panel.style.zIndex = "999999999";
    panel.style.background = "white";
    panel.style.border = "2px solid #333";
    panel.style.padding = "10px";
    panel.style.width = "1100px";
    panel.style.fontFamily = "Arial";
    panel.style.fontSize = "13px";
    panel.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

    panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <b>Ακτινογραφίες</b>
            <button id="postop-xray-close">Κλείσιμο</button>
        </div>

        <table style="width:100%;table-layout:auto;border-collapse:collapse;margin-top:8px;">
            <thead>
                <tr>
                    <th style="text-align:left;white-space:nowrap;">Ασθενής</th>
                    ${POSTOP_XRAY_TYPES.map(x => `
                        <th style="width:70px;text-align:center;">${x.label}</th>
                    `).join("")}
                </tr>
            </thead>
            <tbody>
                ${patients.map(p => `
                    <tr data-encounter="${p.encounterNr}" data-room="${p.room}" data-bed="${p.bed}">
                        <td style="padding:4px;border-bottom:1px solid #ddd;white-space:nowrap;">
                            ${p.label}
                        </td>

                        ${POSTOP_XRAY_TYPES.map(x => `
                            <td style="text-align:center;border-bottom:1px solid #ddd;">
                                <input type="checkbox" class="postop-xray-check" data-xray="${x.key}">
                            </td>
                        `).join("")}
                    </tr>
                `).join("")}
            </tbody>
        </table>

        <button id="postop-xray-send" style="width:100%;margin-top:10px;background:#f4cccc;">
            Αποστολή ακτινογραφιών
        </button>

        <div id="postop-xray-log" style="margin-top:8px;max-height:140px;overflow:auto;border-top:1px solid #aaa;padding-top:5px;"></div>
    `;

    doc.body.appendChild(panel);

    doc.getElementById("postop-xray-close").onclick = () => panel.remove();
    doc.getElementById("postop-xray-send").onclick = sendPostopXrays;
}

function postopXrayLog(msg) {
    const doc = getNursingFrame().document;
    const box = doc.getElementById("postop-xray-log");
    if (!box) return;

    box.innerHTML += `<div>${msg}</div>`;
    box.scrollTop = box.scrollHeight;
}

async function sendPostopXrayOrder(encounterNr, xrayType) {
    const x = POSTOP_XRAY_EXAMS[xrayType];

    const body = new URLSearchParams();

    body.set("report_dept_nr", "112");
    body.set("notes_id", "");
    body.set("notes_hidden", "");
    body.set("exams_id", x.exams_id);
    body.set("drg_medact_ids", "");
    body.set("cancel_reason", "");
    body.set("diagnosis_quiry", x.diagnosis_quiry);
    body.set("send_date", selectedDateForXray());
    body.set("send_doctor", selectedDoctor());

    body.set("sid", "");
    body.set("lang", "gr");
    body.set("station", "ΟΡΘΟΠΑΙΔΙΚΗ");
    body.set("dept", "");
    body.set("dept_nr", "81");
    body.set("pn", String(encounterNr));
    body.set("batch_nr", "Νέο Αίτημα");
    body.set("edit", "");
    body.set("target", "generic");
    body.set("subtarget", "");
    body.set("tracker", "");
    body.set("noresize", "");
    body.set("user_origin", "");
    body.set("pyear", "");
    body.set("pmonth", "");
    body.set("pday", "");
    body.set("status", "pending");
    body.set("mode", "save");
    body.set("formtitle", "");
    body.set("detail_id", "");
    body.set("ward_nr", "57");
    body.set("lab_exams_json", JSON.stringify(x.lab_exams_json));
    body.set("cs_doc_id", "3895");

    const res = await fetch(
        window.location.origin + "/modules/nursing/nursing-station-patientdaten-doconsil-generic-2.php",
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: body.toString()
        }
    );

    const html = await res.text();
    const batchNr = extractXrayBatchFromHtml(html);

    return {
        success: !!batchNr,
        batch_nr: batchNr,
        html
    };
}

async function sendPostopXrays() {
    const doc = getNursingFrame().document;

    if (!selectedDoctor()) {
        alert("Επιλέξτε Ιατρό.");
        return;
    }

    const rows = [...doc.querySelectorAll("#postop-xray-panel tr[data-encounter]")];

    const selectedItems = [];

    rows.forEach(row => {
        const encounterNr = row.dataset.encounter;
        const label = row.querySelector("td")?.innerText.trim() || encounterNr;

        row.querySelectorAll(".postop-xray-check:checked").forEach(cb => {
            const xrayType = cb.dataset.xray;
            const xrayLabel =
                POSTOP_XRAY_TYPES.find(x => x.key === xrayType)?.label || xrayType;

            selectedItems.push({
                encounterNr,
                label,
                xrayType,
                xrayLabel
            });
        });
    });

    if (!selectedItems.length) {
        alert("Δεν έχεις επιλέξει ακτινογραφίες.");
        return;
    }

    if (!confirm(`Να σταλούν ${selectedItems.length} ακτινογραφικές εντολές;`)) {
        return;
    }

    const printTab = selectedItems.length > 1 ? createPrintsTab() : null;

    for (const item of selectedItems) {
        if (!POSTOP_XRAY_EXAMS[item.xrayType]) {
            postopXrayLog(`⚠️ ${item.label} → ${item.xrayLabel}: δεν έχει μπει ακόμα payload`);
            continue;
        }

        postopXrayLog(`🩻 ${item.label} → αποστολή ${item.xrayLabel}`);

        try {
            const xr = await sendPostopXrayOrder(item.encounterNr, item.xrayType);

            if (xr.success) {
                postopXrayLog(`✅ ${item.label} → ${item.xrayLabel} batch ${xr.batch_nr}`);

                const url = buildXrayPrintUrl(item.encounterNr, xr.batch_nr);

                if (selectedItems.length === 1) {
                    window.open(url, "_blank");
                } else {
                    addPrintLink(
                        printTab,
                        `Ακτινογραφία ${item.xrayLabel} - ${item.label}`,
                        url
                    );
                }
            } else {
                postopXrayLog(`❌ ${item.label} → δεν βρέθηκε batch για ${item.xrayLabel}`);
            }
        } catch (e) {
            postopXrayLog(`❌ ${item.label} → ${item.xrayLabel}: ${e.message}`);
        }

        await new Promise(r => setTimeout(r, 700));
    }

    postopXrayLog("🏁 Ολοκληρώθηκε.");
}

async function sendAdmissionOrders() {
    const doc = getNursingFrame().document;

    if (!selectedDoctor()) {
        alert("Επιλέξτε Ιατρό.");
        return;
    }

    const rows = [...doc.querySelectorAll("#lab-admission-panel tr[data-encounter]")];

    if (!rows.length) {
        alert("Δεν υπάρχουν ασθενείς στο πακέτο εισαγωγής.");
        return;
    }

    if (!confirm("Να σταλεί το Πακέτο εισαγωγής στους τικαρισμένους ασθενείς;")) {
        return;
    }

    const printTab = createPrintsTab();

    for (const row of rows) {
        const encounterNr = row.dataset.encounter;
        const label = row.querySelector("td")?.innerText.trim() || encounterNr;

        const pentada = row.querySelector(".adm-pentada")?.checked;
        const thyroid = row.querySelector(".adm-thyroid")?.checked;

        const xrayKnee = row.querySelector(".adm-xray-knee")?.checked;
        const xrayPelvis = row.querySelector(".adm-xray-pelvis")?.checked;
        const xrayShoulder = row.querySelector(".adm-xray-shoulder")?.checked;

        let exams = [];

        if (pentada) {
            exams = exams.concat(PACKAGES["FULL ΠΑΚΕΤΟ"]);
        }

        if (thyroid) {
            exams = exams.concat(EXTRA_EXAMS.thyroid);
        }

        if (!exams.length && !xrayKnee && !xrayPelvis && !xrayShoulder) {
            admissionLog(`⚠️ ${label} → τίποτα επιλεγμένο`);
            continue;
        }

        if (exams.length) {
            admissionLog(`⏳ ${label} → αποστολή αιματολογικών`);

            try {
                const r = await sendLabOrderCustom(encounterNr, exams);

                if (r.success) {
                    admissionLog(`✅ ${label} → batch ${r.batch_nr}`);

                    if (pentada) {
                        await openABOFormForBatch(
                            {
                                encounterNr,
                                label,
                                room: row.dataset.room,
                                bed: row.dataset.bed
                            },
                            r.batch_nr,
                            printTab
                        );;
                    }
                } else {
                    admissionLog(`❌ ${label} → αποτυχία αποστολής αιματολογικών`);
                }
            } catch (e) {
                admissionLog(`❌ ${label} → ${e.message}`);
            }

            await new Promise(r => setTimeout(r, 700));
        }

        if (xrayKnee) {
            admissionLog(`🩻 ${label} → αποστολή ακτινογραφίας Γόνατο`);

            try {
                const xr = await sendXrayOrder(encounterNr, "knee");

                if (xr.success) {
                    admissionLog(`✅ ${label} → ακτινογραφία Γόνατο batch ${xr.batch_nr}`);

                    addPrintLink(
                        printTab,
                        `Ακτινογραφία Γόνατο - ${label}`,
                        buildXrayPrintUrl(encounterNr, xr.batch_nr)
                    );

                } else {
                    admissionLog(`❌ ${label} → δεν βρέθηκε batch ακτινογραφίας Γόνατο`);
                }
            } catch (e) {
                admissionLog(`❌ ${label} → ακτινογραφία Γόνατο: ${e.message}`);
            }

            await new Promise(r => setTimeout(r, 700));
        }

        if (xrayPelvis) {
            admissionLog(`🩻 ${label} → αποστολή ακτινογραφίας Λ-Ι`);

            try {
                const xr = await sendXrayOrder(encounterNr, "pelvis");

                if (xr.success) {
                    admissionLog(`✅ ${label} → ακτινογραφία Λ-Ι batch ${xr.batch_nr}`);

                    addPrintLink(
                        printTab,
                        `Ακτινογραφία Λ-Ι - ${label}`,
                        buildXrayPrintUrl(encounterNr, xr.batch_nr)
                    );

                } else {
                    admissionLog(`❌ ${label} → δεν βρέθηκε batch Λ-Ι`);
                }
            } catch (e) {
                admissionLog(`❌ ${label} → Λ-Ι: ${e.message}`);
            }

            await new Promise(r => setTimeout(r, 700));
        }

        if (xrayShoulder) {
            admissionLog(`🩻 ${label} → αποστολή ακτινογραφίας Ώμου`);

            try {
                const xr = await sendXrayOrder(encounterNr, "shoulder");

                if (xr.success) {
                    admissionLog(`✅ ${label} → ακτινογραφία Ώμου batch ${xr.batch_nr}`);

                    addPrintLink(
                        printTab,
                        `Ακτινογραφία Ώμου - ${label}`,
                        buildXrayPrintUrl(encounterNr, xr.batch_nr)
                    );

                } else {
                    admissionLog(`❌ ${label} → δεν βρέθηκε batch Ώμου`);
                }
            } catch (e) {
                admissionLog(`❌ ${label} → Ώμος: ${e.message}`);
            }

            await new Promise(r => setTimeout(r, 700));
        }

    }

    admissionLog("🏁 Ολοκληρώθηκε πακέτο εισαγωγής.");
}

async function sendLabOrderCustom(encounterNr, selectedExams) {
    const payload = {
        encounterNr: Number(encounterNr),
        laboratoryMode: 0,
        compCode: "1",
        compId: "1",
        pathoLabIds: [],
        sendExamsByCategory: false,
        doctorSign: selectedDoctor(),
        userId: "50",
        sendDate: selectedDateTime(),
        orderComments: "",
        selectedExams
    };

    const res = await fetch(window.location.origin + "/laboratory-exams/order", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    return await res.json();
}

function formatDatePartsForABO() {
    const value = selectedDateTime(); // yyyy-mm-dd HH:mm:ss
    const date = value.split(" ")[0];

    const [year, month, day] = date.split("-");

    return {
        pday: day,
        pmonth: month,
        pyear: year,
        s_date: `${year}-${month}-${day}`,
        s_date2: `${day}/${month}/${year}`
    };
}

function buildPatientLabUrl(encounterNr, room, bed) {
    const d = formatDatePartsForABO();

    const params = new URLSearchParams({
        lang: "gr",
        rm: room || "",
        bd: bed || "",
        pn: encounterNr,
        pyear: d.pyear,
        pmonth: d.pmonth,
        pday: d.pday,
        tb: "99ccff",
        tt: "330066",
        bb: "ffffff",
        d: "1",
        station: "ΟΡΘΟΠΑΙΔΙΚΗ",
        dept_nr: "81",
        ward_nr: "57"
    });

    return window.location.origin + "/modules/nursing/nursing-station-patient-laboratory.php?" + params.toString();
}

async function fetchABOFormFromLabPage(encounterNr, batchNr, room, bed, tries = 6) {
    const url = buildPatientLabUrl(encounterNr, room, bed);

    for (let i = 0; i < tries; i++) {
        const res = await fetch(url, {
            method: "GET",
            credentials: "include"
        });

        const html = await res.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const forms = [...doc.querySelectorAll("form")];

        const aboForm = forms.find(form => {
            const action = form.getAttribute("action") || "";

            return (
                action.includes("report_define_blood.php") &&
                form.querySelector(`input[name="batch_nr"][value="${batchNr}"]`) &&
                form.querySelector('input[name="lisorid"]') &&
                form.querySelector('input[name="mode"][value="print_result"]')
            );
        });

        if (aboForm) {
            return aboForm;
        }

        await new Promise(r => setTimeout(r, 1000));
    }

    return null;
}

function submitABOFormFromParsedForm(parsedForm) {
    const doc = getNursingFrame().document;

    const form = doc.createElement("form");
    form.method = "post";
    
    if (parsedForm.aboWindow && !parsedForm.aboWindow.closed) {
        form.target = parsedForm.aboWindow.name;
    } else {
        form.target = "_blank";
    }

    form.action = new URL(
        parsedForm.getAttribute("action"),
        window.location.origin + "/modules/nursing/"
    ).href;

    parsedForm.querySelectorAll("input[type='hidden']").forEach(input => {
        const hidden = doc.createElement("input");
        hidden.type = "hidden";
        hidden.name = input.name;
        hidden.value = input.value;
        form.appendChild(hidden);
    });

    doc.body.appendChild(form);

    form.submit();
    form.remove();
}

async function openABOFormForBatch(patient, batchNr, printTab = null, logFn = vialsLog) {
    logFn(`🩸 ${patient.label} → αναζήτηση εντύπου Διασταύρωσης...`);

    const form = await fetchABOFormFromLabPage(
        patient.encounterNr,
        batchNr,
        patient.room,
        patient.bed
    );

    if (!form) {
        logFn(`⚠️ ${patient.label} → δεν βρέθηκε ΑΒΟ για batch ${batchNr}`);
        return;
    }

    if (printTab) {
        const url = buildABOPrintUrlFromForm(form);
        addPrintLink(printTab, `ΑΒΟ / Διασταύρωση - ${patient.label}`, url);
        logFn(`🖨️ ${patient.label} → προστέθηκε ΑΒΟ στις Εκτυπώσεις`);
    } else {
        submitABOFormFromParsedForm(form);
        logFn(`🖨️ ${patient.label} → άνοιξε έντυπο Διασταύρωσης`);
    }
}

async function sendVialsOrders() {
    const doc = getNursingFrame().document;

    if (!selectedDoctor()) {
        alert("Επιλέξτε Ιατρό.");
        return;
    }

    const groups = getExamGroups();
    const rows = [...doc.querySelectorAll("#lab-vials-panel tr[data-encounter]")];

    if (!rows.length) {
        alert("Δεν υπάρχουν ασθενείς στον έλεγχο.");
        return;
    }

    if (!confirm("Να σταλούν οι τικαρισμένες εντολές από τον έλεγχο φιαλιδίων;")) {
        return;
    }

    const crossmatchCount = rows.filter(row =>
        row.querySelector(".vial-crossmatch")?.checked
    ).length;

    const vialsPrintTab = crossmatchCount > 1 ? createPrintsTab() : null;

    for (const row of rows) {
        const encounterNr = row.dataset.encounter;
        const label = row.querySelector("td")?.innerText.trim() || encounterNr;

        let exams = [];

        if (row.querySelector(".vial-general")?.checked) {
            exams = exams.concat(groups.general);
        }

        if (row.querySelector(".vial-biochem")?.checked) {
            exams = exams.concat(groups.biochem);
        }

        if (row.querySelector(".vial-crp")?.checked) {
            exams = exams.concat(EXTRA_EXAMS.crp);
        }

        if (row.querySelector(".vial-tke")?.checked) {
            exams = exams.concat(EXTRA_EXAMS.tke);
        }

        if (row.querySelector(".vial-thyroid")?.checked) {
            exams = exams.concat(EXTRA_EXAMS.thyroid);
        }

        if (row.querySelector(".vial-coag")?.checked) {
            exams = exams.concat(groups.coag);
        }

        if (!exams.length) {
            vialsLog(`⚠️ ${label} → καμία εργαστηριακή εντολή`);
            continue;
        }

        vialsLog(`⏳ ${label}`);

        try {
            const r = await sendLabOrderCustom(encounterNr, exams);

        if (r.success) {
            vialsLog(`✅ ${label} → batch ${r.batch_nr}`);

            if (row.querySelector(".vial-crossmatch")?.checked) {
                await openABOFormForBatch(
                    {
                        encounterNr,
                        label,
                        room: row.dataset.room,
                        bed: row.dataset.bed
                    },
                    r.batch_nr,
                    vialsPrintTab,
                    vialsLog
                );
            }
        } else {
            vialsLog(`❌ ${label}`);
    }
        } catch (e) {
            vialsLog(`❌ ${label} → ${e.message}`);
        }

        await new Promise(r => setTimeout(r, 700));
    }

    vialsLog("🏁 Ολοκληρώθηκε.");
}

    async function sendLabOrder(encounterNr) {
        const packageName = selectedPackageName();

        const payload = {
            encounterNr: Number(encounterNr),
            laboratoryMode: 0,
            compCode: "1",
            compId: "1",
            pathoLabIds: [],
            sendExamsByCategory: false,
            doctorSign: selectedDoctor(),
            userId: "50",
            sendDate: selectedDateTime(),
            orderComments: "",
            selectedExams: PACKAGES[packageName]
        };

        const res = await fetch(window.location.origin + "/laboratory-exams/order", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        return await res.json();
    }

    async function sendOne() {
        const ids = selectedIds();

        if (!selectedDoctor()) {
            alert("Επιλέξτε Ιατρό.");
            return;
        }

        if (!ids.length) {
            alert("Δεν έχεις επιλέξει ασθενή.");
            return;
        }

        const id = ids[0];
        const packageName = selectedPackageName();

        if (!confirm(`Να σταλεί "${packageName}" στον ασθενή ${id};`)) {
            return;
        }

        log(`⏳ ${id} — ${packageName}`);

        try {
            const r = await sendLabOrder(id);
            log(r.success ? `✅ ${id} → batch ${r.batch_nr}` : `❌ ${id}`);
        } catch (e) {
            log(`❌ ${id} → ${e.message}`);
        }
    }

    async function sendAll() {
        const ids = selectedIds();

        if (!selectedDoctor()) {
            alert("Επιλέξτε Ιατρό.");
            return;
        }

        if (!ids.length) {
            alert("Δεν έχεις επιλέξει ασθενείς.");
            return;
        }

        const packageName = selectedPackageName();

        if (!confirm(`ΠΡΟΣΟΧΗ: Θα σταλεί "${packageName}" σε ${ids.length} ασθενείς. Συνέχεια;`)) {
            return;
        }

        for (const id of ids) {
            log(`⏳ ${id} — ${packageName}`);

            try {
                const r = await sendLabOrder(id);
                log(r.success ? `✅ ${id} → batch ${r.batch_nr}` : `❌ ${id}`);
            } catch (e) {
                log(`❌ ${id} → ${e.message}`);
            }

            await new Promise(r => setTimeout(r, 700));
        }

        log("🏁 Ολοκληρώθηκε.");
    }

    setTimeout(createPanel, 4000);
})();

// INITIAL SETUP
let habits = JSON.parse(localStorage.getItem("habits")) || [];
let completedDays = new Set(JSON.parse(localStorage.getItem("completedDays")) || []);
const totalDays = 21;

// --------------------------
// Generate AI Advice
// --------------------------
function generateAISuggestion() {
    const lines = [
        "Comfort is killing your potential. Move.",
        "You're not tired. You're undisciplined. Fix it.",
        "One day or day one. Pick.",
        "If you fail today, your weak version wins.",
        "Small actions compound. You know this.",
        "Every excuse feeds the weak version of you.",
        "Discipline or regret. Choose one."
    ];

    document.getElementById("ai-output").innerText =
        lines[Math.floor(Math.random() * lines.length)];
}

// --------------------------
// Add Habit
// --------------------------
function addHabit() {
    const input = document.getElementById("habit-input");
    const value = input.value.trim();

    if (!value) return;

    habits.push(value);
    saveHabits();
    renderHabits();
    input.value = "";
}

function renderHabits() {
    const container = document.getElementById("habits");
    container.innerHTML = "";

    habits.forEach((habit, index) => {
        const div = document.createElement("div");
        div.className = "habit-item";
        div.innerHTML = `
            <span>${habit}</span>
            <span class="remove-btn" onclick="removeHabit(${index})">✕</span>
        `;
        container.appendChild(div);
    });
}

function removeHabit(i) {
    habits.splice(i, 1);
    saveHabits();
    renderHabits();
}

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

// --------------------------
// 21 DAY WALL
// --------------------------
function generateDays() {
    const container = document.getElementById("days");
    container.innerHTML = "";

    for (let i = 1; i <= totalDays; i++) {
        const d = document.createElement("div");
        d.className = "day";
        d.innerText = i;

        if (completedDays.has(i)) d.classList.add("active");

        d.onclick = () => toggleDay(i, d);
        container.appendChild(d);
    }
}

function toggleDay(num, element) {
    if (completedDays.has(num)) {
        completedDays.delete(num);
        element.classList.remove("active");
    } else {
        completedDays.add(num);
        element.classList.add("active");
    }

    updateProgress();
    saveDays();
}

function saveDays() {
    localStorage.setItem("completedDays", JSON.stringify([...completedDays]));
}

// --------------------------
// PROGRESS BAR
// --------------------------
function updateProgress() {
    const percent = Math.floor((completedDays.size / totalDays) * 100);
    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-text").innerText = `${percent}% Done (${completedDays.size}/${totalDays})`;
}

// --------------------------
// SAVE REFLECTION
// --------------------------
function saveReflection() {
    const text = document.getElementById("reflection").value.trim();
    if (!text) return;

    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`reflection-${today}`, text);
    alert("Reflection saved. Journal updated.");
}

// --------------------------
// INIT
// --------------------------
generateDays();
renderHabits();
generateAISuggestion();
updateProgress();

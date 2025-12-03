// INITIAL SETUP
const habits = [];
const completedDays = new Set();
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
        "Small actions compound. You know this."
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
    renderHabits();
}

// --------------------------
// 21 DAY WALL
// --------------------------
function generateDays() {
    const container = document.getElementById("days");

    for (let i = 1; i <= totalDays; i++) {
        const d = document.createElement("div");
        d.className = "day";
        d.innerText = i;

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
}

// --------------------------
// PROGRESS BAR
// --------------------------
function updateProgress() {
    const percent = Math.floor((completedDays.size / totalDays) * 100);
    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-text").innerText = percent + "% Completed";
}

// --------------------------
// SAVE REFLECTION
// --------------------------
function saveReflection() {
    const text = document.getElementById("reflection").value.trim();
    if (!text) return;

    alert("Reflection saved. Journal updated.");
}

// INIT
generateDays();
generateAISuggestion();

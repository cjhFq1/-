// =====================
// 倒计时功能 (15分钟)
// =====================
let timeLeft = 15 * 60; // 15分钟
const timerElement = document.createElement("div");
timerElement.style.position = "fixed";
timerElement.style.top = "10px";
timerElement.style.right = "10px";
timerElement.style.background = "#222";
timerElement.style.color = "white";
timerElement.style.padding = "5px 12px";
timerElement.style.borderRadius = "5px";
timerElement.style.fontSize = "18px";
document.body.appendChild(timerElement);

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.textContent = `剩余时间：${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        alert("时间到！自动提交试卷。");
        checkAnswers(); // 时间到自动交卷
    }
}
setInterval(updateTimer, 1000);
updateTimer();


// =====================
// 答题逻辑
// =====================

// 假设正确答案（可以自己改，比如 A/B/C/D）
const answers = {
    q1: "A",
    q2: "C",
    q3: "B",
    q4: "D",
    q5: "A"
    // ... 可以继续添加到 q50
};

function checkAnswers() {
    let score = 0;
    let total = Object.keys(answers).length;

    for (let key in answers) {
        let selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === answers[key]) {
            score += 2; // 每题 2分，50题总分 = 100
        }
    }

    let resultBox = document.getElementById("result");
    if (!resultBox) {
        resultBox = document.createElement("div");
        resultBox.id = "result";
        resultBox.style.marginTop = "20px";
        resultBox.style.fontSize = "20px";
        document.body.appendChild(resultBox);
    }

    resultBox.textContent = `你的得分：${score} 分 / 100 分`;

    // 分数不足 75 分 → 红色警告
    if (score < 75) {
        resultBox.style.color = "red";
        resultBox.textContent += " ❌ 未达标";
    } else {
        resultBox.style.color = "green";
        resultBox.textContent += " ✅ 合格";
    }
}

// =====================
// 绑定提交按钮
// =====================
document.addEventListener("DOMContentLoaded", () => {
    let submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", checkAnswers);
    }
});

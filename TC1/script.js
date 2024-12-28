let vaccinationData = [
    { type: "BCG", dueDate: "2024-12-15", status: "Pending" },
    { type: "Hepatitis B", dueDate: "2025-01-10", status: "Pending" },
    { type: "Polio", dueDate: "2025-02-05", status: "Pending" },
];

function renderVaccinationList() {
    const vaccinationList = document.getElementById("vaccinationList");
    vaccinationList.innerHTML = "";

    vaccinationData.forEach((data) => {
        vaccinationList.innerHTML += `
            <tr>
                <td>${data.type}</td>
                <td>${data.dueDate}</td>
                <td>${data.status}</td>
            </tr>
        `;
    });
}

function simulateQrScan() {
    const pendingIndex = vaccinationData.findIndex(vaccine => vaccine.status === "Pending");
    if (pendingIndex >= 0) {
        vaccinationData[pendingIndex].status = "Completed";
        alert(`${vaccinationData[pendingIndex].type} vaccination marked as completed.`);
    } else {
        alert("No pending vaccinations.");
    }
    renderVaccinationList();
}

document.addEventListener("DOMContentLoaded", () => {
    renderVaccinationList();
});

let motherData = [];

function goHome() {
    document.getElementById("login").style.display = "block";
    document.getElementById("asha-dashboard").style.display = "none";
    document.getElementById("mother-dashboard").style.display = "none";
}

function login() {
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        document.getElementById("login").style.display = "none";
        if (role === "asha") {
            document.getElementById("asha-dashboard").style.display = "block";
        } else {
            document.getElementById("mother-dashboard").style.display = "block";
        }
    } else {
        alert("Please fill in all fields!");
    }
}

document.getElementById("addMotherForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const motherName = document.getElementById("motherName").value;
    const childName = document.getElementById("childName").value;
    const dueDate = document.getElementById("dueDate").value;

    const newEntry = {
        motherName,
        childName,
        dueDate,
        status: "Pending",
    };

    motherData.push(newEntry);
    renderMotherList();

    // Clear form inputs
    document.getElementById("motherName").value = "";
    document.getElementById("childName").value = "";
    document.getElementById("dueDate").value = "";
});

function renderMotherList() {
    const motherList = document.getElementById("motherList");
    motherList.innerHTML = "";

    motherData.forEach((data, index) => {
        motherList.innerHTML += `
            <tr>
                <td>${data.motherName}</td>
                <td>${data.childName}</td>
                <td>${data.dueDate}</td>
                <td>${data.status}</td>
                <td><button class="btn-scan" onclick="markVaccinationComplete(${index})">Mark as Done</button></td>
            </tr>
        `;
    });
}

function markVaccinationComplete(index) {
    motherData[index].status = "Completed";
    alert(`Vaccination for ${motherData[index].childName} marked as completed.`);
    renderMotherList();
}

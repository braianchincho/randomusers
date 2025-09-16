const loadButton = document.getElementById("loadUsers");
const container = document.getElementById("user-cards");

loadButton.addEventListener("click", async () => {
  container.innerHTML = "<p>Loading...</p>";
  try {
    const res = await fetch("/api/users?page=1&limit=12");
    const data = await res.json();

    container.innerHTML = "";
    data.users.forEach(user => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

      col.innerHTML = `
        <div class="card p-3">
          <img src="${user.avatar}" alt="${user.firstName} ${user.lastName}">
          <h5 class="mt-2">${user.firstName} ${user.lastName}</h5>
          <p class="text-muted mb-1">@${user.userName}</p>
          <p class="mb-1">${user.email}</p>
          <p class="mb-0">Age: ${user.age} | Gender: ${user.gender}</p>
        </div>
      `;
      container.appendChild(col);
    });
  } catch (err) {
    container.innerHTML = "<p style='color:red;'>Error loading users</p>";
    console.error(err);
  }
});

// Copy button for code blocks
document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const code = btn.nextElementSibling.innerText;
    navigator.clipboard.writeText(code).then(() => {
      btn.innerText = "Copied!";
      setTimeout(() => btn.innerText = "Copy", 1500);
    });
  });
});


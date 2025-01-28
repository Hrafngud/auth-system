function showModal(message) {
  document.getElementById('modalMessage').innerText = message;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
 
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      if (data.role === 'user') {
        localStorage.setItem('token', data.token);
        window.location.href = 'userKioskDetails.html';
      } else {
        window.location.href = 'home.html';
      }
    } else {
      showModal(data.error);
    }
  } catch (error) {
    showModal('Login failed');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const role = localStorage.getItem('role');

  if (role === 'admin') {
    document.getElementById('adminSection').style.display = 'block';
  } else {
    document.getElementById('userSection').style.display = 'block';
  }
});

let currentPage = 1;
const usersPerPage = 10;

function updatePaginationControls(totalPages) {
  const paginationControls = document.getElementById('paginationControls');
  paginationControls.innerHTML = '';

  let paginationHTML = '';

  paginationHTML += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="loadUsers(${currentPage - 1})">Anterior</button>`;

  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, currentPage + half);

  if (currentPage <= half) {
    endPage = Math.min(totalPages, maxButtons);
  }
  if (currentPage + half >= totalPages) {
    startPage = Math.max(1, totalPages - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `<button ${i === currentPage ? 'class="active"' : ''} onclick="loadUsers(${i})">${i}</button>`;
  }

  paginationHTML += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="loadUsers(${currentPage + 1})">Próxima</button>`;

  paginationControls.innerHTML = paginationHTML;
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

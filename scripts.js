var todolist = [];
var paragraf = document.querySelector('.jsdengelen');
var notgiris = document.querySelector('.notgir');

function kaydet() {
  if (notgiris.value.trim() === "") return; // Boş girişi önle
  todolist.push({ text: notgiris.value, checked: false });
  localStorage.setItem('todolist', JSON.stringify(todolist)); // LocalStorage'a kaydet
  sayfahazir();
  notgiris.value = "";
}

function sil(index) {
  todolist.splice(index, 1);
  localStorage.setItem('todolist', JSON.stringify(todolist)); // LocalStorage'ı güncelle
  sayfahazir();
}

function sayfahazir() {
  paragraf.innerHTML = "";
  for (let i = todolist.length - 1; i >= 0; i--) {
    const checkedAttribute = todolist[i].checked ? "checked" : "";
    const strikeClass = todolist[i].checked ? "strike" : ""; // Üstü çizili sınıfı
    paragraf.innerHTML += `
      <h1 class="liste">
        <input type="checkbox" id="checkbox-${i}" ${checkedAttribute} onchange="toggleChecked(${i})">
        <span class="${strikeClass}">${todolist[i].text}</span> 
        <button class="sil" onclick="sil(${i})">Sil</button>
      </h1>`;
  }
}

// Checkbox durumunu güncelle
function toggleChecked(index) {
  todolist[index].checked = !todolist[index].checked; // Durumu tersine çevir
  localStorage.setItem('todolist', JSON.stringify(todolist)); // LocalStorage'ı güncelle
  sayfahazir(); // Sayfayı güncelle
}

// Sayfa yüklendiğinde LocalStorage'dan verileri yükle
document.addEventListener("DOMContentLoaded", function() {
  const storedList = localStorage.getItem('todolist');
  if (storedList) {
    todolist = JSON.parse(storedList); // LocalStorage'dan verileri al
  }
  sayfahazir(); // Sayfayı hazırla
});

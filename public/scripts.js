// const modalOverlay = document.querySelector('.modal-overlay');
const recipes = document.querySelectorAll('.recipe');
const details = document.querySelectorAll('.details h6');

for(let recipe of recipes) {
  recipe.addEventListener('click', () => {
    const cardId = recipe.getAttribute('Id');
    window.location.href = `/recipes/${cardId}`;
  });
}

for(let detail of details) {
  detail.addEventListener('click', () => {
    const modal = detail.parentElement.querySelector('.modal');
    
    if(modal.className == 'modal active') {
      detail.innerHTML = `
        <h6>MOSTRAR</h6>
      `;
    } else {
      detail.innerHTML = `
        <h6>ESCONDER</h6>
      `;
    }
    modal.classList.toggle('active');
  });
}
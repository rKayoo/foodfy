const recipes = document.querySelectorAll('.recipe');
const details = document.querySelectorAll('.details button');
const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header #header-links a');
const addButton = document.querySelectorAll('.item p');
const prepare = document.querySelector('#prepare');
const deleteForm = document.querySelector('#delete-form');

// Enter the user into a recipe page
for(let recipe of recipes) {
  recipe.addEventListener('click', () => {
    const cardId = recipe.getAttribute('Id');
    window.location.href = `/recipes/${cardId}`;
  });
}

// Show/Hide button
for(let detail of details) {
  detail.addEventListener('click', () => {
    const modal = detail.parentElement.querySelector('.modal');
    
    if(modal.className == 'modal active') {
      detail.innerHTML = `
        <button type="button">MOSTRAR</button>
      `;
    } else {
      detail.innerHTML = `
        <button type="button">ESCONDER</button>
      `;
    }
    modal.classList.toggle('active');
  });
}

// Make the header item bold
for(item of menuItems) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active');
  }
}

//Add Ingredient button
function addIngredient () {
  const ingredients = document.querySelector('#ingredients');
  const fieldContainer = document.querySelectorAll('.ingredient');

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if(newField.children[0].value == '') return false;

  newField.children[0].value = '';
  ingredients.appendChild(newField);
}

document.querySelector('.add-ingredient').addEventListener('click', addIngredient);

// Add step button
function addStep () {
  const steps = document.querySelector('#steps');
  const fieldContainer = document.querySelectorAll('.step');

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if(newField.children[0].value == '') return false;

  newField.children[0].value = '';
  steps.appendChild(newField);
}

document.querySelector('.add-step').addEventListener('click', addStep);

// Delete button
deleteForm.addEventListener('submit', function(event) {
  const confirmation = confirm('Deseja deletar esta receita?');

  if(!confirmation) {
    event.preventDefault();
  }
});
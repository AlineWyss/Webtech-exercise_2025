function buildIngredients(drink){
  const list=[];
  for(let i=1;i<=15;i++){
    const ing = drink[`strIngredient${i}`];
    const mea = drink[`strMeasure${i}`];
    if(ing) list.push(`${mea||''} ${ing}`.trim());
  }
  return list;
}

/* DRINK in card */
function showDrink(drink){
  const front = document.querySelector('.flip-card-front');
  const back  = document.querySelector('.flip-card-back');

  const ingredients = buildIngredients(drink);

  front.innerHTML = `
    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
    <h3>${drink.strDrink}</h3>
    <p style="opacity:.7">Hover for recipe</p>
  `;
  back.innerHTML = `
    <h3>${drink.strDrink}</h3>
    <p><strong>Ingredients:</strong><br>${ingredients.join('<br>')}</p>
    <p><strong>Instructions:</strong><br>
       ${drink.strInstructionsDE || drink.strInstructions}</p>
  `;
}

/* Loading random drink */
async function loadRandomDrink(){
  const res  = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await res.json();
  showDrink(data.drinks[0]);
}

/* Searching drink */
async function searchDrink(){
  const query = document.getElementById('searchInput').value.trim();
  if(!query) return;

  const res  = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();

  if(!data.drinks){
    alert('Drink not found!');
    return;
  }
  showDrink(data.drinks[0]);
}

document.getElementById('newDrinkBtn').addEventListener('click', loadRandomDrink);
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') searchDrink();
});
document.getElementById('searchInput').addEventListener('keydown', e=>{
  if(e.key==='Enter') searchDrink();
});

/* Start webside with random drink */
loadRandomDrink();

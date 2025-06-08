// async = Pleas wait until fetchDrink finished loading
async function fetchDrink() {

    // fetch = randam drink from website
    // await= wait until data is loadet
    const antwort = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");

    // json = make it readeble
    const daten = await antwort.json();

   // I take th efirst drink
   const drink = daten.drinks[0];

  // Zutaten zusammensuchen
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ing) ingredients.push(`${measure || ""} ${ing}`.trim());
  }

  // Inhalt in die Box schreiben
  const card = document.getElementById("drink-card");
  card.innerHTML = `
    <h2>${drink.strDrink}</h2>
    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
    <p><strong>Glas:</strong> ${drink.strGlass}</p>
    <h3>Zutaten:</h3>
    <ul>${ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
    <h3>Anleitung:</h3>
    <p>${drink.strInstructionsDE || drink.strInstructions}</p>
  `;
}

// Beim Laden der Seite einen Drink holen
fetchDrink();
import Memory from "./memory.js";
import Card from "./card.js";

const App = (() => {
  //cash the Dom
  const cardsContainer = document.getElementById("cards-container");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const currentEl = document.getElementById("current");
  const showBtn = document.getElementById("show");
  const hideBtn = document.getElementById("hide");
  const questionEl = document.getElementById("question");
  const answerEl = document.getElementById("answer");
  const addCardBtn = document.getElementById("add-card");
  const clearBtn = document.getElementById("clear");
  const addContainer = document.getElementById("add-container");

  const card1 = new Card("dsfdsf", "kakulya");
  const card2 = new Card("moloko", "kipyatok");

  // Store DOM cards
  const cardsEl = [];
  // Store card data
  const cardsData = getCardsData();
  console.log(cardsData)

  // Show add container
  showBtn.addEventListener("click", () => addContainer.classList.add("show"));

  // Hide add container
  hideBtn.addEventListener("click", () =>
    addContainer.classList.remove("show")
  );

  const memory = new Memory(cardsData);

  // Create a single card in DOM
  function createCard(data, index) {
    const card = document.createElement("div");
    card.classList.add("card");

    if (index === 0) {
      card.classList.add("active");
    }

    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
  </div>
    `;

    card.addEventListener("click", () => card.classList.toggle("show-answer"));

    // Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
  }
  // Create all cards
  function createCards() {
    memory.cards.forEach((data, index) => createCard(data, index));
  }

  createCards();
  // Show number of cards
  function updateCurrentText() {
    currentEl.innerText = `${memory.currentActiveCard + 1}/${cardsEl.length}`;
  }

  // Get cards from local storage
  function getCardsData() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    return cards === null ? [] : cards;
  }

  // Add card to local storage
  function setCardsData(cards) {
    localStorage.setItem("cards", JSON.stringify(cards));
    window.location.reload();
  }

  nextBtn.addEventListener("click", () => {
    cardsEl[memory.currentActiveCard].className = "card left";
    memory.increaseCurrent();
    if (memory.currentActiveCard > memory.cards.length - 1) {
      memory.currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[memory.currentActiveCard].className = "card active";

    updateCurrentText();
  });

  // Prev button
  prevBtn.addEventListener("click", () => {
    cardsEl[memory.currentActiveCard].className = "card right";

    memory.decreaseCurrent();

    if (memory.currentActiveCard < 0) {
      memory.currentActiveCard = 0;
    }

    cardsEl[memory.currentActiveCard].className = "card active";

    updateCurrentText();
  });
  // Add new card
  addCardBtn.addEventListener("click", () => {
    console.log("hi");
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
      const newCard = { question, answer };

      createCard(newCard);

      questionEl.value = "";
      answerEl.value = "";

      addContainer.classList.remove("show");

      cardsData.push(newCard);
      setCardsData(cardsData);
    }
  });
  clearBtn.addEventListener("click", () => {
    localStorage.clear();
    cardsContainer.innerHTML = "";
    window.location.reload();
  });
})();

// App.renderAll();

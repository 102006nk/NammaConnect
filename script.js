
const categories = [
  { name: "Travel", emoji: "🚌" },
  { name: "Shopping", emoji: "🛍️" },
  { name: "College", emoji: "🎓" },
  { name: "Restaurants", emoji: "🍽️" },
  { name: "Hospitals", emoji: "🏥" }
];

// Review these example translations with a fluent Kannada speaker
// before using them in your final competition submission.
const phrases = [
  {
    category: "Travel",
    kannada: "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?",
    english: "Where is the bus stop?",
    pronunciation: "Bus nildana ellide?"
  },
  {
    category: "Travel",
    kannada: "ಈ ಬಸ್ ಮೈಸೂರಿಗೆ ಹೋಗುತ್ತದೆಯೇ?",
    english: "Does this bus go to Mysuru?",
    pronunciation: "Ee bus Mysurige hoguttadeye?"
  },
  {
    category: "Travel",
    kannada: "ದಯವಿಟ್ಟು ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.",
    english: "Please stop here.",
    pronunciation: "Dayavittu illi nillisi."
  },
  {
    category: "Shopping",
    kannada: "ಇದರ ಬೆಲೆ ಎಷ್ಟು?",
    english: "How much does this cost?",
    pronunciation: "Idara bele eshtu?"
  },
  {
    category: "Shopping",
    kannada: "ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.",
    english: "Please reduce the price a little.",
    pronunciation: "Swalpa kadime madi."
  },
  {
    category: "Shopping",
    kannada: "ನನಗೆ ಇದು ಬೇಕು.",
    english: "I want this.",
    pronunciation: "Nanage idu beku."
  },
  {
    category: "College",
    kannada: "ನಿಮ್ಮ ಹೆಸರು ಏನು?",
    english: "What is your name?",
    pronunciation: "Nimma hesaru enu?"
  },
  {
    category: "College",
    kannada: "ದಯವಿಟ್ಟು ಮತ್ತೆ ಹೇಳಿ.",
    english: "Please say that again.",
    pronunciation: "Dayavittu matte heli."
  },
  {
    category: "College",
    kannada: "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.",
    english: "I did not understand.",
    pronunciation: "Nanage arthavagalilla."
  },
  {
    category: "Restaurants",
    kannada: "ನನಗೆ ಒಂದು ದೋಸೆ ಬೇಕು.",
    english: "I would like one dosa.",
    pronunciation: "Nanage ondu dose beku."
  },
  {
    category: "Restaurants",
    kannada: "ನೀರು ಕೊಡಿ, ದಯವಿಟ್ಟು.",
    english: "Water, please.",
    pronunciation: "Neeru kodi, dayavittu."
  },
  {
    category: "Hospitals",
    kannada: "ನನಗೆ ಸಹಾಯ ಬೇಕು.",
    english: "I need help.",
    pronunciation: "Nanage sahaya beku."
  },
  {
    category: "Hospitals",
    kannada: "ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?",
    english: "Where is the hospital?",
    pronunciation: "Aaspatre ellide?"
  }
];

const categoryContainer = document.getElementById("categories");
const phraseList = document.getElementById("phraseList");
const phraseHeading = document.getElementById("phraseHeading");
const phraseCount = document.getElementById("phraseCount");
const searchInput = document.getElementById("searchInput");

let selectedCategory = "All";

function renderCategories() {
  categoryContainer.innerHTML = "";

  const allCategories = [
    { name: "All", emoji: "✨" },
    ...categories
  ];

  allCategories.forEach(category => {
    const button = document.createElement("button");
    button.className = "category";
    button.type = "button";

    if (selectedCategory === category.name) {
      button.classList.add("active");
    }

    const emoji = document.createElement("span");
    emoji.className = "emoji";
    emoji.textContent = category.emoji;

    const name = document.createElement("strong");
    name.textContent = category.name;

    button.append(emoji, name);

    button.addEventListener("click", () => {
      selectedCategory = category.name;
      renderCategories();
      renderPhrases();
    });

    categoryContainer.appendChild(button);
  });
}

function renderPhrases() {
  const query = searchInput.value.trim().toLocaleLowerCase();

  const filtered = phrases.filter(phrase => {
    const matchesCategory =
      selectedCategory === "All" ||
      phrase.category === selectedCategory;

    const searchableText = [
      phrase.category,
      phrase.kannada,
      phrase.english,
      phrase.pronunciation
    ].join(" ").toLocaleLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  phraseHeading.textContent =
    selectedCategory === "All"
      ? "Popular phrases"
      : selectedCategory + " phrases";

  phraseCount.textContent = `${filtered.length} phrases`;
  phraseList.replaceChildren();

  if (filtered.length === 0) {
    const message = document.createElement("p");
    message.textContent =
      "No phrases found. Try another search or category.";
    phraseList.appendChild(message);
    return;
  }

  filtered.forEach(phrase => {
    const card = document.createElement("article");
    card.className = "phrase-card";

    const top = document.createElement("div");
    top.className = "phrase-top";

    const textBlock = document.createElement("div");

    const kannada = document.createElement("h3");
    kannada.textContent = phrase.kannada;

    const english = document.createElement("p");
    english.className = "meaning";
    english.textContent = phrase.english;

    const pronunciation = document.createElement("p");
    pronunciation.className = "pronunciation";
    pronunciation.textContent =
      "Say it: " + phrase.pronunciation;

    const category = document.createElement("p");
    category.className = "eyebrow";
    category.textContent = phrase.category;

    textBlock.append(category, kannada, english, pronunciation);

    const speakButton = document.createElement("button");
    speakButton.className = "speak-button";
    speakButton.type = "button";
    speakButton.textContent = "🔊 Listen";
    speakButton.setAttribute(
      "aria-label",
      "Listen to " + phrase.english
    );

    speakButton.addEventListener("click", () => {
      speakKannada(phrase.kannada);
    });

    top.append(textBlock, speakButton);
    card.appendChild(top);
    phraseList.appendChild(card);
  });
}

function speakKannada(text) {
  if (!("speechSynthesis" in window)) {
    alert("Speech playback is not supported by this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "kn-IN";

  const voices = window.speechSynthesis.getVoices();
  const kannadaVoice = voices.find(voice =>
    voice.lang.toLowerCase().startsWith("kn")
  );

  if (kannadaVoice) {
    utterance.voice = kannadaVoice;
  }

  utterance.onerror = () => {
    alert("Speech playback failed. Please try another browser or device.");
  };

  window.speechSynthesis.speak(utterance);
}

searchInput.addEventListener("input", renderPhrases);

document.getElementById("showAll").addEventListener("click", () => {
  selectedCategory = "All";
  searchInput.value = "";
  renderCategories();
  renderPhrases();
});

const quizArea = document.getElementById("quizArea");
const startQuiz = document.getElementById("startQuiz");

let quizQuestions = [];
let quizIndex = 0;
let score = 0;
let answered = false;

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function beginQuiz() {
  quizQuestions = shuffle(phrases).slice(
    0, Math.min(5, phrases.length)
  );
  quizIndex = 0;
  score = 0;
  startQuiz.hidden = true;
  quizArea.hidden = false;
  showQuestion();
}

function showQuestion() {
  answered = false;
  quizArea.replaceChildren();

  if (quizIndex >= quizQuestions.length) {
    const heading = document.createElement("h3");
    heading.textContent = "Quiz complete!";

    const result = document.createElement("p");
    result.textContent =
      `Your score: ${score} out of ${quizQuestions.length}`;

    const restart = document.createElement("button");
    restart.className = "primary-button";
    restart.textContent = "Try again";
    restart.addEventListener("click", beginQuiz);

    quizArea.append(heading, result, restart);
    startQuiz.hidden = false;
    startQuiz.textContent = "Play again →";
    return;
  }

  const question = quizQuestions[quizIndex];

  const progress = document.createElement("p");
  progress.className = "eyebrow";
  progress.textContent =
    `QUESTION ${quizIndex + 1} OF ${quizQuestions.length}`;

  const heading = document.createElement("h3");
  heading.textContent = question.english;

  const instruction = document.createElement("p");
  instruction.textContent = "Choose the correct Kannada phrase:";

  const options = shuffle([
    question,
    ...shuffle(
      phrases.filter(item => item !== question)
    ).slice(0, 3)
  ]);

  const optionContainer = document.createElement("div");
  optionContainer.className = "quiz-options";

  const feedback = document.createElement("p");
  feedback.className = "feedback";
  feedback.setAttribute("aria-live", "polite");

  options.forEach(option => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = option.kannada;

    button.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      if (option === question) {
        score++;
        feedback.textContent = "Correct! ಚೆನ್ನಾಗಿದೆ!";
      } else {
        feedback.textContent =
          "Not quite. The correct answer is: " +
          question.kannada;
      }

      Array.from(optionContainer.children).forEach(
        answer => answer.disabled = true
      );

      const next = document.createElement("button");
      next.className = "primary-button";
      next.textContent =
        quizIndex === quizQuestions.length - 1
          ? "See result"
          : "Next question";

      next.addEventListener("click", () => {
        quizIndex++;
        showQuestion();
      });

      quizArea.appendChild(next);
    });

    optionContainer.appendChild(button);
  });

  quizArea.append(progress, heading, instruction, optionContainer, feedback);
}

startQuiz.addEventListener("click", beginQuiz);

renderCategories();
renderPhrases();

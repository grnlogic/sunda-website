document.addEventListener("DOMContentLoaded", function () {
  // Game modal elements
  const modal = document.getElementById("game-modal");
  const modalTitle = document.getElementById("game-title");
  const gameContainer = document.getElementById("game-container");
  const closeModalBtn = document.querySelector(".close-modal");

  // Game buttons
  const gameButtons = document.querySelectorAll(".game-btn");

  // Setup event listeners for game buttons
  if (gameButtons.length > 0) {
    gameButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const gameType = this.getAttribute("data-game");
        startGame(gameType);
      });
    });
  }

  // Close modal event
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      closeGameModal();
    });
  }

  // Close modal when clicking outside the content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeGameModal();
    }
  });

  // Start a game based on its type
  function startGame(gameType) {
    if (!modal || !modalTitle || !gameContainer) return;

    // Set the game title
    modalTitle.textContent = getGameTitle(gameType);

    // Load game content
    gameContainer.innerHTML = getGameContent(gameType);

    // Show the modal
    modal.classList.add("active");

    // Initialize the game
    initializeGame(gameType);
  }

  // Get title for a specific game
  function getGameTitle(type) {
    const titles = {
      "word-guess": "Tebak Kecap Sunda",
      "sentence-builder": "Susun Kalimah Sunda",
      "culture-quiz": "Kuis Budaya Sunda",
    };
    return titles[type] || "Kaulinan Basa Sunda";
  }

  // Get HTML content for a specific game
  function getGameContent(type) {
    let content = "";

    switch (type) {
      case "word-guess":
        content = `
                    <div class="word-guess-game">
                        <div class="game-score">
                            <span>Skor: <span id="current-score">0</span></span>
                        </div>
                        <div class="game-question">
                            <p>Tebak kata Sunda yang artinya:</p>
                            <h3 id="word-meaning"></h3>
                        </div>
                        <div class="game-options" id="word-options">
                            <!-- Options will be added here -->
                        </div>
                        <div class="game-feedback" id="game-feedback"></div>
                        <div class="game-controls">
                            <button class="btn primary-btn" id="next-word-btn" disabled>Kecap Salajengna</button>
                        </div>
                    </div>
                `;
        break;

      case "sentence-builder":
        content = `
                    <div class="sentence-builder-game">
                        <div class="game-score">
                            <span>Skor: <span id="current-score">0</span></span>
                        </div>
                        <div class="game-question">
                            <p>Susun kecap-kecap ieu jadi kalimah nu bener:</p>
                        </div>
                        <div class="word-container" id="word-bank">
                            <!-- Scrambled words will be added here -->
                        </div>
                        <div class="sentence-area">
                            <div class="sentence-result" id="sentence-result">
                                <!-- Built sentence will appear here -->
                            </div>
                            <button class="btn secondary-btn" id="clear-sentence-btn">Beresihan</button>
                        </div>
                        <div class="game-feedback" id="game-feedback"></div>
                        <div class="game-controls">
                            <button class="btn primary-btn" id="check-sentence-btn">Pariksa</button>
                            <button class="btn primary-btn" id="next-sentence-btn" disabled>Kalimah Salajengna</button>
                        </div>
                    </div>
                `;
        break;

      case "culture-quiz":
        content = `
                    <div class="culture-quiz-game">
                        <div class="game-score">
                            <span>Skor: <span id="current-score">0</span></span>
                            <span class="quiz-progress">Soal: <span id="question-number">1</span>/<span id="total-questions">10</span></span>
                        </div>
                        <div class="quiz-content">
                            <div class="quiz-image" id="quiz-image">
                                <!-- Culture image will appear here -->
                            </div>
                            <div class="quiz-question">
                                <h3 id="quiz-question-text"></h3>
                            </div>
                        </div>
                        <div class="quiz-options" id="quiz-options">
                            <!-- Quiz options will be added here -->
                        </div>
                        <div class="game-feedback" id="game-feedback"></div>
                        <div class="game-controls">
                            <button class="btn primary-btn" id="next-question-btn" disabled>Soal Salajengna</button>
                        </div>
                    </div>
                `;
        break;

      default:
        content = "<p>Kaulinan teu kapanggih.</p>";
    }

    return content;
  }

  // Initialize the specific game
  function initializeGame(type) {
    switch (type) {
      case "word-guess":
        initWordGuessGame();
        break;

      case "sentence-builder":
        initSentenceBuilderGame();
        break;

      case "culture-quiz":
        initCultureQuizGame();
        break;
    }
  }

  // Close the game modal
  function closeGameModal() {
    if (modal) {
      modal.classList.remove("active");

      // Clear the game container
      if (gameContainer) {
        setTimeout(() => {
          gameContainer.innerHTML = "";
        }, 300); // Wait for modal closing animation
      }
    }
  }

  // Word Guess Game Implementation
  function initWordGuessGame() {
    // Word list: Sundanese words with their meanings
    const wordList = [
      { word: "Someah", meaning: "Ramah" },
      { word: "Bageur", meaning: "Baik hati" },
      { word: "Hade", meaning: "Bagus/Baik" },
      { word: "Geulis", meaning: "Cantik" },
      { word: "Kasep", meaning: "Tampan" },
      { word: "Dahar", meaning: "Makan" },
      { word: "Sare", meaning: "Tidur" },
      { word: "Ageung", meaning: "Besar" },
      { word: "Alit", meaning: "Kecil" },
      { word: "Bungah", meaning: "Senang" },
    ];

    let currentWordIndex = -1;
    let score = 0;
    let currentOptions = [];

    // Get UI elements
    const wordMeaning = document.getElementById("word-meaning");
    const wordOptions = document.getElementById("word-options");
    const gameFeedback = document.getElementById("game-feedback");
    const nextWordBtn = document.getElementById("next-word-btn");
    const scoreDisplay = document.getElementById("current-score");

    // Set initial score
    if (scoreDisplay) scoreDisplay.textContent = score;

    // Next word button click handler
    if (nextWordBtn) {
      nextWordBtn.addEventListener("click", loadNextWord);
    }

    // Load the first word
    loadNextWord();

    // Function to load the next word
    function loadNextWord() {
      // Reset UI state
      if (gameFeedback) gameFeedback.innerHTML = "";
      if (nextWordBtn) nextWordBtn.disabled = true;

      // Get a new word index that's different from the current one
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * wordList.length);
      } while (newIndex === currentWordIndex && wordList.length > 1);

      currentWordIndex = newIndex;
      const currentWord = wordList[currentWordIndex];

      // Display the meaning
      if (wordMeaning) wordMeaning.textContent = currentWord.meaning;

      // Create options (include the correct answer and 3 random wrong answers)
      currentOptions = generateOptions(currentWord, wordList);

      // Display options
      if (wordOptions) {
        wordOptions.innerHTML = "";

        currentOptions.forEach((option, index) => {
          const optionButton = document.createElement("button");
          optionButton.classList.add("option-btn");
          optionButton.textContent = option;
          optionButton.dataset.index = index;

          optionButton.addEventListener("click", function () {
            checkAnswer(this.textContent, currentWord.word);
          });

          wordOptions.appendChild(optionButton);
        });
      }
    }

    // Generate options for the word guess game
    function generateOptions(currentWord, allWords) {
      const options = [currentWord.word]; // Include the correct answer

      // Add 3 random wrong answers
      while (options.length < 4 && options.length < allWords.length) {
        const randomIndex = Math.floor(Math.random() * allWords.length);
        const randomWord = allWords[randomIndex].word;

        if (randomWord !== currentWord.word && !options.includes(randomWord)) {
          options.push(randomWord);
        }
      }

      // Shuffle the options
      return shuffleArray(options);
    }

    // Check if the selected answer is correct
    function checkAnswer(selectedWord, correctWord) {
      // Disable all option buttons
      const optionButtons = document.querySelectorAll(".option-btn");
      optionButtons.forEach((btn) => {
        btn.disabled = true;

        if (btn.textContent === correctWord) {
          btn.classList.add("correct-option");
        } else if (
          btn.textContent === selectedWord &&
          selectedWord !== correctWord
        ) {
          btn.classList.add("wrong-option");
        }
      });

      // Check if answer is correct
      const isCorrect = selectedWord === correctWord;

      // Update feedback
      if (gameFeedback) {
        if (isCorrect) {
          gameFeedback.innerHTML =
            '<div class="correct-feedback">Bener! 🎉</div>';
          score += 10;
        } else {
          gameFeedback.innerHTML = `<div class="wrong-feedback">Lepat! Jawaban anu leres nyaéta "${correctWord}"</div>`;
        }
      }

      // Update score
      if (scoreDisplay) scoreDisplay.textContent = score;

      // Enable next button
      if (nextWordBtn) nextWordBtn.disabled = false;
    }
  }

  // Sentence Builder Game Implementation
  function initSentenceBuilderGame() {
    // Sentence list: Correct Sundanese sentences and their words (scrambled)
    const sentenceList = [
      {
        correct: "Urang Sunda mah someah ka semah",
        translation: "Orang Sunda itu ramah kepada tamu",
      },
      {
        correct: "Abdi resep diajar basa Sunda",
        translation: "Saya suka belajar bahasa Sunda",
      },
      {
        correct: "Kumaha damang sadayana",
        translation: "Apa kabar semuanya",
      },
      {
        correct: "Hatur nuhun kana bantosanana",
        translation: "Terima kasih atas bantuannya",
      },
      {
        correct: "Wilujeng sumping ka sakola abdi",
        translation: "Selamat datang ke sekolah saya",
      },
    ];

    let currentSentenceIndex = -1;
    let score = 0;
    let selectedWords = [];

    // Get UI elements
    const wordBank = document.getElementById("word-bank");
    const sentenceResult = document.getElementById("sentence-result");
    const gameFeedback = document.getElementById("game-feedback");
    const checkSentenceBtn = document.getElementById("check-sentence-btn");
    const nextSentenceBtn = document.getElementById("next-sentence-btn");
    const clearSentenceBtn = document.getElementById("clear-sentence-btn");
    const scoreDisplay = document.getElementById("current-score");

    // Set initial score
    if (scoreDisplay) scoreDisplay.textContent = score;

    // Next sentence button click handler
    if (nextSentenceBtn) {
      nextSentenceBtn.addEventListener("click", loadNextSentence);
    }

    // Check sentence button click handler
    if (checkSentenceBtn) {
      checkSentenceBtn.addEventListener("click", checkSentence);
    }

    // Clear sentence button click handler
    if (clearSentenceBtn) {
      clearSentenceBtn.addEventListener("click", clearSentence);
    }

    // Load the first sentence
    loadNextSentence();

    // Function to load the next sentence
    function loadNextSentence() {
      // Reset UI state
      if (gameFeedback) gameFeedback.innerHTML = "";
      if (nextSentenceBtn) nextSentenceBtn.disabled = true;
      if (checkSentenceBtn) checkSentenceBtn.disabled = false;

      // Clear selected words
      selectedWords = [];
      updateSentenceResult();

      // Get a new sentence index that's different from the current one
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * sentenceList.length);
      } while (newIndex === currentSentenceIndex && sentenceList.length > 1);

      currentSentenceIndex = newIndex;
      const currentSentence = sentenceList[currentSentenceIndex];

      // Split sentence into words and shuffle
      const words = currentSentence.correct.split(" ");
      const scrambledWords = shuffleArray([...words]);

      // Display the translation as a hint
      if (gameFeedback) {
        gameFeedback.innerHTML = `<div class="hint">Arti: "${currentSentence.translation}"</div>`;
      }

      // Display scrambled words
      if (wordBank) {
        wordBank.innerHTML = "";

        scrambledWords.forEach((word) => {
          const wordButton = document.createElement("button");
          wordButton.classList.add("word-btn");
          wordButton.textContent = word;
          wordButton.dataset.word = word;

          wordButton.addEventListener("click", function () {
            selectWord(this);
          });

          wordBank.appendChild(wordButton);
        });
      }
    }

    // Function to handle word selection
    function selectWord(wordBtn) {
      if (!wordBtn.classList.contains("selected")) {
        wordBtn.classList.add("selected");
        selectedWords.push(wordBtn.dataset.word);
        updateSentenceResult();
      }
    }

    // Function to update the sentence result area
    function updateSentenceResult() {
      if (sentenceResult) {
        sentenceResult.innerHTML = "";

        selectedWords.forEach((word, index) => {
          const wordSpan = document.createElement("span");
          wordSpan.classList.add("result-word");
          wordSpan.textContent = word;
          wordSpan.dataset.index = index;

          wordSpan.addEventListener("click", function () {
            removeWord(parseInt(this.dataset.index));
          });

          sentenceResult.appendChild(wordSpan);

          // Add space after each word except the last one
          if (index < selectedWords.length - 1) {
            sentenceResult.appendChild(document.createTextNode(" "));
          }
        });
      }
    }

    // Function to remove a word from the selected words
    function removeWord(index) {
      // Remove the word from the selected words array
      if (index >= 0 && index < selectedWords.length) {
        const removedWord = selectedWords[index];
        selectedWords.splice(index, 1);

        // Unselect the corresponding button in the word bank
        const wordButtons = document.querySelectorAll(".word-btn");
        wordButtons.forEach((btn) => {
          if (
            btn.dataset.word === removedWord &&
            btn.classList.contains("selected")
          ) {
            btn.classList.remove("selected");
            return;
          }
        });

        // Update the sentence result
        updateSentenceResult();
      }
    }

    // Function to clear the sentence
    function clearSentence() {
      selectedWords = [];

      // Unselect all word buttons
      const wordButtons = document.querySelectorAll(".word-btn");
      wordButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });

      // Update the sentence result
      updateSentenceResult();
    }

    // Function to check if the built sentence is correct
    function checkSentence() {
      const builtSentence = selectedWords.join(" ");
      const correctSentence = sentenceList[currentSentenceIndex].correct;

      // Check if the sentence is correct
      const isCorrect = builtSentence === correctSentence;

      // Update feedback
      if (gameFeedback) {
        if (isCorrect) {
          gameFeedback.innerHTML =
            '<div class="correct-feedback">Bener! Kalimah téh bener! 🎉</div>';
          score += 15;
        } else {
          gameFeedback.innerHTML = `
                        <div class="wrong-feedback">
                            Lepat! Kalimah anu bener nyaéta:
                            <div class="correct-sentence">"${correctSentence}"</div>
                        </div>
                    `;
        }
      }

      // Update score
      if (scoreDisplay) scoreDisplay.textContent = score;

      // Disable check button and enable next button
      if (checkSentenceBtn) checkSentenceBtn.disabled = true;
      if (nextSentenceBtn) nextSentenceBtn.disabled = false;
    }
  }

  // Culture Quiz Game Implementation
  function initCultureQuizGame() {
    // Quiz questions
    const quizQuestions = [
      {
        question:
          "Alat musik tradisional Sunda yang terbuat dari bambu dan dimainkan dengan cara dipukul adalah...",
        image: "img/quiz/angklung.jpg",
        options: ["Angklung", "Calung", "Kecapi", "Suling"],
        answer: "Angklung",
      },
      {
        question:
          "Tarian tradisional Sunda yang diciptakan oleh Gugum Gumbira adalah...",
        image: "img/quiz/jaipongan.jpg",
        options: ["Merak", "Jaipong", "Topeng", "Ketuk Tilu"],
        answer: "Jaipong",
      },
      {
        question:
          "Cerita rakyat Sunda tentang asal-usul Gunung Tangkuban Parahu melibatkan tokoh...",
        image: "img/quiz/sangkuriang.jpg",
        options: [
          "Lutung Kasarung",
          "Sangkuriang",
          "Si Kabayan",
          "Mundinglaya",
        ],
        answer: "Sangkuriang",
      },
      {
        question: "Pakaian tradisional pria Sunda disebut...",
        image: "img/quiz/pangsi.jpg",
        options: ["Kebaya", "Beskap", "Pangsi", "Surjan"],
        answer: "Pangsi",
      },
      {
        question:
          "Makanan khas Sunda yang terbuat dari oncom yang difermentasi adalah...",
        image: "img/quiz/tutug_oncom.jpg",
        options: ["Nasi Tutug Oncom", "Karedok", "Soto Bandung", "Surabi"],
        answer: "Nasi Tutug Oncom",
      },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    // Get UI elements
    const questionNumber = document.getElementById("question-number");
    const totalQuestions = document.getElementById("total-questions");
    const quizImage = document.getElementById("quiz-image");
    const questionText = document.getElementById("quiz-question-text");
    const quizOptions = document.getElementById("quiz-options");
    const gameFeedback = document.getElementById("game-feedback");
    const nextQuestionBtn = document.getElementById("next-question-btn");
    const scoreDisplay = document.getElementById("current-score");

    // Set initial score and question numbers
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (totalQuestions) totalQuestions.textContent = quizQuestions.length;
    if (questionNumber) questionNumber.textContent = currentQuestionIndex + 1;

    // Next question button click handler
    if (nextQuestionBtn) {
      nextQuestionBtn.addEventListener("click", () => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
          loadQuestion(currentQuestionIndex);
        } else {
          // Quiz completed
          showQuizResults();
        }
      });
    }

    // Load the first question
    loadQuestion(currentQuestionIndex);

    // Function to load a question
    function loadQuestion(index) {
      // Reset UI state
      if (gameFeedback) gameFeedback.innerHTML = "";
      if (nextQuestionBtn) nextQuestionBtn.disabled = true;

      const question = quizQuestions[index];

      // Update question number
      if (questionNumber) questionNumber.textContent = index + 1;

      // Display question
      if (questionText) questionText.textContent = question.question;

      // Display image if available
      if (quizImage) {
        quizImage.innerHTML = `<img src="${question.image}" alt="Quiz Image">`;
      }

      // Display options
      if (quizOptions) {
        quizOptions.innerHTML = "";

        question.options.forEach((option) => {
          const optionButton = document.createElement("button");
          optionButton.classList.add("quiz-option-btn");
          optionButton.textContent = option;

          optionButton.addEventListener("click", function () {
            checkQuizAnswer(this.textContent, question.answer);
          });

          quizOptions.appendChild(optionButton);
        });
      }
    }

    // Function to check quiz answer
    function checkQuizAnswer(selectedOption, correctOption) {
      // Disable all option buttons
      const optionButtons = document.querySelectorAll(".quiz-option-btn");
      optionButtons.forEach((btn) => {
        btn.disabled = true;

        if (btn.textContent === correctOption) {
          btn.classList.add("correct-option");
        } else if (
          btn.textContent === selectedOption &&
          selectedOption !== correctOption
        ) {
          btn.classList.add("wrong-option");
        }
      });

      // Check if answer is correct
      const isCorrect = selectedOption === correctOption;

      // Update feedback
      if (gameFeedback) {
        if (isCorrect) {
          gameFeedback.innerHTML =
            '<div class="correct-feedback">Bener! 🎉</div>';
          score += 20;
        } else {
          gameFeedback.innerHTML = `<div class="wrong-feedback">Lepat! Jawaban anu leres nyaéta "${correctOption}"</div>`;
        }
      }

      // Update score
      if (scoreDisplay) scoreDisplay.textContent = score;

      // Enable next button
      if (nextQuestionBtn) {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          nextQuestionBtn.disabled = false;
          nextQuestionBtn.textContent = "Soal Salajengna";
        } else {
          nextQuestionBtn.disabled = false;
          nextQuestionBtn.textContent = "Tingali Hasil";
        }
      }
    }

    // Function to show quiz results
    function showQuizResults() {
      // Calculate percentage
      const percentage = Math.round(
        (score / (quizQuestions.length * 20)) * 100
      );

      // Display results
      if (gameContainer) {
        gameContainer.innerHTML = `
                    <div class="quiz-results">
                        <h2>Hasil Kuis Budaya Sunda</h2>
                        <div class="result-score">
                            <div class="score-circle">
                                <span class="score-value">${percentage}%</span>
                            </div>
                        </div>
                        <p>Anjeun meunang skor ${score} tina ${
          quizQuestions.length * 20
        } poin.</p>
                        <div class="result-message">
                            ${getResultMessage(percentage)}
                        </div>
                        <button class="btn primary-btn" id="restart-quiz-btn">Ulangi Kuis</button>
                        <button class="btn secondary-btn" id="close-result-btn">Tutup</button>
                    </div>
                `;

        // Add event listeners for result buttons
        const restartBtn = document.getElementById("restart-quiz-btn");
        const closeBtn = document.getElementById("close-result-btn");

        if (restartBtn) {
          restartBtn.addEventListener("click", function () {
            // Restart the quiz
            initCultureQuizGame();
          });
        }

        if (closeBtn) {
          closeBtn.addEventListener("click", function () {
            // Close the modal
            closeGameModal();
          });
        }
      }
    }

    // Get result message based on percentage
    function getResultMessage(percentage) {
      if (percentage >= 80) {
        return "<strong>Hasil pintar pisan!</strong> Anjeun terang seueur ngeunaan budaya Sunda!";
      } else if (percentage >= 60) {
        return "<strong>Hasil saé!</strong> Anjeun terang sababaraha hal ngeunaan budaya Sunda.";
      } else {
        return "<strong>Kudu leuwih diajar deui!</strong> Hayu urang terus diajar budaya Sunda.";
      }
    }
  }

  // Utility function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Add game-specific CSS
  document.head.insertAdjacentHTML(
    "beforeend",
    `
    <style>
        /* Game Modal Specific Styles */
        .word-guess-game, .sentence-builder-game, .culture-quiz-game {
            padding: 20px 0;
        }
        
        .game-score {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--primary-dark);
        }
        
        .game-question {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .game-question p {
            margin-bottom: 10px;
            color: #666;
        }
        
        .game-question h3 {
            font-size: 1.8rem;
            color: var(--primary-dark);
        }
        
        /* Word Guess Game Styles */
        .game-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .option-btn {
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            background-color: white;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .option-btn:hover {
            border-color: var(--primary-color);
            transform: translateY(-3px);
        }
        
        .option-btn:disabled {
            cursor: not-allowed;
        }
        
        .correct-option {
            background-color: #d4edda;
            border-color: #c3e6cb;
            color: #155724;
        }
        
        .wrong-option {
            background-color: #f8d7da;
            border-color: #f5c6cb;
            color: #721c24;
        }
        
        .game-feedback {
            min-height: 60px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .correct-feedback, .wrong-feedback, .hint {
            padding: 10px 15px;
            border-radius: 8px;
            animation: fadeIn 0.5s ease;
        }
        
        .correct-feedback {
            background-color: #d4edda;
            color: #155724;
        }
        
        .wrong-feedback {
            background-color: #f8d7da;
            color: #721c24;
        }
        
        .hint {
            background-color: #cce5ff;
            color: #004085;
        }
        
        .game-controls {
            display: flex;
            justify-content: center;
            gap: 15px;
        }
        
        /* Sentence Builder Game Styles */
        .word-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 30px;
            justify-content: center;
        }
        
        .word-btn {
            padding: 10px 15px;
            background-color: var(--primary-light);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .word-btn:hover {
            background-color: var(--primary-color);
            transform: translateY(-3px);
        }
        
        .word-btn.selected {
            opacity: 0.5;
            transform: scale(0.95);
        }
        
        .sentence-area {
            background-color: #f9f9f9;
            border-radius: 10px;
            padding: 20px;
            min-height: 100px;
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }
        
        .sentence-result {
            min-height: 50px;
            text-align: center;
            font-size: 1.2rem;
            width: 100%;
        }
        
        .result-word {
            display: inline-block;
            padding: 5px 10px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 5px;
            margin: 0 3px 5px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .result-word:hover {
            background-color: var(--primary-dark);
            transform: scale(1.05);
        }
        
        .correct-sentence {
            font-weight: 600;
            margin-top: 10px;
            font-size: 1.1rem;
        }
        
        /* Culture Quiz Game Styles */
        .quiz-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .quiz-image {
            width: 100%;
            max-width: 400px;
            height: 200px;
            overflow: hidden;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .quiz-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .quiz-question {
            text-align: center;
        }
        
        .quiz-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .quiz-option-btn {
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            background-color: white;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .quiz-option-btn:hover {
            border-color: var(--primary-color);
        }
        
        /* Quiz Results Styles */
        .quiz-results {
            text-align: center;
            padding: 20px 0;
        }
        
        .result-score {
            display: flex;
            justify-content: center;
            margin: 30px 0;
        }
        
        .score-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: linear-gradient(to right, var(--primary-light), var(--primary-dark));
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 2.5rem;
            font-weight: 700;
            animation: scaleIn 0.5s ease;
        }
        
        .result-message {
            margin: 20px 0 30px;
            font-size: 1.2rem;
            color: #555;
        }
        
        @keyframes scaleIn {
            from {
                transform: scale(0);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
            .game-options, .quiz-options {
                grid-template-columns: 1fr;
            }
        }
    </style>
    `
  );
});

document.addEventListener("DOMContentLoaded", function () {
  // Hide loading screen after page loads
  setTimeout(function () {
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.classList.add("hidden");
  }, 1500);

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  // Daily word flip functionality
  const flipButton = document.getElementById("flip-word-btn");
  const wordCard = document.querySelector(".word-card");

  if (flipButton && wordCard) {
    flipButton.addEventListener("click", function () {
      wordCard.classList.toggle("flipped");
    });
  }

  // Play audio button functionality
  const playAudioBtn = document.getElementById("play-audio-btn");
  if (playAudioBtn) {
    playAudioBtn.addEventListener("click", function () {
      const audio = new Audio("audio/someah.mp3");
      audio.play();
    });
  }

  // Grade selection functionality
  const gradeButtons = document.querySelectorAll(".grade-btn");
  if (gradeButtons.length > 0) {
    gradeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        gradeButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Here you would load materials for the selected grade
        const grade = this.getAttribute("data-grade");
        loadMaterialsForGrade(grade);
      });
    });
  }

  // Function to load materials for a specific grade
  function loadMaterialsForGrade(grade) {
    console.log(`Loading materials for grade ${grade}`);

    // Simulate loading different materials for different grades
    const categories = document.querySelectorAll(".category-card");

    // Add loading animation
    categories.forEach((category) => {
      category.classList.add("loading");
    });

    // Simulate AJAX request with setTimeout
    setTimeout(() => {
      categories.forEach((category) => {
        category.classList.remove("loading");
      });

      // Update content based on grade
      const gradeContent = {
        10: {
          ngabasa: "Kaidah basa Sunda, éjahan, jeung paguneman tingkat dasar",
          sastra: "Sajak, carita pondok, jeung wawacan tingkat dasar",
          budaya: "Tradisi, pakéan adat, kadaharan Sunda tingkat dasar",
        },
        11: {
          ngabasa:
            "Kaidah basa Sunda, éjahan, jeung paguneman tingkat menengah",
          sastra: "Pupuh, guguritan, jeung novel Sunda tingkat menengah",
          budaya: "Upacara adat, seni jeung karajinan Sunda tingkat menengah",
        },
        12: {
          ngabasa: "Kaidah basa Sunda, éjahan, jeung paguneman tingkat lanjut",
          sastra:
            "Kritik sastra, drama, jeung sajak modern Sunda tingkat lanjut",
          budaya: "Filsafat, sejarah, jeung identitas Sunda tingkat lanjut",
        },
      };

      // Update category descriptions
      categories.forEach((category) => {
        const categoryType = category.getAttribute("data-category");
        const descriptionElement = category.querySelector("p");

        if (
          descriptionElement &&
          gradeContent[grade] &&
          gradeContent[grade][categoryType]
        ) {
          descriptionElement.textContent = gradeContent[grade][categoryType];

          // Add animation for content change
          descriptionElement.classList.add("content-changed");
          setTimeout(() => {
            descriptionElement.classList.remove("content-changed");
          }, 500);
        }
      });
    }, 800);
  }

  // Exercise buttons click handler
  const exerciseButtons = document.querySelectorAll(".exercise-btn");
  if (exerciseButtons.length > 0) {
    exerciseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const exerciseType = this.getAttribute("data-exercise");
        startExercise(exerciseType);
      });
    });
  }

  // Function to start a specific exercise
  function startExercise(type) {
    console.log(`Starting exercise: ${type}`);

    // For demo purposes, we'll open a modal with some content
    const modal = document.getElementById("game-modal");
    const modalTitle = document.getElementById("game-title");
    const gameContainer = document.getElementById("game-container");

    if (modal && modalTitle && gameContainer) {
      modalTitle.textContent = getExerciseTitle(type);
      gameContainer.innerHTML = getExerciseContent(type);
      modal.classList.add("active");

      // Add event listeners for the exercise
      setupExerciseEventListeners(type);
    }
  }

  // Function to get title for a specific exercise
  function getExerciseTitle(type) {
    const titles = {
      "multiple-choice": "Latihan Pilihan Ganda",
      matching: "Latihan Jodohan Kecap",
      sentence: "Latihan Susun Kalimah",
    };
    return titles[type] || "Latihan";
  }

  // Function to get content for a specific exercise
  function getExerciseContent(type) {
    let content = "";

    switch (type) {
      case "multiple-choice":
        content = `
                    <div class="quiz-container">
                        <div class="question">
                            <p>Pilih arti yang tepat untuk kata "Someah":</p>
                        </div>
                        <div class="options">
                            <div class="option">
                                <input type="radio" id="option1" name="answer" value="A">
                                <label for="option1">A. Sombong</label>
                            </div>
                            <div class="option">
                                <input type="radio" id="option2" name="answer" value="B">
                                <label for="option2">B. Ramah</label>
                            </div>
                            <div class="option">
                                <input type="radio" id="option3" name="answer" value="C">
                                <label for="option3">C. Marah</label>
                            </div>
                            <div class="option">
                                <input type="radio" id="option4" name="answer" value="D">
                                <label for="option4">D. Sedih</label>
                            </div>
                        </div>
                        <div class="quiz-actions">
                            <button class="btn primary-btn" id="check-answer-btn">Periksa Jawaban</button>
                        </div>
                        <div class="result" id="quiz-result"></div>
                    </div>
                `;
        break;
      case "matching":
        content = `
                    <div class="matching-container">
                        <p class="instruction">Tarik kata di sebelah kiri ke pasangan arti yang benar di sebelah kanan.</p>
                        <div class="matching-game">
                            <div class="sundanese-words" id="sundanese-words">
                                <div class="word" draggable="true" data-word="someah">Someah</div>
                                <div class="word" draggable="true" data-word="bageur">Bageur</div>
                                <div class="word" draggable="true" data-word="hade">Hade</div>
                            </div>
                            <div class="indonesian-words" id="indonesian-words">
                                <div class="word-target" data-target="someah">Ramah</div>
                                <div class="word-target" data-target="bageur">Baik hati</div>
                                <div class="word-target" data-target="hade">Bagus</div>
                            </div>
                        </div>
                        <div class="quiz-actions">
                            <button class="btn primary-btn" id="check-matching-btn">Periksa Jawaban</button>
                        </div>
                        <div class="result" id="matching-result"></div>
                    </div>
                `;
        break;
      case "sentence":
        content = `
                    <div class="sentence-container">
                        <p class="instruction">Susun kata-kata berikut menjadi kalimat yang benar.</p>
                        <div class="scrambled-words" id="scrambled-words">
                            <div class="word" draggable="true">ka</div>
                            <div class="word" draggable="true">someah</div>
                            <div class="word" draggable="true">Urang</div>
                            <div class="word" draggable="true">Sunda</div>
                            <div class="word" draggable="true">mah</div>
                            <div class="word" draggable="true">semah</div>
                        </div>
                        <div class="sentence-result" id="sentence-result">
                            <!-- Sentence will be built here -->
                        </div>
                        <div class="quiz-actions">
                            <button class="btn secondary-btn" id="reset-sentence-btn">Reset</button>
                            <button class="btn primary-btn" id="check-sentence-btn">Periksa Jawaban</button>
                        </div>
                        <div class="result" id="sentence-check-result"></div>
                    </div>
                `;
        break;
      default:
        content = "<p>Jenis latihan tidak ditemukan.</p>";
    }

    return content;
  }

  // Function to set up event listeners for exercises
  function setupExerciseEventListeners(type) {
    switch (type) {
      case "multiple-choice":
        setupMultipleChoiceEvents();
        break;
      case "matching":
        setupMatchingEvents();
        break;
      case "sentence":
        setupSentenceEvents();
        break;
    }
  }

  // Set up multiple choice exercise events
  function setupMultipleChoiceEvents() {
    const checkBtn = document.getElementById("check-answer-btn");
    const result = document.getElementById("quiz-result");

    if (checkBtn && result) {
      checkBtn.addEventListener("click", function () {
        const selectedOption = document.querySelector(
          'input[name="answer"]:checked'
        );

        if (!selectedOption) {
          result.innerHTML =
            '<div class="error">Pilih jawaban terlebih dahulu!</div>';
          return;
        }

        const answer = selectedOption.value;

        if (answer === "B") {
          result.innerHTML =
            '<div class="success">Benar! "Someah" artinya "Ramah".</div>';

          // Add score to user progress
          updateUserProgress("quiz", 10);
        } else {
          result.innerHTML =
            '<div class="error">Salah! Jawaban yang benar adalah B. Ramah.</div>';
        }
      });
    }
  }

  // Set up matching exercise events
  function setupMatchingEvents() {
    let dragged = null;
    const words = document.querySelectorAll(".sundanese-words .word");
    const targets = document.querySelectorAll(".word-target");
    const checkBtn = document.getElementById("check-matching-btn");
    const result = document.getElementById("matching-result");

    if (words && targets) {
      words.forEach((word) => {
        word.addEventListener("dragstart", function (e) {
          dragged = this;
          e.dataTransfer.setData("text/plain", this.dataset.word);
          setTimeout(() => this.classList.add("dragging"), 0);
        });

        word.addEventListener("dragend", function () {
          this.classList.remove("dragging");
        });
      });

      targets.forEach((target) => {
        target.addEventListener("dragover", function (e) {
          e.preventDefault();
          this.classList.add("drag-over");
        });

        target.addEventListener("dragleave", function () {
          this.classList.remove("drag-over");
        });

        target.addEventListener("drop", function (e) {
          e.preventDefault();
          this.classList.remove("drag-over");

          if (dragged) {
            this.appendChild(dragged);
            dragged = null;
          }
        });
      });
    }

    if (checkBtn && result) {
      checkBtn.addEventListener("click", function () {
        let correct = true;

        targets.forEach((target) => {
          const word = target.querySelector(".word");

          if (!word || word.dataset.word !== target.dataset.target) {
            correct = false;
          }
        });

        if (correct) {
          result.innerHTML =
            '<div class="success">Benar semua! Anda telah menjodohkan dengan benar.</div>';

          // Add score to user progress
          updateUserProgress("matching", 15);
        } else {
          result.innerHTML =
            '<div class="error">Masih ada yang salah. Coba lagi!</div>';
        }
      });
    }
  }

  // Set up sentence exercise events
  function setupSentenceEvents() {
    const scrambledWords = document.getElementById("scrambled-words");
    const sentenceResult = document.getElementById("sentence-result");
    const resetBtn = document.getElementById("reset-sentence-btn");
    const checkBtn = document.getElementById("check-sentence-btn");
    const result = document.getElementById("sentence-check-result");

    let dragged = null;

    if (scrambledWords && sentenceResult) {
      // Make words draggable
      const words = scrambledWords.querySelectorAll(".word");

      words.forEach((word) => {
        word.addEventListener("dragstart", function (e) {
          dragged = this;
          setTimeout(() => this.classList.add("dragging"), 0);
        });

        word.addEventListener("dragend", function () {
          this.classList.remove("dragging");
        });
      });

      // Make sentence result a drop target
      sentenceResult.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.classList.add("drag-over");
      });

      sentenceResult.addEventListener("dragleave", function () {
        this.classList.remove("drag-over");
      });

      sentenceResult.addEventListener("drop", function (e) {
        e.preventDefault();
        this.classList.remove("drag-over");

        if (dragged) {
          // Clone the word and append to the result
          const wordClone = dragged.cloneNode(true);
          this.appendChild(wordClone);

          // Remove the original word
          dragged.remove();
          dragged = null;
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        // Reset the sentence
        if (sentenceResult) {
          // Get all words from result
          const words = sentenceResult.querySelectorAll(".word");

          // Move them back to scrambled words
          words.forEach((word) => {
            if (scrambledWords) {
              scrambledWords.appendChild(word);
            }
          });
        }

        // Clear the result
        if (result) {
          result.innerHTML = "";
        }
      });
    }

    if (checkBtn && result) {
      checkBtn.addEventListener("click", function () {
        if (!sentenceResult) return;

        // Get all words in the sentence
        const words = sentenceResult.querySelectorAll(".word");
        let sentence = "";

        words.forEach((word) => {
          sentence += word.textContent + " ";
        });

        // Trim and check if the sentence is correct
        sentence = sentence.trim();
        const correctSentence = "Urang Sunda mah someah ka semah";

        if (sentence === correctSentence) {
          result.innerHTML =
            '<div class="success">Benar! Kalimat tersusun dengan tepat.</div>';

          // Add score to user progress
          updateUserProgress("sentence", 20);
        } else {
          result.innerHTML = `<div class="error">Masih kurang tepat. Kalimat yang benar adalah: "${correctSentence}"</div>`;
        }
      });
    }
  }

  // Initialize the Aksara Sunda converter
  initAksaraConverter();

  // Initialize the progress chart
  initProgressChart();

  // Populate Aksara Sunda grid
  populateAksaraGrid();

  // Tab functionality for media section
  const mediaTabs = document.querySelectorAll(".tab-btn");
  const mediaContents = document.querySelectorAll(".media-content");

  if (mediaTabs.length > 0 && mediaContents.length > 0) {
    mediaTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabName = this.getAttribute("data-tab");

        // Remove active class from all tabs and contents
        mediaTabs.forEach((t) => t.classList.remove("active"));
        mediaContents.forEach((c) => c.classList.remove("active"));

        // Add active class to selected tab and content
        this.classList.add("active");
        document.getElementById(`${tabName}-content`).classList.add("active");
      });
    });
  }

  // Close modal functionality
  const modal = document.getElementById("game-modal");
  const closeModalBtn = document.querySelector(".close-modal");

  if (modal && closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      modal.classList.remove("active");
    });

    // Close modal when clicking outside the content
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  // Forum search functionality
  const forumSearchInput = document.querySelector(".forum-search input");
  const forumSearchBtn = document.querySelector(".forum-search button");
  const topicCards = document.querySelectorAll(".topic-card");

  if (forumSearchInput && forumSearchBtn && topicCards.length > 0) {
    forumSearchBtn.addEventListener("click", function () {
      searchForumTopics();
    });

    forumSearchInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        searchForumTopics();
      }
    });

    function searchForumTopics() {
      const searchTerm = forumSearchInput.value.toLowerCase().trim();

      if (searchTerm === "") {
        // Show all topics if search term is empty
        topicCards.forEach((card) => {
          card.style.display = "flex";
        });
        return;
      }

      // Filter topics based on search term
      topicCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const content = card.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    }
  }
});

// Initialize Aksara Sunda converter
function initAksaraConverter() {
  const latinInput = document.getElementById("latin-input");
  const convertBtn = document.getElementById("convert-btn");
  const aksaraResult = document.getElementById("aksara-result");

  if (latinInput && convertBtn && aksaraResult) {
    convertBtn.addEventListener("click", function () {
      const latinText = latinInput.value.trim();

      if (latinText === "") {
        aksaraResult.textContent = "Ketik huruf latin terlebih dahulu";
        return;
      }

      // Convert latin to Aksara Sunda (simulated)
      const aksaraText = convertToAksara(latinText);
      aksaraResult.textContent = aksaraText;

      // Add animation
      aksaraResult.classList.add("converted");
      setTimeout(() => {
        aksaraResult.classList.remove("converted");
      }, 500);

      // Add to user progress
      updateUserProgress("aksara", 5);
    });
  }
}

// Function to simulate conversion to Aksara Sunda
function convertToAksara(latin) {
  // This is a simulation - in a real app, you would have a proper conversion system
  // Here we're just replacing with Unicode characters that look like Aksara Sunda

  // For demo purposes, we're using Javanese script as a visual substitute
  // (real Aksara Sunda would use the appropriate Unicode block)
  const mapping = {
    a: "ᮃ",
    b: "ᮘ",
    c: "ᮎ",
    d: "ᮓ",
    e: "ᮉ",
    f: "ᮖ",
    g: "ᮌ",
    h: "ᮠ",
    i: "ᮄ",
    j: "ᮏ",
    k: "ᮊ",
    l: "ᮜ",
    m: "ᮙ",
    n: "ᮔ",
    o: "ᮇ",
    p: "ᮕ",
    q: "ᮋ",
    r: "ᮛ",
    s: "ᮞ",
    t: "ᮒ",
    u: "ᮅ",
    v: "ᮗ",
    w: "ᮝ",
    x: "ᮟ",
    y: "ᮚ",
    z: "ᮐ",
    " ": " ",
  };

  let result = "";

  for (let i = 0; i < latin.length; i++) {
    const char = latin[i].toLowerCase();
    result += mapping[char] || char;
  }

  return result;
}

// Populate Aksara Sunda grid
function populateAksaraGrid() {
  const aksaraGrid = document.getElementById("aksara-grid");

  if (aksaraGrid) {
    // Basic Aksara Sunda characters (real Aksara Sunda characters)
    const aksaraChars = [
      { symbol: "ᮃ", latin: "a" },
      { symbol: "ᮄ", latin: "i" },
      { symbol: "ᮅ", latin: "u" },
      { symbol: "ᮉ", latin: "e" },
      { symbol: "ᮇ", latin: "o" },
      { symbol: "ᮊ", latin: "ka" },
      { symbol: "ᮌ", latin: "ga" },
      { symbol: "ᮍ", latin: "nga" },
      { symbol: "ᮎ", latin: "ca" },
      { symbol: "ᮏ", latin: "ja" },
      { symbol: "ᮑ", latin: "nya" },
      { symbol: "ᮒ", latin: "ta" },
    ];

    // Create and append aksara characters to the grid
    aksaraChars.forEach((char) => {
      const aksaraChar = document.createElement("div");
      aksaraChar.classList.add("aksara-char");

      aksaraChar.innerHTML = `
                <div class="symbol">${char.symbol}</div>
                <div class="latin">${char.latin}</div>
            `;

      aksaraChar.addEventListener("click", function () {
        const latinInput = document.getElementById("latin-input");
        if (latinInput) {
          latinInput.value += char.latin;
          latinInput.focus();
        }
      });

      aksaraGrid.appendChild(aksaraChar);
    });
  }
}

// Initialize the progress chart
function initProgressChart() {
  const ctx = document.getElementById("progress-chart");

  if (ctx) {
    // Sample data - in a real app, this would come from user's actual progress
    const chartData = {
      labels: ["Ngabasa", "Sastra", "Budaya", "Aksara", "Kaulinan"],
      datasets: [
        {
          label: "Skor Latihan",
          data: [75, 60, 85, 40, 90],
          backgroundColor: "rgba(46, 125, 50, 0.2)",
          borderColor: "rgba(46, 125, 50, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(46, 125, 50, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(46, 125, 50, 1)",
        },
      ],
    };

    // Create chart (using Chart.js - would need to include this library)
    if (typeof Chart !== "undefined") {
      new Chart(ctx, {
        type: "radar",
        data: chartData,
        options: {
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20,
              },
            },
          },
        },
      });
    } else {
      // Fallback if Chart.js is not available
      ctx.innerHTML =
        '<div class="chart-fallback">Progress chart menampilkan skor latihan dalam 5 kategori berbeda.</div>';
    }
  }
}

// Update user progress in localStorage
function updateUserProgress(activity, points) {
  let progress = JSON.parse(localStorage.getItem("userProgress")) || {
    materials: 0,
    games: 0,
    badges: 0,
    scores: {
      quiz: 0,
      matching: 0,
      sentence: 0,
      aksara: 0,
      game: 0,
    },
  };

  // Update scores
  if (activity in progress.scores) {
    progress.scores[activity] += points;
  }

  // Update counters
  if (
    activity === "quiz" ||
    activity === "matching" ||
    activity === "sentence"
  ) {
    progress.materials += 1;
  } else if (activity === "game") {
    progress.games += 1;
  }

  // Calculate badges
  const totalScore = Object.values(progress.scores).reduce(
    (total, score) => total + score,
    0
  );
  progress.badges = Math.floor(totalScore / 100); // One badge per 100 points

  // Save to localStorage
  localStorage.setItem("userProgress", JSON.stringify(progress));

  // Update UI
  updateProgressUI(progress);
}

// Update progress UI elements
function updateProgressUI(progress) {
  const materialsStat = document.querySelector(".stat-value:nth-child(2)");
  const gamesStat = document.querySelector(".stat-value:nth-child(5)");
  const badgesStat = document.querySelector(".stat-value:nth-child(8)");

  if (materialsStat) materialsStat.textContent = progress.materials;
  if (gamesStat) gamesStat.textContent = progress.games;
  if (badgesStat) badgesStat.textContent = progress.badges;
}

// Initialize progress from localStorage
function initUserProgress() {
  const progress = JSON.parse(localStorage.getItem("userProgress"));
  if (progress) {
    updateProgressUI(progress);
  }
}

// Call this when the page loads
document.addEventListener("DOMContentLoaded", initUserProgress);

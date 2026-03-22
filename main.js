// ===== QUIZMASTER PRO - AI-POWERED LEARNING PLATFORM =====

// ===== APP STATE =====
const appState = {
    currentPage: 'home',
    currentQuestion: 0,
    score: 0,
    totalQuestions: 15,
    timerDuration: 20,
    timerInterval: null,
    timeRemaining: 20,
    selectedAnswer: null,
    isQuizActive: false,
    showExplanations: true,
    difficulty: 'medium',
    category: null,
    usedQuestions: new Set(),
    theme: localStorage.getItem('quizTheme') || 'dark-orange',
    quizHistory: JSON.parse(localStorage.getItem('quizHistory') || '[]'),
    performance: {
        totalQuizzes: 0,
        totalTime: 0,
        bestStreak: 0,
        currentStreak: 0,
        averageScore: 0
    }
};

// ===== COMPREHENSIVE QUESTION BANK =====
const questionBank = {
    'artificial-intelligence': {
        easy: [
            {
                question: "What does AI stand for?",
                options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Algorithmic Intelligence"],
                correct: 0,
                explanation: "AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines."
            },
            {
                question: "Which of these is a type of machine learning?",
                options: ["Supervised Learning", "Manual Learning", "Random Learning", "Static Learning"],
                correct: 0,
                explanation: "Supervised learning is a type of machine learning where algorithms learn from labeled training data."
            },
            {
                question: "What is a neural network?",
                options: ["A computer network", "A set of algorithms", "A brain simulation", "A type of database"],
                correct: 1,
                explanation: "Neural networks are a set of algorithms modeled loosely after the human brain."
            }
        ],
        medium: [
            {
                question: "What is the main difference between narrow AI and general AI?",
                options: ["Speed", "Scope of capability", "Cost", "Power consumption"],
                correct: 1,
                explanation: "Narrow AI is designed for specific tasks, while general AI would have human-like intelligence across all domains."
            },
            {
                question: "Which technique is commonly used for natural language processing?",
                options: ["Random Forest", "Transformers", "K-means", "PCA"],
                correct: 1,
                explanation: "Transformers, particularly models like BERT and GPT, revolutionized NLP with attention mechanisms."
            },
            {
                question: "What is overfitting in machine learning?",
                options: ["When model is too simple", "When model memorizes training data", "When model is too fast", "When model uses too much memory"],
                correct: 1,
                explanation: "Overfitting occurs when a model learns the training data too well and fails to generalize to new data."
            }
        ],
        hard: [
            {
                question: "What is the vanishing gradient problem in deep learning?",
                options: ["Gradients become too large", "Gradients become too small", "Gradients disappear", "Gradients multiply"],
                correct: 1,
                explanation: "The vanishing gradient problem occurs when gradients become extremely small, making it difficult to train deep networks."
            },
            {
                question: "Which architecture introduced the attention mechanism?",
                options: ["ResNet", "VGG", "Transformer", "AlexNet"],
                correct: 2,
                explanation: "The Transformer architecture, introduced in 'Attention Is All You Need', revolutionized sequence modeling."
            },
            {
                question: "What is the difference between batch normalization and layer normalization?",
                options: ["Normalization scope", "Speed", "Memory usage", "Accuracy"],
                correct: 0,
                explanation: "Batch normalization normalizes across the batch dimension, while layer normalization normalizes across features."
            }
        ]
    },
    'ml-dl': {
        easy: [
            {
                question: "What does ML stand for?",
                options: ["Machine Learning", "Model Learning", "Master Learning", "Method Learning"],
                correct: 0,
                explanation: "ML stands for Machine Learning, a subset of AI focused on learning from data."
            },
            {
                question: "Which is a supervised learning algorithm?",
                options: ["K-means", "Linear Regression", "PCA", "Apriori"],
                correct: 1,
                explanation: "Linear Regression is a supervised learning algorithm used for predicting continuous values."
            },
            {
                question: "What is a feature in machine learning?",
                options: ["A bug", "An input variable", "An output", "A model"],
                correct: 1,
                explanation: "Features are the input variables or attributes used to make predictions."
            }
        ],
        medium: [
            {
                question: "What is the purpose of cross-validation?",
                options: ["Speed up training", "Evaluate model performance", "Reduce memory", "Increase accuracy"],
                correct: 1,
                explanation: "Cross-validation helps assess how well a model will generalize to new data."
            },
            {
                question: "Which activation function is most commonly used in hidden layers?",
                options: ["Sigmoid", "ReLU", "Tanh", "Linear"],
                correct: 1,
                explanation: "ReLU (Rectified Linear Unit) is widely used due to its simplicity and effectiveness in avoiding vanishing gradients."
            },
            {
                question: "What is backpropagation?",
                options: ["Forward pass", "Weight update algorithm", "Data preprocessing", "Model evaluation"],
                correct: 1,
                explanation: "Backpropagation is the algorithm used to update weights in neural networks by calculating gradients."
            }
        ],
        hard: [
            {
                question: "What is the difference between L1 and L2 regularization?",
                options: ["Penalty type", "Learning rate", "Activation", "Architecture"],
                correct: 0,
                explanation: "L1 uses absolute value penalties (Lasso), while L2 uses squared penalties (Ridge), leading to different sparsity properties."
            },
            {
                question: "What is the expectation-maximization algorithm used for?",
                options: ["Classification", "Clustering with latent variables", "Regression", "Dimensionality reduction"],
                correct: 1,
                explanation: "EM is used for finding maximum likelihood estimates in models with latent variables, like in Gaussian Mixture Models."
            },
            {
                question: "What is the fundamental difference between CNN and RNN?",
                options: ["Speed", "Architecture design", "Accuracy", "Memory usage"],
                correct: 1,
                explanation: "CNNs use spatial hierarchies for grid-like data, while RNNs process sequential data with temporal dependencies."
            }
        ]
    },
    'quantum-computing': {
        easy: [
            {
                question: "What is a qubit?",
                options: ["A classical bit", "A quantum bit", "A quantum computer", "A quantum algorithm"],
                correct: 1,
                explanation: "A qubit is the fundamental unit of quantum information, can exist in superposition of 0 and 1."
            },
            {
                question: "What is superposition?",
                options: ["Multiple states at once", "High speed", "Large memory", "Parallel processing"],
                correct: 0,
                explanation: "Superposition allows quantum systems to exist in multiple states simultaneously until measured."
            },
            {
                question: "Who is considered the father of quantum computing?",
                options: ["Einstein", "Feynman", "Newton", "Turing"],
                correct: 1,
                explanation: "Richard Feynman is often credited as the father of quantum computing for his early proposals."
            }
        ],
        medium: [
            {
                question: "What is quantum entanglement?",
                options: ["Correlated quantum states", "High speed", "Large storage", "Parallel computing"],
                correct: 0,
                explanation: "Entanglement is a phenomenon where quantum states become correlated and cannot be described independently."
            },
            {
                question: "Which quantum algorithm provides exponential speedup for factoring?",
                options: ["Grover's", "Shor's", "Deutsch-Jozsa", "Simon's"],
                correct: 1,
                explanation: "Shor's algorithm can factor large numbers exponentially faster than classical algorithms."
            },
            {
                question: "What is quantum decoherence?",
                options: ["Loss of quantum properties", "High speed", "Error correction", "Quantum speedup"],
                correct: 0,
                explanation: "Decoherence is the loss of quantum coherence due to interaction with the environment."
            }
        ],
        hard: [
            {
                question: "What is the difference between quantum annealing and gate-based quantum computing?",
                options: ["Speed", "Problem type", "Cost", "Accuracy"],
                correct: 1,
                explanation: "Quantum annealing is optimized for optimization problems, while gate-based systems are universal."
            },
            {
                question: "What is the quantum Fourier transform used for?",
                options: ["Error correction", "Period finding", "State preparation", "Measurement"],
                correct: 1,
                explanation: "QFT is a key component in many quantum algorithms, particularly for period-finding problems."
            },
            {
                question: "What are topological quantum computers?",
                options: ["High speed", "Error-resistant", "Low cost", "Small size"],
                correct: 1,
                explanation: "Topological quantum computers use anyons for error-resistant quantum computation."
            }
        ]
    },
    'software-development': {
        easy: [
            {
                question: "What does API stand for?",
                options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Process Interface"],
                correct: 0,
                explanation: "API stands for Application Programming Interface, a set of protocols for building software."
            },
            {
                question: "Which is a version control system?",
                options: ["Docker", "Git", "Jenkins", "Kubernetes"],
                correct: 1,
                explanation: "Git is a distributed version control system for tracking changes in code."
            },
            {
                question: "What is debugging?",
                options: ["Writing code", "Testing code", "Finding and fixing errors", "Deploying code"],
                correct: 2,
                explanation: "Debugging is the process of finding and resolving defects in software."
            }
        ],
        medium: [
            {
                question: "What is the difference between SQL and NoSQL databases?",
                options: ["Speed", "Data model", "Cost", "Size"],
                correct: 1,
                explanation: "SQL uses relational tables, while NoSQL uses various data models like document, key-value, or graph."
            },
            {
                question: "What is CI/CD?",
                options: ["Code Integration", "Continuous Integration/Continuous Deployment", "Cloud Infrastructure", "Code Development"],
                correct: 1,
                explanation: "CI/CD automates the software delivery process from integration to deployment."
            },
            {
                question: "What is technical debt?",
                options: ["Financial cost", "Code quality issues", "Team size", "Project timeline"],
                correct: 1,
                explanation: "Technical debt refers to the implied cost of rework caused by choosing an easy solution now."
            }
        ],
        hard: [
            {
                question: "What is the difference between monolithic and microservices architecture?",
                options: ["Speed", "Deployment model", "Cost", "Language"],
                correct: 1,
                explanation: "Monolithic apps are single units, while microservices break applications into small, independent services."
            },
            {
                question: "What is the CAP theorem in distributed systems?",
                options: ["Performance limits", "Consistency, Availability, Partition tolerance trade-off", "Security principles", "Scalability limits"],
                correct: 1,
                explanation: "CAP theorem states that distributed systems can only guarantee two of: consistency, availability, partition tolerance."
            },
            {
                question: "What is the difference between synchronous and asynchronous programming?",
                options: ["Speed", "Execution model", "Memory usage", "Code quality"],
                correct: 1,
                explanation: "Synchronous code executes sequentially, while asynchronous allows non-blocking execution."
            }
        ]
    },
    'cyber-security': {
        easy: [
            {
                question: "What does HTTPS stand for?",
                options: ["HyperText Transfer Protocol Secure", "High Transfer Protocol Secure", "HyperText Transfer Protocol System", "High Tech Transfer Protocol"],
                correct: 0,
                explanation: "HTTPS is the secure version of HTTP, encrypting data between browser and server."
            },
            {
                question: "What is a firewall?",
                options: ["Antivirus", "Network security system", "Password manager", "Encryption tool"],
                correct: 1,
                explanation: "A firewall monitors and controls network traffic based on security rules."
            },
            {
                question: "What is phishing?",
                options: ["Password cracking", "Email fraud", "Network attack", "Virus"],
                correct: 1,
                explanation: "Phishing is a type of social engineering attack to steal sensitive information."
            }
        ],
        medium: [
            {
                question: "What is two-factor authentication?",
                options: ["Two passwords", "Multiple verification methods", "Double encryption", "Backup system"],
                correct: 1,
                explanation: "2FA requires two different authentication factors to verify identity."
            },
            {
                question: "What is a zero-day vulnerability?",
                options: ["New vulnerability", "Fixed vulnerability", "Old vulnerability", "Minor vulnerability"],
                correct: 0,
                explanation: "A zero-day vulnerability is unknown to the vendor and has no available patch."
            },
            {
                question: "What is the difference between symmetric and asymmetric encryption?",
                options: ["Speed", "Key usage", "Algorithm type", "Security level"],
                correct: 1,
                explanation: "Symmetric uses one key for both encryption/decryption, asymmetric uses key pairs."
            }
        ],
        hard: [
            {
                question: "What is a man-in-the-middle attack?",
                options: ["Direct attack", "Intercepting communication", "Password attack", "Network attack"],
                correct: 1,
                explanation: "MITM attacks intercept and potentially alter communication between two parties."
            },
            {
                question: "What is the principle of least privilege?",
                options: ["Maximum access", "Minimum necessary access", "Equal access", "No access"],
                correct: 1,
                explanation: "Principle of least privilege grants only the minimum access necessary for users to perform their jobs."
            },
            {
                question: "What is a side-channel attack?",
                options: ["Direct attack", "Information from implementation", "Network attack", "Password attack"],
                correct: 1,
                explanation: "Side-channel attacks extract information from system implementation rather than weaknesses in algorithms."
            }
        ]
    },
    'blockchain': {
        easy: [
            {
                question: "What is a blockchain?",
                options: ["A database", "A distributed ledger", "A network", "A cryptocurrency"],
                correct: 1,
                explanation: "Blockchain is a distributed ledger technology that records transactions across multiple computers."
            },
            {
                question: "What was the first cryptocurrency?",
                options: ["Ethereum", "Bitcoin", "Litecoin", "Ripple"],
                correct: 1,
                explanation: "Bitcoin, created in 2009, was the first decentralized cryptocurrency."
            },
            {
                question: "What is mining in cryptocurrency?",
                options: ["Creating coins", "Validating transactions", "Trading coins", "Storing coins"],
                correct: 1,
                explanation: "Mining is the process of validating transactions and adding them to the blockchain."
            }
        ],
        medium: [
            {
                question: "What is a smart contract?",
                options: ["Legal document", "Self-executing contract", "Digital signature", "Encryption method"],
                correct: 1,
                explanation: "Smart contracts are self-executing contracts with terms directly written into code."
            },
            {
                question: "What is the difference between proof-of-work and proof-of-stake?",
                options: ["Speed", "Consensus mechanism", "Security", "Cost"],
                correct: 1,
                explanation: "PoW uses computational power, while PoS uses economic stake for consensus."
            },
            {
                question: "What is DeFi?",
                options: ["Digital finance", "Decentralized finance", "Digital fiat", "Developer finance"],
                correct: 1,
                explanation: "DeFi refers to financial applications built on blockchain technology without intermediaries."
            }
        ],
        hard: [
            {
                question: "What is the blockchain trilemma?",
                options: ["Security, Speed, Cost", "Decentralization, Security, Scalability", "Privacy, Speed, Cost", "Trust, Security, Speed"],
                correct: 1,
                explanation: "The blockchain trilemma states it's difficult to achieve decentralization, security, and scalability simultaneously."
            },
            {
                question: "What are layer-2 solutions?",
                options: ["Security layers", "Scalability solutions", "Privacy layers", "Consensus layers"],
                correct: 1,
                explanation: "Layer-2 solutions are protocols built on top of blockchains to improve scalability."
            },
            {
                question: "What is a 51% attack?",
                options: ["Majority control", "Network attack", "Privacy breach", "Speed attack"],
                correct: 0,
                explanation: "A 51% attack occurs when a single entity controls over 50% of the network's mining power."
            }
        ]
    }
};

// ===== DOM ELEMENTS =====
const elements = {
    navLinks: document.querySelectorAll('.nav-link'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    startQuizBtn: document.getElementById('start-quiz-btn'),
    quizSection: document.getElementById('quiz'),
    heroSection: document.getElementById('home'),
    dashboardSection: document.getElementById('dashboard'),
    questionText: document.getElementById('question-text'),
    optionsGrid: document.getElementById('options-grid'),
    quizScore: document.getElementById('quiz-score'),
    quizTimer: document.getElementById('quiz-timer'),
    progressFill: document.getElementById('progress-fill'),
    currentQuestion: document.getElementById('current-question'),
    totalQuestions: document.getElementById('total-questions'),
    explanationCard: document.getElementById('explanation-card'),
    explanationText: document.getElementById('explanation-text'),
    nextBtn: document.getElementById('next-btn'),
    feedbackModal: document.getElementById('feedback-modal'),
    categoryModal: document.getElementById('category-modal'),
    levelModal: document.getElementById('level-modal'),
    themeModal: document.getElementById('theme-modal')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    attachEventListeners();
    updateAnalytics();
    applyTheme(appState.theme);
});

function initializeApp() {
    console.log('🚀 QuizMaster Pro initialized');
    loadQuizHistory();
    applyTheme(appState.theme);
}

// ===== EVENT LISTENERS =====
function attachEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
        });
    });

    // Theme toggle
    elements.themeToggleBtn.addEventListener('click', showThemeSelection);

    // Quiz controls
    elements.startQuizBtn.addEventListener('click', showCategorySelection);
    elements.nextBtn.addEventListener('click', nextQuestion);

    // Category selection
    document.getElementById('category-close').addEventListener('click', closeCategorySelection);
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => selectCategory(btn.dataset.category));
    });

    // Level selection
    document.getElementById('level-close').addEventListener('click', closeLevelSelection);
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => selectLevel(btn.dataset.level));
    });

    // Theme selection
    document.getElementById('theme-modal-close').addEventListener('click', closeThemeSelection);
    document.querySelectorAll('.theme-option-btn').forEach(btn => {
        btn.addEventListener('click', () => selectTheme(btn.dataset.theme));
    });

    // Modal close buttons
    document.getElementById('feedback-close').addEventListener('click', closeFeedback);

    // Option buttons (dynamically created)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.option-btn')) {
            const option = e.target.closest('.option-btn');
            selectAnswer(parseInt(option.dataset.option));
        }
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    });
}

// ===== NAVIGATION =====
function navigateToPage(page) {
    // Update nav links
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    // Hide all sections
    [elements.heroSection, elements.quizSection, elements.dashboardSection].forEach(section => {
        if (section) section.style.display = 'none';
    });

    // Show target section
    const targetSection = document.getElementById(page);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    appState.currentPage = page;

    // Page-specific initialization
    if (page === 'dashboard') {
        updateAnalytics();
    }
}

// ===== THEME SELECTION =====
function showThemeSelection() {
    elements.themeModal.style.display = 'flex';
}

function closeThemeSelection() {
    elements.themeModal.style.display = 'none';
}

function selectTheme(theme) {
    appState.theme = theme;
    localStorage.setItem('quizTheme', theme);
    applyTheme(theme);
    closeThemeSelection();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// ===== LEVEL SELECTION =====
function showLevelSelection() {
    elements.levelModal.style.display = 'flex';
}

function closeLevelSelection() {
    elements.levelModal.style.display = 'none';
}

function selectLevel(level) {
    appState.difficulty = level;
    closeLevelSelection();
    startQuiz();
}

// ===== CATEGORY SELECTION =====
function showCategorySelection() {
    elements.categoryModal.style.display = 'flex';
}

function closeCategorySelection() {
    elements.categoryModal.style.display = 'none';
}

function selectCategory(category) {
    appState.category = category;
    closeCategorySelection();
    showLevelSelection();
}

// ===== QUIZ FUNCTIONS =====
function startQuiz() {
    if (!appState.category) {
        showCategorySelection();
        return;
    }
    
    appState.isQuizActive = true;
    appState.currentQuestion = 0;
    appState.score = 0;
    appState.selectedAnswer = null;
    appState.usedQuestions.clear();
    appState.performance.currentStreak = 0;

    // Set timer based on difficulty
    if (appState.difficulty === 'easy') {
        appState.timerDuration = 25;
    } else if (appState.difficulty === 'medium') {
        appState.timerDuration = 20;
    } else if (appState.difficulty === 'hard') {
        appState.timerDuration = 30;
    }

    // Reset UI
    elements.quizScore.textContent = '0';
    elements.explanationCard.style.display = 'none';
    elements.nextBtn.disabled = true;

    navigateToPage('quiz');
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const questions = questionBank[appState.category][appState.difficulty];
    
    // Find unused question
    let availableQuestions = [];
    for (let i = 0; i < questions.length; i++) {
        if (!appState.usedQuestions.has(i)) {
            availableQuestions.push(i);
        }
    }
    
    // If all questions used, reset
    if (availableQuestions.length === 0) {
        appState.usedQuestions.clear();
        for (let i = 0; i < questions.length; i++) {
            availableQuestions.push(i);
        }
    }
    
    // Select random unused question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    appState.usedQuestions.add(questionIndex);
    const question = questions[questionIndex];

    // Update question text
    elements.questionText.textContent = question.question;

    // Update options
    elements.optionsGrid.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.dataset.option = index;
        button.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option}</span>
        `;
        elements.optionsGrid.appendChild(button);
    });

    // Update progress
    updateProgress();

    // Reset timer
    appState.timeRemaining = appState.timerDuration;
    updateTimerDisplay();
}

function selectAnswer(optionIndex) {
    if (!appState.isQuizActive || appState.selectedAnswer !== null) return;

    appState.selectedAnswer = optionIndex;
    const questions = questionBank[appState.category][appState.difficulty];
    
    // Find current question index
    let currentQuestionIndex = -1;
    for (let i = 0; i < questions.length; i++) {
        if (appState.usedQuestions.has(i)) {
            currentQuestionIndex = i;
        }
    }
    
    const question = questions[currentQuestionIndex];

    // Disable all options
    const options = document.querySelectorAll('.option-btn');
    options.forEach(option => option.disabled = true);

    // Show correct/wrong states
    options[optionIndex].classList.add(optionIndex === question.correct ? 'correct' : 'wrong');
    if (optionIndex !== question.correct) {
        options[question.correct].classList.add('correct');
    }

    // Update score and streak
    if (optionIndex === question.correct) {
        appState.score++;
        appState.performance.currentStreak++;
        if (appState.performance.currentStreak > appState.performance.bestStreak) {
            appState.performance.bestStreak = appState.performance.currentStreak;
        }
    } else {
        appState.performance.currentStreak = 0;
    }

    elements.quizScore.textContent = appState.score;

    // Show explanation if enabled
    if (appState.showExplanations) {
        showExplanation(question.explanation);
    }

    // Enable next button
    elements.nextBtn.disabled = false;

    // Stop timer
    stopTimer();
}

function showExplanation(explanation) {
    elements.explanationText.textContent = explanation;
    elements.explanationCard.style.display = 'block';
}

function nextQuestion() {
    appState.currentQuestion++;
    
    if (appState.currentQuestion >= appState.totalQuestions) {
        endQuiz();
    } else {
        appState.selectedAnswer = null;
        elements.explanationCard.style.display = 'none';
        elements.nextBtn.disabled = true;
        loadQuestion();
        startTimer();
    }
}

function updateProgress() {
    const progress = ((appState.currentQuestion + 1) / appState.totalQuestions) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.currentQuestion.textContent = appState.currentQuestion + 1;
    elements.totalQuestions.textContent = appState.totalQuestions;
}

// ===== TIMER FUNCTIONS =====
function startTimer() {
    stopTimer();
    appState.timeRemaining = appState.timerDuration;
    
    if (appState.timerDuration === 0) return; // No timer
    
    appState.timerInterval = setInterval(() => {
        appState.timeRemaining--;
        updateTimerDisplay();
        
        if (appState.timeRemaining <= 0) {
            timeUp();
        }
    }, 1000);
}

function stopTimer() {
    if (appState.timerInterval) {
        clearInterval(appState.timerInterval);
        appState.timerInterval = null;
    }
}

function updateTimerDisplay() {
    if (appState.timerDuration === 0) {
        elements.quizTimer.textContent = '∞';
    } else {
        elements.quizTimer.textContent = `${appState.timeRemaining}s`;
    }
}

function timeUp() {
    stopTimer();
    
    // Auto-select wrong answer
    const options = document.querySelectorAll('.option-btn');
    options.forEach(option => option.disabled = true);
    
    // Show correct answer
    const questions = questionBank[appState.category][appState.difficulty];
    
    // Find current question index
    let currentQuestionIndex = -1;
    for (let i = 0; i < questions.length; i++) {
        if (appState.usedQuestions.has(i)) {
            currentQuestionIndex = i;
        }
    }
    
    const question = questions[currentQuestionIndex];
    options[question.correct].classList.add('correct');
    
    // Show explanation
    if (appState.showExplanations) {
        showExplanation(question.explanation);
    }
    
    appState.performance.currentStreak = 0;
    elements.nextBtn.disabled = false;
}

// ===== QUIZ END =====
function endQuiz() {
    appState.isQuizActive = false;
    stopTimer();
    
    // Calculate performance metrics
    const accuracy = Math.round((appState.score / appState.totalQuestions) * 100);
    const timeSpent = appState.timerDuration * appState.totalQuestions;
    
    // Update performance stats
    appState.performance.totalQuizzes++;
    appState.performance.totalTime += timeSpent;
    appState.performance.averageScore = Math.round(
        (appState.performance.averageScore * (appState.performance.totalQuizzes - 1) + accuracy) / 
        appState.performance.totalQuizzes
    );
    
    // Save to history
    const quizResult = {
        date: new Date().toISOString(),
        score: appState.score,
        totalQuestions: appState.totalQuestions,
        accuracy: accuracy,
        difficulty: appState.difficulty,
        category: appState.category,
        timeSpent: timeSpent
    };
    
    appState.quizHistory.push(quizResult);
    saveQuizHistory();
    
    // Show AI feedback
    showAIFeedback(quizResult);
}

// ===== AI FEEDBACK =====
function showAIFeedback(quizResult) {
    const feedback = generateAIFeedback(quizResult);
    document.getElementById('feedback-content').textContent = feedback;
    elements.feedbackModal.style.display = 'flex';
}

function generateAIFeedback(quizResult) {
    const { accuracy, difficulty, score, totalQuestions, category } = quizResult;
    
    let feedback = `🎯 Quiz Performance Analysis\n\n`;
    feedback += `Category: ${category.replace('-', ' ').charAt(0).toUpperCase() + category.replace('-', ' ').slice(1)}\n`;
    feedback += `Score: ${score}/${totalQuestions} (${accuracy}%)\n`;
    feedback += `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}\n\n`;
    
    if (accuracy >= 90) {
        feedback += `🌟 Outstanding performance! You've mastered this level.\n\n`;
        feedback += `Recommendations:\n`;
        feedback += `• Try the next difficulty level\n`;
        feedback += `• Explore different categories\n`;
        feedback += `• Challenge yourself with timed quizzes`;
    } else if (accuracy >= 70) {
        feedback += `👏 Great job! You're doing well.\n\n`;
        feedback += `Recommendations:\n`;
        feedback += `• Review questions you got wrong\n`;
        feedback += `• Practice similar question types\n`;
        feedback += `• Consider slightly harder difficulty`;
    } else if (accuracy >= 50) {
        feedback += `💪 Good effort! Keep practicing.\n\n`;
        feedback += `Recommendations:\n`;
        feedback += `• Focus on understanding concepts\n`;
        feedback += `• Take your time with each question\n`;
        feedback += `• Review explanations carefully`;
    } else {
        feedback += `📚 Keep learning! Every expert starts somewhere.\n\n`;
        feedback += `Recommendations:\n`;
        feedback += `• Try easier difficulty level\n`;
        feedback += `• Study the fundamentals\n`;
        feedback += `• Use explanations to learn\n`;
        feedback += `• Practice regularly`;
    }
    
    return feedback;
}

function closeFeedback() {
    elements.feedbackModal.style.display = 'none';
    navigateToPage('home');
}

// ===== DATA PERSISTENCE =====
function saveQuizHistory() {
    localStorage.setItem('quizHistory', JSON.stringify(appState.quizHistory));
}

function loadQuizHistory() {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    appState.quizHistory = history;
    
    // Calculate performance metrics from history
    if (history.length > 0) {
        appState.performance.totalQuizzes = history.length;
        appState.performance.averageScore = Math.round(
            history.reduce((sum, quiz) => sum + quiz.accuracy, 0) / history.length
        );
        appState.performance.totalTime = history.reduce((sum, quiz) => sum + quiz.timeSpent, 0);
        appState.performance.bestStreak = Math.max(
            ...history.map(quiz => quiz.bestStreak || 0)
        );
    }
}

// ===== UTILITY FUNCTIONS =====
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

console.log('🧠 QuizMaster Pro - AI-Powered Learning Platform Ready!');

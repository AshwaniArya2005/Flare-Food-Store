//---------------------FIREBASE-------------------------
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged ,sendEmailVerification, GoogleAuthProvider, signInWithPopup,} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import 'https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js';

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDp7xTU84S2OarxDOIaHsjAFyVULOBLaKE",
    authDomain: "food-store-8d1f2.firebaseapp.com",
    databaseURL: "https://food-store-8d1f2-default-rtdb.firebaseio.com",
    projectId: "food-store-8d1f2",
    storageBucket: "food-store-8d1f2.firebasestorage.app",
    messagingSenderId: "49920328384",
    appId: "1:49920328384:web:23fdea1bb9d83a37bc2325",
    measurementId: "G-TZ72GRPWJ3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
//-----------------------FIREBASE------------------------
// Initialize Swiper JS
new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: -150,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        256: { slidesPerView: 2 },
        512: { slidesPerView: 3 },
        768: { slidesPerView: 4 }
    }
});

// Initialize cart count from localStorage or set to 0 if not present
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartCountElement = document.getElementById('cart-count');
const cartNotification = document.getElementById('cart-notification');

// Update cart count on page load
if (cartCountElement) cartCountElement.textContent = cartCount;

// Add to Cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Get the product details
        const productCard = this.closest('.card-link');
        const productImage = productCard.querySelector('img').src;
        const productTitle = productCard.querySelector('.badge').textContent;

        // Extract the discounted price
        const productPriceElement = productCard.querySelector('.card-title');
        const originalPrice = productPriceElement.querySelector('s') ? productPriceElement.querySelector('s').textContent : null;
        const discountedPrice = productPriceElement.textContent.replace(originalPrice, '').trim(); // Get the discounted price

        // Retrieve or initialize cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = cartItems.findIndex(item => item.title === productTitle);

        if (existingProductIndex !== -1) {
            // If product exists, increment its quantity (or handle duplicates as needed)
            cartItems[existingProductIndex].quantity += 1;
        } else {
            // Add new product to cart with the discounted price
            cartItems.push({
                image: productImage,
                title: productTitle,
                price: parseFloat(discountedPrice.replace('₹', '').trim()), // Convert to number
                quantity: 1
            });
        }

        // Update localStorage with updated cartItems
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update cart count
        const cartCount = cartItems.length;
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) cartCountElement.textContent = cartCount;
        
        localStorage.setItem('cartCount', cartCount); // Update cart count in localStorage

        // Show notification
        showNotification();
    });
});



// Show notification
function showNotification() {
    cartNotification.classList.add('show');
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
}



// Function to change slides automatically
let currentSlide = 0; // Index of the current slide
const slides = document.querySelectorAll('.slider .slide');
const totalSlides = slides.length;

function changeSlide() {
    // Remove 'active' class from the current slide
    slides[currentSlide].classList.remove('active');
    
    // Increment the slide index
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // Add 'active' class to the new current slide
    slides[currentSlide].classList.add('active');
}

// Set the slide to change every 6 seconds
setInterval(changeSlide, 6000);

// Slide controls for two sliders
let currentIndex1 = 0;
let currentIndex2 = 0;


// Select all the quantity buttons and add event listeners
document.querySelectorAll('.qty-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Find the input field in the same parent container (div.quantity)
        const input = this.parentNode.querySelector('input');
        let currentValue = parseInt(input.value);

        // Check if it's the plus button or minus button
        if (this.textContent === '+') {
            currentValue++; // Increase value by 1
        } else if (this.textContent === '-' && currentValue > 1) {
            currentValue--; // Decrease value by 1, but not below 1
        }

        // Update the input value with the new value
        input.value = currentValue;
    });
});

//-------------------------------CUSTOMER SUPP---------------------
// Open customer care popup
document.getElementById('opencustomer').addEventListener('click', opencustomercare);
function opencustomercare() {
    document.getElementById("loginModal1").style.display = "flex";
}
document.getElementById('closecustomer').addEventListener('click', closecustomercare);
// Close customer care popup
function closecustomercare() {
    document.getElementById("loginModal1").style.display = "none";
}


// Retrieve and display the cart count when the page loads
document.addEventListener('DOMContentLoaded', function() {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
});
//-------------------------------CUSTOMER SUPP---------------------

//-----------------------------LOGIN---------------------------------
document.getElementById('login-image').addEventListener('click', openLoginForm);
// Open the login popup
function openLoginForm() {
    console.log("openLoginForm called");
    document.getElementById("loginModal").style.display = "flex";
}

document.getElementById('closelogin').addEventListener('click', closeLoginForm);
// Close the login popup
function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}
// Event listeners for tab switching
document.getElementById('tab2').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    openTab('login'); // Switch to the registration tab
});

document.getElementById('tab1').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    openTab('register'); // Switch back to the login tab
});
function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.style.display = 'none';
    });

    // Show the selected tab content
    document.getElementById(tabName).style.display = 'block';

    // Optionally, update the title or perform other actions
    const title = tabName === 'login' ? 'Login' : ''; // Adjust as necessary
    document.getElementById('login-register-title').textContent = title;
}


// Login form submission handler
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User logged in successfully
        document.getElementById('login-success').style.display = 'block';
        document.getElementById('login-success').textContent = 'Login Successful!';
        document.getElementById('error-message').style.display = 'none'; // Hide error message
        setTimeout(() => {
          document.getElementById('login-success').style.display = 'none';
        }, 3000);
      })
      .catch((error) => {
        // Error occurred during login
        console.error('Login Error:', error.message);
        const errorMessage = "Invalid credentials, please try again.";
        document.getElementById('error-message').textContent = errorMessage;
        document.getElementById('error-message').style.display = 'block'; // Show error message
      });
});



document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Send email verification
            sendEmailVerification(user)
                .then(() => {
                    alert('A verification email has been sent to your email address. Please verify your email before logging in.');
                    // Optionally, redirect to the login page
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error('Error sending email verification:', error.message);
                    alert('Failed to send verification email. Please try again later.');
                });

            document.getElementById('registerErrorMessage').style.display = 'none'; // Hide error message
        })
        .catch((error) => {
            console.error('Registration Error:', error.message);
            const errorMessage = "An error occurred during registration. Please try again.";
            document.getElementById('registerErrorMessage').textContent = errorMessage;
            document.getElementById('registerErrorMessage').style.display = 'block'; // Show error message
        });
});
const googleProvider = new GoogleAuthProvider();
// Google Registration

document.getElementById('google-login').addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            // User successfully logged in
            const user = result.user;
            console.log("Google login successful for user:", user.displayName);
            alert(`Welcome, ${user.displayName}!`);
            // Redirect or update UI
            window.location.href = 'cat/user-profile.html'; // Replace with your desired page
        })
        .catch((error) => {
            console.error("Google login error:", error.message);
            alert("Login failed. Please try again.");
        });
});

// Check Auth State (Optional)
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (user.emailVerified) {
            console.log("User is logged in and email is verified:", user.email);
        } else {
            console.log("User is logged in but email is not verified.");
        }
    } else {
        console.log("No user is logged in.");
    }
});
//-------------------------------LOGIN----------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Open FAQ Modal - Attach event listener to both header and footer FAQ links
    const faqLinks = document.querySelectorAll('#openfaq-header, #openfaq-footer');
    faqLinks.forEach(link => {
        link.addEventListener('click', openFAQModal);
    });

    // Close FAQ Modal - Close button
    const closeFaqButton = document.getElementById('closefaq');
    if (closeFaqButton) {
        closeFaqButton.addEventListener('click', closeFAQModal);
    }

    // FAQ Toggle - Toggle answers visibility when a question is clicked
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            const answer = document.getElementById(`answer-${index}`);
            const arrow = question.querySelector('.arrow');

            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block';
                arrow.innerHTML = '&#9650;'; // Change arrow to "up"
            } else {
                answer.style.display = 'none';
                arrow.innerHTML = '&#9660;'; // Change arrow to "down"
            }
        });
    });
});

// Open FAQ Modal function
function openFAQModal() {
    const modal = document.getElementById("faqModal");
    if (modal) {
        modal.style.display = "flex"; // Show the modal
    }
}

// Close FAQ Modal function
function closeFAQModal() {
    const modal = document.getElementById("faqModal");
    if (modal) {
        modal.style.display = "none"; // Hide the modal
    }
}

//------------------------------SEARCH--------------------------

console.log("main.js is loaded!");

// Sample product data (replace this with actual data if needed)
const products = [
    { name: "Almonds", description: "Healthy and nutritious nuts.", image: "images/almond.jpg", href: "cat/deals.html", samePage: true },
    { name: "Hide&Seek (Biscuit)", description: "Delicious and creamy biscuits.", image: "images/biscuit.png", href: "cat/deals.html", samePage: true },
    { name: "Maggi", description: "World's favourite noodles.", image: "images/Maggi.jpg", href: "cat/deals.html", samePage: true },
    { name: "Coca Cola", description: "Refreshing drink.", image: "images/Coca Cola.jpg", href: "cat/deals.html", samePage: true },
    { name: "Chips", description: "Your daily snacks.", image: "images/chips.png", href: "cat/deals.html", samePage: true },
    { name: "Haldiram's Bhujia", description: "Crispy and tasty snack.", image: "images/b1.png", href: "cat/deals.html", samePage: true },
    { name: "Instant Noodles", description: "Quick and easy meal.", image: "images/r1.png", href: "cat/deals.html", samePage: true },
    { name: "Aashirvaad Atta", description: "High-quality wheat flour.", image: "images/a1.png", href: "cat/deals.html", samePage: true },
    { name: "Towel", description: "Soft and absorbent towel.", image: "images/towel.png", href: "cat/deals.html", samePage: true },
    { name: "Shampoo", description: "Gentle and nourishing for your hair.", image: "images/shampoo.png", href: "cat/deals.html", samePage: true },
    { name: "Dettol", description: "Kills 99.9% of germs.", image: "images/dettol.png", href: "cat/deals.html", samePage: true },
    { name: "Soap", description: "Pack of 3, cleanses and refreshes.", image: "images/soap.png", href: "cat/deals.html", samePage: true },
    { name: "Shower Sponge", description: "Perfect for exfoliating skin.", image: "images/s1.png", href: "cat/deals.html", samePage: true },
    { name: "Bathrobe", description: "Comfortable and luxurious.", image: "images/b2.png", href: "cat/deals.html", samePage: true },
    { name: "Back Scrubber", description: "Reaches hard-to-clean areas.", image: "images/s2.png", href: "cat/deals.html", samePage: true },
    { name: "Soothing Gel", description: "Calming and hydrating.", image: "images/s3.png", href: "cat/deals.html", samePage: true },
    { name: "Ceramic Accessory", description: "Stylish and practical ceramic set.", image: "images/s4.png", href: "cat/deals.html", samePage: true }    ,
    { name: "Hennessy", description: "A premium cognac with rich, warm flavors and a smooth finish.", image: "cat/wine/hennessy.png", href: "cat/wine.html" },
    { name: "Duplin", description: "A sweet and fruity wine, perfect for light and refreshing sips.", image: "cat/wine/duplin.png", href: "cat/wine.html" },
    { name: "Mercer", description: "A bold red wine with notes of dark berries and a hint of spice.", image: "cat/wine/mercer.png", href: "cat/wine.html" },
    { name: "Lazona", description: "An elegant white wine with citrus and floral undertones.", image: "cat/wine/lazona.png", href: "cat/wine.html" },
    { name: "Holy Trinity", description: "A vibrant blend of fruity and earthy flavors, a true crowd-pleaser.", image: "cat/wine/holytrinity.png", href: "cat/wine.html" },
    { name: "Leonard", description: "A budget-friendly wine with a light, crisp profile.", image: "cat/wine/leonard.png", href: "cat/wine.html" },
    { name: "Francois Rose", description: "A luxurious rosé with delicate flavors of strawberry and rose petals.", image: "cat/wine/Francois Rose.png", href: "cat/wine.html" },
    { name: "Yalumba Baroosa", description: "A robust red wine with rich tannins and a velvety finish.", image: "cat/wine/GSM.png", href: "cat/wine.html" },
    { name: "Urlar", description: "A smooth and earthy wine with organic origins.", image: "cat/wine/Urlar.png", href: "cat/wine.html" },
    { name: "Bacardi", description: "A refreshing and classic white wine with tropical hints.", image: "cat/wine/Bacardi.png", href: "cat/wine.html" },
    { name: "Cabbage", description: "Fresh and crunchy, perfect for salads or cooking.", image: "cat/vegetables/cabbage.png", href: "cat/vegetables.html" },
    { name: "Tomato(1kg)", description: "Juicy and ripe tomatoes, ideal for cooking or salads.", image: "cat/vegetables/tomato.png", href: "cat/vegetables.html" },
    { name: "Red Pepper(125g)", description: "Sweet and vibrant peppers, perfect for stir-fries and roasting.", image: "cat/vegetables/pepper.png", href: "cat/vegetables.html" },
    { name: "Carrot(200g-250g)", description: "Fresh and crunchy carrots, great for snacking or cooking.", image: "cat/vegetables/carrot.png", href: "cat/vegetables.html" },
    { name: "Avocado(150g)", description: "Creamy and nutrient-rich, perfect for guacamole or toast.", image: "cat/vegetables/avacado.png", href: "cat/vegetables.html" },
    { name: "Rajma(500g)", description: "High-quality kidney beans, perfect for curries and stews.", image: "cat/vegetables/rajma.png", href: "cat/vegetables.html" },
    { name: "Cauliflower(400g)", description: "Fresh and tender cauliflower, great for various dishes.", image: "cat/vegetables/cauliflower.png", href: "cat/vegetables.html" },
    { name: "Celery(250g)", description: "Crisp and fresh celery, great for salads or snacking.", image: "cat/vegetables/celery.png", href: "cat/vegetables.html" },
    { name: "Onion(1kg)", description: "Versatile and flavorful, a kitchen staple for cooking.", image: "cat/vegetables/onion.png", href: "cat/vegetables.html" },
    { name: "Raddish(500g)", description: "Crisp and peppery radishes, perfect for salads or pickling.", image: "cat/vegetables/raddish.png", href: "cat/vegetables.html" },
    { name: "Racquet (Pair)", description: "High-quality tennis racquets for professional and casual players.", image: "cat/tennis/t1.png", href: "cat/tennis.html" },
    { name: "Tennis Ball (Set of 4)", description: "Durable tennis balls, designed for extended play and performance.", image: "cat/tennis/t2.png", href: "cat/tennis.html" },
    { name: "Auto Ball Launcher", description: "An automatic ball launcher for solo practice and skill development.", image: "cat/tennis/t3.png", href: "cat/tennis.html" },
    { name: "Racquet Cover", description: "Protect your racquet with this durable and stylish cover.", image: "cat/tennis/t4.png", href: "cat/tennis.html" },
    { name: "Tennis Shoes", description: "Comfortable and high-performance shoes designed for tennis players.", image: "cat/tennis/t5.png", href: "cat/tennis.html" },
    { name: "Ambri Apple (1 dz)", description: "Fresh Ambri apples from Kashmir, known for their sweetness and crispness.", image: "cat/kashmir/a1.png", href: "cat/kashmir1.html" },
    { name: "Aam Papad (100g)", description: "Tangy and delicious Aam Papad, a favorite snack from Kashmir.", image: "cat/kashmir/k1.png", href: "cat/kashmir1.html" },
    { name: "Saffron (1 gm)", description: "Pure saffron sourced from Kashmir, known for its premium quality and rich color.", image: "cat/kashmir/k8.png", href: "cat/kashmir1.html" },
    { name: "Dates (500 g)", description: "Organic Dates, perfect for breakfast.", image: "cat/kashmir/k7.png", href: "cat/kashmir1.html" },
    { name: "Apricot (200 g)", description: "High-quality Apricot, rich in protein and fiber.", image: "cat/kashmir/k15.png", href: "cat/kashmir1.html" },
    { name: "Pista (250 g)", description: "Fresh pistachios from Kashmir, offering a rich, creamy taste.", image: "cat/kashmir/k5.png", href: "cat/kashmir2.html" },
    { name: "Walnut (250 g)", description: "Kashmir walnuts, known for their rich flavor and health benefits.", image: "cat/kashmir/k6.png", href: "cat/kashmir2.html" },
    { name: "Fox Nut (250 g)", description: "Crispy and healthy fox nuts (makhana) from Kashmir, ideal for snacking.", image: "cat/kashmir/k3.png", href: "cat/kashmir2.html" },
    { name: "Cashew (250 g)", description: "Premium Kashmiri cashews, perfect for snacking or cooking.", image: "cat/kashmir/k4.png", href: "cat/kashmir2.html" },
    { name: "Almond Oil (20 ml)", description: "Pure almond oil, ideal for skin care and culinary uses.", image: "cat/kashmir/k9.png", href: "cat/kashmir2.html" },
    { name: "Red Chilli Powder (500 g)", description: "Spicy and aromatic Kashmiri red chilli powder, known for its vibrant color.", image: "cat/kashmir/k10.png", href: "cat/kashmir3.html" },
    { name: "Coriander Powder (500 g)", description: "Kashmiri coriander powder, perfect for adding flavor to any dish.", image: "cat/kashmir/k11.png", href: "cat/kashmir3.html" },
    { name: "Turmeric Powder (500 g)", description: "Pure and high-quality Kashmiri turmeric powder, great for cooking and health.", image: "cat/kashmir/k12.png", href: "cat/kashmir3.html" },
    { name: "Fennel Powder (500 g)", description: "Aromatic fennel powder from Kashmir, used in a variety of dishes.", image: "cat/kashmir/k13.png", href: "cat/kashmir3.html" },
    { name: "Cinnamon Powder (500 g)", description: "Freshly ground cinnamon powder from Kashmir, perfect for sweet and savory dishes.", image: "cat/kashmir/k14.png", href: "cat/kashmir3.html" },
    { name: "Black Tea Leaves (150g)", description: "Black Tea Leaves", image: "cat/tea/tea.png", price: "₹ 110", href: "cat/tea.html" },
    { name: "Red Label Tea (250g)", description: "Red Label Tea", image: "cat/tea/tea1.png", price: "₹ 135", href: "cat/tea.html" },
    { name: "Taj Mahal Tea (500g)", description: "Taj Mahal Tea", image: "cat/tea/tea2.png", price: "₹ 350", href: "cat/tea.html" },
    { name: "Masala Tea (150g)", description: "Masala Tea", image: "cat/tea/tea3.png", price: "₹ 180", href: "cat/tea.html" },
    { name: "Saffron Tea (500g)", description: "Saffron Tea", image: "cat/tea/tea4.png", price: "₹ 390", href: "cat/tea.html" },
    { name: "Lipton Green Tea (25 Pieces)", description: "Lipton Green Tea", image: "cat/tea/liptong.png", price: "₹ 160", href: "cat/tea.html" },
    { name: "Lipton Yellow Label (25 Pieces)", description: "Lipton Yellow Label Tea", image: "cat/tea/liptony.png", price: "₹ 174", href: "cat/tea.html" },
    { name: "Iced Green Tea Mix (20 Pieces)", description: "Iced Green Tea Mix", image: "cat/tea/lipton1.png", price: "₹ 180", href: "cat/tea.html" },
    { name: "Iced Green Tea Mix (20 Pieces)", description: "Iced Green Tea Mix", image: "cat/tea/lipton2.png", price: "₹ 210", href: "cat/tea.html" },
    { name: "Iced Black Tea Mix (25 Pieces)", description: "Iced Black Tea Mix", image: "cat/tea/lipton3.png", price: "₹ 240", href: "cat/tea.html" },
    { name: "Choco Chip Ice Cream", description: "Choco Chip Ice Cream", image: "cat/sweet/I2.png", price: "₹ 165", href: "cat/sweet.html" },
    { name: "Ice Cream Cone", description: "Ice Cream Cone", image: "cat/sweet/I1.png", price: "₹ 100", href: "cat/sweet.html" },
    { name: "Strawberry Ice Cream", description: "Strawberry Ice Cream", image: "cat/sweet/I9.png", price: "₹ 140", href: "cat/sweet.html" },
    { name: "Brownie Ice Cream", description: "Brownie Ice Cream", image: "cat/sweet/I10.png", price: "₹ 120", href: "cat/sweet.html" },
    { name: "Magnum Ice Cream", description: "Magnum Ice Cream", image: "cat/sweet/I6.jpg", price: "₹ 190", href: "cat/sweet.html" },
    { name: "Vanilla Ice Cream", description: "Vanilla Ice Cream", image: "cat/sweet/I3.png", price: "₹ 240", href: "cat/sweet.html" },
    { name: "Vadilal Choco", description: "Vadilal Choco", image: "cat/sweet/I4.png", price: "₹ 260", href: "cat/sweet.html" },
    { name: "Vadilal Kesar Pista", description: "Vadilal Kesar Pista", image: "cat/sweet/I5.png", price: "₹ 290", href: "cat/sweet.html" },
    { name: "Magnum Pack", description: "Magnum Pack", image: "cat/sweet/I7.png", price: "₹ 360", href: "cat/sweet.html" },
    { name: "Havmor Ice Cream", description: "Havmor Ice Cream", image: "cat/sweet/I8.png", price: "₹ 210", href: "cat/sweet.html" },
    { name: "Diamond Whey Protein", description: "Diamond Whey Protein (2 Kg)", image: "cat/supplements/s1.png", price: "₹ 3500", href: "cat/supplements.html" },
    { name: "Whey Protein", description: "Whey Protein (2 Kg)", image: "cat/supplements/p2.png", price: "₹ 3200", href: "cat/supplements.html" },
    { name: "Platinum Creatine", description: "Platinum Creatine (400 g)", image: "cat/supplements/s2.png", price: "₹ 1200", href: "cat/supplements.html" },
    { name: "Fish Oil Tablets", description: "Fish Oil Tablets (200 capsules)", image: "cat/supplements/s3.png", price: "₹ 1500", href: "cat/supplements.html" },
    { name: "MuscleBlaze Protein Gainer", description: "MuscleBlaze Protein Gainer (3.5 Kg)", image: "cat/supplements/s4.png", price: "₹ 3500", href: "cat/supplements.html" },
    { name: "Drools", description: "Dog Food (3 Kg)", image: "cat/pet/m1.png", price: "₹ 1120", href: "cat/pet.html" },
    { name: "Bowl", description: "Food Bowl (Pack of 2)", image: "cat/pet/m2.png", price: "₹ 250", href: "cat/pet.html" },
    { name: "Chain", description: "Dog Chain", image: "cat/pet/m3.png", price: "₹ 620", href: "cat/pet.html" },
    { name: "Meat Bone", description: "Meat Bone", image: "cat/pet/m4.png", price: "₹ 230", href: "cat/pet.html" },
    { name: "Play Ball", description: "Play Ball", image: "cat/pet/m5.png", price: "₹ 260", href: "cat/pet.html" },
    { name: "Collar", description: "Collar (Pack of 2)", image: "cat/pet/m6.png", price: "₹ 450", href: "cat/pet.html" },
    { name: "Hemp Oil", description: "Pet Hemp Oil", image: "cat/pet/m7.png", price: "₹ 300", href: "cat/pet.html" },
    { name: "Puppy Wipes", description: "Puppy Wipes (Pack of 70)", image: "cat/pet/m8.png", price: "₹ 150", href: "cat/pet.html" },
    { name: "Grooming Kit", description: "Pet Grooming Kit", image: "cat/pet/m9.png", price: "₹ 2699", href: "cat/pet.html" },
    { name: "Clothes", description: "Pet Clothes (Pack of 6)", image: "cat/pet/m10.png", price: "₹ 1800", href: "cat/pet.html" },
    { name: "Fish Oil", description: "Fish Oil Capsules", image: "cat/personal/m1.png", price: "₹ 1200", href: "cat/personal.html" },
    { name: "Paracetamol", description: "Paracetamol Tablets", image: "cat/personal/m2.png", price: "₹ 150", href: "cat/personal.html" },
    { name: "Cefixime", description: "Cefixime Tablets (per)", image: "cat/personal/m3.png", price: "₹ 180", href: "cat/personal.html" },
    { name: "Cough Syrup", description: "Cough Syrup Bottle", image: "cat/personal/m4.png", price: "₹ 150", href: "cat/personal.html" },
    { name: "Cetrizine", description: "Cetrizine Tablets", image: "cat/personal/m5.png", price: "₹ 100", href: "cat/personal.html" },
    { name: "Nasal Drop", description: "Nasal Drops", image: "cat/personal/m6.png", price: "₹ 129", href: "cat/personal.html" },
    { name: "Eye Drop", description: "Eye Drops", image: "cat/personal/m7.png", price: "₹ 199", href: "cat/personal.html" },
    { name: "Throat Drop", description: "Throat Drops", image: "cat/personal/m8.png", price: "₹ 249", href: "cat/personal.html" },
    { name: "Antibiotic", description: "Antibiotic Tablets (per)", image: "cat/personal/m9.png", price: "₹ 79", href: "cat/personal.html" },
    { name: "Migraine", description: "Migraine Relief Tablets", image: "cat/personal/m10.png", price: "₹ 199", href: "cat/personal.html" },
    { name: "Kurkure", description: "Spicy Kurkure Snack", image: "cat/munchies/kurkure.png", price: "₹ 50", href: "cat/munchies.html" },
    { name: "Lays Chips", description: "Lays Classic Chips", image: "cat/munchies/lays.png", price: "₹ 60", href: "cat/munchies.html" },
    { name: "Lays Max Chips", description: "Lays Max Chips", image: "cat/munchies/laysmax.png", price: "₹ 60", href: "cat/munchies.html" },
    { name: "Lays Wavy", description: "Lays Wavy Chips", image: "cat/munchies/layswavy.png", price: "₹ 80", href: "cat/munchies.html" },
    { name: "Doritos", description: "Doritos Chips", image: "cat/munchies/doritos.png", price: "₹ 60", href: "cat/munchies.html" },
    { name: "Bingo Chips", description: "Bingo Potato Chips", image: "cat/munchies/bingo.png", price: "₹ 50", href: "cat/munchies.html" },
    { name: "Pringles", description: "Pringles Chips", image: "cat/munchies/pringles.png", price: "₹ 130", href: "cat/munchies.html" },
    { name: "Uncle Chips", description: "Uncle Chips (2 pack)", image: "cat/munchies/unclechips.png", price: "₹ 40", href: "cat/munchies.html" },
    { name: "Mad Angles", description: "Bingo Mad Angles", image: "cat/munchies/madangles.png", price: "₹ 50", href: "cat/munchies.html" },
    { name: "Kurkure Pastax", description: "Kurkure Pastax", image: "cat/munchies/kurkure1.png", price: "₹ 54", href: "cat/munchies.html" },
    { name: "Duct Tape (50 m)", description: "Strong adhesive duct tape", image: "cat/essentials/e1.png", price: "₹ 199", href: "cat/house.html" },
    { name: "Lights (5m)", description: "LED strip lights", image: "cat/essentials/e2.png", price: "₹ 350", href: "cat/house.html" },
    { name: "Measuring Tape (5 m)", description: "Durable measuring tape", image: "cat/essentials/e3.png", price: "₹ 250", href: "cat/house.html" },
    { name: "Pliers", description: "Multipurpose pliers", image: "cat/essentials/e4.png", price: "₹ 399", href: "cat/house.html" },
    { name: "Hammer", description: "Heavy-duty hammer", image: "cat/essentials/e5.png", price: "₹ 450", href: "cat/house.html" },
    { name: "Measuring Cup (600ml)", description: "Accurate measuring cup", image: "cat/essentials/e6.png", price: "₹ 200", href: "cat/house.html" },
    { name: "Multi Socket", description: "High-power multi-socket", image: "cat/essentials/e7.png", price: "₹ 999", href: "cat/house.html" },
    { name: "Drill", description: "Powerful electric drill", image: "cat/essentials/e8.png", price: "₹ 2499", href: "cat/house.html" },
    { name: "Cutter", description: "Sharp utility cutter", image: "cat/essentials/e9.png", price: "₹ 110", href: "cat/house.html" },
    { name: "Hanger Set (12 p)", description: "Durable hanger set", image: "cat/essentials/e10.png", price: "₹ 550", href: "cat/house.html" },
    { name: "Blender", description: "Powerful kitchen blender", image: "cat/home/b.png", price: "₹ 1999", href: "cat/home.html" },
    { name: "Coffee Maker", description: "Automatic coffee maker", image: "cat/home/cm.png", price: "₹ 3499", href: "cat/home.html" },
    { name: "Dining Set", description: "Complete dining set", image: "cat/home/ds.jpg", price: "₹ 5000", href: "cat/home.html" },
    { name: "Toaster", description: "Efficient bread toaster", image: "cat/home/t.png", price: "₹ 1500", href: "cat/home.html" },
    { name: "Kettle", description: "Electric water kettle", image: "cat/home/k.png", price: "₹ 950", href: "cat/home.html" },
    { name: "Stick Pan Set", description: "Non-stick pan set", image: "cat/home/pan.png", price: "₹ 2200", href: "cat/home.html" },
    { name: "Knife Set", description: "Sharp kitchen knives", image: "cat/home/kn.png", price: "₹ 1500", href: "cat/home.html" },
    { name: "Whisk", description: "Stainless steel whisk", image: "cat/home/wh.png", price: "₹ 699", href: "cat/home.html" },
    { name: "Baking Tray", description: "Durable baking tray", image: "cat/home/tr.png", price: "₹ 499", href: "cat/home.html" },
    { name: "Cupcake Mold Tray", description: "Non-stick cupcake tray", image: "cat/home/mt.png", price: "₹ 899", href: "cat/home.html" },
    { name: "Banana (1kg)", description: "Fresh bananas", image: "cat/fruit/banana.png", price: "₹ 70", href: "cat/fruit.html" },
    { name: "Apple (1kg)", description: "Crisp apples", image: "cat/fruit/apple.png", price: "₹ 170", href: "cat/fruit.html" },
    { name: "Peach (500g)", description: "Juicy peaches", image: "cat/fruit/peach.png", price: "₹ 114", href: "cat/fruit.html" },
    { name: "Grapes (500g)", description: "Fresh grapes", image: "cat/fruit/grapes.png", price: "₹ 75", href: "cat/fruit.html" },
    { name: "Kiwi (200g)", description: "Sweet kiwis", image: "cat/fruit/kiwi.png", price: "₹ 177", href: "cat/fruit.html" },
    { name: "Amla (100g)", description: "Healthy amla", image: "cat/fruit/amla.png", price: "₹ 65", href: "cat/fruit.html" },
    { name: "Blueberry (125g)", description: "Fresh blueberries", image: "cat/fruit/blueberries.png", price: "₹ 290", href: "cat/fruit.html" },
    { name: "Mango (1kg)", description: "Delicious mangoes", image: "cat/fruit/mango.png", price: "₹ 190", href: "cat/fruit.html" },
    { name: "Orange (500g)", description: "Citrus oranges", image: "cat/fruit/orange.png", price: "₹ 185", href: "cat/fruit.html" },
    { name: "Strawberry (200g)", description: "Fresh strawberries", image: "cat/fruit/strawberry.png", price: "₹ 140", href: "cat/fruit.html" },
    { name: "Football", description: "High-quality football", image: "cat/football/f1.png", price: "₹ 500", href: "cat/football.html" },
    { name: "Goal Keeper Gloves", description: "Durable goal keeper gloves", image: "cat/football/f2.png", price: "₹ 460", href: "cat/football.html" },
    { name: "Shoes", description: "Comfortable football shoes", image: "cat/football/f3.png", price: "₹ 8490", href: "cat/football.html" },
    { name: "Shin Pad", description: "Protective shin pads", image: "cat/football/f4.png", price: "₹ 400", href: "cat/football.html" },
    { name: "Kit Bag", description: "Football kit bag", image: "cat/football/f5.png", price: "₹ 2450", href: "cat/football.html" },
    { name: "Rebound Net", description: "Rebound net for practice", image: "cat/football/f6.png", price: "₹ 750", href: "cat/football.html" },
    { name: "Knee Guard", description: "Knee guard for protection", image: "cat/football/f7.png", price: "₹ 705", href: "cat/football.html" },
    { name: "Ball Sack (Pack of 6)", description: "Ball sack for storing balls", image: "cat/football/f8.png", price: "₹ 2000", href: "cat/football.html" },
    { name: "Bottle", description: "Water bottle for hydration", image: "cat/football/f9.png", price: "₹ 890", href: "cat/football.html" },
    { name: "Jersey", description: "Comfortable football jersey", image: "cat/football/f10.png", price: "₹ 1999", href: "cat/football.html" },
    { name: "Dumbbells", description: "High-quality dumbbells", image: "cat/equipments/D1.jpg", price: "₹ 7000", href: "cat/equipments.html" },
    { name: "Barbell Set", description: "Complete barbell set", image: "cat/equipments/D2.png", price: "₹ 8000", href: "cat/equipments.html" },
    { name: "Adjustable Dumbbells", description: "Adjustable dumbbells for versatile workouts", image: "cat/equipments/D3.png", price: "₹ 1400", href: "cat/equipments.html" },
    { name: "Weight Bench", description: "Multi-purpose weight bench", image: "cat/equipments/E1.png", price: "₹ 6000", href: "cat/equipments.html" },
    { name: "Kettlebells", description: "Durable kettlebells for strength training", image: "cat/equipments/K1.png", price: "₹ 2000", href: "cat/equipments.html" },
    { name: "Stability Ball", description: "Exercise stability ball", image: "cat/equipments/B1.png", price: "₹ 1500", href: "cat/equipments.html" },
    { name: "Treadmill", description: "High-quality treadmill", image: "cat/equipments/T1.png", price: "₹ 35000", href: "cat/equipments.html" },
    { name: "Stationary Bike", description: "Durable stationary bike", image: "cat/equipments/C1.png", price: "₹ 25000", href: "cat/equipments.html" },
    { name: "Stair Climber", description: "Stair climber for intense cardio", image: "cat/equipments/S1.png", price: "₹ 130000", href: "cat/equipments.html" },
    { name: "Leg Extension Machine", description: "Leg extension machine for strength training", image: "cat/equipments/L1.png", price: "₹ 150000", href: "cat/equipments.html" },
    { name: "Coca Cola", description: "Classic Coca Cola", image: "cat/drinks/cocacola.png", price: "₹ 45", href: "cat/drinks.html" },
    { name: "Cocacola Diet can", description: "Sugar-free Coca Cola Diet", image: "cat/drinks/cocacoladiet can.png", price: "₹ 80", href: "cat/drinks.html" },
    { name: "Pespi", description: "Refreshing Pepsi", image: "cat/drinks/pepsi.png", price: "₹ 45", href: "cat/drinks.html" },
    { name: "Maaza", description: "Tasty mango Maaza", image: "cat/drinks/maaza.png", price: "₹ 50", href: "cat/drinks.html" },
    { name: "Real Fruit", description: "Real fruit juice", image: "cat/drinks/realfruit.png", price: "₹ 140", href: "cat/drinks.html" },
    { name: "Sprite", description: "Crisp Sprite", image: "cat/drinks/sprite.png", price: "₹ 45", href: "cat/drinks.html" },
    { name: "Stink", description: "Sting energy drink", image: "cat/drinks/sting.png", price: "₹ 45", href: "cat/drinks.html" },
    { name: "Cocacola Can", description: "Coca Cola in a can", image: "cat/drinks/cocacola can.png", price: "₹ 60", href: "cat/drinks.html" },
    { name: "Fanta", description: "Orange Fanta", image: "cat/drinks/fanta.png", price: "₹ 60", href: "cat/drinks.html" },
    { name: "Thumbs Up", description: "Thumbs Up drink", image: "cat/drinks/thumbsup can.png", price: "₹ 60", href: "cat/drinks.html" },
    { name: "AMUL MILK(1L)", description: "Fresh Amul Milk", image: "cat/dairy/amul.png", price: "₹ 60", href: "cat/dairy.html" },
    { name: "Brown Eggs", description: "Fresh Brown Eggs", image: "cat/dairy/browneggs.png", price: "₹ 400", href: "cat/dairy.html" },
    { name: "Butter(200g)", description: "Creamy Butter", image: "cat/dairy/butter.png", price: "₹ 122", href: "cat/dairy.html" },
    { name: "Cheese(200g)", description: "Delicious Cheese", image: "cat/dairy/cheese.png", price: "₹ 145", href: "cat/dairy.html" },
    { name: "Choco Milk(180ml)", description: "Choco Milk", image: "cat/dairy/chocomilk.png", price: "₹ 40", href: "cat/dairy.html" },
    { name: "Eggs(30 pieces)", description: "Pack of 30 Eggs", image: "cat/dairy/egg.png", price: "₹ 210", href: "cat/dairy.html" },
    { name: "Feta Cheese(100g)", description: "Feta Cheese", image: "cat/dairy/fetacheese.png", price: "₹ 110", href: "cat/dairy.html" },
    { name: "Yogurt(85g)", description: "Yogurt", image: "cat/dairy/yogurt.png", price: "₹ 60", href: "cat/dairy.html" },
    { name: "Amul Ghee(1L)", description: "Pure Amul Ghee", image: "cat/dairy/ghee.png", price: "₹ 560", href: "cat/dairy.html" },
    { name: "Mayonnaise(250g)", description: "Creamy Mayonnaise", image: "cat/dairy/Mayonnaise.png", price: "₹ 90", href: "cat/dairy.html" },
    { name: "Helmet", description: "Cricket Helmet", image: "cat/cricket/helmet.jpg", price: "₹ 1999", href: "cat/cricket.html" },
    { name: "Gloves", description: "Cricket Gloves", image: "cat/cricket/gloves.png", price: "₹ 999", href: "cat/cricket.html" },
    { name: "Knee Pad", description: "Cricket Knee Pad", image: "cat/cricket/pad.png", price: "₹ 1100", href: "cat/cricket.html" },
    { name: "Glasses UV", description: "UV Glasses for Cricket", image: "cat/cricket/glasses.png", price: "₹ 1500", href: "cat/cricket.html" },
    { name: "Shoes", description: "Cricket Shoes", image: "cat/cricket/shoes.png", price: "₹ 2850", href: "cat/cricket.html" },
    { name: "Bat", description: "Cricket Bat", image: "cat/cricket/bat.png", price: "₹ 2200", href: "cat/cricket.html" },
    { name: "Ball", description: "Cricket Ball", image: "cat/cricket/ball.png", price: "₹ 500", href: "cat/cricket.html" },
    { name: "Bag", description: "Cricket Kit Bag", image: "cat/cricket/bag.png", price: "₹ 899", href: "cat/cricket.html" },
    { name: "Stumps", description: "Cricket Stumps", image: "cat/cricket/stumps.png", price: "₹ 800", href: "cat/cricket.html" },
    { name: "Full Kit", description: "Complete Cricket Kit", image: "cat/cricket/fullkit.png", price: "₹ 12080", href: "cat/cricket.html" },
    { name: "Iced Cappucino", description: "Iced Cappucino (300 ml)", image: "cat/coffee/c5.png", price: "₹ 260", href: "cat/coffee.html" },
    { name: "Nescafé Black Coffee", description: "Nescafé Black Coffee (90 g)", image: "cat/coffee/blackc1.png", price: "₹ 440", href: "cat/coffee.html" },
    { name: "Nescafé Classic", description: "Nescafé Classic (45 g)", image: "cat/coffee/c2.png", price: "₹ 200", href: "cat/coffee.html" },
    { name: "Nescafé Chilled Latté", description: "Nescafé Chilled Latté (120 ml)", image: "cat/coffee/c4.png", price: "₹ 70", href: "cat/coffee.html" },
    { name: "Nescafé Chilled Latté (Can)", description: "Nescafé Chilled Latté (240 ml)", image: "cat/coffee/c3.png", price: "₹ 120", href: "cat/coffee.html" },
    { name: "Cleaning Mop Set", description: "A durable mop set for easy and efficient cleaning of all surfaces.", image: "cat/clean/m1.png", price: "₹ 1200", href: "cat/clean.html" },
    { name: "Vanish Spray", description: "Powerful stain remover spray, ideal for clothes and fabric.", image: "cat/clean/m2.png", price: "₹ 130", href: "cat/clean.html" },
    { name: "Air Freshner", description: "Refreshing air freshener to keep your home smelling pleasant.", image: "cat/clean/m3.png", price: "₹ 150", href: "cat/clean.html" },
    { name: "Dust Pan", description: "Compact and convenient dustpan for easy cleanup.", image: "cat/clean/m4.png", price: "₹ 180", href: "cat/clean.html" },
    { name: "Broom", description: "High-quality broom for sweeping floors effectively.", image: "cat/clean/m5.png", price: "₹ 240", href: "cat/clean.html" },
    { name: "Scotch Brite (Pack of 3)", description: "Pack of 3 scouring pads for tough cleaning jobs.", image: "cat/clean/m6.png", price: "₹ 135", href: "cat/clean.html" },
    { name: "Gloves", description: "Protective gloves for cleaning, designed for comfort and durability.", image: "cat/clean/m7.png", price: "₹ 245", href: "cat/clean.html" },
    { name: "Microfiber Cloth (Pack of 6)", description: "Soft and absorbent microfiber cloths, perfect for dusting and wiping.", image: "cat/clean/m8.png", price: "₹ 450", href: "cat/clean.html" },
    { name: "Squeegees", description: "Ideal for cleaning windows and glass surfaces with ease.", image: "cat/clean/m9.png", price: "₹ 120", href: "cat/clean.html" },
    { name: "MultiFloor Cleaner", description: "Powerful cleaner suitable for all types of floors, removing dirt and stains effortlessly.", image: "cat/clean/m10.png", price: "₹ 300", href: "cat/clean.html" },
    { name: "Bagle", description: "Soft and fresh bagel, perfect for breakfast or as a snack.", image: "cat/bakery/bagle.png", price: "₹ 50", href: "cat/bakery.html" },
    { name: "Baguette", description: "Crispy on the outside and soft inside, perfect for sandwiches or sides.", image: "cat/bakery/baguette.png", price: "₹ 80", href: "cat/bakery.html" },
    { name: "Muffin", description: "Delicious, soft muffins, available in a variety of flavors.", image: "cat/bakery/muffin.png", price: "₹ 40", href: "cat/bakery.html" },
    { name: "Bread", description: "Fresh and soft bread, ideal for sandwiches or toast.", image: "cat/bakery/bread.png", price: "₹ 35", href: "cat/bakery.html" },
    { name: "Choco Croissant", description: "Flaky croissant filled with rich chocolate, perfect for a sweet treat.", image: "cat/bakery/chococroissant.png", price: "₹ 20", href: "cat/bakery.html" },
    { name: "Croissant", description: "Buttery, flaky croissant, ideal for breakfast or snacks.", image: "cat/bakery/croissant.png", price: "₹ 20", href: "cat/bakery.html" },
    { name: "Pound Cake", description: "Rich and moist pound cake, perfect for tea time or a snack.", image: "cat/bakery/poundcake.png", price: "₹ 75", href: "cat/bakery.html" },
    { name: "Bread Loaf", description: "Soft, fresh bread loaf, perfect for daily consumption.", image: "cat/bakery/breadloaf.png", price: "₹ 80", href: "cat/bakery.html" },
    { name: "Cake Roll", description: "Soft sponge cake rolled with a sweet filling, great for any occasion.", image: "cat/bakery/cakeroll.png", price: "₹ 30", href: "cat/bakery.html" },
    { name: "Donut", description: "Delicious and soft donuts, perfect for a sweet snack.", image: "cat/bakery/Donut.png", price: "₹ 50", href: "cat/bakery.html" },
    { name: "Racquet", description: "High-quality badminton racquet for players of all levels.", image: "cat/badminton/racket.png", price: "₹ 2600", href: "cat/badminton.html" },
    { name: "Feather Shuttle", description: "Premium feather shuttlecock for professional-level play.", image: "cat/badminton/shuttle1.png", price: "₹ 60 per piece", href: "cat/badminton.html" },
    { name: "Synthetic Shuttle", description: "Durable synthetic shuttlecock, ideal for casual and practice play.", image: "cat/badminton/shuttle2.png", price: "₹ 80 per piece", href: "cat/badminton.html" },
    { name: "Grip", description: "Comfortable grip for your racquet, enhancing performance and comfort.", image: "cat/badminton/grip.png", price: "₹ 110", href: "cat/badminton.html" },
    { name: "Shoes", description: "High-performance badminton shoes for superior grip and comfort.", image: "cat/badminton/shoes.png", price: "₹ 2850", href: "cat/badminton.html" },
    { name: "T-shirt", description: "Comfortable and breathable T-shirt designed for badminton players.", image: "cat/badminton/shirt.png", price: "₹ 1200", href: "cat/badminton.html" },
    { name: "Wrist Band", description: "Sweat-absorbing wristband, sold in pairs, perfect for active play.", image: "cat/badminton/band.png", price: "₹ 379", href: "cat/badminton.html" },
    { name: "Cover", description: "Protect your racquet with this durable cover, designed for easy carrying.", image: "cat/badminton/cover.png", price: "₹ 499", href: "cat/badminton.html" },
    { name: "Head Band", description: "Absorb sweat and keep your hair in place with this stylish headband.", image: "cat/badminton/hband.png", price: "₹ 270", href: "cat/badminton.html" },
    { name: "Shorts", description: "Comfortable shorts designed for badminton, providing full freedom of movement.", image: "cat/badminton/shorts.png", price: "₹ 759", href: "cat/badminton.html" },
    { name: "Diapers (Pack of 50)", description: "Soft and absorbent diapers, providing comfort and protection for babies.", image: "cat/baby/m1.png", price: "₹ 699", href: "cat/baby.html" },
    { name: "Bed", description: "Cozy and comfortable baby bed, perfect for peaceful sleep.", image: "cat/baby/m2.png", price: "₹ 2990", href: "cat/baby.html" },
    { name: "Baby Powder (200g)", description: "Gentle and soothing baby powder, ideal for keeping your baby dry and fresh.", image: "cat/baby/m3.png", price: "₹ 199", href: "cat/baby.html" },
    { name: "Baby Oil (300ml)", description: "Nourishing baby oil to keep your baby's skin soft and moisturized.", image: "cat/baby/m4.png", price: "₹ 299", href: "cat/baby.html" },
    { name: "Teether", description: "Soothing baby teether to relieve gum discomfort during teething.", image: "cat/baby/m5.png", price: "₹ 140", href: "cat/baby.html" },
    { name: "Baby Wipes (Pack of 100)", description: "Gentle and soft wipes for quick cleaning and baby care.", image: "cat/baby/m6.png", price: "₹ 299", href: "cat/baby.html" },
    { name: "Baby Shampoo (200 ml)", description: "Mild and tear-free baby shampoo, designed for delicate hair.", image: "cat/baby/m7.png", price: "₹ 250", href: "cat/baby.html" },
    { name: "Tooth Paste", description: "Gentle toothpaste for babies, ideal for introducing oral hygiene.", image: "cat/baby/m8.png", price: "₹ 150", href: "cat/baby.html" },
    { name: "Baby Cream (100 ml)", description: "Moisturizing baby cream to protect and hydrate delicate skin.", image: "cat/baby/m9.png", price: "₹ 129", href: "cat/baby.html" },
    { name: "Bottle", description: "Safe and easy-to-use baby bottle, perfect for feeding.", image: "cat/baby/m10.png", price: "₹ 699", href: "cat/baby.html" }
];


// References to HTML elements
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const resultsContainer = document.createElement('div');

// Add class and append results container to the body
resultsContainer.classList.add('search-results');
document.querySelector('.search-bar').appendChild(resultsContainer); // Append it to the search bar

// Function to display a scroll message
function showScrollMessage(message) {
    const scrollMessage = document.getElementById('scroll-message');
    scrollMessage.textContent = message;
    scrollMessage.classList.add('show');

    // Hide the message after 3 seconds
    setTimeout(() => {
        scrollMessage.classList.remove('show');
    }, 3000);
}

// Function to filter and display results
function filterProducts(query) {
    // Clear previous results
    resultsContainer.innerHTML = '';

    // Filter products by the search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    // Display filtered results
    filteredProducts.forEach(product => {
        const productItem = document.createElement('div'); // Use <div> for styling
        productItem.classList.add('product-item');

        // Add product layout
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div>
                <h4>${product.name}</h4>
                <p>${product.description}</p>
            </div>
        `;

        // Add click event listener for different behaviors
        productItem.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            if (product.samePage) {
                // Show a popup message for same-page items
                showScrollMessage('Kindly scroll down to view the item.');
                const targetSection = document.querySelector(product.href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to the external link
                window.location.href = product.href;
            }
        });

        resultsContainer.appendChild(productItem);
    });

    // Show a message if no products match
    if (filteredProducts.length === 0) {
        resultsContainer.innerHTML = `<p>No products found.</p>`;
    }
}

// Event listener for search input (when user types)
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
        filterProducts(query);
        resultsContainer.style.display = 'block'; // Show results container
    } else {
        resultsContainer.style.display = 'none'; // Hide results container
    }
});

// Event listener for the search button (when user clicks)
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
        filterProducts(query);
        resultsContainer.style.display = 'block'; // Show results container
    } else {
        resultsContainer.style.display = 'none'; // Hide results container
    }
});



//------------------------------SEARCH--------------------------

// Function to check location availability
function checkLocationAvailability(event) {
    event.preventDefault(); // Prevent form submission (default behavior)

    const location = document.getElementById('location').value.trim();
    const availableLocations = [
        "Kashmir", "kashmir", "KASHMIR",
        "Mumbai", "mumbai", "MUMBAI",
        "Delhi", "delhi", "DELHI",
        "Chennai", "chennai", "CHENNAI",
        "Kolkata", "kolkata", "KOLKATA",
        "Bengaluru", "bengaluru", "BENGALURU",
        "Hyderabad", "hyderabad", "HYDERABAD",
        "Ahmedabad", "ahmedabad", "AHMEDABAD",
        "Pune", "pune", "PUNE",
        "Jaipur", "jaipur", "JAIPUR",
        "Lucknow", "lucknow", "LUCKNOW",
        "Bhopal", "bhopal", "BHOPAL",
        "Indore", "indore", "INDORE"
    ];

    // Check if the location is in the availableLocations array
    if (availableLocations.includes(location)) {
        alert(`✅ Service is available in ${location}! Redirecting to Customer Support`);

        // Redirect to chatbot.html after a brief delay
        setTimeout(function () {
            window.location.href = 'chatbot.html'; // Redirect to chatbot page
        }, 0.5); // 
    } else {
        alert(`❌ Sorry, we don’t serve ${location} yet. Redirecting to Customer Support`);
        setTimeout(function () {
            window.location.href = 'chatbot.html'; // Redirect to chatbot page
        }, 0.5); 
    }

    // Close the modal after submission (optional)
    closecustomercare();
}

// Attach the checkLocationAvailability function to the form submit
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('locationForm');
    if (form) {
        form.addEventListener('submit', checkLocationAvailability); // Listen to the submit event
    }
});

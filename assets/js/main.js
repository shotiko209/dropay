document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            if (nav) nav.classList.remove('active');
        });
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('headerDarkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            let theme;
            if (document.body.getAttribute('data-theme') === 'dark') {
                document.body.removeAttribute('data-theme');
                theme = 'light';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                theme = 'dark';
            }
            localStorage.setItem('theme', theme);
        });
    }
    
    // Form Submission
    const paymentForm = document.getElementById('paymentForm');
    const responseMessage = document.getElementById('responseMessage');
    
    if (paymentForm && responseMessage) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = currentLanguage === 'ka' ? 'იგზავნება...' : 'Sending...';
            submitBtn.disabled = true;
            
            // Form data
            const formData = {
                name: this.name.value,
                lastname: this.lastname.value,
                personal_id: this.personal_id.value,
                recipient: this.recipient.value,
                amount: this.amount.value,
                currency: this.currency.value,
                account_number: this.account_number.value,
                recipient_account: this.recipient_account.value,
                reason: this.reason.value
            };
            
            // Simulate API call (replace with actual fetch to your Flask backend)
            setTimeout(() => {
                // This is a simulation - replace with actual fetch to /api/payment-request
                console.log('Form data:', formData);
                
                // Simulate successful response
                const success = Math.random() > 0.2; // 80% chance of success for demo
                
                if (success) {
                    responseMessage.textContent = currentLanguage === 'ka' ? 
                        'გადახდის მოთხოვნა წარმატებით გაიგზავნა!' : 
                        'Payment request sent successfully!';
                    responseMessage.classList.remove('error');
                    responseMessage.classList.add('success');
                    paymentForm.reset();
                } else {
                    responseMessage.textContent = currentLanguage === 'ka' ? 
                        'შეცდომა მოთხოვნის გაგზავნისას. გთხოვთ სცადოთ თავიდან.' : 
                        'Error sending request. Please try again.';
                    responseMessage.classList.remove('success');
                    responseMessage.classList.add('error');
                }
                
                responseMessage.style.display = 'block';
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    responseMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ენის შემცვლელი ლოგიკა
    const languageToggle = document.getElementById('languageToggle');
    let currentLanguage = 'ka'; // ნაგულისხმევად ქართული

    // ტექსტების ლექსიკონი
    const translations = {
        'ka': {
            'home': 'მთავარი',
            'features': 'ფუნქციები',
            'request': 'გადახდის მოთხოვნა',
            'about us': 'ჩვენს შესახებ',
            'contact': 'კონტაქტი',
            'aboutTitle': 'ჩვენს შესახებ',
            "requestButton1" : "გამოგვყევით",
            'aboutText': 'DroPay შეიქმნა ერთი უბრალო მაგრამ ძალზე აქტუალური პრობლემის გადასაჭრელად: როდესაც ადამიანს ანგარიშზე აქვს ფული, მაგრამ დროული გადახდა ვერ ხერხდება — დაბლოკილი ბარათის, გადარიცხვის შეფერხების ან ტექნიკური პრობლემის გამო. ასეთ მომენტში შეიძლება დაიკარგოს ბინა, შეგეწყვიტოს ინტერნეტი, დაგეგმილი ბილეთი გაგეცალოს — ანუ საკითხი გადაჭრის მოლოდინში ფინანსურად და ემოციურად დამძიმდეს.DroPay მოქმედებს როგორც დროებითი გადამხდელი შენი სახელით — ჩვენ ვასრულებთ გადახდას შენს მაგივრად მაშინვე, როცა ამას ვერ ასწრებ ან არ შეგიძლია, და თანხის დაბრუნებას გვაძლევ მაშინ, როცა უკვე შეძლებ. ეს არ არის სესხი და არც ბანკური პროდუქტი — ეს არის ტექნოლოგიური გადაწყვეტა კრიტიკული გადახდების დროულად შესრულებისთვის.ჩვენ გვჯერა, რომ გადახდას არ უნდა სჭირდებოდეს ზედმეტი დრო, სტრესი ან დახმარების თხოვნა სხვებისგან. ჩვენი მიზანია შევქმნათ სანდო, უსაფრთხო და ადვილად გამოსაყენებელი სისტემა, რომელიც გეხმარება გაძვირებული საკომისიოების, დამღლელი სატელეფონო ზარების და გადახდის შეფერხებების გარეშე.DroPay — გადახდები მაშინ, როცა ყველაზე მეტად გჭირდება.',
            'aboutMission': 'ჩვენი მისიაა შევქმნათ სანდო, სწრაფი და ადვილად ხელმისაწვდომი გადახდის მხარდაჭერა ყველასთვის.',
            'heroTitle': 'სასწრაფო გადახდის მოთხოვნა ერთი დაწკაპუნებით',
            'heroSubtitle': 'როდესაც დრო ან ტექნიკური პრობლემა გიშლით ხელს, DroPay მზადაა დაგეხმაროთ',
            'requestButton': 'გადახდის მოთხოვნა',
            'whyChoose': 'რატომ ავირჩიოთ DroPay?',
            'fast': 'სწრაფი',
            'fastDesc': 'გადახდის მოთხოვნები წამებში გაიგზავნება',
            'secure': 'უსაფრთხო',
            'secureDesc': 'დაცული კომუნიკაცია და მონაცემთა დაშიფვრა',
            'versatile': 'მრავალფეროვანი',
            'versatileDesc': 'მუშაობს ყველა ბანკთან და გადახდის სისტემასთან',
            'paymentRequest': 'გადახდის მოთხოვნა',
            'name': 'სახელი',
            'lastname': 'გვარი',
            'personal_id': 'პირადი ნომერი',
            'recipient': 'მიმღები',
            'amount': 'თანხა',
            'currency': 'ვალუტა',
            'account_number': 'თქვენი ანგარიშის ნომერი',
            'recipient_account': 'მიმღების ანგარიშის ნომერი',
            'reason': 'მიზეზი',
            'submit': 'მოთხოვნის გაგზავნა',
            'footerText': 'სასწრაფო გადახდის მოთხოვნის სერვისი',
            'links': 'ბმულები',
            'contactTitle': 'კონტაქტი',
            'address': 'მისამართი: თბილისი, საქართველო',
            'copyright': 'ყველა უფლება დაცულია.',
            'bankPartnershipTitle' : 'რატომ უნდა ითანამშრომლონ ქართულმა ბანკებმა DroPay-სთან?',
            'loyaltyBenefit': 'მომხმარებელთა ლოიალობის გაზრდა',
            'loyaltyBenefitDesc': 'DroPay-თან თანამშრომლობა საშუალებას მისცემს ბანკებს, შესთავაზონ თავიანთ მომხმარებლებს უნიკალური სერვისი, რომელიც აგვარებს გადახდების შეფერხებებთან დაკავშირებულ საერთო პრობლემას. ეს გაზრდის მომხმარებელთა ლოიალობას და კმაყოფილებას.',
            'acquisitionBenefit': 'ახალი მომხმარებლების მოზიდვა',
            'acquisitionBenefitDesc': 'DroPay-ის სერვისი მოიზიდავს ახალ მომხმარებლებს, განსაკუთრებით მათ, ვისაც ხშირად უწევს საჩქარო გადახდების განხორციელება. ეს გააფართოვებს ბანკის კლიენტურის ბაზას.',
            'revenueBenefit': 'შემოსავლების ზრდა',
            'revenueBenefitDesc': 'თანამშრომლობის შემთხვევაში ბანკს შეუძლია მიიღოს შემოსავლის წილი ან დამატებითი საკომისიოები, რაც ხელს შეუწყობს საერთო შემოსავლების ზრდას.',
            'imageBenefit': 'ინოვაციური იმიჯი',
            'imageBenefitDesc': 'ინოვაციურ სტარტაპთან თანამშრომლობა გააძლიერებს ბანკის იმიჯს, როგორც თანამედროვე, ტექნოლოგიურად განვითარებული და მომხმარებელზე ორიენტირებული ფინანსური ინსტიტუტის.',
            'dataBenefit': 'მონაცემთა ანალიზი',
            'dataBenefitDesc': 'თანამშრომლობა DroPay-სთან საშუალებას მისცემს ბანკს, მოიპოვოს ღირებული ინფორმაცია მომხმარებელთა გადახდითი ქცევის შესახებ პროდუქტების გასაუმჯობესებლად.',
            'competitionBenefit': 'კონკურენტული უპირატესობა',
            'competitionBenefitDesc': 'რადგანაც ქართული ბანკების მობილურ აპლიკაციებში მსგავსი ფუნქციონალი ჯერ არ არსებობს, DroPay-თან თანამშრომლობა ბანკს საშუალებას მისცემს, პირველი შევიდეს ამ ნიშში.',
            'partnershipConclusion': 'ამ უპირატესობების გათვალისწინებით, DroPay-თან თანამშრომლობა ქართული ბანკებისთვის შეიძლება იყოს სტრატეგიულად მნიშვნელოვანი ნაბიჯი, რომელიც ხელს შეუწყობს მათ ზრდას, ინოვაციებს და მომხმარებელთა კმაყოფილების გაუმჯობესებას.'
        },
        'en': {
            'home': 'Home',
            'features': 'Features',
            'request': 'Payment Request',
            "requestButton1" : "Follow Us",
            'contact': 'Contact',
            'about us': 'About Us',
            'heroTitle': 'Instant Payment Request with One Click',
            'heroSubtitle': 'When time or technical issues stand in your way, DroPay is ready to help',
            'requestButton': 'Request Payment',
            'whyChoose': 'Why Choose DroPay?',
            'fast': 'Fast',
            'aboutTitle': 'About Us',
            'aboutText': "DroPay was created to solve a simple but widespread problem: when someone has money in their account but can't make a payment on time due to a blocked card, delayed transfers, or technical difficulties. In those moments, you might lose your apartment, get your internet shut off, or miss a scheduled flight — the financial stress quickly turns into emotional strain.DroPay acts as a temporary payer on your behalf — we complete your urgent payment immediately, even when you can't, and you repay us when your funds become accessible again. This is not a loan or a financial institution product — it's a smart solution to help you avoid missed deadlines and stressful delays.We believe payments shouldn’t require stress, waiting, or help from friends. Our goal is to provide a secure, reliable, and easy-to-use service that protects you from expensive fees, delays, and complicated procedures — especially when time is not on your side.DroPay — payments made when you need them most.",
            'aboutMission': 'Our mission is to create reliable, fast, and accessible payment support for everyone.',
            'fastDesc': 'Payment requests are sent in seconds',
            'secure': 'Secure',
            'secureDesc': 'Secure communication and data encryption',
            'versatile': 'Versatile',
            'versatileDesc': 'Works with all banks and payment systems',
            'paymentRequest': 'Payment Request',
            'name': 'First Name',
            'lastname': 'Last Name',
            'personal_id': 'Personal ID',
            'recipient': 'Recipient',
            'amount': 'Amount',
            'currency': 'Currency',
            'account_number': 'Your Account Number',
            'recipient_account': 'Recipient Account Number',
            'reason': 'Reason',
            'submit': 'Submit Request',
            'footerText': 'Instant Payment Request Service',
            'links': 'Links',
            'contactTitle': 'Contact',
            'address': 'Address: Tbilisi, Georgia',
            'copyright': 'All Rights Reserved.',
            'bankPartnershipTitle': 'Why should Georgian banks partner with DroPay?',
            'loyaltyBenefit': 'Increased customer loyalty',
            'loyaltyBenefitDesc': 'Partnering with DroPay will allow banks to offer their customers a unique service that solves common payment delay problems. This will increase customer loyalty and satisfaction.',
            'acquisitionBenefit': 'New customer acquisition',
            'acquisitionBenefitDesc': 'The DroPay service will attract new customers, especially those who frequently need to make urgent payments. This will expand the bank\'s customer base.',
            'revenueBenefit': 'Revenue growth',
            'revenueBenefitDesc': 'In case of partnership, the bank can receive a share of revenue or additional commissions, which will contribute to overall revenue growth.',
            'imageBenefit': 'Innovative image',
            'imageBenefitDesc': 'Collaboration with an innovative startup like DroPay will strengthen the bank\'s image as a modern, technologically advanced and customer-oriented financial institution.',
            'dataBenefit': 'Data analysis',
            'dataBenefitDesc': 'Partnership with DroPay will enable the bank to obtain valuable information about customers\' payment behavior to improve products.',
            'competitionBenefit': 'Competitive advantage',
            'competitionBenefitDesc': 'Since similar functionality does not yet exist in Georgian banking apps, partnering with DroPay will allow the bank to be first in this niche.',
            'partnershipConclusion': 'Considering these advantages, partnering with DroPay could be a strategically important step for Georgian banks that will contribute to their growth, innovation, and improved customer satisfaction.'
        }
    };

    // ენის შეცვლის ფუნქცია
    function toggleLanguage() {
        currentLanguage = currentLanguage === 'ka' ? 'en' : 'ka';
        updateTexts();
        localStorage.setItem('language', currentLanguage);
        if (languageToggle) {
            languageToggle.querySelector('.language-icon').textContent = currentLanguage === 'ka' ? 'EN' : 'KA';
        }
    }

    // ტექსტების განახლების ფუნქცია
    function updateTexts() {
        // ატრიბუტის მქონე ელემენტების განახლება
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLanguage][key]) {
                el.textContent = translations[currentLanguage][key];
            }
        });

        // Placeholder-ების განახლება
        const placeholders = {
            '#name': 'name',
            '#lastname': 'lastname',
            '#personal_id': 'personal_id',
            '#recipient': 'recipient',
            '#account_number': 'account_number',
            '#recipient_account': 'recipient_account',
            '#reason': 'reason'
        };

        for (const id in placeholders) {
            const key = placeholders[id];
            const element = document.querySelector(id);
            if (element && translations[currentLanguage][key]) {
                element.setAttribute('placeholder', currentLanguage === 'ka' ? 
                    `შეიყვანეთ ${translations['ka'][key].toLowerCase()}` : 
                    `Enter ${translations['en'][key].toLowerCase()}`);
            }
        }
    }

    // ენის ღილაკზე დაჭერის მოსმენა
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }

    // გვერდის ჩატვირთვისას ენის შემოწმება
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== 'ka') {
        currentLanguage = savedLanguage;
        updateTexts();
    }
    if (languageToggle) {
        languageToggle.querySelector('.language-icon').textContent = currentLanguage === 'ka' ? 'EN' : 'KA';
    }
});

// მომხმარებლის გადახდების ისტორია
async function getPaymentHistory(userId) {
  const response = await fetch(`/api/users/${userId}/payments`, {
    headers: getAuthHeader()
  });
  return response.json();
}

// სტატისტიკის ვიზუალიზაცია (Chart.js-ის გამოყენებით)
function renderPaymentStats(data) {
  const ctx = document.getElementById('paymentStatsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.months,
      datasets: [{
        label: 'გადახდები',
        data: data.payments,
        backgroundColor: '#6c5ce7'
      }]
    }
  });
}
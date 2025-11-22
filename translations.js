// Current language setting (default to Turkish)
let currentLanguage = typeof appConfig !== 'undefined' ? appConfig.defaultLanguage : 'tr';

const translations = {
    tr: {
        mainTitle: '💰 Grup Borç Takibi',
        addPaymentTitle: 'Ödeme Ekle',
        payerLabel: 'Kim ödedi?',
        selectPerson: 'Kişi seçin...',
        amountLabel: 'Tutar (TL)',
        amountPlaceholder: 'Tutarı girin',
        descriptionLabel: 'Açıklama',
        descriptionPlaceholder: 'Ödeme açıklaması (ör: Yemek, Kira)',
        splitLabel: 'Paylaşılacak kişiler:',
        addButton: 'Ödeme Ekle',
        debtsTitle: 'Mevcut Borçlar',
        historyTitle: 'Son İşlemler',
        isOwed: 'alacaklı:',
        owes: 'borçlu',
        noDebts: 'Kimse borçlu değil',
        noHistory: 'Henüz işlem yok',
        errorSelectPayer: 'Lütfen ödemeyi yapan kişiyi seçin',
        errorValidAmount: 'Lütfen geçerli bir tutar girin',
        errorSelectPeople: 'Lütfen en az bir kişi seçin',
        // NEW TRANSLATIONS
        settleUp: 'Hesaplaş',
        settleDesc: 'Borç Kapama',
        statsTitle: 'Genel Durum',
        totalSpent: 'Toplam Harcama',
        mostSpender: 'En Çok Harcayan'
    },
    en: {
        mainTitle: '💰 Group Debt Tracker',
        addPaymentTitle: 'Add Payment',
        payerLabel: 'Who paid?',
        selectPerson: 'Select person...',
        amountLabel: 'Amount (TL)',
        amountPlaceholder: 'Enter amount',
        descriptionLabel: 'Description',
        descriptionPlaceholder: 'Payment description (e.g: Food, Rent)',
        splitLabel: 'Split between:',
        addButton: 'Add Payment',
        debtsTitle: 'Current Debts',
        historyTitle: 'Recent Transactions',
        isOwed: 'is owed:',
        owes: 'owes',
        noDebts: 'No one owes money',
        noHistory: 'No transactions yet',
        errorSelectPayer: 'Please select who paid',
        errorValidAmount: 'Please enter a valid amount',
        errorSelectPeople: 'Please select at least one person',
        // NEW TRANSLATIONS
        settleUp: 'Settle Up',
        settleDesc: 'Settlement',
        statsTitle: 'Overview',
        totalSpent: 'Total Spent',
        mostSpender: 'Top Spender'
    }
};

// Helper function to get translation
function getTranslation(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    return key; // Fallback to key if translation missing
}

// Function to set language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        
        // Update button styles
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim().toLowerCase() === lang) {
                btn.classList.add('active');
            }
        });

        // Update all text
        updateUIText();
        
        // Re-render components that use translations
        if (typeof renderDebts === 'function') renderDebts();
        
        // If we have access to transaction data, re-render history and stats
        if (typeof firebaseService !== 'undefined' && firebaseService.getTransactions) {
            const transactions = firebaseService.getTransactions();
            if (typeof renderHistory === 'function') renderHistory(transactions);
            if (typeof renderStats === 'function') renderStats(transactions);
        }
    }
}

// Function to update static UI text
function updateUIText() {
    const elements = {
        'mainTitle': 'mainTitle',
        'addPaymentTitle': 'addPaymentTitle',
        'payerLabel': 'payerLabel',
        'selectPersonOption': 'selectPerson',
        'amountLabel': 'amountLabel',
        'descriptionLabel': 'descriptionLabel',
        'splitLabel': 'splitLabel',
        'addButton': 'addButton',
        'debtsTitle': 'debtsTitle',
        'historyTitle': 'historyTitle',
        'statsTitle': 'statsTitle'
    };

    // Update text content for simple elements
    for (const [id, key] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = getTranslation(key);
        }
    }

    // Update placeholders
    const amountInput = document.getElementById('amount');
    if (amountInput) amountInput.placeholder = getTranslation('amountPlaceholder');

    const descInput = document.getElementById('description');
    if (descInput) descInput.placeholder = getTranslation('descriptionPlaceholder');
}
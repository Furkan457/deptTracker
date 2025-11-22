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

// Also update the updateUIText function at the bottom of the file
function updateUIText() {
    // ... keep existing lines ...
    document.getElementById('mainTitle').textContent = getTranslation('mainTitle');
    document.getElementById('addPaymentTitle').textContent = getTranslation('addPaymentTitle');
    document.getElementById('payerLabel').textContent = getTranslation('payerLabel');
    document.getElementById('selectPersonOption').textContent = getTranslation('selectPerson');
    document.getElementById('amountLabel').textContent = getTranslation('amountLabel');
    document.getElementById('amount').placeholder = getTranslation('amountPlaceholder');
    document.getElementById('descriptionLabel').textContent = getTranslation('descriptionLabel');
    document.getElementById('description').placeholder = getTranslation('descriptionPlaceholder');
    document.getElementById('splitLabel').textContent = getTranslation('splitLabel');
    document.getElementById('addButton').textContent = getTranslation('addButton');
    document.getElementById('debtsTitle').textContent = getTranslation('debtsTitle');
    document.getElementById('historyTitle').textContent = getTranslation('historyTitle');
    
    // NEW: Update Stats Title
    if(document.getElementById('statsTitle')) {
        document.getElementById('statsTitle').textContent = getTranslation('statsTitle');
    }
}
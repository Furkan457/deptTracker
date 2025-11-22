// Main application logic
function addPayment() {
    const payer = document.getElementById('payer').value;
    const amount = parseFloat(parseFloat(document.getElementById('amount').value).toFixed(2));
    const description = document.getElementById('description').value.trim();
    const splitCheckboxes = document.querySelectorAll('#splitGroup input[type="checkbox"]:checked');
    const splitWith = Array.from(splitCheckboxes).map(cb => cb.value);
    
    // Validation
    if (!payer) {
        showError(getTranslation('errorSelectPayer'));
        return;
    }
    
    if (!amount || amount <= 0) {
        showError(getTranslation('errorValidAmount'));
        return;
    }
    
    if (splitWith.length === 0) {
        showError(getTranslation('errorSelectPeople'));
        return;
    }
    
    // Add payment to debt calculator
    debtCalculator.addPayment(payer, amount, splitWith);
    
    // Save to Firebase
    firebaseService.saveDebts();
    firebaseService.addTransaction(payer, amount, description, splitWith);
    
    // Update UI
    clearForm();
    renderDebts();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    firebaseService.initialize();
    renderDebts();
    renderHistory([]);
});


function settleDebt(debtor, creditor, amount) {
    // 1. Debtor pays the Creditor
    const payer = debtor;
    const paymentAmount = amount;
    // 2. Use a standard description
    const description = `${getTranslation('settleDesc')} -> ${creditor}`;
    // 3. The 'split' is just the Creditor (Debtor pays 100% for Creditor)
    const splitWith = [creditor];

    // Confirmation dialog
    if(confirm(`${debtor}, ${creditor} kişisine ${amount} TL ödedi mi?`)) {
        // Add logic identical to addPayment
        debtCalculator.addPayment(payer, paymentAmount, splitWith);
        firebaseService.saveDebts();
        firebaseService.addTransaction(payer, paymentAmount, description, splitWith);
        renderDebts();
    }
}
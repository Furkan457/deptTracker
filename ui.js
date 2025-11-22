// UI management
function initializeUI() {
    const payerSelect = document.getElementById('payer');
    const splitGroup = document.getElementById('splitGroup');
    
    appConfig.people.forEach(person => {
        const option = document.createElement('option');
        option.value = person;
        option.textContent = person;
        payerSelect.appendChild(option);
        
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        label.innerHTML = `
            <input type="checkbox" value="${person}" onchange="updateSplitOptions()">
            <span>${person}</span>
        `;
        splitGroup.appendChild(label);
    });
    
    document.getElementById('payer').addEventListener('change', updateSplitOptions);
}

function updateSplitOptions() {
    const checkboxes = document.querySelectorAll('#splitGroup input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.disabled = false;
    });
}

function renderDebts() {
    const container = document.getElementById('debtsContainer');
    container.innerHTML = '';
    
    const netDebts = debtCalculator.calculateNetDebts();
    
    appConfig.people.forEach(creditor => {
        const personDiv = document.createElement('div');
        personDiv.className = 'person-debts';
        
        let debtsHTML = `<h3>${creditor} ${getTranslation('isOwed')}</h3>`;
        
        if (netDebts[creditor] && netDebts[creditor].length > 0) {
            netDebts[creditor].forEach(debt => {
                // FIXED: Button is now on its own line below the amount
                debtsHTML += `
                    <div class="debt-item">
                        <div class="debt-row">
                            <span class="debt-text">${debt.debtor} ${getTranslation('owes')}</span>
                            <span class="debt-amount">${debt.amount.toFixed(2)} TL</span>
                        </div>
                        <button class="settle-btn" 
                            onclick="settleDebt('${debt.debtor}', '${creditor}', ${debt.amount})">
                            🤝 ${getTranslation('settleUp')}
                        </button>
                    </div>
                `;
            });
        } else {
            debtsHTML += `<p class="no-debts">${getTranslation('noDebts')}</p>`;
        }
        
        personDiv.innerHTML = debtsHTML;
        container.appendChild(personDiv);
    });
}

function renderStats(transactions) {
    const container = document.getElementById('statsContainer');
    if (!container) return;
    container.innerHTML = '';

    if (!transactions || transactions.length === 0) return;

    // Calculate totals
    const totals = {};
    appConfig.people.forEach(p => totals[p] = 0);
    
    let grandTotal = 0;

    transactions.forEach(t => {
        if (totals[t.payer] !== undefined) {
            totals[t.payer] += t.amount;
            grandTotal += t.amount;
        }
    });

    const sortedPeople = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const topSpender = sortedPeople[0];

    const totalCard = `
        <div class="stat-card">
            <div class="stat-value">${grandTotal.toFixed(2)} TL</div>
            <div class="stat-label">${getTranslation('totalSpent')}</div>
        </div>
    `;

    const spenderCard = `
        <div class="stat-card">
            <div class="stat-value">${topSpender[0]}</div>
            <div class="stat-label">${getTranslation('mostSpender')} (${topSpender[1].toFixed(0)} TL)</div>
        </div>
    `;

    container.innerHTML = totalCard + spenderCard;
}

function clearForm() {
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    const splitCheckboxes = document.querySelectorAll('#splitGroup input[type="checkbox"]:checked');
    splitCheckboxes.forEach(cb => cb.checked = false);
    document.getElementById('splitError').textContent = '';
}

function showError(message) {
    const errorDiv = document.getElementById('splitError');
    errorDiv.textContent = message;
}

function renderHistory(transactions) {
    const container = document.getElementById('historyContainer');
    container.innerHTML = '';
    
    // Update stats when history updates
    renderStats(transactions);
    
    if (!transactions || transactions.length === 0) {
        container.innerHTML = `<div class="no-history">${getTranslation('noHistory')}</div>`;
        return;
    }
    
    const historyTable = document.createElement('div');
    historyTable.className = 'history-table';
    
    // Show ALL transactions (scrolling enabled in CSS)
    const allTransactions = [...transactions].reverse(); 
    
    allTransactions.forEach(transaction => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        let dateStr = '';
        if (transaction.timestamp) {
            const date = new Date(transaction.timestamp);
            dateStr = date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
        }

        // FIXED: New structure to separate Text and Price
        historyItem.innerHTML = `
            <div class="history-info">
                <div class="history-header">
                    <span class="history-date">${dateStr}</span>
                    <span class="history-payer">${transaction.payer}</span>
                </div>
                <div class="history-description">${transaction.description || '-'}</div>
            </div>
            <div class="history-amount">${transaction.amount.toFixed(2)} TL</div>
        `;
        
        historyTable.appendChild(historyItem);
    });
    
    container.appendChild(historyTable);
}
function gladiatorExpenses(lostFights, helmet, sword, shield, armor) {
    
    let expenses = 0;

    for (let i = 1; i <= lostFights; i++) {
        if (i % 2 === 0) {
            expenses += helmet;
        }
        if (i % 3 === 0) {
            expenses += sword;
        }
        if (i % 6 === 0) {
            expenses += shield;
        }
        if (i % 12 === 0) {
            expenses += armor;
        }
    }
    console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`);
}
gladiatorExpenses(7, 2, 3, 4, 5);
gladiatorExpenses(23, 12.5, 21.5, 40, 200);

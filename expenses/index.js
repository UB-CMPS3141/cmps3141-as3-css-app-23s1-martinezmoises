import { createApp } from "https://mavue.mavo.io/mavue.js";

globalThis.app = createApp({
	data: {
        expenses: [],
        debts: [], 
        newExpense: {
            desc: '',
            amount: 0,
            currency: 'BZD',
            payer: 'Neo',
            date: '',
            debts: false, // Initialize the debts property
        }
    },

    methods: {
        /**
         * Currency convert function stub.
         * In a real app, you would use an API to get the latest exchange rates,
         * and we'd need to support all currency codes, not just MXN, BZD, and GTQ.
         * However, for the purposes of this assignment, let's assume they travel nearby, so this is fine.
         * @param {"MXN" | "BZD" | "GTQ"} from - Currency code to convert from
         * @param {"MXN" | "BZD" | "GTQ"} to - Currency code to convert to
         * @param {number} amount - Amount to convert
         * @returns {number} Converted amount
         */
        currencyConvert(from, to, amount) {
            const rates = {
                BZD: 1,
                MXN: 8.73,
                GTQ: 3.91
            };

            return amount * rates[to] / rates[from]
        },
        
        
		addExpense() {
			// Convert the new expense amount to BZD if it's in a different currency
            
			const amountInBZD = this.newExpense.currency === 'BZD'
				? parseFloat(this.newExpense.amount)
				: this.currencyConvert(this.newExpense.currency, 'BZD', parseFloat(this.newExpense.amount));
		
			// Add the new expense to the expenses array with the currency property
			this.expenses.push({
				desc: this.newExpense.desc,
				amount: amountInBZD,
				currency: 'BZD', // Always store in BZD
				payer: this.newExpense.payer,
				date: this.newExpense.date
			});
		
			// Check if it's a debt and add it to the debts array
			if (this.newExpense.debts) {
				this.debts.push({
					debtor: this.newExpense.payer === 'Neo' ? 'Trinity' : 'Neo',
					creditor: this.newExpense.payer,
					amount: amountInBZD,
				});
			}
		
		},
		
    },

    computed: {

        total_balance() {
            let total = 0;
            
            // Calculate total balance, including expenses and debts
            for (let expense of this.expenses) {
                total += expense.amount;
            }
        
            // Use toFixed(2) to format the total with two decimal places
            return total.toFixed(2);
        }
        
        
    }
}, "#app");

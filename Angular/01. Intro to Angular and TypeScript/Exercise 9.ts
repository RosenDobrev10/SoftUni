interface Fish{
    canWithdraw: boolean;
}

class BankAccount implements Fish {
    canWithdraw: boolean = true;
	constructor(protected accountNumber: string, protected balance: number) {
		// this.accountNumber = accountNumber;
		// this.balance = balance;
	}

	deposit(money: number) {
		this.balance += money;
	}

	withdraw(money: number): string {
		if (this.balance >= money && this.canWithdraw) {
			this.balance -= money;
		} else {
		    return 'Insufficient amount of money in your bank account minimum amount has to be 100';
		}
        return `${money} has been withdrawn from your bank account`
	}

    checkBalance(): number{
        if (this.balance >= 100){
            this.canWithdraw = true;
        } else {
            this.canWithdraw = false;
        }
        return this.balance;
    }

	get showBalance(): number {
		return this.balance;
	}
}

class Person extends BankAccount {
    name: string;
    age: number;
	constructor(accountNumber: string, balance: number, name: string, age: number) {
		super(accountNumber, balance);
        this.name = name;
        this.age = age;
	}

    myMoney(){
        return `${this.name} have ${this.balance} money in his bank account`
    }
}

const rosen = new Person('3333', 3333, 'Rosen', 33);
console.log(rosen.withdraw(333));
console.log(rosen.checkBalance());
console.log(rosen.myMoney());
console.log(rosen.withdraw(2901));
console.log(rosen.checkBalance());
console.log(rosen.myMoney());
console.log(rosen.withdraw(55));
console.log(rosen.checkBalance());



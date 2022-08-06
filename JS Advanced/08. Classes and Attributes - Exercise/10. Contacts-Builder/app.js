class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this._online = false;
    }

    get online() {
        return this._online;
    }

    set online(value) {
        this._online = value;
        if (this.titleDiv) {
            this.titleDiv.className = this._online ? "title online" : "title";
        }
    }

    render(id) {
        this.article = document.createElement("article");
        this.titleDiv = document.createElement("div");
        this.button = document.createElement("button");
        this.infoDiv = document.createElement("div");
        this.phoneSpan = document.createElement("span");
        this.emailSpan = document.createElement("span");
        this.titleDiv.className = this._online ? "title online" : "title";
        this.titleDiv.textContent = `${this.firstName} ${this.lastName}`;
        this.button.innerHTML = "&#8505";
        this.titleDiv.appendChild(this.button);
        this.article.appendChild(this.titleDiv);
        this.phoneSpan.innerHTML = "&phone; " + this.phone;
        this.emailSpan.innerHTML = "&#9993; " + this.email;
        this.infoDiv.className = "info";
        this.infoDiv.style.display = "none";
        this.infoDiv.appendChild(this.phoneSpan);
        this.infoDiv.appendChild(this.emailSpan);
        this.article.appendChild(this.infoDiv);
        document.getElementById(id).appendChild(this.article);

        this.button.addEventListener("click", (event) => {
            this.infoDiv.style.display === "none"
                ? (this.infoDiv.style.display = "block")
                : (this.infoDiv.style.display = "none");
        });
    }
}

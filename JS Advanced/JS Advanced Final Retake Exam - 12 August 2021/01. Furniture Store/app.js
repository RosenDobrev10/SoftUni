window.addEventListener("load", solve);

function solve() {
    const inputModel = document.getElementById("model");
    const inputYear = document.getElementById("year");
    const inputDescription = document.getElementById("description");
    const inputPrice = document.getElementById("price");

    const addBtn = document.getElementById("add");

    addBtn.addEventListener("click", add);

    function add(event) {
        event.preventDefault();

        const model = inputModel.value;
        const year = Number(inputYear.value);
        const description = inputDescription.value;
        const price = Number(inputPrice.value);

        if (model === "" || year === "" || description === "" || price === "") {
            return;
        }
        if (price < 0 || year < 0) {
            return;
        }

        const tbody = document.getElementById("furniture-list");

        const trInfo = document.createElement("tr");
        trInfo.classList.add("info");

        const tdModel = document.createElement("td");
        tdModel.textContent = model;

        const tdPrice = document.createElement("td");
        tdPrice.textContent = price.toFixed(2);

        const tdButtons = document.createElement("td");

        const moreBtn = document.createElement("button");
        moreBtn.classList.add("moreBtn");
        moreBtn.textContent = "More Info";

        const buyBtn = document.createElement("button");
        buyBtn.classList.add("buyBtn");
        buyBtn.textContent = "Buy it";

        const trHide = document.createElement("tr");
        trHide.classList.add("hide");

        const tdYear = document.createElement("td");
        tdYear.textContent = `Year: ${year}`;

        const tdDescription = document.createElement("td");
        tdDescription.colSpan = 3;
        tdDescription.textContent = `Description: ${description}`;

        tbody.appendChild(trInfo);
        tbody.appendChild(trHide);
        trInfo.appendChild(tdModel);
        trInfo.appendChild(tdPrice);
        trInfo.appendChild(tdButtons);
        tdButtons.appendChild(moreBtn);
        tdButtons.appendChild(buyBtn);
        trHide.appendChild(tdYear);
        trHide.appendChild(tdDescription);

        inputModel.value = "";
        inputYear.value = "";
        inputDescription.value = "";
        inputPrice.value = "";

        moreBtn.addEventListener("click", more);
        function more() {
            if (moreBtn.textContent === "More Info") {
                moreBtn.textContent = "Less Info";
                trHide.style.display = "contents";
            } else {
                moreBtn.textContent = "More Info";
                trHide.style.display = "none";
            }
        }

        buyBtn.addEventListener("click", buy);
        function buy() {
            trInfo.remove();
            trHide.remove();
            const totalPrice = document.querySelector(".total-price");
            let total = Number(totalPrice.textContent);
            total += Number(price);
            totalPrice.textContent = total.toFixed(2);
        }
    }
}

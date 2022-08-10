window.addEventListener("load", solve);

function solve() {
  const inputs = {
    make: document.getElementById("make"),
    model: document.getElementById("model"),
    year: document.getElementById("year"),
    fuel: document.getElementById("fuel"),
    originalCost: document.getElementById("original-cost"),
    sellingPrice: document.getElementById("selling-price"),
  };

  const publishBtn = document.getElementById("publish");

  publishBtn.addEventListener("click", publish);

  function publish(event) {
    event.preventDefault();

    const make = inputs.make.value;
    const model = inputs.model.value;
    const year = Number(inputs.year.value);
    const fuel = inputs.fuel.value;
    const originalCost = Number(inputs.originalCost.value);
    const sellingPrice = Number(inputs.sellingPrice.value);

    if (make === "" || model === "" || year === "" || fuel === "" || originalCost === "" || sellingPrice === "" || sellingPrice < originalCost) {
      return;
    }

    const tBody = document.getElementById("table-body");

    const tr = document.createElement("tr");
    tr.classList.add("row");

    const td1 = document.createElement("td");
    td1.textContent = make;

    const td2 = document.createElement("td");
    td2.textContent = model;

    const td3 = document.createElement("td");
    td3.textContent = year;

    const td4 = document.createElement("td");
    td4.textContent = fuel;

    const td5 = document.createElement("td");
    td5.textContent = originalCost;

    const td6 = document.createElement("td");
    td6.textContent = sellingPrice;

    const buttonTD = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.classList.add("action-btn");
    editBtn.classList.add("edit");

    editBtn.textContent = "Edit";

    const sellBtn = document.createElement("button");
    sellBtn.classList.add("action-btn");
    sellBtn.classList.add("sell");
    sellBtn.textContent = "Sell";

    buttonTD.appendChild(editBtn);
    buttonTD.appendChild(sellBtn);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(buttonTD);
    tBody.appendChild(tr);

    inputs.make.value = "";
    inputs.model.value = "";
    inputs.year.value = "";
    inputs.fuel.value = "";
    inputs.originalCost.value = "";
    inputs.sellingPrice.value = "";

    editBtn.addEventListener("click", edit);

    function edit() {
      tr.remove();
      inputs.make.value = make;
      inputs.model.value = model;
      inputs.year.value = year;
      inputs.fuel.value = fuel;
      inputs.originalCost.value = originalCost;
      inputs.sellingPrice.value = sellingPrice;
    }

    sellBtn.addEventListener("click", sell);

    function sell() {
      tr.remove();
      const ul = document.getElementById("cars-list");

      const li = document.createElement("li");
      li.classList.add("each-list");

      const span1 = document.createElement("span");
      span1.textContent = `${make} ${model}`;

      const span2 = document.createElement("span");
      span2.textContent = year;

      const span3 = document.createElement("span");
      span3.id = "sellPrice";
      span3.textContent = sellingPrice - originalCost;

      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
      ul.appendChild(li);

      const profitMade = document.getElementById("profit");
      let totalProfit = 0;
      const carsPrice = Array.from(document.querySelectorAll("#sellPrice"));
      carsPrice.forEach((car) => (totalProfit += Number(car.textContent)));
      profitMade.textContent = totalProfit.toFixed(2);
    }
  }
}

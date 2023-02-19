window.addEventListener('load', solve);

function solve() {
    const inputs = {
        make: document.getElementById('make'),
        model: document.getElementById('model'),
        year: document.getElementById('year'),
        fuel: document.getElementById('fuel'),
        originalCost: document.getElementById('original-cost'),
        sellingPrice: document.getElementById('selling-price'),
    };

    const publishBtn = document.getElementById('publish');
    publishBtn.addEventListener('click', publish);

    function publish(event) {
        event.preventDefault();

        const make = inputs.make.value;
        const model = inputs.model.value;
        const year = Number(inputs.year.value);
        const fuel = inputs.fuel.value;
        const originalCost = Number(inputs.originalCost.value);
        const sellingPrice = Number(inputs.sellingPrice.value);

        if ( make === '' || model === '' || year === '' || fuel === '' || originalCost === '' || sellingPrice === '' || sellingPrice < originalCost) {
            return;
        }

        const tBody = document.getElementById('table-body');
        const tr = generateHtmlElement('tr', '', tBody, { className: 'row' });
        const td1 = generateHtmlElement('td', make, tr);
        const td2 = generateHtmlElement('td', model, tr);
        const td3 = generateHtmlElement('td', year, tr);
        const td4 = generateHtmlElement('td', fuel, tr);
        const td5 = generateHtmlElement('td', originalCost, tr);
        const td6 = generateHtmlElement('td', sellingPrice, tr);
        const buttonTD = generateHtmlElement('td', '', tr);
        const editBtn = generateHtmlElement( 'button', 'Edit', buttonTD, { className: 'action-btn edit' }, edit);
        const sellBtn = generateHtmlElement( 'button', 'Sell', buttonTD, { className: 'action-btn sell' }, sell);

        Object.keys(inputs).map((key) => (inputs[key].value = ''));

        function edit() {
            tr.remove();
            inputs.make.value = make;
            inputs.model.value = model;
            inputs.year.value = year;
            inputs.fuel.value = fuel;
            inputs.originalCost.value = originalCost;
            inputs.sellingPrice.value = sellingPrice;
        }

        function sell() {
            tr.remove();
            const ul = document.getElementById('cars-list');
            const li = generateHtmlElement('li', '', ul, { className: 'each-list' });
            const span1 = generateHtmlElement('span', `${make} ${model}`, li);
            const span2 = generateHtmlElement('span', year, li);
            const span3 = generateHtmlElement('span', sellingPrice - originalCost, li, {className: 'sell-price'});

            const profitMade = document.getElementById('profit');
            let totalProfit = 0;
            const carsPrice = Array.from(document.querySelectorAll('.sell-price'));
            carsPrice.forEach((car) => (totalProfit += Number(car.textContent)));
            profitMade.textContent = totalProfit.toFixed(2);
        }
    }

    function generateHtmlElement(type, content, parent, attributes, callback) {
        const element = document.createElement(type);
        element.textContent = content;
        parent ? parent.appendChild(element) : null;
        attributes ? Object.assign(element, attributes) : null;
        typeof callback === 'function' ? element.addEventListener('click', callback) : null;
        return element;
    }
}

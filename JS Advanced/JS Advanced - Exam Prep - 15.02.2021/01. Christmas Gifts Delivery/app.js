function solution() {

    const giftName = document.querySelector("input");

    const addBtn = document.querySelector("button");

    addBtn.addEventListener("click", add);

    function add() {
        const gift = giftName.value;
        const ulList = document.querySelectorAll("ul")[0];

        const li = document.createElement("li");
        li.classList.add("gift");
        li.textContent = gift;

        const sendBtn = document.createElement("button");
        sendBtn.id = "sendButton";
        sendBtn.textContent = "Send";

        const discardBtn = document.createElement("button");
        discardBtn.id = "discardButton";
        discardBtn.textContent = "Discard";

        ulList.appendChild(li);
        li.appendChild(sendBtn);
        li.appendChild(discardBtn);

        const listOfGifts = Array.from(document.querySelectorAll(".gift"));
        listOfGifts
            .sort((a, b) => a.textContent.localeCompare(b.textContent))
            .map((node) => ulList.appendChild(node));

        giftName.value = "";

        sendBtn.addEventListener("click", send);

        function send() {
            const ulSent = document.querySelectorAll("ul")[1];
            ulSent.appendChild(li);
            li.classList = "";
            sendBtn.remove();
            discardBtn.remove();
        }

        discardBtn.addEventListener("click", discard);

        function discard() {
            const ulDiscard = document.querySelectorAll("ul")[2];
            ulDiscard.appendChild(li);
            li.classList = "";
            sendBtn.remove();
            discardBtn.remove();
        }
    }
}

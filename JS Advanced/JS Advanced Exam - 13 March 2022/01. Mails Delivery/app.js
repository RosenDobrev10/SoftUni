function solve() {
    const inputs = {
        recipient: document.getElementById("recipientName"),
        title: document.getElementById("title"),
        message: document.getElementById("message"),
    };

    const buttons = {
        addBtn: document.getElementById("add"),
        resetBtn: document.getElementById("reset"),
    };

    buttons.resetBtn.addEventListener("click", reset);

    function reset(event) {
        event.preventDefault();
        inputs.recipient.value = "";
        inputs.title.value = "";
        inputs.message.value = "";
    }

    buttons.addBtn.addEventListener("click", add);

    function add(event) {
        event.preventDefault();

        const recipient = inputs.recipient.value;
        const title = inputs.title.value;
        const message = inputs.message.value;

        if (recipient === "" || title === "" || message === "") {
            return;
        }

        const ul = document.getElementById("list");

        const li = document.createElement("li");

        const h4Title = document.createElement("h4");
        h4Title.textContent = `Title: ${title}`;

        const h4Recipient = document.createElement("h4");
        h4Recipient.textContent = `Recipient Name: ${recipient}`;

        const span = document.createElement("span");
        span.textContent = message;

        const div = document.createElement("div");
        div.id = "list-action";

        const sendBtn = document.createElement("button");
        sendBtn.type = "submit";
        sendBtn.id = "send";
        sendBtn.textContent = "Send";

        const deletedBtn = document.createElement("button");
        deletedBtn.type = "submit";
        deletedBtn.id = "delete";
        deletedBtn.textContent = "Delete";

        ul.appendChild(li);
        li.appendChild(h4Title);
        li.appendChild(h4Recipient);
        li.appendChild(span);
        li.appendChild(div);
        div.appendChild(sendBtn);
        div.appendChild(deletedBtn);

        inputs.recipient.value = "";
        inputs.title.value = "";
        inputs.message.value = "";

        sendBtn.addEventListener("click", send);

        function send() {
            li.remove();
            const ulSent = document.querySelector(".sent-list");

            const liSent = document.createElement("li");

            const spanTo = document.createElement("span");
            spanTo.textContent = `To: ${recipient}`;

            const spanTitle = document.createElement("span");
            spanTitle.textContent = `Title: ${title}`;

            const divSent = document.createElement("div");
            divSent.classList.add("btn");

            const deleteSentBtn = document.createElement("button");
            deleteSentBtn.type = "submit";
            deleteSentBtn.classList.add("delete");
            deleteSentBtn.textContent = "Delete";

            ulSent.appendChild(liSent);
            liSent.appendChild(spanTo);
            liSent.appendChild(spanTitle);
            liSent.appendChild(divSent);
            divSent.appendChild(deleteSentBtn);

            deleteSentBtn.addEventListener("click", deleteSentBtnFunction);

            function deleteSentBtnFunction() {
                liSent.remove();

                const ulDeleteList = document.querySelector(".delete-list");

                const liDeleteList = document.createElement("li");

                const spanDeleteListTo = document.createElement("span");
                spanDeleteListTo.textContent = `To: ${recipient}`;

                const spanDeleteListTitle = document.createElement("span");
                spanDeleteListTitle.textContent = `Title: ${title}`;

                ulDeleteList.appendChild(liDeleteList);
                liDeleteList.appendChild(spanDeleteListTo);
                liDeleteList.appendChild(spanDeleteListTitle);
            }
        }

        deletedBtn.addEventListener("click", deletedBtnFunction);

        function deletedBtnFunction() {
            li.remove();

            const ulDeleteList = document.querySelector(".delete-list");

            const liDeleteList = document.createElement("li");

            const spanDeleteListTo = document.createElement("span");
            spanDeleteListTo.textContent = `To: ${recipient}`;

            const spanDeleteListTitle = document.createElement("span");
            spanDeleteListTitle.textContent = `Title: ${title}`;

            ulDeleteList.appendChild(liDeleteList);
            liDeleteList.appendChild(spanDeleteListTo);
            liDeleteList.appendChild(spanDeleteListTitle);
        }
    }
}
solve()
class Story {

    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
    }

    get likes() {
        if (this._likes.length === 0) {
            return `${this.title} has 0 likes`;
        } else if (this._likes.length === 1) {
            return `${this._likes[0]} likes this story!`;
        } else {
            return `${this._likes[0]} and ${this._likes.length - 1} others like this story!`;
        }
    }

    like(username) {
        if (this._likes.includes(username)) {
            throw new Error("You can't like the same story twice!");
        }
        if (username === this.creator) {
            throw new Error("You can't like your own story!");
        }
        this._likes.push(username);
        return `${username} liked ${this.title}!`;
    }

    dislike(username) {
        if (this._likes.includes(username) === false) {
            throw new Error("You can't dislike this story!");
        } else {
            let index = this._likes.indexOf(username);
            this._likes.splice(index, 1);
            return `${username} disliked ${this.title}`;
        }
    }

    comment(username, content, id) {
        let findId = this._comments.find((comment) => comment.id === id);
        if (findId === undefined) {
            this._comments.push({
                id: this._comments.length + 1,
                username,
                content,
                replies: [],
            });
            return `${username} commented on ${this.title}`;
        } else {
            findId.replies.push({
                id: `${findId.id}.${findId.replies.length + 1}`,
                username,
                content,
            });
            return "You replied successfully";
        }
    }

    toString(sortType) {
        let result = [];
        result.push(`Title: ${this.title}`);
        result.push(`Creator: ${this.creator}`);
        result.push(`Likes: ${this._likes.length}`);
        result.push(`Comments:`);

        if (this._comments.length === 0) {
            return result.join("\n");
        } else if (sortType === "asc") {
            this._comments.sort((a, b) => a.id - b.id);
            this._comments.forEach((comment) => {
                if (comment.replies.length === 0) {
                    result.push(`-- ${comment.id}. ${comment.username}: ${comment.content}`);
                } else {
                    comment.replies.sort((a, b) => a.id - b.id);
                    let repliesArr = comment.replies.map((reply) => `--- ${reply.id}. ${reply.username}: ${reply.content}`);
                    result.push(`-- ${comment.id}. ${comment.username}: ${comment.content}\n${repliesArr.join("\n")}`);
                }
            });
        } else if (sortType === "desc") {
            this._comments.sort((a, b) => b.id - a.id);
            this._comments.forEach((comment) => {
                if (comment.replies.length === 0) {result.push(`-- ${comment.id}. ${comment.username}: ${comment.content}`);
                } else {
                    comment.replies.sort((a, b) => b.id - a.id);
                    let repliesArr = comment.replies.map((reply) => `--- ${reply.id}. ${reply.username}: ${reply.content}`);
                    result.push(`-- ${comment.id}. ${comment.username}: ${comment.content}\n${repliesArr.join("\n")}`);
                }
            });
        } else if (sortType === "username") {
            this._comments.sort((a, b) => a.username.localeCompare(b.username));
            this._comments.forEach((comment) => {
                if (comment.replies.length === 0) {
                    result.push(`-- ${comment.id}. ${comment.username}: ${comment.content}`);
                } else {
                    comment.replies.sort((a, b) => a.username.localeCompare(b.username));
                    let repliesArr = comment.replies.map((reply) => `--- ${reply.id}. ${reply.username}: ${reply.content}`);
                    result.push(`-- ${comment.id}. ${comment.username}: ${comment.content}\n${repliesArr.join("\n")}`
                    );
                }
            });
        }
        return result.join("\n");
    }
}
let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log();
console.log(art.toString("username"));
console.log();
art.like("Zane");
console.log(art.toString("desc"));

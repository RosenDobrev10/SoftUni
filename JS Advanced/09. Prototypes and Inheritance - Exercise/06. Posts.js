function posts() {

    class Post {                            // Създаваме клас Post 
        constructor(title, content) {       // Конструктора получава title и content като параметри 
            this.title = title;             // Сетваме го 
            this.content = content;         // Сетваме го 
        }

        toString() {                        // Създаваме метод 
            return `Post: ${this.title}\nContent: ${this.content}`; // Който печата съобщение нов ред и друго съобщение
        }
    }

    class SocialMediaPost extends Post {                // Създаваме клас SocialMediaPost, който extendva класа Post 
        constructor(title, content, likes, dislikes) {  // Конструктора получава title,content,likes и dislikes като параметри 
            super(title, content);                      // Наследяваме title и content от класа Post 
            this.likes = likes;                         // Сетваме го 
            this.dislikes = dislikes;                   // Сетваме го 
            this.comments = [];                         // Създаваме property comments, което е празен масив 
        }

        addComment(comment) {                           // Създаваме метод 
            this.comments.push(comment);                // Ще добавяме, получен comment в масива this.comments
        }

        toString() {                                    // Overridvame метода toString
            let commentsString = "";                    // Правим променлива, в която да изпечатаме всички коментари в масива 
            for (const comment of this.comments) {      // Минавамe по всеки коментар от коментарите в масива 
                commentsString += `\n * ${comment}`;    // към променливата добавяме нов ред, интервал, звезда, интервал и коментара
            }

            if (this.comments.length === 0) {           // Ако в коментарите няма нито един такъв 
                return `${super.toString()}\nRating: ${this.likes - this.dislikes}`;
            // Връщаме наследения метод toString от post и добавяме нов ред и съобщение за Rating
            }
            return `${super.toString()}\nRating: ${this.likes - this.dislikes}\nComments:${commentsString}`;
            // Ако има коментари връщаме горното + Коментарите 
        }
    }

    class BlogPost extends Post {                    // Създаваме клас BlogPost, който extendva класа Post
        constructor(title, content, views) {        // Конструктора получава title,content и views като параметри 
            super(title, content);                  // Наследяваме title и content от класа Post 
            this.views = views;                     // Сетваме го 
        }

        view() {                                    // Създаваме метод 
            this.views++;                           // Увеличаваме this.views с 1, при всяко извикване 
            return this;                            // Връщаме обекта 
        }

        toString() {                                // Overridvame метода toString
            return `${super.toString()}\nViews: ${this.views}`; // Връщаме наследения toString + гледанията 
        }
    }

    return { Post, SocialMediaPost, BlogPost }; // Връщаме трите класа в обект 
}

const classes = posts();
let post = new classes.Post("Post", "Content");
console.log(post.toString());
// Post: Post
// Content: Content

let scm = new classes.SocialMediaPost("TestTitle", "TestContent", 25, 30);
scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");
console.log(scm.toString());
// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
// * Good post
// * Very good post
// * Wow!

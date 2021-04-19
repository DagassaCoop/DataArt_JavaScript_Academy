// Import stylesheets
import "./style.css";
import Haxios from "./src/utils/haxios";

class Comments {
  constructor() {
    this.article = document.createElement("article");
    this.input = document.createElement("input");
    this.comments = [];
  }

  init = async () => {
    await this.getComments();
    this.render();
  };

  getComments = async () => {
    try {
      this.comments = await Haxios.get("/comments");
    } catch (error) {
      console.error(error);
    }
  };

  filterCommentsByEmail = event => {
    const email = event.target.value;
    const foundItems = this.comments.filter(comment =>
      comment.email.toLowerCase().includes(email.toLowerCase())
    );

    this.updateComments(foundItems);
  };

  updateComments = foundItems => {
    this.article.innerHTML = "";
    this.article.innerHTML = this.renderComments(foundItems);
  };

  renderComments = (comments = this.comments) => {
    return `
    ${comments
      .map(comment => {
        return `
        <div class="info-card">
          <p> Name: <span style="color: red">${comment.name}</span></p>
          <p> Email: <span style="color: green">${comment.email}</span></p>
          <p> Body: <span style="color: grey">${comment.body}</span></p>
        </div>`;
      })
      .join("")}`;
  };

  render = () => {
    this.input.setAttribute("class", "input-filter");
    this.input.setAttribute("placeholder", "Enter user's email...");
    this.input.addEventListener("keyup", this.filterCommentsByEmail);

    this.article.innerHTML = this.renderComments();
    appDiv.append(this.input, this.article);
  };
}

const appDiv = document.getElementById("app");
// Write Javascript code!
const comments = new Comments();
comments.init();

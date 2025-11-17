# ProjectDelta

## Objective
As a user of Canvas I do not like the calendar. I don't use most of its functions besides what I need. I don't like the user experience because even if it is a small hastle
i still have to go back to the calendar each time I click an assignment. Additonally, if i try and click off the pop up assignment in the calendar I get put into making an event. I want an improved interface that is seemless and convenient for the user. So that it saves all students and teachers time.

## Tag Line
A fast and convenient way to view both the calendar and assignments.

## Test Case
The metric for success is how much time you save having the assignment open in a new window.

## Validation Links
WAVE Link: [https://wave.webaim.org/report#/https://chickenalfredo1121.github.io/ProjectDelta]
Nu Link: [https://validator.w3.org/nu/?doc=https%3A%2F%2Fwave.webaim.org%2Freport%23%2Fhttps%3A%2F%2Fchickenalfredo1121.github.io%2FProjectDelta]

## Architecture
This project has a simple layout with HTML providing structure, CSS controlling presentation, and JavaScript (with JQuery) handling all interactions and page updates.

## Infastructure
Languages: HTML5, CSS3, JavaScript(ES6)

Libraries and Frameworks: jQuery 3.x

Fonts: Poiret

Tools: VS Code

## Attribution

Junior Vandervort: lead developer (sole developer actually)
W3Schools: help with code structure and function
ChatGPT: helped with debugging, idea generation, and idea implementation 

````javascript
$(document).on("click", ".assignment", function (event) {
    event.stopPropagation();

    let title = $(this).text().trim();
    let day = $(this).closest(".day").find(".day-number").text();
    let link = $(this).data("link") || "#";

    let description = `
      This is an example description for <b>${title}</b>.<br><br>
      More details can be added here.
    `;

    // TITLE AS CLICKABLE LINK
    $("#modal-title").html(`
      <a href="${link}" target="_blank">${title}</a>
    `);

    $("#modal-due").html("Due: November " + day);
    $("#modal-description").html(description);

    let offset = $(this).offset();
    let modal = $("#assignment-modal");
    let box = $(".assignment-modal-content");

    modal.show();
    modal.css("z-index", 9999);
    box.css("z-index", 9999);
    box.css("transform", "none");

    setTimeout(() => {
      box.css({
        position: "absolute",
        transform: "none",
        top: offset.top - box.outerHeight() - 12 + "px",
        left: offset.left + "px"
      });
    }, 10);
  });

```

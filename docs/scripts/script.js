$(document).ready(function () {

  // switch
  $('#month-view-btn').click(function () {
    $('#month-view').show();
    $('#week-view').hide();
    $('#agenda-view').hide();
    $('.btn-segment').removeClass('active');
    $(this).addClass('active');
  });

  $('#week-view-btn').click(function () {
    $('#month-view').hide();
    $('#week-view').show();
    $('#agenda-view').hide();
    $('.btn-segment').removeClass('active');
    $(this).addClass('active');
  });

  $('#agenda-view-btn').click(function () {
    $('#month-view').hide();
    $('#week-view').hide();
    $('#agenda-view').show();
    $('.btn-segment').removeClass('active');
    $(this).addClass('active');
  });

  // Agenda generation
  function generateAgenda() {
    let agendaContainer = $('#agenda-view');
    agendaContainer.empty();

    let assignments = [];
    $('#month-view .day').each(function () {
      let date = $(this).find('.day-number').text();
      $(this).find('.assignment').each(function () {
        assignments.push({
          date: date,
          text: $(this).text(),
          link: $(this).data("link")
        });
      });
    });

    assignments.sort((a, b) => b.date - a.date);

    let grouped = {};
    assignments.forEach(a => {
      if (!grouped[a.date]) grouped[a.date] = [];
      grouped[a.date].push(a);
    });

    for (let date in grouped) {
      let dayDiv = $('<div class="agenda-day"></div>');
      dayDiv.append(`<div class="agenda-date">Nov ${date}</div>`);
      let eventsDiv = $('<div class="agenda-events"></div>');

      grouped[date].forEach(event => {
        eventsDiv.append(
          `<div class="assignment" data-link="${event.link}">${event.text}</div>`
        );
      });

      dayDiv.append(eventsDiv);
      agendaContainer.append(dayDiv);
    }
  }

  generateAgenda();


  // all assignments pop up
  $(document).on("click", ".assignment", function (event) {
    event.stopPropagation();

    let title = $(this).text().trim();
    let day = $(this).closest(".day").find(".day-number").text();
    let link = $(this).data("link") || "#";

    let description = `
      This is an example description for <b>${title}</b>.<br><br>
      More details can be added here.
    `;

    // making title a link to assignment
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


  // closing pop up with button
  $(".close-modal").on("click", function () {
    $("#assignment-modal").hide();
  });

  // CLOSE pop up when clicking off pop up
  $("#assignment-modal").on("click", function () {
    $("#assignment-modal").hide();
  });

  // making sure pop up dosen't close when clicked inside of
  $(".assignment-modal-content").on("click", function (event) {
    event.stopPropagation();
  });

  //handling for clicking outside of box area
  $(document).on("click", function () {
    $("#assignment-modal").hide();
  });

});

$(document).ready(function() {
  $('#month-view-btn').click(function() {
    $('#month-view').show();
    $('#week-view').hide();
    $('#agenda-view').hide();
    $('.btn-segment').removeClass('active');
    $(this).addClass('active');
  });

  $('#week-view-btn').click(function() {
    $('#month-view').hide();
    $('#week-view').show();
    $('#agenda-view').hide();
    $('.btn-segment').removeClass('active');
    $(this).addClass('active');
  });

  $('#agenda-view-btn').click(function() {
    $('#month-view').hide();
    $('#week-view').hide();
    $('#agenda-view').show();
    $('.btn-segment').removeClass('active');
    $(this).addClass('active');
  });

  // Optional: dynamically generate agenda view from Month assignments
  function generateAgenda() {
    let agendaContainer = $('#agenda-view');
    agendaContainer.empty();

    // Gather all assignments from month view
    let assignments = [];
    $('#month-view .day').each(function() {
      let date = $(this).find('.day-number').text();
      $(this).find('.assignment').each(function() {
        assignments.push({
          date: date,
          text: $(this).text()
        });
      });
    });

    // Sort descending
    assignments.sort((a,b) => b.date - a.date);

    // Group by date
    let grouped = {};
    assignments.forEach(a => {
      if(!grouped[a.date]) grouped[a.date] = [];
      grouped[a.date].push(a.text);
    });

    for(let date in grouped) {
      let dayDiv = $('<div class="agenda-day"></div>');
      dayDiv.append(`<div class="agenda-date">Nov ${date}</div>`);
      let eventsDiv = $('<div class="agenda-events"></div>');
      grouped[date].forEach(eventText => {
        eventsDiv.append(`<div class="assignment">${eventText}</div>`);
      });
      dayDiv.append(eventsDiv);
      agendaContainer.append(dayDiv);
    }
  }

  generateAgenda();
});

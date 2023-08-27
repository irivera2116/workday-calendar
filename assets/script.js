// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var current = {};
dayjs.locale(current);

$(function () {
  const currentTime = dayjs().format('H'); 
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // change block colors so they show past, present and future.
  function colorCode() {
    $('.time-block').each(function () {
      const hour = parseInt(this.id);
      $(this).toggleClass('past', hour < currentTime);
      $(this).toggleClass('present', hour === currentTime);
      $(this).toggleClass('future', hour > currentTime);
    });
  }

  // changes color based on time
  function colorChange() {
    $('.time-block').each(function () {
      const rowHour = parseInt(this.id);
      if (rowHour === currentTime) {
        $(this).removeClass('past future').addClass('present');
      } else if (rowHour > currentTime) {
        $(this).removeClass('past present').addClass('future');
      } else {
        $(this).removeClass('present future').addClass('past');
      }
    });
  }
  // saves user input to local storage
  function userInput() {
    $('.saveBtn').on('click', function () {
      const time = $(this).parent().attr('id');
      const text = $(this).siblings('.description').val();
      localStorage.setItem(time, text);
    });
  }

  $('.time-block').each(function () {
    const elementOne = $(this).attr('id');
    const elementTwo = localStorage.getItem(elementOne);
    $(this).children('.description').val(elementTwo);
  });

  // TODO: Add code to display the current date in the header of the page.
  var dateDisplayEl = $('#time-display');
  function dateDisplay() {
    var date = dayjs().format('MMM DD, YYYY [at] hh:mm:ss A');
    dateDisplayEl.text(date);
  }

  dateDisplay();
  setInterval(dateDisplay, 1000);

  colorCode();
  colorChange();
  userInput();

});

const getDate = (dateObj) => {
  if (dateObj instanceof Date) {
    return `${dateObj.getFullYear()}-${dateObj.getMonth() < 10 ? `0${dateObj.getMonth()}` : `${dateObj.getMonth()}`}-${
      dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : `${dateObj.getDate()}`
    }`;
  }
};

const getTime = (dateObj) => {
  if (dateObj instanceof Date) {
    return `${dateObj.getHours() < 10 ? `0${dateObj.getHours}` : `${dateObj.getHours()}`}:${
      dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : `${dateObj.getMinutes()}`
    }:${dateObj.getSeconds() < 10 ? `0${dateObj.getSeconds()}` : `${dateObj.getSeconds()}`}`;
  }
};

const convertDate = () => {
  document.querySelectorAll("span[data-date]").forEach((time) => {
    let dateString = time.dataset.date;
    if (dateString) {
      let date = new Date(dateString);
      time.innerHTML = `${getDate(date)}`;
    }
  });
};

const convertDateTime = () => {
  document.querySelectorAll("span[data-date-time]").forEach((time) => {
    let dateString = time.dataset.dateTime;
    if (dateString) {
      let date = new Date(dateString);
      time.innerHTML = `${getDate(date) + " " + getTime(date)}`;
    }
  });
};

convertDate();
convertDateTime();

function convertUTCDateToLocalDate(date: Date) {
    var newDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    console.log("original", newDate);

    var offset = date.getTimezoneOffset() / 60;
    console.log(offset);
    var hours = date.getHours();

    const local = newDate.setHours(hours - offset);
    console.log("local", local);

    return newDate;
}

console.log(convertUTCDateToLocalDate(new Date()));

export { convertUTCDateToLocalDate };

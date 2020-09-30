export function toView(date) {
    var d = new Date(date + "T00:00:00-03:00");
    var day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
    var month = ((d.getMonth() + 1) < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    return day + "-" + month +  "-" + d.getFullYear();
}

export function toModel(date) {

    var arrayDate = date.split("-");

    var day = arrayDate[0];
    var month = arrayDate[1];
    var year = arrayDate[2];

    return year + "-" + month +  "-" + day;
}
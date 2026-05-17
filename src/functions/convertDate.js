export const convertDate = (number, days) => {
    var myDate = new Date(number);
    if (days <= 7) {
        return myDate.getDate() + "/" + (myDate.getMonth() + 1) + " " + 
            myDate.getHours() + ":00";
    }
    return myDate.getDate() + "/" + (myDate.getMonth() + 1);
};
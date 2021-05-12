const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(date) {
    date = new Date(date);
    return (months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear())
}

module.exports = formatDate;
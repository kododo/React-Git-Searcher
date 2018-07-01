export { formatDate, windowOpen };

function formatDate(dateString) {
    return new Date(Date.parse(dateString)).toLocaleString();
}

function windowOpen(url){
    return window.open(url,'','');
}
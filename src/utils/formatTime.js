export function timeConverter(UNIX_timestamp, mode){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    if (mode === 'time') {
        var time = hour + ':' + '00';
        return time;
    } else if (mode === 'day') {
        var time = date + ' ' + month;
        return time;
    }
}

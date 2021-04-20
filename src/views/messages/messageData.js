import _ from "lodash";
function convert_day_hours_minute(global__date) {
    if (_.isEmpty(global__date)) {
        return "Ngày giờ không phù hợp , vui lòng sửa lại";
    }
    const time = new Date(Date.parse(global__date));
    const localDate = time.toString();
    const split__localDate = localDate.substring(0, 3);
    const timestamp = time.getTime();
    const global__day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const vietnames__day = [
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
        "Chủ Nhật",
    ];
    const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
    ];

    let index__day = 0;
    for (let index = 0; index < global__day.length; index++) {
        if (split__localDate === global__day[index]) {
            index__day = index;
        }
    }
    const date = new Date(parseInt(timestamp));
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minute = date.getMinutes();

    const format = `${vietnames__day[index__day]}, ${day} Tháng ${month}, ${year} - ${hours}:${minute}`;

    return format;
}

function convert_day(global__date) {
    const time = new Date(Date.parse(global__date));
    const localDate = time.toString();
    const split__localDate = localDate.substring(0, 3);
    const timestamp = time.getTime();
    const global__day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const vietnames__day = [
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
        "Chủ Nhật",
    ];
    const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
    ];

    let index__day = 0;
    for (let index = 0; index < global__day.length; index++) {
        if (split__localDate === global__day[index]) {
            index__day = index;
        }
    }
    const date = new Date(parseInt(timestamp));
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const format = `${vietnames__day[index__day]}, ${day} Tháng ${month}, ${year}`;

    return format;
}

function convert_hours_minute(global__date) {
    const time = new Date(Date.parse(global__date));
    const timestamp = time.getTime();

    const date = new Date(parseInt(timestamp));

    const hours = date.getHours();
    const minute = date.getMinutes();

    const format = `${hours}:${minute}`;

    return format;
}



const messageData = [
    {id:0, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', status: 'Delivered', delivery: 'success', sentAt: '3/21/21, 3:11:46 pm 18 days, 8 hours ago', sent:'100.000.000', segments: 'Segment 1 team hola, segment 2 age 30 - 35',type:'', createDate:convert_day(new Date())},
    {id:0, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', status: 'Sending', delivery: 'sending', sentAt: '3/21/21, 3:11:46 pm 18 days, 8 hours ago', sent:'100', segments: 'Segment 2 khu vuc mien nam va nu', createDate:convert_day(new Date())},
    {id:0, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', status: 'Pause', delivery: 'pause', sentAt: '3/21/21, 3:11:46 pm 18 days, 8 hours ago', sent:'200', segments: 'Segment 1 team hola', createDate:convert_day(new Date())},
    {id:0, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', status: 'Pause', delivery: 'pause', sentAt: '3/21/21, 3:11:46 pm 18 days, 8 hours ago', sent:'300', segments: 'Segment 2 khu vuc mien nam va nu', createDate:convert_day(new Date())},
    {id:0, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', status: 'Pause', delivery: 'pause', sentAt: '3/21/21, 3:11:46 pm 18 days, 8 hours ago', sent:'400', segments: 'Segment 1 team hola', createDate:convert_day(new Date())}

]

export default messageData
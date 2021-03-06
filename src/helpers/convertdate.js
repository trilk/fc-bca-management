import _ from "lodash";
export function convert_day_hours_minute(global__date) {
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

export function convert_day(global__date) {
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

export function convert_hours_minute(global__date) {
    const time = new Date(Date.parse(global__date));
    const timestamp = time.getTime();

    const date = new Date(parseInt(timestamp));

    const hours = date.getHours();
    const minute = date.getMinutes();

    const format = `${hours}:${minute}`;

    return format;
}
function requiredReading(numberPages, pagesInHour, days) {
    let hoursToReadADay = numberPages / pagesInHour / days;
    console.log(hoursToReadADay);
    // Делим общия брой на страниците, на страниците за един час и получаваме колко часа трябва да чете.
    // Получените часове трябва да разделим на дните, за да разберем колко часа на ДЕН трябва да чете.
}
requiredReading(212, 20, 2);
requiredReading(432, 15, 4);

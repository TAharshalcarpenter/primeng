const DELIMITER = '-delimiter-';

function onInit() {
    let logs = process.env.changelog.split(DELIMITER);
    console.log(logs);
}

onInit();

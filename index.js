const DELIMITER = '-~-';

function onInit() {
    let logs = process.env.changelog.split(DELIMITER);
    console.log(formatMessage(logs));
}

function formatMessage(logs) {
    let message = '';
    let bugfixes = '';
    let features = '';
    let others = '';

    logs.map((item) => {
        if (item.indexOf('bugfix') > -1) {
            bugfixes += `> ${item.trim().replace(/(LIQ-\d+|LQ-\d+|INTL-\d+)/g, `<a href="https://tripactions.atlassian.net/browse/$&" target="_blank">$&</a>`)}\n`;
        } else if (item.indexOf('feature') > -1) {
            features += `> ${item.trim().replace(/(LIQ-\d+|LQ-\d+|INTL-\d+)/g, `<a href="https://tripactions.atlassian.net/browse/$&" target="_blank">$&</a>`)}\n`;
        } else {
            others += `> ${item.trim().replace(/(LIQ-\d+|LQ-\d+|INTL-\d+)/g, `<a href="https://tripactions.atlassian.net/browse/$&" target="_blank">$&</a>`)}\n`;
        }
    })

    message = `Features: \n ${features} \n BugFixes: \n ${bugfixes} \n Others: \n ${others}`;

    return message;
}

onInit();

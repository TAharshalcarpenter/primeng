const DELIMITER = '-~-';

function onInit() {
    let logs = process.env.changelog.split(DELIMITER);
    console.log(createSlackBlock(logs));
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

function createSlackBlock(logs) {
    let bugfixes = '';
    let features = '';
    let others = '';

    logs.map((item) => {
        if (item.indexOf('bugfix') > -1) {
            bugfixes += `> ${getSlackLinkedListItem(item)} \n`;
        } else if (item.indexOf('feature') > -1) {
            features += `> ${getSlackLinkedListItem(item)} \n`;
        } else {
            others += `> ${getSlackLinkedListItem(item)} \n`;
        }
    })

    return {
        "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "🐞 Bugfixes",
                        "emoji": true
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": bugfixes
                        }
                    ]
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "🚀 Features",
                        "emoji": true
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": features
                        }
                    ]
                },
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Others",
                    "emoji": true
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": others
                    }
                ]
            }
        ]
    }
}

function getSlackLinkedListItem(item) {
    return item.trim().replace(/(LIQ-\d+|LQ-\d+|INTL-\d+)/g, "<https://tripactions.atlassian.net/browse/$&|$&>");
}

onInit();
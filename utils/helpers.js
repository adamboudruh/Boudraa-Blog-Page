const moment = require('moment');

module.exports = {
    when: (operand_1, operator, operand_2, options) => {
        var operators = {
            '===': function(l,r) { return l === r; },
            '!==': function(l,r) { return l !== r; }
        }
        const result = operators[operator](operand_1,operand_2);
        
        if (result) return options.fn(this);
        else  return options.inverse(this);
    },
    formatTimeAgo: (date) => {
        return moment(date).fromNow();
    },
    eq: (a, b) => {
        return a === b; //Simplified version of the when function, just so I can use it in conjunction with if statements to maintain the context
    },
    formatTime: (date) => {
        const d = new Date(date);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate.replace(',', ' at');
    },
    formatDate: (date) => {
        const d = new Date(date);
        const options = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        };
            
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(d);
        return formattedDate;
    }
};
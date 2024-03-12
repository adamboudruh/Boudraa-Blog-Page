module.exports = {
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
        return formattedDate.replace(',', ' at'); // Returns date in 'MM/DD/YYY at HH:MM' format
    },
    formatDate: (date) => {
        const d = new Date(date);
        const options = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        };
            
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(d); // Returns 'MM/DD/YYYY'
        return formattedDate;
    }
};
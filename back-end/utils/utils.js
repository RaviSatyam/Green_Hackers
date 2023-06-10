module.exports.randomTktGenerator = () => {
    const length = 12;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789';
    let ticketId = '';
    for (let i = 0; i < length; i++) {
        ticketId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    //console.log(ticketId)
    return ticketId;
}

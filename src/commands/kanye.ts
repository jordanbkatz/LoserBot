import axios from 'axios';
axios.get("https://api.kanye.rest/").then(function(response): void {
    console.log(`"${response.data.quote}" - Kanye`);
}).catch(function(err): void {
    console.log(err);
});
function addCountry(country){
    if (selected_countries.length<2)
        selected_countries.push(country);
    else{
        selected_countries.pop
        selected_countries.unshift(country);
    }
}
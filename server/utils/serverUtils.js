function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    }

    res.jsonp({success: false, isLoggedIn: false});
}


function parseString(movie) {
    // cleaning string for duplicate check
    // noinspection SpellCheckingInspection
    let punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';
    const letters = movie.toLowerCase().split('');

    // removing punctuation and whitespace from movie name
    const parsedArray = letters.filter(function(letter) {
        return punctuation.indexOf(letter) === -1;
    });

    // invalid length check
    if (parsedArray.length >= 40) {
        throw new Error("Movie length exceeded.");
    }

    // combining filtered movie array into string
    let parsedMovie = "";
    for (let i in parsedArray) {
        parsedMovie += parsedArray[i];
    }

    return parsedMovie;
}

function formatString(movie) {
    let formattedString = "";
    let split_movies = movie.split(" ");

    for (let i = 0; i < split_movies.length; i++) {
        formattedString += (split_movies[i].charAt(0).toUpperCase() + split_movies[i].slice(1));
        if (i !== split_movies.length - 1)
            formattedString += " ";
    }

    return formattedString;
}

module.exports = { isLoggedIn, parseString, formatString };
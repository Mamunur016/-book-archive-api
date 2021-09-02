
document.getElementById('error-message').style.display = 'none';

// event handler for searchBook function

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText === '') {
        // display message.

        document.getElementById('found').innerHTML = ` <h4 class="text-danger text-center">Please Enter  book name!</h4>`;
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';       /// set privous value empty

    }
    else {
        // load data

        const url = `https://openlibrary.org/search.json?q=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data, data.docs))
            .catch(error => displayError(error));

    }
}

// display error function
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('search-result').textContent = '';  /// set privous value empty
    document.getElementById('found').textContent = '';         /// set privous value empty


}


// display search result function

const displaySearchResult = (data, books) => {

    // condition for found/not found number
    if (data.numFound === 0) {
        document.getElementById('found').innerHTML = ` <h4 class="text-danger text-center mb-4">No Result found</h4>`;
    }
    else {
        document.getElementById('found').innerHTML = ` <h4 class="text-success text-center mb-4">${data.numFound} Result found</h4>`;
    }

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';         /// set privous value empty

    // set the each book value in card
    books.forEach(book => {

        const div = document.createElement('div');
        div.classList.add('col');


        if (book.author_name === undefined) {
            book.author_name = '';
        }
        if (book.publisher === undefined) {
            book.publisher = '';
        }
        if (book.first_publish_year === undefined) {
            book.first_publish_year = '';

        }
        // dynamically set different value for each book
        div.innerHTML = `
            <div class="card h-100 p-3 border-0 shadow rounded-3">
                    <div class="px-2">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" style="height: 400px;" alt="...">
                    </div>
                    <div class="card-body">

                        <h5 class="card-title">Book Name: <small class='text-primary'>${book.title} </small> </h5>
                        
                        <h5>Writer: <small class='text-primary'>${book.author_name} </small> </h5>
                        <h5>Publisher: <small class='text-primary'>${book.publisher} </small> </h5>
                            
                        <h5> First_published_year: <small class='text-primary'>${book.first_publish_year} </small> </h5>

                        
                            
                        
                            
                    </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}



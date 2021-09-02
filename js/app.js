
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
        searchResult.textContent = '';

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
    document.getElementById('search-result').textContent = '';
    document.getElementById('found').textContent = '';


}


// {
//     console.log(data);
//     for (let name of data.docs) {
//         console.log(name.title);
//         console.log(name.first_publish_year);

//         if (name?.author_name) {
//             console.log(...name.author_name);
//             // for (let iterator of name.author_name) {
//             //     console.log(iterator);
//             // }
//         }
//         console.log('new books');
//     }
// }



// display search result function

const displaySearchResult = (data, books) => {
    console.log(data.numFound);
    console.log(data);
    console.log(books);

    if (data.numFound === 0) {
        document.getElementById('found').innerHTML = ` <h4 class="text-danger text-center mb-4">No Result found</h4>`;
    }
    else {
        document.getElementById('found').innerHTML = ` <h4 class="text-success text-center mb-4">${data.numFound} Result found</h4>`;
    }

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.forEach(book => {

        const div = document.createElement('div');
        div.classList.add('col');

        if (book.first_publish_year === undefined) {
            book.first_publish_year = '';

        }
        if (book.author_name === undefined) {
            book.author_name = '';
        }
        if (book.publisher === undefined) {
            book.publisher = '';
        }

        div.innerHTML = `
            <div class="card h-100 p-3 border-0 shadow rounded-3">
                    <div class="px-2">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" style="height: 400px;" alt="...">
                    </div>
                    <div class="card-body">

                        <h4 class="card-title">Book Name: <small class='text-primary'>${book.title} </small> </h4>
                        
                        <h5>Writer: <small class='text-primary'>${book.author_name} </small> </h5>
                        <h5>Publisher: <small class='text-primary'>${book.publisher} </small> </h5>
                            
                        <h5> First_published_year: <small class='text-primary'>${book.first_publish_year} </small> </h5>

                        
                            
                        
                            
                    </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}



const service_url = 'http://3.21.225.172/api';
const date_format = {
	year: 'numeric',
	month: 'short',
	day: 'numeric'
};

/**
 * It is good practice to wait for the document to be fully loaded and ready before working with it.
 * This also allows you to have your JavaScript code before the body of your document, in the head section.
 */
$(document).ready(function onLoad() {
	getBookList();
	$('#search-form').submit((event) => {
		event.preventDefault();
		const search_text = $('#search-input').val();
		getBookList(search_text);
	});
});

function getBookList(search_text) {
	$('#book-list').empty();

	let endpoint = service_url;
	if (search_text) {
		endpoint += '?filter=' + search_text
	}

	$.ajax({
		type: "GET",
		url: endpoint,
		contentType: "application/json",
		dataType: 'json',
		success: (book_list) => {
			for (let book of book_list) {
				$('#book-list').append(`
				<div class="card border-0 shadow-lg m-2" style='width: 20em;'>
					<img src="${book.cover_link}" class="card-img-top" alt="book cover">
					<div class="card-body">
						<h4 class="card-title">${book.title}</h4>
						<div class="card-text">
							Author
							<div class="card-subtitle text-muted">${book.author}</div>
						</div>
						<div class="card-text">
							Published Date
							<div class="card-subtitle text-muted">${new Date(book.published_date).toLocaleDateString("en-US", date_format)}</div>
						</div>
						<div class="card-text">
							ISBN
							<div class="card-subtitle text-muted">${book.isbn}</div>
						</div>
					</div>
					<div class='card-footer d-flex justify-content-center'>
						<button id="book-delete-${book.isbn}" class="book-delete-button btn btn-outline-danger" type="button">Delete</button>
					</div>
				</div>
				`);
			}

			$('.book-delete-button').click(function () {
				const isbn = $(this).attr('id').split('-')[2];
				const card_element = $(this).parent().parent();
				$.ajax({
					type: "DELETE",
					url: service_url + "?isbn=" + isbn,
					success: () => {
						card_element.fadeOut();
					}
				});
			});
		}
	});
}
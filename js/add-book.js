const service_url = 'http://3.21.225.172/api';

$(document).ready(function () {
	$('#add-book-form').submit(function (e) {
		e.preventDefault();

		var isbn_input = $('#book-isbn-input');
		var title_input = $('#book-title-input');
		var author_input = $('#book-author-input');
		var cover_link_input = $('#book-cover-link-input');
		var published_date_input = $('#book-published-date-input');

		$.ajax({
			type: "POST",
			url: service_url,
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify({
				isbn: isbn_input.val(),
				title: title_input.val(),
				author: author_input.val(),
				cover_link: cover_link_input.val(),
				published_date: published_date_input.val()
			}),
			success: function (response) {
				isbn_input.val("");
				title_input.val("");
				author_input.val("");
				cover_link_input.val("");
				published_date_input.val("");

				$('#form-message-container').empty().append(`
				<div class="alert alert-info text-center m-3" style='text-transform: capitalize;' role="alert">
					${response.message}
				</div>
				`);
			},
			error: function (error) {
				console.log('err');
				$('#form-message-container').empty().append(`
				<div class="alert alert-danger text-center m-3" style='text-transform: capitalize;' role="alert">
					${error.responseText}
				</div>
				`);
			}
		});
	});
});
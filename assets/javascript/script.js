$(document).ready(function() {
    var topicsList = [
        `Cowboy Bebop`, `Samurai Champloo`, `Erased`, `Stein's Gate`,
        `Berserk`, `One Punch Man`, `Hokuto no Ken`, `Dragon Ball Z`,
        `Grimgar of Fantasy and Ash`, `Spirited Away`
    ];

    //function to make buttons and add them to the page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $(`<button>`);
            a.addClass(classToAdd);
            a.attr(`data-type`, arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        };
    };

    // When a topic is clicked, populate the `gifs` div with the relevant gifs
    $(document).on(`click`, `.topic-button`, function() {
        $(`#gifs`).empty();
        $(`.topic-button`).removeClass(`active`);
        $(this).addClass(`active`)

        var type = $(this).attr(`data-type`);
        var queryURL = `http://api.giphy.com/v1/gifs/search?q=` + type + `&api_key=QmG4wXeET6EHh42vIF7yf0oYWYkM7ELb&limit=10`;
        
        $.ajax({
            url: queryURL,
            method: `GET`
        })
        .then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var topicDiv = $(`<div class="topic-item">`);

                var rating = results[i].rating;

                var p = $(`<p>`).text(`Rating: ` + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                
                var topicImage = $(`<img>`);
                topicImage.attr(`src`, still);
                topicImage.attr(`data-still`, still);
                topicImage.attr(`data-animate`, animated);
                topicImage.attr(`data-state`, `still`);
                topicImage.addClass(`topic-image`);

                topicDiv.append(p);
                topicDiv.append(topicImage);

                $(`#gifs`).append(topicDiv);
            };
        });
    });

    //Function to toggle the gif from animate to still
    $(document).on(`click`, `.topic-image`, function() {
        var state = $(this).attr(`data-state`);

        if (state === `still`) {
            $(this).attr(`src`, $(this).attr(`data-animate`));
            $(this).attr(`data-state`, `animate`);
        } else {
            $(this).attr(`src`, $(this).attr(`data-still`));
            $(this).attr(`data-state`, `still`);
        };
    });
    
    //When `submit` is pressed, add the topic in the form
    $(`#add-topic`).on(`click`, function(event) {
        event.preventDefault();

        var newTopic = $(`input`).eq(0).val();

        if (newTopic.length > 2) {
            topicsList.push(newTopic);
        };

        populateButtons(topicsList, `topic-button`, `#topic-buttons`)
    });

    populateButtons(topicsList, `topic-button`, `#topic-buttons`)
});
    


// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function(){
  $('article').not('.template').each(function() {
    var val = $(this).find('address a').text();
    var optionTag = '<option value="' + val + '">' + val + '</option>';
    $('#author-filter').append(optionTag);

    val = $(this).attr('data-category');
    optionTag = '<option value="' + val + '">' + val + '</option>';
    if ($('#category-filter option[value="' + val + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function(){
    if ($(this).val()) {
      var val = $(this).val();
      /*TODO: If the select box changes to an option that has a value, we should:
              1. Hide all the articles,
              2. Fade in only the articles that match based on the author that was selected
              (Hint: attribute selector??) */
      $('article').hide();
      $('article[data-author-name="' + val + '"]').fadeIn();
    } else {
      /* TODO: Otherwise, we should:
              1. Show all the articles,
              2. Except the one article we are using as template */
      $('article').not('.template').show();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function () {
  /*TODO: Just like we do for #author-filter above, we should handle changes
          events on the #category-filter element. Besure to reset the #author-filter
          while you're at it! */
  $('#category-filter').on('change', function(){
    if ($(this).val()) {
      val = $(this).val();
      $('article').hide();
      $('article[data-category="' + val + '"]').fadeIn();
    } else {
      $('article').not('.template').show();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  /* TODO: Complete the delegated event handler below to help
            power the tabs feature
      Clicking any .tab element should:
      1. Hide all the .tab-content sections.
      2. Fade in the single .tab-content section that is associated with the
      clicked .tab element's data-content attribute. */
  $('.main-nav').on('click','.tab', function(){
    $('.tab-content').hide();
    val = $(this).attr('data-content');
    $('#' + val).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  /* NOTE: this hides any elements after the first 2 (<p> tags in this case)
          in any article body */
  var $hiddenBody = $('.article-body *:nth-of-type(n+3)');
  $hiddenBody.hide();
  $('article').on('click','.read-on', function(){
    if ($(this).html() === 'Read on →') {
      $(this).prev().children().show();
      $(this).html('&larr; Show less');
    } else {
      $(this).prev().children('*:nth-of-type(n+3)').hide();
      $(this).html('Read on &rarr;');
    }
    return false;
  });

  /* TODO: Add a delegated event handler to reveal the remaining body section.
          When a .read-on link is clicked, we can:
          1. Prevent the default action of a link.
          2. Reveal everything in that particular article now.
          3. Hide the read-on link! (Might need event delegation here)*/
  // STRETCH GOAL!: change the 'Read More' link to 'Show Less'
};

//TODO: Invoke all of the above functions (methods);
articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();

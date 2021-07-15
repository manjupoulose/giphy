(function () {
    function giphySearch(keyword) {
      return fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=10`)
        .then(response => response.json());
    }
    function ratingclick(){
      $("rating-circle").addClass('rating-clicked');
    }
  
    function appendImage(img,index) {
      let $div = $('<div class="img-wrapper"></div>');
      let $div2=$(`<div id="rating-container"><div class="rating-circle" id="${index}1"></div><div class="rating-circle" id="${index}2"></div><div class="rating-circle" id="${index}3"></div><div class="rating-circle" id="${index}4"></div><div class="rating-circle" id="${index}5"></div></div>`)
      $('<div class="inner"></div>').append(img).append($div2).appendTo($div);
      $('#thumbs').append($div)

      $(document).on("click",'div.rating-circle',function(event){ 
let targetelement ='#'+event.target.id;
        $('.rating-circle').removeClass('rating-clicked');
        $(targetelement).addClass('rating-clicked');  
      });

        $(document).on("mouseenter",'div.rating-circle', function(event){ 
          let targetelement ='#'+event.target.id;

          $(targetelement).addClass('rating-hover'); });

          $(document).on("mouseleave",'div.rating-circle',function(event){ 
            let targetelement ='#'+event.target.id;
            $(targetelement).removeClass('rating-hover'); });
    }
    
    function showLoader() {
      $('.loader-wrapper').addClass('shown');
    }
  
    function hideLoader() {
      $('.loader-wrapper').removeClass('shown');
    }
  
    function onImgLoad(img) {
      return new Promise((resolve, reject) => {
        img.onload = resolve;
      });
    }
  
    (function listenOnFormSubmit() {
      $('#searchForm').submit(async (ev) => {
        ev.preventDefault();
  
        let $input = $('#searchInput');
  
        main($input.val());
      });
    })();
  
    async function main(keyword) {
      const result = await giphySearch(keyword);
      $('#thumbs').html('');
      showLoader();
      // let loadedImageCount = 0;
      let promises = [];
      result.data.forEach((gif,i) => {
        let img = new Image();
        img.src = gif.images.original.url;
        promises.push(onImgLoad(img));
        // img.onload = () => {
        //   loadedImageCount++;
        //   if (loadedImageCount === result.data.length){
        //     hideLoader()
        //   }
        // };
        appendImage(img,i);
      });
  
      await Promise.all(promises);
      hideLoader();
    }
    
    $('.rating-circle').hover(function(){
      // $(this).addClass('rating-hover');
      var current =$(this);
      $('.rating-circle').each(function(index){
      $(this).addClass('rating-hover');
      if(index== current.index()){
          return false;
      }
      });
      });
      $('.rating-circle').mouseleave(function(){
          $('.rating-circle').removeClass('rating-hover');
      });
      $('.rating-circle').click(function(){
          $('.rating-circle').removeClass('rating-chosen');
          $('.rating-hover').addClass('rating-chosen');
      });
  })();
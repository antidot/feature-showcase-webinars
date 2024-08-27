
// clustered search api parameters
let CALLING_APP = "sample-custom-components";
let CONTENT_LOCALE = "en-US";
let FITLERS = [
   {"key": "ft:publicationId", "values":["mLqykqm1R1mMe_iW1uYv6w", "3dnfjMs5P6LgFPyQPhtAnA", "iH0dv0D6OTdRGsY9awKYdw", "03yzo9x2DPqfsHEnMXBqmw"]},
   {"key": "ft:isPublication", "values": ["true"]}
   ];
let SORT = [{"key": "ft:title","order": "ASC"}];


let script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/glide.js';
document.append(script);

let link1 = document.createElement('link');
link1.href = 'https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/css/glide.core.css';
link1.rel = 'stylesheet';
document.append(link1);

let link2 = document.createElement('link');
link2.href = 'https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/css/glide.theme.css';
link2.rel = 'stylesheet';
document.append(link2);

script.onload = async function(){
 
    // clean side container div
    let glide__slides = document.querySelector('ul.glide__slides');
    glide__slides.innerHTML = '';
    
    // init FT API Helper
    let FTAPI = await new window.fluidtopics.FluidTopicsApi();
    FTAPI["ftCallingApp"] = CALLING_APP;
    
    let data = {
        "contentLocale": CONTENT_LOCALE,
        "filters": FITLERS,
        "sort": SORT
     }
    
    let response = await FTAPI.post(`/api/khub/clustered-search`, data);
    
    response.results.forEach(result => {
      let entry = result.entries[0];
      let entry_type = entry.type.toLowerCase();
      let r = entry[entry_type];
      let icon_name='unknown';
      let icon_variant = 'fluid-topics';
      if (entry_type == 'map') icon_name='book';
      if (entry_type == 'topic') icon_name='topics';
      if (entry_type == 'document'){
        if (r.mimeType.endsWith('pdf')){
          icon_variant='file-format';
          icon_name='pdf';
        } else if (r.mimeType.endsWith('zip')){
          icon_variant='file-format';
          icon_name='zip';
        }        
      } 
      /* sample dom
      <div class="result">
        <a href="a-link-here">
        <div class="title">
         <ft-icon variant="fluid-topics">an-icon-name</ft-icon>
         a-title
        </div>
        <div class="delimiter"></div>
        </a>
      </div>
      */
      
      let glide__slide = document.createElement('li');
      glide__slide.setAttribute('class', 'glide__slide');
      glide__slides.append(glide__slide);
      
      let div_result = document.createElement('div');
      div_result.setAttribute('class', 'result');
      glide__slide.append(div_result);
      
      let link = document.createElement('a');
      link.href = r.readerUrl ?? r.viewerUrl;
      div_result.append(link);
      
      let div_title = document.createElement('div');
      div_title.setAttribute('class', 'title');
      div_title.innerText = r.title;
      link.append(div_title);
      
      let ft_icon = document.createElement('ft-icon');
      ft_icon.setAttribute('variant', icon_variant);
      ft_icon.innerText = icon_name;
      div_title.prepend(ft_icon);      
      
      let div_delimiter = document.createElement('div');
      div_delimiter.setAttribute('class', 'delimiter');
      div_result.append(div_delimiter);
      
    });
  
    let glideMulti = new Glide(document.getElementById('carousel'), {
      type: 'carousel',
      autoplay: 4000,
      focusAt: 'center',
      perView: 3,
      startAt: 1
    });  
    glideMulti.mount();
    
}

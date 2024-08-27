
/* following parameters are provided to the clustered search api */
let CALLING_APP = "sample-custom-components";
let CONTENT_LOCALE = "en-US";
let FILTERS = [{"key": "ft:isPublication", "values":["true"]}];
let SORT = [{"key": "ft:lastPublication","order": "DESC"}];

async function main() {
    
    // clean results div
    let div_results = document.getElementById('results');
    div_results.innerHTML = '';

    // prepare FT API Helper
    let FTAPI = await new window.fluidtopics.FluidTopicsApi();
    FTAPI["ftCallingApp"] = CALLING_APP;
    
    // call clustered search api
    let data = {
       "contentLocale":CONTENT_LOCALE,
       "filters": FILTERS,
       "sort": SORT
    }    
    let response = await FTAPI.post(`/api/khub/clustered-search`, data);
    
    // process clustered search results
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
      /* building following to dom
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
      let div_result = document.createElement('div');
      div_result.setAttribute('class', 'result');
      div_results.append(div_result);
      
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
}
main();

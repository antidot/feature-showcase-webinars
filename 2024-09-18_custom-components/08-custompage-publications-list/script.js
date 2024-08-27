

/* following parameters are provided to the clustered search api */
let CALLING_APP = "sample-custom-components";
let CONTENT_LOCALE = "en-US";
let FILTERS = [{"key": "ft:isPublication", "values":["true"]}];
let SORT = [{"key": "ft:lastPublication","order": "DESC"}];

let METADATA_KEYS = ['audience','document_type'];

let dataTablesScript = document.createElement('script');
let dataTablesLink = document.createElement('link');

dataTablesScript.src = "https://cdn.datatables.net/v/dt/jq-3.7.0/jszip-3.10.1/dt-2.1.3/b-3.1.1/b-html5-3.1.1/datatables.min.js";
dataTablesLink.href = "https://cdn.datatables.net/v/dt/jq-3.7.0/jszip-3.10.1/dt-2.1.3/b-3.1.1/b-html5-3.1.1/datatables.min.css";
dataTablesLink.rel="stylesheet";

document.appendChild(dataTablesLink);
document.appendChild(dataTablesScript);      

 dataTablesScript.onload = async function() {
    
    let FTAPI = await new window.fluidtopics.FluidTopicsApi();
    FTAPI["ftCallingApp"] = CALLING_APP;

    let data = {
        "contentLocale": CONTENT_LOCALE,
        "filters": FILTERS,
        "sort": SORT
    }
    let response = await FTAPI.post(`/api/khub/clustered-search`, data);
    
    function getMetadata(metadata, key){
      return metadata.filter(m => m.key == key)?.map(m => m.values.join(', '))?.[0] ?? '';
    }       
    
    let results_dataset = response.results.map((result) => {
      let entry = result.entries[0];
      let entry_type = entry.type.toLowerCase();
      let r = entry[entry_type];      
      let result_dataset = [entry_type, r.title];
      METADATA_KEYS.forEach(key => {
        result_dataset.push(getMetadata(r.metadata, key));
      });      
      return result_dataset;
    });
    
    let columns = [
        {title: 'Publication type'},
        {title: 'Title'}
    ];
    METADATA_KEYS.forEach(key => {
      columns.push({title: key});
    });
            
    new DataTable(document.getElementById('publication-list'), {
      columns: columns,
      data: results_dataset,
      pageLength: 25,
      layout: {
        top: {
            buttons: [ 'copy', 'excel']
        }
    }
    });
    
}






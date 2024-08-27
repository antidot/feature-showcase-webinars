
let dataTablesScript = document.createElement('script');
let dataTablesLink = document.createElement('link');

dataTablesScript.src = "https://cdn.datatables.net/v/dt/jq-3.7.0/jszip-3.10.1/dt-2.1.3/b-3.1.1/b-html5-3.1.1/datatables.min.js";
dataTablesLink.href = "https://cdn.datatables.net/v/dt/jq-3.7.0/jszip-3.10.1/dt-2.1.3/b-3.1.1/b-html5-3.1.1/datatables.min.css";
dataTablesLink.rel="stylesheet";

document.appendChild(dataTablesLink);
document.appendChild(dataTablesScript);  

dataTablesScript.onload = async function() {
    
    let metadata = await topic.getMetadata();
    
    let topic_dataset = metadata.map((m) => [m.key.startsWith('ft:')?'build-in':'custom', m.key, m.values.join(', ')]);
            
    new DataTable(document.getElementById('metadata'), {
      columns: [
        {title: 'Type'},
        {title: 'Key'},
        {title: 'Values'},
      ],
      data: topic_dataset,
      pageLength: 25
    });
    
}
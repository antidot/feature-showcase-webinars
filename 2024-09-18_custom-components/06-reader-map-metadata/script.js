
let dataTablesScript = document.createElement('script');
let dataTablesLink = document.createElement('link');

dataTablesScript.src = "https://cdn.datatables.net/v/dt/jq-3.7.0/jszip-3.10.1/dt-2.1.3/b-3.1.1/b-html5-3.1.1/datatables.min.js";
dataTablesLink.href = "https://cdn.datatables.net/v/dt/jq-3.7.0/jszip-3.10.1/dt-2.1.3/b-3.1.1/b-html5-3.1.1/datatables.min.css";
dataTablesLink.rel="stylesheet"; 

document.appendChild(dataTablesLink);
document.appendChild(dataTablesScript);

dataTablesScript.onload = function() {
    
    let builtin_dataset = map.metadata.filter((m) => m.key.startsWith('ft:')).map((m) => [m.key, m.values.join(', ')]);
    let custom_dataset = map.metadata.filter((m) => !m.key.startsWith('ft:')).map((m) => [m.key, m.values.join(', ')]);
            
    new DataTable(document.getElementById('builtin-metadata'), {
      columns: [
        {title: 'Key'},
        {title: 'Values'},
      ],
      data: builtin_dataset,
      pageLength: 25
    });
    
    new DataTable(document.getElementById('custom-metadata'), {
      columns: [
        {title: 'Key'},
        {title: 'Values'},
      ],
      data: custom_dataset,
      pageLength: 25
    });
    
}

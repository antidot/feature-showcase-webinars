let separator = ' > ';
if (result.type=='TOPIC') {
  let breadcrumb = result.topic.mapTitle;
  if (result.topic.breadcrumb.length > 1){
    breadcrumb += separator + result.topic.breadcrumb.slice(0, result.topic.breadcrumb.length-1).join(separator);
  }
  document.getElementById('breadcrumb').innerHTML=breadcrumb;
}
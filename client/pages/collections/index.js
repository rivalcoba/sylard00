//Index Scripts Page 
//import helper
import HelperIndexCollections from '@chelpers/models/collections'
async function count_items_collections(){
var counter_items = await HelperIndexCollections.getAllCollectionsForButton();
var total_items = counter_items.paginator.itemCount;
if(total_items<1){
console.log("no hay collecciones");
$(document).ready(function(){
    $("#button_load_audio").hide();
});
return false;
}
else{
    console.log("si hay collecciones");
    
    return true;
}
//console.log("total items"+ total_items);
}
function go_add_audion(){
    window.location.href = '/audioannotations/create';
}
export default {
    count_items_collections,
    go_add_audion
}
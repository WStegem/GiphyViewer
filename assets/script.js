var topics=['Star Wars', 'Star Trek', 'Blade Runner', '2049', 'Lord of the Rings']
var gifs =[]
var currentTopic = topics[0]
var offset = 0

function gifGen(){
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?api_key=5Hud2Ms120VZcuDWGUV3Mko7oEw9E4zy&q='+currentTopic+'&limit=10&offset='+offset+'&lang=en',
        method: "GET"
    }).then(function(response) {
        for(i=0;i<10;i++){
            // Creates div for gif and rating data, with id = gif id
            $('#gif-col').append('<div id=div-'+response.data[i].id+' class="mx-2 d-inline-flex flex-column"></div>')
            // Creates gif
            $('#div-'+response.data[i].id).append('<img id='+response.data[i].id+' class="still" src="'+response.data[i].images.fixed_height_still['url']+'" height='+response.data[i].fixed_height_downsampled_height+' width='+response.data[i].fixed_height_downsampled_width+'>')
            // Rating data
            $('#div-'+response.data[i].id).append('<p class="justify-content-center">Rating: '+response.data[i].rating+'</p>')
            // id logging
            gifs.push(response.data[i].id)
        }
    })
    offset=offset+10
}

//Generate tag buttons
function buttonReload(){
    $('#button-col').empty()
    for (i=0;i<topics.length;i++){
        var newTag = $("<button>")
            newTag.attr("id", i)
            newTag.attr("class", 'btn btn-info m-2 tag-button')
            newTag.text(topics[i])
        $("#button-col").append(newTag);
    }
}

buttonReload()

// Add new tag
$("#add-tag").on("click", function(event){
    event.preventDefault();
    if(topics.includes($("#tag-input").val().trim()) == false){
        topics.push($("#tag-input").val().trim())
        buttonReload()
    }
})

// Generate more gifs
$('#input-col').on("click", '#more-button', function(){
    gifGen()
})

$('#button-col').on("click", '.tag-button',function(){
    currentTopic = this.innerHTML
    $('#gif-col').empty()
    offset=0
    gifGen()
})


$('#gif-col').on('click', '.still', function() {
    var id = this.id
        $('#'+id).remove()
        $('#div-'+id).prepend('<img id='+id+' class="gif" src="https://media3.giphy.com/media/'+id+'/200_d.gif">')
})

$('#gif-col').on('click', '.gif', function() {
    var id = this.id
        $('#'+id).remove()
        $('#div-'+id).prepend('<img id='+id+' class="still" src="https://media3.giphy.com/media/'+id+'/200_s.gif">')
})

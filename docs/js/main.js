/*********************************** 
 *    This is the main javascript file for the BBH_Demo page
 *    The function of this file is to dynamically create HTML content based on the images in the images/world_images folder
 *          and text files with the same name in the doc/image_text folder
*************************************/

/******** functions ********/
// function to create an HTML div section for an image and text
function imageDiv( $image_url, $text_url, $even ){
    var $image_html = "<div>";
    var $text = "";
    $.get( ('/BBH_Demo/docs/world_images'+$text_url) , function(data) {
        $text = data;
     }, 'text');
    if( $even ){
        $image_html = $image_html + '<div class=world_image><img src="/BBH_Demo/images/world_images/'+$image_url+'"></div>';
        $image_html = $image_html + '<div class="image_text">'+$text+'</div>';
    } else {
        $image_html = $image_html + '<div class="image_text">'+$text+'</div>';
        $image_html = $image_html + '<div class=world_image><img src="/BBH_Demo/images/world_images/'+$image_url+'"></div>';
    }
    $image_html = $image_html + "</div>";
    return $image_html;
}

/******** main code ********/

/*** initialize variables ***/
var $html_string = "<div>";
var $img_folder = "/BBH_Demo/images/world_images/";
var $image_array = new Array();
var i = 1;
var $lines = new Array();
var $image_html = "";
var $text = "";

// ToDo: if we have more than one world to work through, we can create subdirectories for each world, 
//      then loop through the subdirectories of world_images
// get the images in /images/world_images

// $.ajax({
//     url : $img_folder,
//     success: function (data) {
//         $(data).find("a").attr("href", function (i, val) {
//             if( val.match(/\.(jpe?g|png|gif)$/) ) { 
//                 $image_array.add( val.split("/")[-1] );
//             } 
//         });
//     }
// });

$.get( ('/BBH_Demo/docs/world_image_list.txt') , function(data) {
    $lines = data.split("\n");
    for (var i = 0, len = ($lines.length); i < len; i++) {
        if( $lines[i] != "" ){
            var $line_split = $lines[i].split("/");
            $image_array.push( $line_split[($line_split.length)-1] );
        }
    }
 }, 'text');
 

// Start the html section with the starter container div
// Loop through each image
for(var j = 0, len = ($image_array.length); j < len; j++) {
//$image_array.forEach( function($curr_url){
    $curr_image = $image_array[j]
    $curr_text = $curr_image.split(".")[0] + ".txt"
    console.log("Current text: "+$curr_text+" Current pic:"+$curr_image);
    // if the image # is even, pic is on the left and text is on the right
    // if($i % 2 == 0){
    //     //create html divs to hold the text and the image
    //     $html_string = $html_string + imageDiv($curr_url, $curr_text, true);
    // // else: pic is on the right and text is on the left
    // }else{
    //     //create html divs to hold the text and the image
    //     $html_string = $html_string + imageDiv($curr_url, $curr_text, false);
    // }
    $image_html = "<div class='image-block'>";
    $text = "";
    var $curr_html = $("#main_content").html( );
    $.ajax({ type: "GET",   
        url: '/BBH_Demo/docs/world_images/'+$curr_text,   
        async: false,
        success : function(text)
        {
            if( i % 2 == 0 ){
                $image_html += '<div class=world-image><img src="/BBH_Demo/images/world_images/'+$curr_image+'"></div>';
                $image_html += '<div class="image-text">'+$text+'</div>';
            } else {
                $image_html += '<div class="image-text">'+$text+'</div>';
                $image_html += '<div class=world-image><img src="/BBH_Demo/images/world_images/'+$curr_image+'"></div>';
            }
            $html_string = $image_html + "</div>";
            $image_html += "</div>";
            $("#main_content").html( $curr_html + $html_string );
        },
        error: function() {
            $image_html += '<div class=world-image><img src="/BBH_Demo/images/world_images/'+$curr_image+'"></div>';
            $image_html += "</div>";
            $("#main_content").html( $curr_html + $html_string );
        }
    });
}//)
// // end the html section with a </div>
// $html_string = $html_string + "</div>"
// // append the html inside the div whose class="content"
// $("#main_content").html( $html_string );
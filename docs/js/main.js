/*********************************** 
 *    This is the main javascript file for the BBH_Demo page
 *    The function of this file is to dynamically create HTML content based on the 
 * 
*************************************/

// Import libraries - JQuery 
importScripts( "/BBH_demo/js/jquery.js");
/******** functions ********/
// function to create an HTML div section for an image and text
function imageDiv( $image, $text, $even ){
    var $image_html = "<div>"
    if( $even ){
        $image_html = $image_html + '<div></div>'
        $image_html = $image_html + '<div class="image_text">'+$text+'</div>'
    }
    $image_html = $image_html + "</div>"
    return $image_html
}

/******** main code ********/

/*** initialize variables ***/
var $html_string = ""

// ToDo: if we have more than one world to work through, we can create subdirectories for each world, 
//      then loop through the subdirectories of world_images
// get the images in /images/world_images, sorted by the numbers at the end
// Start the html section with the starter container div
// Loop through each image
    // if the image # is even, pic is on the left and text is on the right
        //create html divs to hold the text and the image
        $html_string = $html_string + imageDiv();
    // else: pic is on the right and text is on the left
        //create html divs to hold the text and the image
// end the html section with a </div>
// append the html inside the div whose class="content"
$("div.content").html( $html_string );
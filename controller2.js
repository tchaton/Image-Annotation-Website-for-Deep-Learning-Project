$(document).ready(function() {
    var folder = "imgs/";
    var N = 0;
    var j = Math.floor((Math.random() * N) + 1); 
    var image_displayed;
    var jsons = new Array();
    var previous_j = 0
    $("#next").click(function(){
      var input_path = folder+image_displayed;
      var annotation = $("#input_annotation").val();
      
      var obj = {"path_image": input_path, "annotation": annotation};
      jsons.push(obj);
      localStorage.setItem('myStorage', JSON.stringify(jsons));
      previous_j = j;
      var j = Math.floor((Math.random() * N) + 1); 
      var images = document.getElementsByTagName('img');
      var l = images.length;
      for (var i = 0; i < l; i++) {
          images[0].parentNode.removeChild(images[0]);
      }

      $.ajax({
          url : folder,
          success: function (data) {
              $(data).find("a").attr("href", function (i, val) {
                  if(val.match(/\.(jpe?g|png|gif)$/) ) { 
                    N = i;
                  } 
              });
              $(data).find("a").attr("href", function (i, val) {
                  if(val.match(/\.(jpe?g|png|gif)$/) ) { 
                    if(j == i)
                    {
                      image_displayed = val;
                      $("body").append( "<img src='"+ folder + val +"'>" );                  
                    }
                  
                  } 
              });
              
          }
      }); 
      if(JSON.parse(localStorage.getItem('myStorage'))){
        var objr = JSON.parse(localStorage.getItem('myStorage'));   
        console.log(objr);
      }     
    });
    $("#previous").click(function(){
      var images = document.getElementsByTagName('img');
      var l = images.length;
      for (var i = 0; i < l; i++) {
          images[0].parentNode.removeChild(images[0]);
      }
      console.log(jsons[jsons.length-1]);
      $.ajax({
          url : folder,
          success: function (data) {
              $(data).find("a").attr("href", function (i, val) {
                  if(val.match(/\.(jpe?g|png|gif)$/) ) { 
                    N = i;
                  } 
              });
              $(data).find("a").attr("href", function (i, val) {
                  if(val.match(/\.(jpe?g|png|gif)$/) ) { 
                    var path = folder+val;
                    if(path == jsons[jsons.length-1]['path_image'])
                    {
                      image_displayed = val;
                      $("body").append( "<img src='"+ folder + val +"'>" );   
                      jsons.pop();
                      if(JSON.parse(localStorage.getItem('myStorage'))){
                        var objr = JSON.parse(localStorage.getItem('myStorage'));   
                        console.log(objr);
                      }               
                    }
                  
                  } 
              });
              
          }
      });      
    }); 
    $("#final").click(function(){
      if(JSON.parse(localStorage.getItem('myStorage'))){
        var objr = JSON.parse(localStorage.getItem('myStorage'));   
        console.log(objr);
       }  
      $.ajax({
        type: "POST",
        url: "http://localhost:15555/",
        data: {param: objr}
      }).done(function( o ) {
         alert('done');
      });    
    });  
    $.ajax({
        url : folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if(val.match(/\.(jpe?g|png|gif)$/) ) { 
                  N = i;
                } 
            });
            $(data).find("a").attr("href", function (i, val) {
                if(val.match(/\.(jpe?g|png|gif)$/) ) { 
                  if(j == i)
                  {
                    image_displayed = val;
                    $("body").append( "<img src='"+ folder + val +"'>" );                  
                  }
                
                } 
            });
            
        }
    });
});
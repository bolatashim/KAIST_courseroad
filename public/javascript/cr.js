// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.



// document.getElementById("semesterSelect").onchange = function() {
//     localStorage.setItem('selectedtem', document.getElementById("semesterSelect").value);
// }

// if (localStorage.getItem('selectedtem')) {
//     document.getElementById("selectedtem").options[localStorage.getItem('selectedtem')].selected = true;
// }​



// var selectedSem = "freshOne";


// $(document).on('change','#semesterSelect',function(){
//   selectedSem = $("#semesterSelect").val();
//   console.log(selectedSem);
// });


// var selectedItem = sessionStorage.getItem("SelectedItem");  

// $("#semesterSelect").change(function() {
//   var semester = $(this).val();
//   sessionStorage.setItem("selectedItem", semester);
// });

$( document ).ready(function() {

	 $('[data-toggle="tooltip"]').tooltip();
	// /$('[data-toggle="popover"]').popover();

	function dispTypes() {

		var $semss = ["freshOne", "freshTwo", "sophOne", "sophTwo", "junOne", "junTwo", "senOne", "senTwo", "extraOne"];

		for (var i = 0; i < $semss.length; i++) {
			var $tclass = "." + $semss[i] + " table";

			$($tclass).find("tr").each(function(i) {
				var $tds = $(this).find("td").eq(0).text();
				console.log($tds);

				var tt = ".reqmajor";

				$(tt).append(
					$("<li>").append(
		            		$('<span>').append($tds)
					)
				);
			});
		}
	}


	$(".md-chip-remove").click(function() {
		var $row = $(this).closest("tr");
		var $data = $row.find(".ccode").text();
		var $sem = $row.parent().closest("div").attr("class");

		//though this works, I am not sure about whether this is the right way of doing this.
		$row.remove();			
		$.ajax({
			type: 'POST',
			dataType: "json",
			data: {
				code: $data,
				semester: $sem
			},
	        dataType: 'application/json',
            url: 'http://localhost:3000/courseDelete',						
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));
            } 
        });
	});








});

//   if (selectedItem) {
//     $("#semesterSelect").val(SelectedItem);
//     console.log(selectedItem);
//   }



//     // var cdata = ccodetitles;
//     // var cautocomp = [];

//     // for (var i = cdata.length - 1; i >= 0; i--) {
//     //   cautocomp.push(cdata[i]["ccode"]);
//     // }


//     // function refresh() {
//     //   $("#caddtext").val("");
//     //   $("#caddtext").focus();
//     // }

//     // function submitccode(code) {
//     //   for (var i = 0; i < cdata.length; i++) {
//     //     if(cdata[i]["ccode"] == code) {
//     //       var title = cdata[i]["ctitle"];
//     //       addcourse(code, title);
//     //       return;
//     //     }
//     //   }
//     //   console.log("rak wtf???");
//     //   refresh();
//     // }



function dummyfunc(sometext) {
  console.log(sometext);
}





//     // function addcourse(code, title) {
//     //   console.log("Course with the code " + code + " and title: " + title + " has been added to the courses list");

//     //   var html = '<tr class="course-row">' + 
//     //               '<td class="ccode">' + 2 + '.</td>' +
//     //               '<td class="ccode">' + code + '</td>' +
//     //               '<td class="ctitle">' + title + '</td>' + 
//     //             '</tr>';
//     //   $(html).insertBefore(".addrow");
      
//     //   refresh();
//     // }

//     // $("#caddsubm").click(function() {
//     //   var code = $("#caddtext").val();
//     //   submitccode(code);
//     // });


//     // $("#caddtext").autocomplete({
//     //   source: cautocomp,
//     //   minLength: 1,
//     //   select: function(event, ui) {
//     //     if (ui.item) {
//     //       submitccode(ui.item.value);
//     //       ui.item.value = ""; //to make sure input field is empty
//     //     }
//     //   }
//     // });

//     // refresh();





// });







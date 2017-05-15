$(document).ready(function() {
	var dates = [];
	var tips = "One of 200 days";
	
	$(".event").draggable({
		revert: true,
		start: function() {
			$(".ui-datepicker-calendar td").droppable({
				drop: function(){
					$(this).click();
					$(this).click();
					var theDate = $(".datepicker").datepicker("getDate");
					alert("Event created on " + theDate.toDateString());
					var someDate = moment(theDate);
					var newDate = newDateArray(someDate);
					var newMonthArray = getMonths(someDate.month(), newDate.month());
					$(".datepicker").datepicker("option", "numberOfMonths", newMonthArray);
					$(".datepicker").datepicker("option", "beforeShowDay", highlight);
				}
			});
		}
	});
	
	$(".datepicker").datepicker({
		showButtonPanel: false,
	});
	
	function highlight(date){
		for (var i = 0; i < dates.length; i++) {
			if (new Date(dates[i]).toString() == date.toString()){
				return [true, 'highlight', tips];
			}
		}
		return [true, ''];
	}
	
	function newDateArray(selectedDate)
	{
		var numDays = 0;
		var t1 = JSON.parse(JSON.stringify(selectedDate));
		var t2 = moment(t1);
		while (numDays < 100)
		{
			if ((t2.day() !== 0) && (t2.day() !== 6))
			{
				dates.push(t2.format("MM-DD-YYYY"));
				numDays++;
			}
			t2.add(1, "days");
		}
		return t2.subtract(1, "days");
	}
	
	function getMonths(startMonth, endMonth)
	{
		var numMonths = (endMonth - startMonth) + 1;
		var rows = Math.ceil(numMonths / 4);
		var dimensions = [];
		dimensions.push(rows);
		dimensions.push(4);
		return dimensions;
	}
});
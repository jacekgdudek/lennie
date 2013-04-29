function CalendarScene()
{
	var stageCanvas;
	var stage;
	var calendar = new Object();
	var advise = {};
	var messageObject;

	this.init = function()
	{
		//newsList = structure.news;
		constructCanvas(structure.calendar);
		constructCalendar(structure.calendar);
		constructMessage(structure.calendar);
	}

	this.update = function()
	{
		stage.update();
	}

	this.finalize = function()
	{

	}

	//=======================PRIV
	function hintsOnMove(mousePos)
	{
		for( var i in advise)
		{
			if(advise[i].bg.hitTest( mousePos.stageX - advise[i].bg.x , mousePos.stageY - advise[i].bg.y ))
			{
				//collidedObject = scene.visuals[i];
				highlightAdvise(advise[i]);
				updateMessage(advise[i]);
			}
			else
			{
				highlightAdviseHide(advise[i]);
			}
		}
	}
	function hintsOnDown(mousePos)
	{
		for( var i in advise)
		{
			if(advise[i].bg.hitTest( mousePos.stageX - advise[i].bg.x , mousePos.stageY - advise[i].bg.y ))
			{
				//collidedObject = scene.visuals[i];
				console.log("down state initialized");
			}
		}
	}

	function highlightAdvise(advise)
	{
		//update advise bg
		if(typeof advise.bgHover !== 'undefined') stage.removeChild(advise.bgHover);
		var bgIndex = stage.getChildIndex(advise.bg);
		advise.bgHover = new createjs.Shape();
		advise.bgHover.graphics.beginFill("brown").drawRect(advise.x, advise.y, advise.width, advise.height);
		stage.addChildAt(advise.bgHover,bgIndex+1);
	}
	function highlightAdviseHide(advise)
	{
		//update advise bg
		if(typeof advise.bgHover !== 'undefined') stage.removeChild(advise.bgHover);
	}

	function constructMessage(calendar)
	{
		messageObject = new Object();
		messageObject.bg = new createjs.Shape();
		messageObject.maxWidth = calendar.width/2;
		messageObject.maxHeight = calendar.height/2;
		messageObject.text = new createjs.Text("","18px Arial", "#000");

		stage.addChild(messageObject.bg , messageObject.text);
	}
	function updateMessage(advise)
	{
		stage.removeChild(messageObject.bg , messageObject.text);

		//prpare text
		messageObject.text = new createjs.Text(advise.message,"18px Arial", "#000");

		var rect = new Object();
		//   y
		if(advise.y < structure.calendar.height/2 + structure.calendar.monthHeight)
		{
			rect.y = advise.y + advise.height + messageObject.text.getMeasuredHeight();
		}
		else
		{
			rect.y = advise.y - messageObject.text.getMeasuredHeight();
		}
		//   x
		if(advise.x < structure.calendar.width/2)
		{
			rect.x = advise.x + advise.width + 20;
		}
		else
		{
			rect.x = advise.x - messageObject.text.getMeasuredWidth();
		}
		rect.w = messageObject.text.getMeasuredWidth();
		rect.h = messageObject.text.getMeasuredHeight();

		//draw background
		messageObject.bg = new createjs.Shape();
		messageObject.bg.graphics.beginStroke("#00d").beginFill("white").drawRect(rect.x-20 , rect.y-20 , rect.w+20, rect.h+20);

		//position text
		messageObject.text.x = rect.x-10;
		messageObject.text.y = rect.y-10;

		stage.addChild(messageObject.bg , messageObject.text);

	}

	function constructCanvas(calendar)
	{
		//clear body
		while (body.hasChildNodes()) {
    		body.removeChild(body.lastChild);
		}

		//create stage for calendar
		stageCanvas = document.createElement("canvas");
		stageCanvas.id = "calendarCanvas";
		stageCanvas.width = calendar.width;
		stageCanvas.height = calendar.height + calendar.monthHeight;
		stageCanvas.style.paddingLeft = (800-calendar.width)/2;
		body.appendChild(stageCanvas);

		stage = new createjs.Stage("calendarCanvas");

		stage.onMouseMove = function(mousePos) {
			hintsOnMove(mousePos);
		}

		stage.onMouseDown = function(mousePos) {
			hintsOnDown(mousePos);
		}

	}


	function constructCalendar(calendar)
	{
		

		//draw grid
		grid = new createjs.Shape();
		grid.graphics.beginStroke("black");
		var gapX = calendar.width/7;
		var gapY = calendar.height/6;

		for(var i = 0 ; i < 7 ; i ++)
		{
			for(var j =0 ; j < 6 ; j ++)
			{
				grid.graphics.drawRect(i*gapX, j*gapY + calendar.monthHeight, gapX, gapY);
			}
		}


		stage.addChild(grid);

		for(var i = 0 ; i < 7 ; i ++)
		{
			var weekday;
			switch(i)
			{
				case 0:
					weekday = "Monday";
				break;
				case 1:
					weekday = "Tuesday";
				break;
				case 2:
					weekday = "Wednesday";
				break;
				case 3:
					weekday = "Thursday";
				break;
				case 4:
					weekday = "Friday";
				break;
				case 5:
					weekday = "Saturday";
				break;
				case 6:
					weekday = "Sunday";
				break;
			}

			var text = new createjs.Text(weekday, "18px Arial", "#000");
			text.x = (i)*gapX + (gapX/2 - text.getMeasuredWidth()/2);
			text.y =  calendar.monthHeight + (gapY/2 - text.getMeasuredHeight()/2);;
			stage.addChild(text);
		}

		//fill up numbers
		var dt = new Date();

		var currentMonth = dt.getMonth();
		var currentMonthStr;

		switch(currentMonth)
		{
			case 0:
			currentMonthStr = "January";
			break;
			case 1:
			currentMonthStr = "February";
			break;
			case 2:
			currentMonthStr = "March";
			break;
			case 3:
			currentMonthStr = "April";
			break;
			case 4:
			currentMonthStr = "May";
			break;
			case 5:
			currentMonthStr = "June";
			break;
			case 6:
			currentMonthStr = "July";
			break;
			case 7:
			currentMonthStr = "August";
			break;
			case 8:
			currentMonthStr = "September";
			break;
			case 9:
			currentMonthStr = "October";
			break;
			case 10:
			currentMonthStr = "November";
			break;
			case 11:
			currentMonthStr = "December";
			break;
		}

		var monthText = new createjs.Text(currentMonthStr, "28px Arial", "#000");
		monthText.x = calendar.width/2 - monthText.lineWidth/2;
		monthText.y = 5;
		stage.addChild(monthText);


		//prepare advices
		advise = {};
		for(var i = 0 ; i < calendar.advise.length ; i ++)
		{
			if(calendar.advise[i].month == currentMonth + 1)
			{
				for(var j = calendar.advise[i].fromDay ; j < calendar.advise[i].toDay ; j++)
				{
					var adviceObj = new Object();
					adviceObj.message = calendar.advise[i].message;
					advise[j] = adviceObj;
				}
			}
		}


		//draw numbers
		var finnished = false;

		//get day of the week of the first
		var curDayOfTheWeek = dt.getDay();// -1 to set monday first n the week

		var curDate = dt.getDate();

		var dayOfFirst = curDate%7 - curDayOfTheWeek; 
		if(dayOfFirst < 0) dayOfFirst = dayOfFirst+7;

		var mainCount = 1;
		var started = false;
		var lineCount = 0;
		var daysInTheMonth = daysInMonth(currentMonth+1,2013);
		
		while(!finnished)
		{
			for(var i = 0 ; i < 7 ; i ++)
			{
				if(i > dayOfFirst-1) started = true;

				if(mainCount > daysInTheMonth)
				{
					finnished = true;
					break;
				}

				if(started)
				{

					//draw advise clickable stuff
					var keys = new Array();
					for(var j in advise) if (advise.hasOwnProperty(j))
					{
						keys.push(j);
					}

					var foundDay = keys.indexOf(mainCount.toString());
					if(foundDay != -1)
					{
						var advise_bg = new createjs.Shape();
						advise_bg.graphics.beginStroke("yellow").beginFill("orange").drawRect(i*gapX, (lineCount+1)*gapY  + calendar.monthHeight, gapX, gapY);
						stage.addChild(advise_bg);
						advise[mainCount].bg = advise_bg;
						advise[mainCount].x = i*gapX;
						advise[mainCount].y = (lineCount+1)*gapY  + calendar.monthHeight;
						advise[mainCount].width = gapX;
						advise[mainCount].height = gapY;

					}
					
					var dayText;

					if(mainCount == curDate) dayText = new createjs.Text(mainCount, "20px Arial", "#F00");
					else dayText = new createjs.Text(mainCount, "20px Arial", "#000");

					dayText.x = i*gapX + (gapX/2 - dayText.getMeasuredWidth()/2);
					dayText.y = (lineCount+1)*gapY + calendar.monthHeight + (gapY/2 - dayText.getMeasuredHeight()/2);
					stage.addChild(dayText);
					mainCount++;
				}

			}
			lineCount++;
		}







		//after init update
		stage.update();

	}

}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

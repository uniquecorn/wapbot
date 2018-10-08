var buttons = document.getElementsByClassName("icon");
var anims = new Array();
console.log(buttons.length);
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mouseover", function() {
    zoom(this);
  }, false);
	buttons[i].addEventListener("mouseout", function() {
    zoomBack(this);
  }, false);
	var _id = buttons[i].id;
	var iconAnim = anime.timeline({
  loop: false,
		autoplay:false,
		duration:100
});
	iconAnim.add({
  targets: "#"+_id,
  scale: 1,
  rotateX: -15,
		rotateY:20,
		rotateZ:5,
		duration: 1000
	}).add({
  targets: "#"+_id + " .outerIcon",
  scale: 1.2,
  rotateX: 0,
		rotateY:0,
		rotateZ:-5,
		offset:0,
		duration: 1000
	});
	anims.push(iconAnim);
}

function zoom(element)
{
	var i = 0;
	if(element.id == "wurmwood")
		{
			i = 0;
		}
	else if(element.id == "vale")
		{
			i = 1;
		}
	else if(element.id == "tsuki")
		{
			i = 2;
		}
	if(anims[i].reversed)
		{

				anims[i].reverse();
		}
	anims[i].play();
}
function zoomBack(element)
{
	var i = 0;
	if(element.id == "wurmwood")
		{
			i = 0;
		}
	else if(element.id == "vale")
		{
			i = 1;
		}
	else if(element.id == "tsuki")
		{
			i = 2;
		}
	if(!anims[i].reversed)
		{
				anims[i].reverse();
		}
		anims[i].play();
}


var _CANVAS = document.querySelector("#video-canvas"),
	_CTX = _CANVAS.getContext("2d"),
	_VIDEO = document.querySelector("#main-video");
    thumb = document.querySelector('#thumbnail');
    width = document.querySelector('#width');
    editor = document.querySelector("#thumbEditor");
    example = document.querySelector('#example');
    height = document.querySelector('#height');
    thumbWidth = thumb.clientWidth - example.clientWidth;
    thumbHeight = thumb.clientHeight - example.clientHeight;

document.querySelector("#upload-button").addEventListener('click', function() {
	document.querySelector("#file-to-upload").click();
});

document.querySelector("#file-to-upload").addEventListener('change', function() {
    if(['video/mp4'].indexOf(document.querySelector("#file-to-upload").files[0].type) == -1) {
        alert('Error : Only MP4 format allowed');
        return;
    }

    document.querySelector("#upload-button").style.display = 'none';

	document.querySelector("#main-video source").setAttribute('src', URL.createObjectURL(document.querySelector("#file-to-upload").files[0]));
	
	_VIDEO.load();
	_VIDEO.style.display = 'inline';
	
	_VIDEO.addEventListener('loadedmetadata', function() { console.log(_VIDEO.duration);
	    var video_duration = _VIDEO.duration,
	    	duration_options_html = '';

	    for(var i=0; i<Math.floor(video_duration); i=i+4) {
	    	duration_options_html += '<option value="' + i + '">' + i + '</option>';
	    }
	    document.querySelector("#set-video-seconds").innerHTML = duration_options_html;
	    
	    document.querySelector("#thumbnail-container").style.display = 'block';

	    _CANVAS.width = _VIDEO.videoWidth;
		_CANVAS.height = _VIDEO.videoHeight;
	});
});

document.querySelector("#set-video-seconds").addEventListener('change', function() {
    _VIDEO.currentTime = document.querySelector("#set-video-seconds").value;

    document.querySelector("#set-video-seconds").disabled = true;
    document.querySelector("#get-thumbnail").style.display = 'none';
});

document.querySelector("#main-video").addEventListener('timeupdate', function() {
	// Re-enable the dropdown and show the Download link
	document.querySelector("#set-video-seconds").disabled = false;
    document.querySelector("#get-thumbnail").style.display = 'inline';
});

thumb.addEventListener('load', function() {
    width.style.width = thumb.clientWidth + 'px';
    console.log(thumb.clientWidth);
    height.style.width = thumb.clientHeight + 'px';
    thumbWidth = thumb.clientWidth - example.clientWidth;
    thumbHeight = thumb.clientHeight - example.clientHeight;
    width.setAttribute('max', thumbWidth);
    console.log(thumb.clientWidth);
    width.setAttribute('value', thumbWidth / 2);
    subWidth();
    height.setAttribute('max', thumbHeight);
    height.setAttribute('value', thumbHeight / 2);
    subHeight();
    console.log(thumb.clientWidth - width.clientWidth);
    console.log(thumb.clientWidth);
    console.log(width.clientWidth);
    height.style.left = thumb.clientWidth + 10 + "px";
});


document.querySelector("#get-thumbnail").addEventListener('click', function() {
    _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
	//document.querySelector("#get-thumbnail").setAttribute('href', _CANVAS.toDataURL());
	//document.querySelector("#get-thumbnail").setAttribute('download', 'thumbnail.png');
   thumb.setAttribute('src', _CANVAS.toDataURL());
    //document.querySelector('#thumbEditor').style.backgroundImage = "url('" + _CANVAS.toDataURL() + "')";
    document.querySelector("#video-demo-container").style.display = 'none';
    document.querySelector("#thumbEditor").style.display = 'inline-block';
   //console.log(thumb.clientWidth);
    //console.log(editor.clientWidth);
    example.style.left = width.value;
    thumbWidth = thumb.clientWidth - example.clientWidth;
    thumbHeight = thumb.clientHeight - example.clientHeight;
     width.setAttribute('max', thumbWidth);
    console.log(thumb.clientWidth);
    width.setAttribute('value', thumbWidth / 2);
    subWidth();
    height.setAttribute('max', thumbHeight);
    height.setAttribute('value', thumbHeight / 2);
    subHeight();
});

function subWidth() {
    example.style.left = width.value + "px";
}

function subHeight() {
    example.style.top = height.value + "px";
}

function center() {
    width.setAttribute('value', thumbWidth / 2);
    height.setAttribute('value', thumbHeight / 2);
    example.style.left = thumbWidth / 2 + "px";
    example.style.top = thumbHeight / 2 + "px";
}
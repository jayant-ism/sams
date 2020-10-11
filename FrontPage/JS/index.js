function goOnStudent(){
 location.href="studentSignin.html";
}
function goOnTeacher(){
location.href="teacherSignin.html";
}
function capture(){
    location.href="CameraTesting.html";
}


  'use strict';

            const video = document.getElementById('video');
            const canvas = document.getElementById('canvas');
            const snap = document.getElementById('snap');
            const errorMsgElement = document.getElementById('spanErrorMsg');

        const constraints = {
                audio: false,
            video: {
                width: 220,
                height: 220
            }
        };

        async function init() {

            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                handleSuccess(stream);
            }

            catch (e) {
                errorMsgElement.innerHTML = `navigator.getUserMedia.error:${e.toString()}`;
            }
        }
        //success
        function handleSuccess(stream) {
                window.stream = stream;
            video.srcObject = stream;
        }
        //load init
        
        init();
        
        //Draw image

        var context = canvas.getContext('2d');
        snap.addEventListener("click", function () {
                context.drawImage(video, 1, 1);
        })

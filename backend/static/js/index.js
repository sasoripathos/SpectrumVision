(function(){
    "use strict";

    window.addEventListener('load', function(){
        function caregiver() {
            api.onModeUpdate(mode => {
                let switches = document.querySelectorAll(".switch");
                switches.forEach(s => {
                    if(s.id == mode) {
                        s.querySelector('input').checked = true;
                    } else {
                        s.querySelector('input').checked = false;
                    }
                });
            });

            // On load, get current mode
            api.getCurrentMode();

            document.getElementById('eye').addEventListener('click', e => {
                e.preventDefault();
                api.updateMode('eye');
            });

            document.getElementById('ear').addEventListener('click', e => {
                e.preventDefault();
                api.updateMode('ear');
            });
        }

        function glasses() {
            let constraints = {
                audio: false,
                video: { facingMode: 'environment' }
            };
            let msg = document.getElementById('msg');
            let workId = null;
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    let videoTrack = stream.getVideoTracks()[0];
                    let vd = document.getElementById('vd');
                    vd.srcObject = stream;
                    let bt = document.getElementById('start');
                    bt.addEventListener('click', e => {
                        e.preventDefault();
                        msg.innerHTML = 'clicked';
                        if(bt.innerHTML === 'Stop') {
                            bt.innerHTML = 'Start working';
                            clearInterval(workId);
                        } else {
                            bt.innerHTML = 'Stop';
                            workId = setInterval(() => {
                                let cv = document.getElementById('cv');
                                cv.height = vd.videoHeight;
                                cv.width = vd.videoWidth;
                                cv.getContext("2d").drawImage(vd, 0, 0, cv.width, cv.height);
                                cv.toBlob(blob => {
                                    msg.innerHTML = JSON.stringify(blob);
                                    api.uploadImage(blob);
                                });  
                            }, 5000);
                        }
                    });
                })
                .catch(err => {
                    msg.innerHTML = err;
                });
        }

        function isMobile() {
            let check = false;
            (function(a){
                if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
                    check = true;
            })(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };

        function playAudio(ad) {
            try {
                console.log(ad);
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                let context = new AudioContext();
                let source = context.createBufferSource(); //this represents the audio source. We need to now populate it with binary data.
                let buffer = new Uint8Array(ad);
                //buffer.set(new Uint8Array(ad), 0);
                /*console.log(ad.arrayBuffer);*/
                context.decodeAudioData(buffer.buffer, function(bf) {
                    source.buffer = bf;
                    source.connect(context.destination);
                }, (err) => {
                    console.log(err);
                });
                
                //now play the sound.
                source.start(0);
            } catch(e) {
                console.log(e);
            }
        }

        if(isMobile()) {
            let container = document.querySelector('.container');
            container.innerHTML = `
            <div class="py-5 text-center">
                <h2>I am a glasses now</h2>
            </div>
            <video id='vd' playsinline muted autoplay loop></video>
            <canvas id='cv'></canvas>
            `;
            let capBt = document.createElement('button');
            capBt.className = "btn btn-outline-success my-2 my-sm-0";
            capBt.innerHTML = 'Start working';
            capBt.id = 'start';
            container.appendChild(capBt);
            let msg = document.createElement('div');
            msg.id = 'msg';
            container.appendChild(msg);
            // audio setup
            api.onAudioUpdate(playAudio);
            glasses();
        } else {
            console.log("is computer");
            caregiver();
        }
    });
}())


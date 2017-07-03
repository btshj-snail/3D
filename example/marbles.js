/**
 * Created by snail on 17-7-3.
 */

var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.webkitRequestAnimationFrame

window.requestAnimationFrame = requestAnimationFrame;

var scene = null, camera = null,renderer = null;
var id = null,stat = null;

var ballMesh;
var ballRadius = 0.5;

var v = 0, a = -0.1, isMoving = false;
var maxHeight = 10;


function init(){
    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.right = '0px';
    stat.domElement.style.top='0px';
    document.body.appendChild(stat.domElement);

    renderer = new THREE.WebGLRenderer({
        canvas:document.getElementById('canvas')
    });


    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera(-5,5,5.62,-5.62,0.1,100);
    camera.position.set(5,10,15);
    camera.lookAt(new THREE.Vector3(0,3,0))
    scene.add(camera);


    //ball
    ballMesh = new THREE.Mesh(
        new THREE.SphereGeometry(ballRadius,16,8),
        new THREE.MeshLambertMaterial({
            color:0xffff00
        })
    )
    ballMesh.position.y = ballRadius;
    scene.add(ballMesh);


    //plane

    var texture = THREE.ImageUtils.loadTexture('../imgs/chess.png',{},function(){
        renderer.render(scene,camera);
    });
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4,4);
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(5,5),
        new THREE.MeshLambertMaterial({
            map:texture
        })
    )

    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(10,20,15);
    scene.add(light);


    id = requestAnimationFrame(draw);
}

function draw(){
    stat.begin();

    if(isMoving){
        ballMesh.position.y+=v;
        v+=a;
        if(ballMesh.position.y<=ballRadius){
            v = -v*0.9;
        }

        if(Math.abs(v)<0.001){
            isMoving = false;
            ballMesh.position.y = ballRadius;
        }
    }



    renderer.render(scene,camera);
    id = requestAnimationFrame(draw);
    stat.end();
}

function stop(){
    if(id!==null){
        cancelAnimationFrame(id);
        id = null;
    }
}

function startDrop(){
    isMoving = true;
    ballMesh.position.y = maxHeight;
    v = 0;
}

function initEvent(){
    var button_startDrop = document.getElementById("startDrop");
    button_startDrop.onclick = function(){
        startDrop();
    }
}


window.onload = function(){

    if(Detector.webgl){
        initEvent();
        init();
    }else{
        var warning = Detector.getWebGLErrorMessage();
        var frame = document.getElementById('canvasFrame');
        frame.appendChild(warning);
    }
}
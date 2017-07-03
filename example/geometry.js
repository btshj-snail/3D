/**
 * Created by snail on 17-6-30.
 */

var geometry,camera;



function init(){
    var renderer = new THREE.WebGLRenderer({
        canvas:document.getElementById("canvas")
    })

    if(!camera || !geometry){
        return
    }

    var scene = new THREE.Scene();

    camera.position.set(0,0,5);

    scene.add(camera);

    scene.add(geometry);

    renderer.render(scene,camera)
}

function changeGeometry(geometryMode){
    if (geometryMode == 'cube') {
        // THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
        // 这里，width是x方向上的长度；height是y方向上的长度；
        // depth是z方向上的长度；
        // 后三个参数分别是在三个方向上的分段数，如widthSegments为3的话，代表x方向上水平分为三份。
        // 一般情况下不需要分段的话，可以不设置后三个参数，后三个参数的缺省值为1。其他几何形状中的分段也是类似的，下面不做说明。
        geometry = new THREE.Mesh(
            new THREE.CubeGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            }))

    } else if (geometryMode == 'plane') {

        // THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
        // 其中，width是x方向上的长度；height是y方向上的长度；后两个参数同样表示分段。

        geometry = new THREE.Mesh(
            new THREE.PlaneGeometry(2,4),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            }));
    }else if (geometryMode == 'sphere') {
        // THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)
        // 其中，radius是半径；segmentsWidth表示经度上的切片数；
        // segmentsHeight表示纬度上的切片数；phiStart表示经度开始的弧度；
        // phiLength表示经度跨过的弧度；thetaStart表示纬度开始的弧度；
        // thetaLength表示纬度跨过的弧度。
        geometry = new THREE.Mesh(
            new THREE.SphereGeometry(1.5,28,28,0, Math.PI*2,0,Math.PI*2),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            }));
    }else if (geometryMode == 'circle') {
        // THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
        geometry = new THREE.Mesh(
            new THREE.CircleGeometry(1.5,100,0,Math.PI*2),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            }));
    }else if (geometryMode == 'cylinder') {
        // THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
        // 其中，radiusTop与radiusBottom分别是顶面和底面的半径，由此可知，当这两个参数设置为不同的值时，实际上创建的是一个圆台；
        // height是圆柱体的高度；radiusSegments与heightSegments可类比球体中的分段；
        // openEnded是一个布尔值，表示是否没有顶面和底面，缺省值为false，表示有顶面和底面。
        geometry = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5,1,1.5,20,20),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            }));
    }
    init(geometry);
}

function changeCamera(mode){
    if(mode=="orthographic"){
        camera = new THREE.OrthographicCamera(-2,2,1.5,-1.5,1,10);
    }else{
        camera = new THREE.PerspectiveCamera(45,800/450,1,10);
    }
    init();
}


function initEvent(){
    var button_orthographic = document.getElementById("orthographic");
    var button_perspective = document.getElementById("perspective");
    var button_cube = document.getElementById("cubeButton");
    var button_plane = document.getElementById("planeButton");
    var button_sphere = document.getElementById("sphereButton");
    var button_circle = document.getElementById("circleButton");
    var button_cylinder = document.getElementById('cylinderButton');

    button_orthographic.onclick = function(){
        changeCamera("orthographic");
    }

    button_perspective.onclick = function(){
        changeCamera("perspective");
    }


    button_cube.onclick = function(){
        changeGeometry("cube");
    }
    button_plane.onclick = function(){
        changeGeometry("plane");
    }
    button_sphere.onclick = function(){
        changeGeometry("sphere");
    }
    button_circle.onclick = function(){
        changeGeometry("circle");
    }
    button_cylinder.onclick = function(){
        changeGeometry("cylinder");
    }
}

window.onload = function(){

    initEvent();


    if (Detector.webgl) {

    } else {
        var warning = Detector.getWebGLErrorMessage();
        document.getElementById("canvasFrame").appendChild(warning);
    }
}
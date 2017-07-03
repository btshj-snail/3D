/**
 * Created by snail on 17-7-3.
 */
var mesh = null;
function init(){
    var renderer = new THREE.WebGLRenderer({
        canvas:document.getElementById("canvas")
    })

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45,800/450,1,2000);
    camera.position.set(100,100,650);

    scene.add(camera);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(10,10,15);
    scene.add(light);


    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('../module/cup/');
    mtlLoader.load("cup.mtl",function(materials){
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('../module/cup/');
        objLoader.load('cup.obj',function(obj){
            scene.add(obj);
            renderer.render(scene,camera);
        })
    })

}


window.onload = function(){
    if(Detector.webgl){
        init();
    }else{
        var warning = Detector.getWebGLErrorMessage();
        document.getElementById('canvasFrame').appendChild(warning);
    }
}
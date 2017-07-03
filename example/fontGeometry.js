/**
 * Created by snail on 17-6-30.
 */

function init(){
    var renderer = new THREE.WebGLRenderer({
        canvas:document.getElementById('canvas')
    })

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45,800/450,1,10);
    camera.position.set(2,0,5);

    scene.add(camera);

    var loader = new THREE.FontLoader();
    loader.load('../lib/helvetiker_regular.typeface.json',function(font){
        var mesh = new THREE.Mesh(
            new THREE.TextGeometry('hello',{
                font:font,
                size:1,
                height:1
            },
            new THREE.MeshLambertMaterial({
                color:0xff0000,
                wireframe:true,
            })
            )
        )
        scene.add(mesh);

        renderer.render(scene,camera);
    })


}


window.onload = function(){
    if (Detector.webgl) {
        init();
    } else {
        var warning = Detector.getWebGLErrorMessage();
        document.getElementById("canvasFrame").appendChild(warning);
    }
}
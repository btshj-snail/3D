/**
 * Created by snail on 17-6-28.
 */
var canvasObj ={
    init:function(){
        var renderer = new THREE.WebGLRenderer({
            canvas:document.getElementById("canvas")
        });
        renderer.setClearColor(0xffffff);
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(45,4/3,1,1000);
        camera.position.set(0,0,5);
        scene.add(camera);


        var cube = new THREE.Mesh(
            new THREE.CubeGeometry(1,2,3),
            new THREE.MeshBasicMaterial({
                color:0xff4400
            })
        )
        scene.add(cube);
        renderer.render(scene,camera);
    }
}



window.onload = function(){
    if(Detector.webgl){
        canvasObj.init();
    }else{
        var warning = Detector.getWebGLErrorMessage();
        document.getElementById("canvasFrame").appendChild(warning)
    }

}
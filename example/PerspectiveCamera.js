/**
 * Created by snail on 17-6-29.
 */

function init(fov){

    //1 获取渲染器
    var renderer = new THREE.WebGLRenderer({
        canvas:document.getElementById("canvas")
    })

    //2 初始化场景
    var scene = new THREE.Scene();

    //3 初始化透视投影相机
    var camera = new THREE.PerspectiveCamera(fov,800/450,1,10);

    camera.position.set(1,0,5);
    scene.add(camera);

    //4 初始化物体
    var cube = new THREE.Mesh(
        new THREE.CubeGeometry(1,2,3), //长度为1的正方体
        new THREE.MeshBasicMaterial({
            color:0xff0000,
            wireframe:true  //表示空心材质
        })
    );

    scene.add(cube);

    renderer.render(scene,camera);
}
var getFov = (function(){
  var type = "add";
  return function(init){
      if(type=="add"){
          if(init+15>=180){
              type="minus";
              return 180;
          }else{
              return init+15;
          }
      }else{
          if(init-15<=45){
              type="add";
              return 45;
          }else{
              return init-15;
          }
      }
  }
})();


window.onload = function(){
    if(Detector.webgl){
        var fov = 45;
        window.setInterval(function(){
            console.log(fov)
            init(fov);
            fov = getFov(fov);
        },1000/30)
    }else{
        var warning = Detector.getWebGLErrorMessage();
        var cf = document.getElementById("canvasFrame");
        cf.appendChild(warning);
    }
}
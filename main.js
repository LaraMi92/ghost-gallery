let scene, camera, renderer, skybox;

function init(){
    scene = new THREE.Scene;
    camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 45, 30000);
    camera.position.set(-900, -200, -900);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    function render() { 
        renderer.render( scene, camera ); 
    }
    controls.addEventListener('change', render);
    controls.minDistance = 500;
    controls.maxDistance = 1500;


    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load('textures/raspberry_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load('textures/raspberry_bk.jpg');
    let texture_up = new THREE.TextureLoader().load('textures/raspberry_up.jpg');
    let texture_dn = new THREE.TextureLoader().load('textures/raspberry_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load('textures/raspberry_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load('textures/raspberry_lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

    for (let i=0; i<6; i++){
        materialArray[i].side = THREE.BackSide;
    }

    let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);

    
}

function animate(){
    renderer.render(scene, camera);
    
    requestAnimationFrame(animate);

    skybox.rotation.y += 0.001;
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
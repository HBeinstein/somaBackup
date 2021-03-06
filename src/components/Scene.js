import React, { useRef, useEffect, Component } from 'react';
import * as THREE from 'three';
import { AmbientLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import '../assets/css/animation.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Scene(props) {
  const { useRef, useEffect, useState } = React
  const mount = useRef(null)
  const [isAnimating, handleAnimation] = useState(true)
  const controls = useRef(null)
  let base = null;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('skyblue');


  // let positiveR = -r>0 ? -r : r;
  

  // let test = props.axisVal;
  
  useEffect(() => {
    let width = mount.current.clientWidth;
    let height = mount.current.clientHeight;
    // let activelyAnimating;

    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const loader = new GLTFLoader;

    //Load and position model, add to scene, assign model to variable
    loader.load('./models/soma1.gltf', gltf => {
      gltf.scene.position.set(0, -10, 10);
      scene.add(gltf.scene);
      base = gltf;
    });

    // console.log(base);
    //Add light to scene
    const ambient = new THREE.AmbientLight(0X404040, 10);
    scene.add(ambient);

    // Set camera position
    camera.position.z = 25;
    // camera.position.x = 20;
    camera.position.y = 2;
    // camera.lookAt(10, 5, 0);

    //Set clear background color in conjunction with alpha:true in renderer & renderer size
    // scene.background = new THREE.Color(0x00FFFF);

    
    // renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(width, height);

    //Handle re-render when window is resized (triggered via event listener)
    const handleResize = () => {
      width = mount.current.clientWidth
      height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      animate()
    }
    
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.screenSpacePanning = false;
    controls.enableZoom = false;
    controls.update();

    //Define animation actions in here-- will loop and handle animation
    function animate (value) {

      if (base) {
          // if(Math.floor(props.axisVal.zAxis) > 0){
          //   console.log(Math.floor(props.axisVal.zAxis));
          //   scene.background = new THREE.Color('red');
          // } else if (Math.floor(props.axisVal.zAxis) < 0) {
          //   console.log(Math.floor(props.axisVal.zAxis));
          //   scene.background = new THREE.Color('black');
          //   // scene.background.set(`rgb(255, 0, 0)`);
          // }           
          // } else{
          //   console.log(props.axisVal.zAxis)
          //   scene.background = new THREE.Color("rgb(100, 0, 0)");
          // }

          // console.log(base)
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      controls.update();
    }

    console.log(scene)

    // console.log(base);

    //Append scene to DOM, start animation
    mount.current.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);
    animate();
  }, [props.axisVal])   
    
  return ( 
    <React.Fragment>
      <div className="animation-container" ref={mount} />
      <button className="end-mediation-button" onClick={props.endMeditation}>End Meditation</button>
    </React.Fragment>
  ); 
} 

 
export default Scene;
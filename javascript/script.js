document.addEventListener("DOMContentLoaded", function() {
    let scene, camera, renderer, earth, clouds, satellites = [];

    const COLORS = [0x000000, 0xffffff];  // Blank and White
    const BLINK_INTERVAL = 1000;         // Blink every second
    const DISTANCE = 7; 

    const header = document.querySelector("header");
    const headerWidth = header.clientWidth;
    const headerHeight = header.clientHeight;

    function init() {
        // Create the scene
        scene = new THREE.Scene();
    
        // Create the camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.y = 4; // 3
        camera.position.x = 0; // 0
        camera.position.z = 8; // 7
    
        // Create the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(headerWidth, headerHeight);
        
        // Append the renderer to the header
        document.querySelector("header").appendChild(renderer.domElement);
    
        // Load the Earth texture
        const earthTexture = new THREE.TextureLoader().load("Images/8kEarth.jpg");
        earth = new THREE.Mesh(
            new THREE.SphereGeometry(5, 32, 32),
            new THREE.MeshStandardMaterial({ map: earthTexture })
        );
        scene.add(earth);
    
        // Load the cloud texture and create a slightly larger sphere for clouds
        const cloudTexture = new THREE.TextureLoader().load('Images/8kEarthClouds.jpg');
        clouds = new THREE.Mesh(
            new THREE.SphereGeometry(5.1, 32, 32),
            new THREE.MeshStandardMaterial({ map: cloudTexture, transparent: true, opacity: 0.4 })
        );
        scene.add(clouds);

        // Add satellites
        const NUM_SATELLITES = 100;  // number of satellites in each band
        const NUM_BANDS = 100;       // number of bands around the Earth
        const INCLINATIONS = [Math.PI / 12, Math.PI / 6, -Math.PI / 12, -Math.PI / 6];
        const TOTAL_SATELLITES = NUM_SATELLITES * INCLINATIONS.length;


        INCLINATIONS.forEach((inclination, bandIdx) => {
            for (let i = 0; i < NUM_SATELLITES; i++) {
                let satellite = new THREE.Mesh(
                    new THREE.SphereGeometry(0.0025, .4, .4),
                    new THREE.MeshBasicMaterial({ color: 0xffffff })
                );
        
                // Calculate the global index for this satellite
                let globalIndex = bandIdx * NUM_SATELLITES + i;
        
                satellite.blinkTimer = (BLINK_INTERVAL / TOTAL_SATELLITES) * globalIndex;
                satellite.colorIndex = i % 2;
        
                satellite.rotationData = {
                    theta: (i * 2 * Math.PI / NUM_SATELLITES) + (bandIdx * Math.PI / NUM_BANDS),
                    inclination: inclination
                };
                
                satellites.push(satellite);
                scene.add(satellite);
            }
        });
    
        // Create a light source
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        scene.add(light);
    
        // Handle window resize
        window.addEventListener('resize', onWindowResize);
        
        animate();
    }

    function calculateWavePosition(theta, inclination, distance) {
        const waveEffect = Math.sin(5 * theta);  // Adjust "5" to change the number of waves.
        const adjustedInclination = inclination + 0.5 * waveEffect; // 0.5 determines the height of the wave.
        
        let x = distance * Math.cos(adjustedInclination) * Math.cos(theta);
        let y = distance * Math.sin(adjustedInclination);
        let z = distance * Math.cos(adjustedInclination) * Math.sin(theta);
        
        return { x, y, z };
    }

  function animate() {
    requestAnimationFrame(animate);
        
    earth.rotation.y += 0.0003;
    clouds.rotation.y += 0.0005;

    satellites.forEach(satellite => {
        satellite.rotationData.theta += 0.0001;
        satellite.blinkTimer += 5;  
        
        if (satellite.blinkTimer > BLINK_INTERVAL) {
            satellite.blinkTimer = 0;
            satellite.colorIndex = (satellite.colorIndex + 1) % 2;
            satellite.material.color.set(COLORS[satellite.colorIndex]);
        }
            
        const position = calculateWavePosition(
            satellite.rotationData.theta, 
            satellite.rotationData.inclination, 
            DISTANCE
        );
        satellite.position.set(position.x, position.y, position.z);
    });
    
    renderer.render(scene, camera);
}

    
    function onWindowResize() {
        const headerWidth = header.clientWidth;
        const headerHeight = header.clientHeight;
        
        camera.aspect = headerWidth / headerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(headerWidth, headerHeight);
    }
    
    init();    
});

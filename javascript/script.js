document.addEventListener("DOMContentLoaded", function() {
    let scene, camera, renderer, earth, clouds, satellites = [], satellitesGroup;

    const COLORS = [0x000000, 0xffffff];  // Blank and White
    const BLINK_INTERVAL = 1000;         // Blink every second
    const DISTANCE = 6; 

    const header = document.querySelector("header");
    const headerWidth = header.clientWidth;
    const headerHeight = header.clientHeight;
    const steps = Math.floor((1920 - headerWidth) / 10);

    function init() {
        // Create the scene
        scene = new THREE.Scene();
    
        // Create the camera
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.y = 3; // 3
        camera.position.x = -8 - (-1 * steps/50); // Moves camera to match width of website
        camera.position.z = 16; // 7
    
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

        earth.rotation.y = THREE.MathUtils.degToRad(-35);
        scene.add(earth);
    
        // Load the cloud texture and create a slightly larger sphere for clouds
        const cloudTexture = new THREE.TextureLoader().load('Images/8kEarthClouds.jpg');
        clouds = new THREE.Mesh(
            new THREE.SphereGeometry(5.1, 32, 32),
            new THREE.MeshStandardMaterial({ map: cloudTexture, transparent: true, opacity: 0.4 })
        );

        clouds.rotation.y = THREE.MathUtils.degToRad(-50);
        scene.add(clouds);

        // Add satellites
        const NUM_SATELLITES = 20;  // number of satellites in each band
        const NUM_BANDS = 20;       // number of bands around the Earth
        const INCLINATIONS = Array.from({ length: NUM_BANDS }, (_, idx) => (Math.PI * idx / (NUM_BANDS - 1)));
        const TOTAL_SATELLITES = NUM_SATELLITES * INCLINATIONS.length;

        satellitesGroup = new THREE.Group();

        INCLINATIONS.forEach((inclination, bandIdx) => {
            for (let i = 0; i < NUM_SATELLITES; i++) {
                let satellite = new THREE.Mesh(new THREE.SphereGeometry(0.005, .08, .08), new THREE.MeshBasicMaterial({ color: 0xffffff }));

                let globalIndex = bandIdx * NUM_SATELLITES + i;

                satellite.blinkTimer = (BLINK_INTERVAL / TOTAL_SATELLITES) * globalIndex;
                satellite.colorIndex = i % 2;

                satellite.rotationData = {
                    theta: (i * 2 * Math.PI / NUM_SATELLITES),
                    inclination: inclination
                };

                satellites.push(satellite);
                satellitesGroup.add(satellite);
            }
        });

        scene.add(satellitesGroup);
    
        // Create a light source
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(-12, 30, 10); // 0, 10, 10
        scene.add(light);
    
        // Handle window resize
        window.addEventListener('resize', onWindowResize);
        
        animate();
    }

    function calculateSatellitePosition(theta, inclination, distance) {
        let x = distance * Math.sin(inclination) * Math.cos(theta);
        let y = distance * Math.sin(inclination) * Math.sin(theta);
        let z = distance * Math.cos(inclination);
            
        return { x, y, z };
    }

    function animate() {
        requestAnimationFrame(animate);
    
        earth.rotation.y -= 0.00006;
        clouds.rotation.y -= 0.0001;
        satellitesGroup.rotation.y -= 0.0002;
    
        satellites.forEach(satellite => {
            satellite.rotationData.theta += 0.0001;
            satellite.rotationData.inclination += 0.0001; // Diagonal movement
            satellite.blinkTimer += 5;  
            
            if (satellite.blinkTimer > BLINK_INTERVAL) {
                satellite.blinkTimer = 0;
                satellite.colorIndex = (satellite.colorIndex + 1) % 2;
                satellite.material.color.set(COLORS[satellite.colorIndex]);
            }
            
            const position = calculateSatellitePosition(satellite.rotationData.theta, satellite.rotationData.inclination, DISTANCE);
            satellite.position.set(position.x, position.y, position.z);
        });
    
        renderer.render(scene, camera);
    }
    

    
    function onWindowResize() {
        const headerWidth = header.clientWidth;
        const headerHeight = header.clientHeight;
    
        // Adjust aspect ratio
        camera.aspect = headerWidth / headerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize(headerWidth, headerHeight);
    
        const steps = Math.floor((1920 - headerWidth) / 10);

        // Adjust camera's x position based on steps
        camera.position.x = -8 - (-1 * steps/50);; 
    }
    
    
    init();    
});

// Luxe Theme Three.js Background Animation

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js scene
    const container = document.getElementById('three-background');
    
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Configure renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xFEF2F6, 1); // Match with the background color
    container.appendChild(renderer.domElement);
    
    // Position camera
    camera.position.z = 30;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    
    // Create particle positions
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Color palette
    const primaryColor = new THREE.Color(0xEB2F64);
    const secondaryColor = new THREE.Color(0xf5cdd7);
    
    // Set particle attributes
    for (let i = 0; i < particleCount; i++) {
        // Positions - distribute randomly in 3D space
        positions[i * 3] = (Math.random() - 0.5) * 100;     // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;  // z
        
        // Color - use primary with random opacity
        if (Math.random() > 0.7) {
            colors[i * 3] = primaryColor.r;
            colors[i * 3 + 1] = primaryColor.g;
            colors[i * 3 + 2] = primaryColor.b;
        } else {
            colors[i * 3] = secondaryColor.r;
            colors[i * 3 + 1] = secondaryColor.g;
            colors[i * 3 + 2] = secondaryColor.b;
        }
        
        // Random size
        sizes[i] = Math.random() * 2 + 1;
    }
    
    // Set geometry attributes
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create particle material with custom shader
    const particlesMaterial = new THREE.PointsMaterial({
        size: 3,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Create floating shapes
    const shapeCount = 10;
    const shapes = [];
    
    // Function to create a random shape
    function createRandomShape() {
        // Choose a random geometry
        let geometry;
        const shapeType = Math.floor(Math.random() * 3);
        
        if (shapeType === 0) {
            // Circle
            geometry = new THREE.CircleGeometry(Math.random() * 3 + 2, 32);
        } else if (shapeType === 1) {
            // Square
            const size = Math.random() * 4 + 2;
            geometry = new THREE.PlaneGeometry(size, size);
        } else {
            // Triangle
            geometry = new THREE.CircleGeometry(Math.random() * 3 + 2, 3);
        }
        
        // Create material - transparent and colored
        const material = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.6 ? 0xEB2F64 : 0xf5cdd7,
            transparent: true,
            opacity: Math.random() * 0.3 + 0.1,
            side: THREE.DoubleSide
        });
        
        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        
        // Set random position
        mesh.position.x = (Math.random() - 0.5) * 80;
        mesh.position.y = (Math.random() - 0.5) * 80;
        mesh.position.z = (Math.random() - 0.5) * 40;
        
        // Set random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;
        
        // Add velocity properties for animation
        mesh.userData.vx = (Math.random() - 0.5) * 0.05;
        mesh.userData.vy = (Math.random() - 0.5) * 0.05;
        mesh.userData.vz = (Math.random() - 0.5) * 0.02;
        mesh.userData.vRotX = (Math.random() - 0.5) * 0.01;
        mesh.userData.vRotY = (Math.random() - 0.5) * 0.01;
        mesh.userData.vRotZ = (Math.random() - 0.5) * 0.01;
        
        scene.add(mesh);
        shapes.push(mesh);
    }
    
    // Create all shapes
    for (let i = 0; i < shapeCount; i++) {
        createRandomShape();
    }
    
    // Mouse interaction variables
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    
    // Listen for mouse movements
    document.addEventListener('mousemove', (event) => {
        // Convert to normalized coordinates (-1 to 1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth follow for camera direction
        target.x = mouse.x * 0.05;
        target.y = mouse.y * 0.05;
        camera.rotation.x += 0.01 * (target.y - camera.rotation.x);
        camera.rotation.y += 0.01 * (target.x - camera.rotation.y);
        
        // Animate particle system
        particleSystem.rotation.y += 0.0005;
        particleSystem.rotation.x += 0.0002;
        
        // Update particles for subtle movement
        const particlePositions = particlesGeometry.attributes.position.array;
        const time = Date.now() * 0.0005;
        
        for (let i = 0; i < particleCount; i++) {
            // Create subtle wave motion
            particlePositions[i * 3 + 1] += Math.sin(time + i) * 0.02;
            
            // Wrap particles if they go too far
            if (Math.abs(particlePositions[i * 3 + 1]) > 50) {
                particlePositions[i * 3 + 1] = Math.sign(particlePositions[i * 3 + 1]) * 50;
            }
        }
        
        particlesGeometry.attributes.position.needsUpdate = true;
        
        // Animate shapes
        shapes.forEach(shape => {
            // Update position
            shape.position.x += shape.userData.vx;
            shape.position.y += shape.userData.vy;
            shape.position.z += shape.userData.vz;
            
            // Update rotation
            shape.rotation.x += shape.userData.vRotX;
            shape.rotation.y += shape.userData.vRotY;
            shape.rotation.z += shape.userData.vRotZ;
            
            // Boundary check - reverse direction if too far
            if (Math.abs(shape.position.x) > 40) {
                shape.userData.vx *= -1;
            }
            if (Math.abs(shape.position.y) > 40) {
                shape.userData.vy *= -1;
            }
            if (Math.abs(shape.position.z) > 20) {
                shape.userData.vz *= -1;
            }
        });
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Start animation loop
    animate();
});
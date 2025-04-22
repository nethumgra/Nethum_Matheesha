// Three.js Background Animation

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
    renderer.setClearColor(0x0F172A, 0); // Transparent background
    container.appendChild(renderer.domElement);
    
    // Position camera
    camera.position.z = 30;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    
    // Create particle positions
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Color palette
    const colorPalette = [
        new THREE.Color(0x6C63FF), // Primary
        new THREE.Color(0xFF6584), // Secondary
        new THREE.Color(0x00BFA6), // Teal
        new THREE.Color(0xFFC75F)  // Yellow
    ];
    
    // Set particle attributes
    for (let i = 0; i < particleCount; i++) {
        // Positions - distribute randomly in 3D space
        positions[i * 3] = (Math.random() - 0.5) * 100;     // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
        
        // Random color from palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Random size
        sizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    // Set geometry attributes
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Create connection lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6C63FF,
        transparent: true,
        opacity: 0.1
    });
    
    // Function to update connections
    function updateConnections() {
        // Remove old lines
        scene.children.forEach(child => {
            if (child instanceof THREE.Line) {
                scene.remove(child);
            }
        });
        
        // Create connections only for particles close to each other
        const positions = particlesGeometry.attributes.position.array;
        const connectionDistance = 12; // Distance threshold
        
        for (let i = 0; i < particleCount; i++) {
            const x1 = positions[i * 3];
            const y1 = positions[i * 3 + 1];
            const z1 = positions[i * 3 + 2];
            
            // Only check a subset of particles for performance
            for (let j = i + 1; j < Math.min(i + 50, particleCount); j++) {
                const x2 = positions[j * 3];
                const y2 = positions[j * 3 + 1];
                const z2 = positions[j * 3 + 2];
                
                // Calculate distance
                const distance = Math.sqrt(
                    Math.pow(x2 - x1, 2) + 
                    Math.pow(y2 - y1, 2) + 
                    Math.pow(z2 - z1, 2)
                );
                
                // If close enough, create a line
                if (distance < connectionDistance) {
                    const lineGeometry = new THREE.BufferGeometry();
                    const linePositions = new Float32Array([x1, y1, z1, x2, y2, z2]);
                    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
                    
                    const line = new THREE.Line(lineGeometry, lineMaterial);
                    line.userData = { type: 'connection' };
                    scene.add(line);
                }
            }
        }
    }
    
    // Create floating wave geometry for background effect
    const waveGeometry = new THREE.PlaneGeometry(100, 100, 32, 32);
    const waveMaterial = new THREE.MeshBasicMaterial({
        color: 0x6C63FF,
        wireframe: true,
        transparent: true,
        opacity: 0.05
    });
    
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    wave.rotation.x = Math.PI / 2;
    wave.position.z = -20;
    scene.add(wave);
    
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
        target.x = mouse.x * 0.1;
        target.y = mouse.y * 0.1;
        camera.rotation.x += 0.01 * (target.y - camera.rotation.x);
        camera.rotation.y += 0.01 * (target.x - camera.rotation.y);
        
        // Rotate particle system slowly
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
        
        // Update wave geometry for flowing effect
        const time = Date.now() * 0.001;
        const positions = waveGeometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const distance = Math.sqrt(x * x + y * y);
            
            // Generate wave pattern
            positions[i + 2] = Math.sin(distance * 0.2 + time) * 3;
        }
        
        waveGeometry.attributes.position.needsUpdate = true;
        
        // Update the positions of particles for floating effect
        const particlePositions = particlesGeometry.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
            // Apply subtle floating motion to each particle
            particlePositions[i * 3] += Math.sin(time + i) * 0.01;
            particlePositions[i * 3 + 1] += Math.cos(time + i * 0.5) * 0.01;
            particlePositions[i * 3 + 2] += Math.sin(time * 0.5 + i * 0.2) * 0.01;
            
            // Wrap particles if they go too far
            if (Math.abs(particlePositions[i * 3]) > 50) {
                particlePositions[i * 3] *= -0.9;
            }
            if (Math.abs(particlePositions[i * 3 + 1]) > 50) {
                particlePositions[i * 3 + 1] *= -0.9;
            }
            if (Math.abs(particlePositions[i * 3 + 2]) > 50) {
                particlePositions[i * 3 + 2] *= -0.9;
            }
        }
        
        particlesGeometry.attributes.position.needsUpdate = true;
        
        // Update connections periodically for performance
        if (Math.random() < 0.05) {
            updateConnections();
        }
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Run initial connection creation
    updateConnections();
    
    // Start animation loop
    animate();
});

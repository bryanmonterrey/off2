"use client";

import React, { useRef, useCallback, useState, useEffect } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Model() {
    const gltf = useGLTF("/medias/untitled.glb");
    const { viewport } = useThree()
    const groupRef = useRef(null);
    const [hoveredBryan, setHoveredBryan] = useState(false);
    const [hoveredOffWhite, setHoveredOffWhite] = useState(false);
    const [bryanColor, setBryanColor] = useState(new THREE.Color('white'));
    const [offWhiteColor, setOffWhiteColor] = useState(new THREE.Color('white'));
    
    useEffect(() => {
        console.log("GLTF contents:", gltf);
    }, [gltf]);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.x += 0.01;
            groupRef.current.rotation.y += 0.001;
        }

        // Smooth color transition for Bryan Monterrey text
        bryanColor.lerp(new THREE.Color(hoveredBryan ? '#595656' : 'black'), 0.2);
        // Smooth color transition for Off-White text
        offWhiteColor.lerp(new THREE.Color(hoveredOffWhite ? '#377DFF' : 'black'), 0.2);
    })

    const handleClickBryan = useCallback(() => {
        window.open('https://instagram.com/payingheavy', '_blank');
    }, []);

    const handleClickOffWhite = useCallback(() => {
        window.open('https://www.off---white.com', '_blank');
    }, []);

    const materialProps = {
        thickness: 0.2,
        roughness: 0,
        transmission: 1,
        ior: 1.2,
        chromaticAberration: 0.02,
        backside: true,
    }
    
    const meshes = Object.values(gltf.nodes).filter(node => node.type === 'Mesh');

    const baseTextProps = {
        font: '/fonts/HelveticaNeueBold.otf',
        fontSize: 0.055,
        anchorY: "middle",
    };

    return (
        <group scale={viewport.width / 3.75}>
            <group ref={groupRef} position={[0, 0.05, 1]} scale={0.30}>
                {meshes.map((mesh, index) => (
                    <mesh 
                        key={index}
                        geometry={mesh.geometry}
                        position={mesh.position}
                        rotation={mesh.rotation}
                        scale={mesh.scale}
                    >
                        <MeshTransmissionMaterial {...materialProps}/>
                    </mesh>
                ))}
            </group>
            <Text 
                font={'/fonts/HelveticaNeueBold.otf'} 
                position={[0, -.92, 0]}
                fontSize={0.04}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                2025 Spring/Summer
            </Text>
            <group position={[0.052, -0.99, 0]}>
                <Text 
                    {...baseTextProps}
                    color={bryanColor}
                    anchorX="right"
                    onClick={handleClickBryan}
                    onPointerOver={() => {
                        setHoveredBryan(true);
                        document.body.style.cursor = 'pointer';
                    }}
                    onPointerOut={() => {
                        setHoveredBryan(false);
                        document.body.style.cursor = 'auto';
                    }}
                >
                    Bryan Monterrey
                </Text>
                <Text 
                    {...baseTextProps}
                    position={[0.01, 0, 0]}
                    color="black"
                    anchorX="left"
                >
                    for
                </Text>
                <Text 
                    {...baseTextProps}
                    position={[0.09, 0, 0]}
                    color={offWhiteColor}
                    anchorX="left"
                    onClick={handleClickOffWhite}
                    onPointerOver={() => {
                        setHoveredOffWhite(true);
                        document.body.style.cursor = 'pointer';
                    }}
                    onPointerOut={() => {
                        setHoveredOffWhite(false);
                        document.body.style.cursor = 'auto';
                    }}
                >
                    Off-White
                </Text>
            </group>
        </group>
    )
}

useGLTF.preload("/medias/untitled.glb")
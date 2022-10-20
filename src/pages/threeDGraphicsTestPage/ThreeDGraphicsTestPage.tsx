import React, { FunctionComponent, useRef } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { useDidMount } from 'rooks';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import colorfulBackground from '../../assets/img/background/colorful-background-q50.jpg';
import glassNormal from './assets/glass.jpg';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Text from 'antd/lib/typography/Text';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import useAppSider from '../../hooks/useAppSider';
import { PAGE_PADDING } from '../../constants/layout';
import dialogGh from './assets/dialog-gh.png';
import { Group, Vector3 } from 'three';
import DisqusThread from '../../components/disqusThread/DisqusThread';

const textureLoader = new Three.TextureLoader();
const gltfLoader = new GLTFLoader();

const ThreeDGraphicsTestPage: FunctionComponent = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { siderWidth } = useAppSider();

    useDidMount(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        Array.from(container.children).forEach((child) => {
            child.remove();
        });

        const width = Math.min(
            Math.min(window.innerWidth - siderWidth - PAGE_PADDING * 2, window.innerHeight - 50),
            1000
        );
        const height = width;

        const glassNormalTexture = textureLoader.load(glassNormal);
        glassNormalTexture.repeat.set(0.9, 0.9);
        const glassNormalScale = new Three.Vector2(2, 2);

        const scene = new Three.Scene();
        const camera = new Three.PerspectiveCamera();

        const renderer = new Three.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor('#1976d2');
        container.appendChild(renderer.domElement);

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(new UnrealBloomPass(new Three.Vector2(width, height), 0.2, 0.5, 0.33));

        const effectFXAA = new ShaderPass(FXAAShader);
        effectFXAA.uniforms.resolution.value.x = 1 / (width * window.devicePixelRatio);
        effectFXAA.uniforms.resolution.value.y = 1 / (height * window.devicePixelRatio);
        composer.addPass(effectFXAA);

        const hdrEquirect = new RGBELoader().load('/assets/empty_warehouse_01_1k.hdr', () => {
            hdrEquirect.mapping = Three.EquirectangularReflectionMapping;
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = true;

        const backgroundSize = 7;
        const background = new Three.Mesh(
            new Three.PlaneGeometry((backgroundSize * 16) / 9, backgroundSize),
            new Three.MeshBasicMaterial({
                map: textureLoader.load(colorfulBackground)
            })
        );
        background.position.z = -1;
        scene.add(background);

        const mainObjectGeometry = new Three.IcosahedronGeometry(0.8);
        const mainObjectMaterial = new Three.MeshPhysicalMaterial({
            roughness: 0.15,
            transmission: 1,
            // @ts-ignore
            thickness: 1,
            color: new Three.Color('#80deea'),
            envMap: hdrEquirect,
            envMapIntensity: 1.3,
            clearcoat: 1,
            clearcoatRoughness: 0.3,
            normalMap: glassNormalTexture,
            clearcoatNormalMap: glassNormalTexture,
            normalScale: glassNormalScale,
            clearcoatNormalScale: glassNormalScale
        });
        const mainObject = new Three.Mesh(mainObjectGeometry, mainObjectMaterial);
        mainObject.position.x = -0.85;
        mainObject.rotation.x = 0.3;
        mainObject.rotation.y = 0.33;

        scene.add(mainObject);

        const light = new Three.DirectionalLight(0xfff0dd, 1);
        light.position.set(0, 5, 5);
        light.rotation.y = -0.5;
        scene.add(light);

        camera.position.z = 5;

        const animeGirlGroup = new Group();
        animeGirlGroup.position.set(0, 0, 0);

        let animeGirl: GLTF | undefined;

        // const dialog = new Three.Mesh(
        //     new Three.PlaneGeometry(),
        //     new Three.MeshBasicMaterial({
        //         map: textureLoader.load(dialogGh)
        //     })
        // );
        // dialog.position.y = 2;
        // dialog.position.x = 1;

        gltfLoader.load('/assets/madoka_machida/scene.gltf', (gltf) => {
            animeGirl = gltf;
            animeGirl.scene.scale.set(0.1, 0.1, 0.1);
            // animeGirl.scene.position.x = 1.1;
            // animeGirl.scene.position.y = -0.95;

            new Three.Box3().setFromObject(animeGirlGroup).getCenter(animeGirl.scene.position).multiplyScalar(-1);

            animeGirlGroup.add(animeGirl.scene);
            // animeGirlGroup.add(dialog);
            animeGirlGroup.position.x = 1.1;
            animeGirlGroup.position.y = -0.95;

            scene.add(animeGirlGroup);
        });

        const animate = () => {
            requestAnimationFrame(animate);

            mainObject.rotation.x += 0.002;
            mainObject.rotation.y += 0.002;

            if (animeGirl) {
                animeGirlGroup.rotation.y += 0.01;
            }

            // renderer.render(scene, camera);
            composer.render();
        };

        animate();
    });

    return (
        <PageContainer title="3D Graphics Test" withComments>
            <div ref={containerRef} />
            <Text type="secondary" className="d-flex mt-1 text-break">
                This work is based on "Madoka Machida"
                (https://sketchfab.com/3d-models/madoka-machida-4a23132e4cf0482bbe55131745bee27c) by halloween
                (https://sketchfab.com/yellow09) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
            </Text>
        </PageContainer>
    );
};

export default ThreeDGraphicsTestPage;

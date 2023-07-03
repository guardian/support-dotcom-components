import 'three';
import { BufferGeometry, DataTexture } from 'three';

declare module 'three' {
    type XRFrame = Record<string, unknown>;
    type XRInputSource = Record<string, unknown>;
    type XRHandedness = string;
    type XRGamepad = Record<string, unknown>;
    type XRSessionInit = Record<string, unknown>;

    type BoxBufferGeometry = BufferGeometry;
    type CapsuleBufferGeometry = BufferGeometry;
    type CircleBufferGeometry = BufferGeometry;
    type ConeBufferGeometry = BufferGeometry;
    type CylinderBufferGeometry = BufferGeometry;
    type DodecahedronBufferGeometry = BufferGeometry;
    type ExtrudeBufferGeometry = BufferGeometry;
    type IcosahedronBufferGeometry = BufferGeometry;
    type LatheBufferGeometry = BufferGeometry;
    type OctahedronBufferGeometry = BufferGeometry;
    type PlaneBufferGeometry = BufferGeometry;
    type PolyhedronBufferGeometry = BufferGeometry;
    type RingBufferGeometry = BufferGeometry;
    type ShapeBufferGeometry = BufferGeometry;
    type SphereBufferGeometry = BufferGeometry;
    type TetrahedronBufferGeometry = BufferGeometry;
    type TorusBufferGeometry = BufferGeometry;
    type TorusKnotBufferGeometry = BufferGeometry;
    type TubeBufferGeometry = BufferGeometry;

    type DataTexture3D = DataTexture;
    export const DataTexture3D: DataTexture;

    export const BoxBufferGeometry: BufferGeometry;
    export const CapsuleBufferGeometry: BufferGeometry;
    export const CircleBufferGeometry: BufferGeometry;
    export const ConeBufferGeometry: BufferGeometry;
    export const CylinderBufferGeometry: BufferGeometry;
    export const DodecahedronBufferGeometry: BufferGeometry;
    export const ExtrudeBufferGeometry: BufferGeometry;
    export const IcosahedronBufferGeometry: BufferGeometry;
    export const LatheBufferGeometry: BufferGeometry;
    export const OctahedronBufferGeometry: BufferGeometry;
    export const PlaneBufferGeometry: BufferGeometry;
    export const PolyhedronBufferGeometry: BufferGeometry;
    export const RingBufferGeometry: BufferGeometry;
    export const ShapeBufferGeometry: BufferGeometry;
    export const SphereBufferGeometry: BufferGeometry;
    export const TetrahedronBufferGeometry: BufferGeometry;
    export const TorusBufferGeometry: BufferGeometry;
    export const TorusKnotBufferGeometry: BufferGeometry;
    export const TubeBufferGeometry: BufferGeometry;
}
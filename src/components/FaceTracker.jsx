import { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';

export default function FaceTracker() {
  useEffect(() => {
    let video;
    let model;
    let canvas;
    let ctx;

    const setup = async () => {
      video = document.createElement('video');
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');

      video.style.position = 'fixed';
      video.style.top = '50%';
      video.style.left = '25%';
      video.style.transform = 'translate(-50%, -50%) scaleX(-1)';
      video.style.width = '480px';
      video.style.height = '360px';
      video.style.zIndex = '9998';
      video.style.opacity = '1';
      document.body.appendChild(video);

      canvas = document.createElement('canvas');
      canvas.width = 960;
      canvas.height = 720;
      canvas.style.position = 'fixed';
      canvas.style.top = '50%';
      canvas.style.left = '75%';
      canvas.style.transform = 'translate(-50%, -50%) scaleX(-1)';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);

      ctx = canvas.getContext('2d');

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      console.log('Webcam stream set');
      await new Promise((resolve) => {
        video.onloadeddata = () => resolve();
      });
      console.log('Video is ready');
      console.log('Video dimensions:', video.videoWidth, video.videoHeight);

      model = await facemesh.load({
        maxFaces: 1,
        iouThreshold: 0.1,
        scoreThreshold: 0.3,
      });
      console.log('FaceMesh model loaded');

      const track = async () => {
        try {
          const predictions = await model.estimateFaces(video);
          console.log('Predictions:', predictions);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.translate(canvas.width / 2 - video.videoWidth / 2, canvas.height / 2 - video.videoHeight / 2);
          if (predictions.length > 0 && predictions[0].scaledMesh) {
            const keypoints = predictions[0].scaledMesh;

            const leftMouth = keypoints[61];
            const rightMouth = keypoints[291];
            const upperLip = keypoints[13];
            const lowerLip = keypoints[14];
            const leftEyebrow = keypoints[70];
            const rightEyebrow = keypoints[300];
            const leftEyeTop = keypoints[159];

            const mouthOpen = lowerLip[1] - upperLip[1];
            const mouthWidth = Math.hypot(rightMouth[0] - leftMouth[0], rightMouth[1] - leftMouth[1]);
            const innerBrowDist = Math.abs(leftEyebrow[0] - rightEyebrow[0]);
            const browDropLeft = leftEyebrow[1] - leftEyeTop[1];

            let moodColor = 'cyan';
            // if (mouthWidth > 75 && mouthOpen < 30) {
            //   moodColor = 'yellow'; // smile
            // } else if (mouthOpen > 15) {
            //   moodColor = 'magenta'; // surprise
            // } else if (innerBrowDist < 30 && browDropLeft < -5) {
            //   moodColor = 'red'; // anger
            // }

            for (let i = 0; i < keypoints.length; i++) {
              const [x, y] = keypoints[i];
              ctx.beginPath();
              ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
              ctx.fillStyle = moodColor;
              ctx.fill();
            }
          }
          ctx.restore();

          if (predictions.length > 0 && predictions[0].scaledMesh) {
            const keypoints = predictions[0].scaledMesh;
            const headX = keypoints[168][0]; // midpoint of face (nose bridge)
            const headY = keypoints[168][1];
          }
        } catch (err) {
          console.error('FaceMesh tracking error:', err);
        }
        requestAnimationFrame(track);
      };

      track();
    };

    setup();

    return () => {
      if (video) {
        video.pause();
        video.srcObject?.getTracks().forEach(t => t.stop());
        video.remove();
      }
      if (canvas) {
        canvas.remove();
      }
    };
  }, []);

  return null;
}
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const NUM_STARS = 45;
const FOV = 250;

export default function Constellation3D() {
  const [stars, setStars] = useState([]);
  const animationFrameRef = useRef(null);
  const starsData = useRef([]);

  useEffect(() => {
    // Inicializar coordenadas 3D para cada estrella
    const initStars = [];
    for (let i = 0; i < NUM_STARS; i++) {
      initStars.push({
        x: (Math.random() - 0.5) * SCREEN_WIDTH * 1.5,
        y: (Math.random() - 0.5) * SCREEN_HEIGHT * 1.5,
        z: Math.random() * 500 + 50,
        size: Math.random() * 2.5 + 1,
        color: Math.random() > 0.3 ? '#00b0ff' : '#00e676'
      });
    }
    starsData.current = initStars;

    let angle = 0;
    const animate = () => {
      angle += 0.005;
      const cosA = Math.cos(0.003);
      const sinA = Math.sin(0.003);

      const updated = starsData.current.map((star) => {
        // Rotación 3D alrededor del eje Y
        const rx = star.x * cosA - star.z * sinA;
        const rz = star.z * cosA + star.x * sinA;

        star.x = rx;
        star.z = rz < 10 ? 500 : rz;

        // Proyección 3D a plano 2D
        const scale = FOV / (FOV + star.z);
        const px = star.x * scale + SCREEN_WIDTH / 2;
        const py = star.y * scale + SCREEN_HEIGHT / 2;

        return {
          px,
          py,
          scale,
          size: star.size * scale,
          color: star.color,
          opacity: Math.min(1, Math.max(0.2, scale))
        };
      });

      setStars(updated);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {stars.map((star, idx) => (
        <View
          key={idx}
          style={[
            styles.star,
            {
              left: star.px,
              top: star.py,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              backgroundColor: star.color,
              opacity: star.opacity
            }
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    shadowColor: '#00b0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4
  }
});

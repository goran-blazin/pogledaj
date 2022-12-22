import {useState, useEffect} from 'react';

export function useMove() {
  const [state, setState] = useState({x: 0, y: 0});

  const handleMouseMove = (e: any) => {
    setState((state) => ({...state, x: e.clientX, y: e.clientY}));

    document.querySelectorAll<HTMLElement>('.object').forEach(function (move) {
      const moving_value: any = move.getAttribute('data-value');
      const x = (e.clientX * moving_value) / 250;
      const y = (e.clientY * moving_value) / 250;

      move.style.transform = `translateX(${50 + x}%) translateY(${-50 + y}%)`;
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return {
    x: state.x,
    y: state.y,
    handleMouseMove,
  };
}

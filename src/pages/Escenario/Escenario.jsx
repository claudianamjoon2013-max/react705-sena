
import { useState } from "react";
import Tortuga from "./Tortuga";
import BotonDerecha from "./BotonDerecha";
import BotonIzquierda from "./BotonIzquierda";
import BotonReiniciar from "./BotonReiniciar";
import "./Escenario.css";

function Escenario() {
  const [posicion, setPosicion] = useState(0);
  const [maxPosicion, setMaxPosicion] = useState(0);
  

  const limiteDerecho = 290;
  const limiteIzquierdo = -290;

  function moverDerecha() {
    setPosicion((posPrev) => {
      const nuevaPosicion = posPrev + 15;

      // Si toca o supera el límite, vuelve a 0
      if (nuevaPosicion >= limiteDerecho) {
        return 0;
      }

      // Actualiza el récord máximo
      setMaxPosicion((maxPrev) => Math.max(maxPrev, nuevaPosicion));

      return nuevaPosicion;
    });
  }

  function moverIzquierda() {
    setPosicion((posPrev) => {
      const nuevaPosicion = posPrev - 15;

      if (nuevaPosicion <= limiteIzquierdo) {
        return 0;
      }

      return nuevaPosicion;
    });
  }

  function reiniciar() {
    setPosicion(0);
    setMaxPosicion(0);
  }

  return (
    <div className="escenario">
      {}

      <div className="luna" style={{ top: "60px" }}>🪐</div>
      <div className="rayo"></div>
      <span className="estrella" style={{ top: "75px", left: "60px" }}>✦</span>
      <span className="estrella" style={{ top: "105px", left: "220px" }}>✨</span>
      <span className="estrella" style={{ top: "65px", left: "380px" }}>✦</span>

      <Tortuga posicion={posicion} />

      <div className="panel-inferior">
        <div className="contenedor-botones">
          <BotonIzquierda mover={moverIzquierda} />
          <BotonReiniciar reiniciar={reiniciar} />
          <BotonDerecha mover={moverDerecha} />
        </div>

        <h3>Posición actual: {posicion} px</h3>
        
      </div>
    </div>
  );
}

export default Escenario;
